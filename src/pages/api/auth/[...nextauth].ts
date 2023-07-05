import NextAuth, { NextAuthOptions } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getPrismaClient } from '../db';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import crypto from 'crypto';

const prisma = getPrismaClient();

const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
     
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials as { username: string; password: string };

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: username },
        });

        if (!existingUser) {
          // Generate a random authentication key
          const authenticationKey = crypto.randomBytes(16).toString('hex');

          // Create a new user if it doesn't exist
          const newUser = await prisma.user.create({
            data: {
              email: username,
              password: password,
              authentication_key: authenticationKey,
              // Add any additional fields for the user
              id_: 0, // Provide a value for the id_ field
              username: 'SomeUsername', // Provide a value for the username field
            },
          });

          // Return the newly created user object
          return newUser;
        } else if (existingUser.password === password) {
          // Return the user object if the credentials match
          return existingUser;
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    // Custom pages...
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  events: {},
  debug: false,
};

const nextAuthHandler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default nextAuthHandler;
