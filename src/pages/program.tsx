import React, { useState } from 'react';
import Image from 'next/image';
import DefaultLayout from '@/components/DefaultLayout';
import { faDonate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import router from 'next/router';

interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
}

const SponsorProgram = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const programs: Program[] = [
    {
      id: 1,
      title: 'Art and Design',
      description: 'Support students interested in art and design. Help them explore their creativity and pursue their dreams.',
      image: '/images/programs/art.jpg',
    },
    {
      id: 2,
      title: 'Science and Math',
      description: 'Support students interested in science and math. Help them excel in these fields and become future engineers.',
      image: '/images/programs/science.jpg',
    },
    {
      id: 3,
      title: 'Music',
      description: 'Support students interested in music. Help them develop their musical talents and achieve their goals.',
      image: '/images/programs/music.jpg',
    },
    {
      id: 4,
      title: 'Athletics',
      description: 'Support students interested in athletics. Help them hone their skills and reach their full potential in sports.',
      image: '/images/programs/athletics.jpg',
    },
    {
      id: 5,
      title: 'Literature',
      description: 'Support students interested in literature. Help them foster a love for reading and encourage their writing aspirations.',
      image: '/images/programs/literature.jpg',
    },
  ];

  const showModal = (program: Program) => {
    setSelectedProgram(program);
  };

  const truncateWords = (str: string, numWords: number) => {
    const words = str.split(' ');
    if (words.length <= numWords) {
      return str;
    } else {
      const truncatedWords = words.slice(0, numWords);
      return truncatedWords.join(' ') + '...';
    }
  };

  const redirectToDonatePage = () => {
    router.push('/donatepage');
  };

  return (
    <DefaultLayout>
      <section id="sponsor-program" className="container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl  text-white font-extrabold  bg-gradient-to-r from-green-500 rounded-full mb-8">
            SPONSOR A PROGRAM
          </h1>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* Display each program */}
            {programs.map((program) => (
              <div key={program.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Display program image */}
               <Image className="h-48 w-full object-cover" src={program.image} alt={program.title} width={300} height={200} />

                <div className="p-6">
                  {/* Display program title */}
                  <h2 className="text-xl font-semibold text-gray-900">{program.title}</h2>
                  {/* Display truncated program description */}
                  <p className="text-lg leading-relaxed truncate-overflow">{truncateWords(program.description, 10)}</p>
                  {/* Button to show full description and donation options */}
                  <a href="#" className="text-green-500 inline-block mt-4 underline" onClick={() => showModal(program)}>
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Display selected program's full description and donation options */}
        {selectedProgram && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white max-w-md mx-auto rounded-lg overflow-hidden">
              <div className="p-4 mr-10 ml-20 mt-5">
                <h2 className="text-3xl font-extrabold mb-2">{selectedProgram.title}</h2>
                <p className="text-base leading-relaxed">{selectedProgram.description}</p>
                <div className="flex justify-end mt-8">
                  <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg" onClick={() => setSelectedProgram(null)}>
                    Close
                  </button>
                  {/* Display donation button */}
                  <button
                    onClick={redirectToDonatePage}
                    className="text-green-500 font-extrabold text-2xl hover:text-red-800 ml-4 flex items-center space-x-1"
                  >
                    <FontAwesomeIcon icon={faDonate} className="mr-0" />
                    Donate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
};

export default SponsorProgram;
