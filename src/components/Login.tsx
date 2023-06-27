import React, { useState } from 'react';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/client';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [session] = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { email, password });

      if (response.status === 200) {
        // Login successful, perform any necessary actions (e.g., redirect)
        console.log('Login successful');
      }
    } catch (error) {
      // Handle login error
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!session && (
        <>
          <span className="mr-2">You are not signed in</span>
          <a
            href={`/api/auth/signin`}
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
            className="text-black hover:text-green-300"
          >
            Sign in
          </a>
        </>
      )}
      {session?.user && (
        <>
          <div
            className="w-8 h-8 rounded-full bg-cover bg-center mr-2"
            style={{ backgroundImage: `url(${session.user.image})` }}
          />
          <div>
            <small className="block">Signed in as</small>
            <strong className="block text-black">
              {session.user.email || session.user.name}
            </strong>
          </div>
          <a
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
            className="text-black hover:text-green-300 ml-4"
          >
            Sign out
          </a>
        </>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
