import React, { useState } from 'react';
import Image from 'next/image';
import DefaultLayout from '@/components/DefaultLayout';
import { faDonate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import router from 'next/router';

interface Student {
  id: number;
  name: string;
  grade: string;
  bio: string;
  image: string;
}

const Child = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const students: Student[] = [
    {
      id: 1,
      name: 'Jane Smith',
      grade: 'Grade 7',
      bio: 'Jane is a talented artist who loves to express herself through her work. She hopes to one day pursue a career in art and design.',
      image: '/images/students/student1.jpg',
    },
    {
      id: 2,
      name: 'John Doe',
      grade: 'Grade 6',
      bio: 'John is a bright and curious student who loves science and math. He dreams of becoming an engineer one day.',
      image: '/images/students/student2.jpg',
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      grade: 'Grade 8',
      bio: 'Sarah is an accomplished musician who plays several instruments. She hopes to one day become a professional musician.',
      image: '/images/students/student3.jpg',
    },
    {
      id: 4,
      name: 'Michael Brown',
      grade: 'Grade 9',
      bio: 'Michael is a talented athlete who excels in multiple sports. He dreams of one day competing at the national level.',
      image: '/images/students/student4.jpg',
    },
    {
      id: 5,
      name: 'Emily Davis',
      grade: 'Grade 7',
      bio: 'Emily is a passionate reader who loves to explore new worlds through books. She hopes to one day become a writer herself.',
      image: '/images/students/student5.jpg',
    },
  ];

  const showModal = (student: Student) => {
    setSelectedStudent(student);
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
      <section id="child" className="container ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-extrabold  text-gray-900 inline-block rounded-full px-6 py-2">
            SPONSOR CHILD
          </h1>

          <div
            className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            style={{ backgroundImage: `url('/schieldgreen/backtoschool.jpg')` }}
          >
            {/* Display each student */}
            {students.map((item) => (
              <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Display student image */}
                <img className="h-48 w-full object-cover" src={item.image} alt={item.name} />
                <div className="p-6">
                  {/* Display student name and grade */}
                  <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                  <p className="mt-2 text-green-600">{item.grade}</p>
                  {/* Display truncated student bio */}
                  <p
                    className="text-lg leading-relaxed truncate-overflow"
                    dangerouslySetInnerHTML={{ __html: truncateWords(item.bio, 5) }}
                  ></p>
                  {/* Button to show full bio and donation options */}
                  <a
                    href="#"
                    className="text-green-500 inline-block mt-4 underline"
                    onClick={() => showModal(item)}
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Display selected student's full bio and donation options */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div
              className="max-w-md mx-auto rounded-lg overflow-hidden"
              style={{ backgroundImage: `url('/schieldgreen/greenboard.jpg')` }}
            >
              <div className="p-4 mr-10 ml-20 mt-5">
                <h2 className="text-3xl font-extrabold mb-2">{selectedStudent.name}</h2>
                <p className="text-green-600 mb-4">{selectedStudent.grade}</p>
                <p className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedStudent.bio }}></p>
                <div className="flex justify-end mt-8">
                  <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg" onClick={() => setSelectedStudent(null)}>
                    Close
                  </button>
                  {/* Display PayPal donation button */}
                  <button
                    onClick={redirectToDonatePage}
                    className="text-white font-extrabold text-2xl hover:text-red-800 ml-4 flex items-center space-x-1"
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

export default Child;
