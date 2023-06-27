import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import  { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import crypto from 'crypto';
import { getPrismaClient } from "../db";
 // Assuming db.ts is in the same directory

const prisma = getPrismaClient();

const options: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: { username: any; password: any }) {
        const { username, password } = credentials;

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
            },
          });

          // Send the welcome email to the new user
          await transporter.sendMail({
            from: 'your_email',
            to: newUser.email,
            subject: 'Welcome to Schield Centre friends forum',
            text: 'Thank you for signing up with us today. This is our official email. Feel free to reach out to support through this email!',
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
    encryption: true,
  },
  pages: {
    // Custom pages...
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  events: {},
  debug: false,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
