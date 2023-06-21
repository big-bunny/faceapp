import React, { Component } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

class Home extends Component {
  render() {
    // Example data for programs
    const programs = [
      {
        id: 1,
        title: 'Program 1',
        description: 'Description of Program 1.',
        image: '/images/program/program1.jpg',
      },
      {
        id: 2,
        title: 'Program 2',
        description: 'Description of Program 2.',
        image: '/images/program/program2.jpg',
      },
      {
        id: 3,
        title: 'Program 3',
        description: 'Description of Program 3.',
        image: '/images/program/program3.jpg',
      },
    ];

    // Example data for testimonials
    const testimonials = [
      {
        id: 4,
        quote: 'Testimonial 1 text.',
        author: 'John Doe',
        image: 'images/testimonials/testimoial1.jpg',
      },
      {
        id: 5,
        quote: 'Testimonial 2 text.',
        author: 'Jane Smith',
        image: 'images/testimonials/testimoial1.jpg',
      },
      {
        id: 6,
        quote: 'Testimonial 3 text.',
        author: 'David Johnson',
        image: 'images/testimonials/testimoial1.jpg',
      },
    ];

    return (
      <>
        <Header isAuthenticated={undefined} />
        <div className="bg-gray-100 min-h-screen">
         

          <main className="max-w-4xl mx-auto py-8">
            <section className="text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome to the Schield Centre</h1>
              <p className="text-lg text-gray-700">Transforming lives through education and empowerment.</p>
              <button className="bg-blue-500 text-white py-2 px-4 mt-6 rounded hover:bg-blue-600">
                Learn More
              </button>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Our Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {programs.map((program) => (
                  <div key={program.id} className="bg-white rounded shadow p-6">
                    <img
                      src={program.image}
                      alt={`Program ${program.id}`}
                      className="w-full h-32 object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold">{program.title}</h3>
                    <p className="text-gray-700">{program.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white rounded shadow p-6">
                      <img
                      src={testimonial.image}
                      alt={`Program ${testimonial.id}`}
                      className="  w-20 h-20 rounded-full object-cover mb-4"
                    />
                    <p className="text-gray-700">{testimonial.quote}</p>
                    <span className="text-gray-500">- {testimonial.author}</span>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;

