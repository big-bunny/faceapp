import React, { Component } from 'react';

export class Dashboard extends Component {
  render() {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to Schield Centre Dashboard</h1>

        {/* Use flexbox to align elements */}
        <div className="flex">
          {/* Left section */}
          <div className="flex flex-col mr-8">
            {/* Mission Statement */}
            <div className="scrolling-text mb-4">
              <h3>Mission Statement</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
           
            {/* Centered image */}
            <div className="flex justify-center mb-8">
              <img src="/images/gallery/construction.jpg" alt="Centered Image" className="max-w-full h-auto" />
            </div>
            {/* Vision Statement */}
            <div className="scrolling-text mb-4">
              <h3>Vision Statement</h3>
              <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>

          {/* Right section */}
          
          <div className="flex-grow">
            {/* Centered image */}
            
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
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
