import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import React, { Component } from 'react';

export class Dashboard extends Component {
  render() {
    return (
      <>
      <Header isAuthenticated={undefined} /> 
      <div className="bg-gray-200 min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to Schield Centre </h1>

        {/* Display important information */}
        <div className="bg-white rounded-lg p-4 mb-8">
          <h2 className="text-xl font-bold mb-4">Important Information</h2>
          <ul>
            <li className="mb-2">Total Students: 210</li>
            <li className="mb-2">Total Teachers: 10</li>
            <li className="mb-2">Upcoming Events: 3</li>
          </ul>
        </div>

        {/* Display recent activities */}
        <div className="bg-white rounded-lg p-4 mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <ul>
            <li className="mb-2">Student Exam Results Published</li>
            <li className="mb-2">Science Fair Preparation Meeting</li>
            <li className="mb-2">Parent-Teacher Meeting Scheduled</li>
            <li className="mb-2">Trip to court</li>
          </ul>
        </div>

        {/* Display calendar */}
        <div className="bg-white rounded-lg p-4 mb-8">
          {/* <h2 className="text-xl font-bold mb-4">Calendar</h2> */}
          {/* Render a calendar component or integrate a calendar library */}
          {/* Example: <Calendar /> */}
        </div>

        {/* Display quick links */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul>
          <li>
            <Link href="/home" className="hover:text-gray-400">
              Home
            </Link>
            
            <Link href="/about" className="hover:text-gray-400">
             About
            </Link>
            
            <Link href="/team" className="hover:text-gray-400">
              Team
            </Link>
            <Link href="/gallery" className="hover:text-gray-400">
             Gallery
            </Link>
          </li>
          </ul>
        </div>
      </div><Footer /></>
    );
  }
}

export default Dashboard;
