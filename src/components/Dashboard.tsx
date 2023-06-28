import React, { Component } from 'react';


export class Dashboard extends Component {
  render() {
    return (
      <div className=" min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to Schield Centre Dashboard</h1>

        {/* Display important information */}
        <div className="bg-white rounded-lg p-4 mb-8">
          <h2 className="text-xl font-bold mb-4">Important Information</h2>
          <ul>
            <li className="mb-2">Total Students: 210</li>
            <li className="mb-2">Total Teachers: 14</li>
           
          </ul>
        </div>

        {/* Display recent activities */}
        <div className="bg-white rounded-lg p-4 mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <ul>
            <li className="mb-2">Trip to Court</li>
            <li className="mb-2">Science Fair Preparation Meeting</li>
            <li className="mb-2">Parent-Teacher Meeting Scheduled</li>
          </ul>
        </div>


        </div>
   
      
    );
  }
}

export default Dashboard;
