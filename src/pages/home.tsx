import DefaultLayout from '@/components/DefaultLayout';
import React, { useState } from 'react';
import Image from 'next/image';

const Home = () => {
  const news = [
    {
      id: 1,
      title: '2023 FEB NEWSLETTER',
      pdf: '/pdf/news/news1.pdf',
      preview: '/pdf/news/news1.pdf',
    },
  
    {
      id: 3,
      title: 'News Article 2020',
      image: '/images/news/news2.jpg',
      ref: 'https://www.albanyadvertiser.com.au/news/albany-advertiser/local-couple-want-albany-people-to-dig-deep-for-kenyan-school-at-this-months-garden-fundraiser-ng-b881706536z',
    },
    {
      id: 7,
      title: 'News Article DEC 2022',
      image: '/images/news/news3.jpg',
      ref: 'https://www.albanyadvertiser.com.au/news/albany-advertiser/kenya-school-supported-by-albany-community-bouncing-back-after-the-affects-of-the-covid-pandemic-c-9185041',
    },
    {
      id: 8,
      title: 'News Article DEC 2022',
      image: '/images/news/news4.JPG',
      ref: 'https://www.albanyadvertiser.com.au/news/albany-advertiser/kenya-school-supported-by-albany-community-bouncing-back-after-the-affects-of-the-covid-pandemic-c-9185041',
    },
  ];

  const testimonials = [
    {
      id: 4,
      quote: 'Testimonial 1 text.',
      author: 'John Doe',
      image: '/images/testimonials/testimonial1.jpg',
    },
    {
      id: 5,
      quote: 'Testimonial 2 text.',
      author: 'Jane Smith',
      image: '/images/testimonials/testimonial2.jpg',
    },
    {
      id: 6,
      quote: 'Testimonial 3 text.',
      author: 'David Johnson',
      image: '/images/testimonials/testimonial3.jpg',
    },
  ];

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openPdfModal = (pdf) => {
    setSelectedPdf(pdf);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeModals = () => {
    setSelectedPdf(null);
    setSelectedImage(null);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => {
      if (prevZoom > 0.2) {
        return prevZoom - 0.1;
      }
      return prevZoom;
    });
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen">
        <main className="max-w-4xl mx-auto py-8">
          <section className="text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to the Schield Centre</h1>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl align-self-lg-center font-bold mb-4">News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <div key={item.id} className="bg-white shadow-lg rounded-lg p-6">
                  {item.pdf ? (
                    <div>
                      <div className="mb-2">
                        {item.preview && (
                          <iframe
                            src={item.preview}
                            alt={item.title}
                            className="rounded-md w-full cursor-pointer"
                            onClick={() => openPdfModal(item.pdf)}
                          />
                        )}
                      </div>
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => openPdfModal(item.pdf)}
                      >
                        {item.title}
                      </button>
                    </div>
                  ) : (
                    <a
                      href={item.ref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {item.title}
                    </a>
                  )}
                  {item.image && (
                    <div className="mt-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="rounded-md w-full cursor-pointer"
                        onClick={() => openImageModal(item.image)}
                        width={400}
                        height={300}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl align-self-lg-center font-bold mb-4">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((item) => (
                <div key={item.id} className="bg-white shadow-lg rounded-lg p-6">
                  <p>{item.quote}</p>
                  <div className="flex items-center mt-4">
                    <Image
                      src={item.image}
                      alt={item.author}
                      className="rounded-full w-12 h-12 object-cover mr-4"
                      width={48}
                      height={48}
                    />
                    <div>
                      <p className="font-bold">{item.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PDF Modal */}
          {selectedPdf && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
              onClick={closeModals}
            >
              <div className="bg-white rounded-lg p-4 w-full max-w-4xl mx-auto">
                <embed src={selectedPdf} type="application/pdf" width="100%" height="600px" />
              </div>
            </div>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
              onClick={closeModals}
            >
              <div className="bg-white rounded-lg p-4 w-full max-w-4xl mx-auto">
                {/* Render the image content here */}
                <Image
                  src={selectedImage}
                  alt="Selected Image"
                  className="w-full"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </DefaultLayout>
  );
};

export default Home;
