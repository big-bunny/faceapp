

import DonateButton from '@/components/Donate';
import React from 'react';

const DonationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 shadow">
        <h2 className="text-2xl mb-4">Who to thank for Donation</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
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
  );
};

export default DonationPage;
