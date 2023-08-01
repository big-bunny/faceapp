import React, { Component } from 'react';
import Image from 'next/image';

const Dashboard = ({ }) => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl p-3  text-white font-extrabold bg-gradient-to-r from-green-500 rounded-full mb-8">
        Welcome to Schield Centre Dashboard
      </h1>

      {/* Use flexbox to align elements */}
      <div className="flex">
        {/* Left section */}
        <div className="flex flex-col mr-8">
          {/* Mission Statement */}
          <div className="scrolling-text mb-4 text-center bg-white rounded-3xl">
            <h3 className="text-2xl text-red-500">Mission Statement</h3>
            <p className="text-xl p-2  text-black">
              Our mission is to provide access to quality education to children in Kajiado, Kenya, with the aim of empowering them to break the cycle of poverty and improve their lives and those of their families. We strive to create a learning environment that is supportive, inclusive, and empowering, valuing diversity and embracing the unique cultural heritage of our community.
            </p>
          </div>

          {/* Centered image */}
          <div className="flex justify-center mb-8">
            <p className="text-3xl text-white">this image will be replaced with one of the late Schield's</p>

            <Image
              src="/images/gallery/construction.jpg"
              alt="Centered Image"
              width={600}
              height={400}
              className="w-full"
            />
          </div>

          {/* Vision Statement */}
          <div className="scrolling-text mb-4 bg-white text-center rounded-3xl">
            <h3 className="text-2xl text-red-500">Vision Statement</h3>
            <p className="text-xl p-2 text-black">
              Our vision is a world where every child has access to quality education and the opportunity to reach their full potential. We believe that education is a fundamental human right and that it is essential for creating a more just and equitable society. At our center, we believe in fostering a culture of curiosity, creativity, and critical thinking, while also imparting life skills and values such as hard work, honesty, and respect for diversity. Our vision is to inspire and empower the next generation of global citizens who will make a positive impact on the world.
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex-grow">
          {/* Display important information */}
          <div className="bg-white rounded-lg p-4 mb-8">
            <h2 className="text-xl font-bold mb-4">Important Information</h2>
            <ul>
              <li className="mb-2">Total Students: 210</li>
              <li className="mb-2">Total Teachers: 14</li>
            </ul>
          </div>

          {/* Display recent activities */}
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
            <ul>
              <li className="mb-2">Trip to Court</li>
              <li className="mb-2">Sports Day</li>
            </ul>
          </div>

          {/* Live Calendar */}
          <div className="bg-white rounded-lg p-4 mt-8">
            <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
            <p>
              This section will display a live calendar of upcoming events at the Schield Centre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* Comments */

// This is the main heading for the dashboard.
// The text is white and the background is a green gradient.
// The heading has a rounded-full border radius.

// This section contains the mission statement for the Schield Centre.
//
