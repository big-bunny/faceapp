import DefaultLayout from '@/components/DefaultLayout';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import React, { Component } from 'react';

export class ProgramSponsorship extends Component {
  render() {
    const programs = [
      {
        id: 1,
        title: 'Education for All',
        description: 'Support our education program to provide quality education for underprivileged children.',
        image: '/images/program/chess.jpg',
      },
      {
        id: 2,
        title: 'Healthcare Initiatives',
        description: 'Contribute to our healthcare initiatives and help improve the well-being of the community.',
        image: '/images/program/field-trip.jpg',
      },
      {
        id: 3,
        title: 'Healthcare Initiatives',
        description: 'Contribute to our healthcare initiatives and help improve the well-being of the community.',
        image: '/images/program/field-trip.jpg',
      },
      {
        id: 4,
        title: 'Healthcare Initiatives',
        description: 'Contribute to our healthcare initiatives and help improve the well-being of the community.',
        image: '/images/program/field-trip.jpg',
      },
      {
        id: 5,
        title: 'Healthcare Initiatives',
        description: 'Contribute to our healthcare initiatives and help improve the well-being of the community.',
        image: '/images/program/field-trip.jpg',
      },
      {
        id: 6,
        title: 'Healthcare Initiatives',
        description: 'Contribute to our healthcare initiatives and help improve the well-being of the community.',
        image: '/images/program/field-trip.jpg',
      },
      // Add more program data as needed
    ];

    return (
      <>
         <DefaultLayout>
        <div className=" min-h-screen">
          <main className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Program Sponsorship</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {programs.map((program) => (
                <div key={program.id} className="bg-white rounded shadow p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={program.image}
                      alt={`Program ${program.id}`}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-bold">{program.title}</h2>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{program.description}</p>
                  <Link
                   href="/donatepage"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Donate
                  </Link>
                </div>
              ))}
            </div>
          </main>
        </div>
        </DefaultLayout>
      </>
    );
  }
}

export default ProgramSponsorship;
