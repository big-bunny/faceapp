import React, { Component, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DefaultLayout from '@/components/DefaultLayout';

interface StaffMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Principal",
    image: "/images/staff/staff1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Teacher",
    image: "/images/staff/staff2.jpg",
  },
  {
    id: 3,
    name: "David Johnson",
    position: "Counselor",
    image: "/images/staff/staff3.jpg",
  },
  // Add more staff members as needed
];

const Team: React.FC = () => {
  const [selectedStaffMember, setSelectedStaffMember] = useState<StaffMember | null>(null);

  const openModal = (staffMember: StaffMember) => {
    setSelectedStaffMember(staffMember);
  };

  const closeModal = () => {
    setSelectedStaffMember(null);
  };

  return (
    <>
      <DefaultLayout>
        <div className="min-h-screen">
          <main className="max-w-4xl mx-auto py-8">
            <h1 className="text-5xl text-center font-bold mb-4">Our Team</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staffMembers.map((staffMember) => (
                <div
                  key={staffMember.id}
                  className="bg-white rounded shadow p-6 cursor-pointer"
                  onClick={() => openModal(staffMember)}
                >
                  <Image
                    src={staffMember.image}
                    alt={staffMember.name}
                    className="w-full h-32 object-cover mb-4"
                    width={500}
                    height={500}
                  />
                  <h3 className="text-xl font-semibold">{staffMember.name}</h3>
                  <p className="text-gray-700">{staffMember.position}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </DefaultLayout>

      {/* Staff Member Modal */}
      {selectedStaffMember && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={closeModal}>
          <div className="bg-white rounded-lg p-4 w-full max-w-4xl mx-auto">
            <Image
              src={selectedStaffMember.image}
              alt={selectedStaffMember.name}
              className="w-full mb-4"
              width={800}
              height={800}
            />
            <h3 className="text-2xl font-semibold mb-2">{selectedStaffMember.name}</h3>
            <p className="text-gray-700">{selectedStaffMember.position}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Team;
