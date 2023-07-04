import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    // Return a 405 Method Not Allowed if the request method is not POST
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {username, email,  password} = req.body;

  try {
    // Check if a user with the provided email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Save the new user to the database
    const newUser = await prisma.user.create({
      data: {
        username, 
       email,
        password, // Note: It's essential to hash the password before saving it to the database in a real-world application
        authentication_key: '434r3', // Provide a value for the authentication_key field
        id_: 0, // Provide a value for the id_ field
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
