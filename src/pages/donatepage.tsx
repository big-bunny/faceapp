import DefaultLayout from '@/components/DefaultLayout';
import DonateButton from '@/components/Donate';
import React, { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const DonationPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const session = await getSession();
      if (!session) {
        router.replace('/api/auth/signin');
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <DefaultLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full backdrop-blur-3xl p-8 shadow">
          <h2 className="text-2xl mb-4">Who to thank for Donation</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Name
              </label>
              <input
                id="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter name of student or program you are donating to"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Email
              </label>
              <input
                id="email"
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex items-center justify-end">
              <DonateButton />
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DonationPage;
