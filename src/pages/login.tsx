import { signIn, SessionProvider, useSession, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const LoginPage = () => {
  const { data: session } = useSession();
  const [providerData, setProviderData] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviderData(providers);
    };

    fetchProviders();
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (session) {
    return <p>You are already signed in as {session.user.email}</p>;
  }

  const handleSignInWithEmail = () => {
    signIn('credentials', {
      username,
      password,
      callbackUrl: `${window.location.origin}/dashboard`, // Replace with your desired redirect URL after successful login
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Login Page</h1>
        <div className="mb-4">
          {providerData &&
            Object.values(providerData).map((provider) => (
              <div key={provider.id} className="mb-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </div>
        <div>
          <SessionProvider>
            <h2 className="text-xl font-bold mb-4">Sign in with email and password</h2>
            <div className="mb-2">
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full border border-gray-300 rounded px-3 py-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSignInWithEmail}
              >
                Sign In
              </button>
            </div>
            <div className="mt-4">
              <p>
                Don't have an account?{' '}
                <Link href="/register" legacyBehavior>
                  <a className="text-blue-500 hover:underline">Register</a>
                </Link>
              </p>
            </div>
          </SessionProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
