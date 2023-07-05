import { signIn, SessionProvider, useSession, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import DefaultLayout from '@/components/DefaultLayout';
import { LiteralUnion } from 'next-auth/react';
import { ClientSafeProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { data: session } = useSession();
  const [providerData, setProviderData] = useState<Record<LiteralUnion<string, never>, ClientSafeProvider> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviderData(providers);
    };

    fetchProviders();
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleSignInWithEmail = () => {
    signIn('credentials', {
      username,
      password,
      callbackUrl: `${window.location.origin}/`, // Replace with your desired redirect URL after successful login
    });
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-500">
        <div className="max-w-md px-4 py-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-4">
            Dear Shield's friend, login to continue 👍
          </h1>
          <div className="mb-4">
            {providerData &&
              Object.values(providerData).map((provider) => (
                <div key={provider.id} className="mb-2">
                  <button
                    className="bg-blue-500 rounded-xl hover:bg-green-400 text-white px-4 py-2 hover:rounded-full"
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
                  className="bg-blue-500 hover:bg-green-500 text-white px-4 py-2 rounded-full"
                  onClick={handleSignInWithEmail}
                >
                  Sign In
                </button>
              </div>
              <div className="mt-4">
                <p className="text-center">
                  Don't have an account?{' '}
                  <Link href="/register" passHref legacyBehavior>
                    <a className="text-blue-500 hover:underline">Register</a>
                  </Link>
                </p>
              </div>
            </SessionProvider>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LoginPage;
