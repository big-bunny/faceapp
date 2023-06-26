
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import React, { Component } from 'react';
interface ChildData {
  id: number;
  name: string;
  age: number;
  image: string;
  description: string;
}

export class Child extends Component {
  state = {
    showFullDescription: false,
  };

  toggleDescription = () => {
    this.setState((prevState) => ({
      showFullDescription: !prevState.showFullDescription,
    }));
  };
 render() {
    const children = [
      {
        id: 1,
        name: 'John Doe',
        age: 8,
        image: '/images/students/student1.jpg',
        description: 'John is a talented young artist who loves to draw and paint. He dreams of becoming a professional artist one day.',
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 10,
        image: '/images/students/schield2.jpg',
        description: 'Jane is a passionate soccer player. She hopes to join a local soccer team and improve her skills with proper training.',
      },
      {
        id: 3,
        name: 'Jane Smith',
        age: 10,
        image: '/images/students/schield2.jpg',
        description: 'Jane is a passionate soccer player. She hopes to join a local soccer team and improve her skills with proper training.',
      },
      {
        id: 4,
        name: 'Jane Smith',
        age: 10,
        image: '/images/students/schield2.jpg',
        description: 'Jane is a passionate soccer player. She hopes to join a local soccer team and improve her skills with proper training.',
      },
      {
        id: 5,
        name: 'Jane Smith',
        age: 10,
        image: '/images/students/schield2.jpg',
        description: 'Jane is a passionate soccer player. She hopes to join a local soccer team and improve her skills with proper training.',
      },
      // Add more children data as needed
    ];

    return (
      <>
        <Header />
        <div className="bg-gray-100 min-h-screen">
          <main className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Children in Need of Sponsorship</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {children.map((child) => (
                <div key={child.id} className="bg-white rounded shadow p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={child.image}
                      alt={`Child ${child.id}`}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-bold">{child.name}</h2>
                      <p className="text-gray-500">{child.age} years old</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {this.state.showFullDescription
                      ? child.description
                      : child.description.split(' ').slice(0, 5).join(' ')}
                    {child.description.split(' ').length > 5 && (
                      <button
                        className="text-blue-500 hover:underline focus:outline-none"
                        onClick={this.toggleDescription}
                      >
                        {this.state.showFullDescription ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                  </p>
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
        <Footer />
      </>
    );
  }
}

export default Child;

