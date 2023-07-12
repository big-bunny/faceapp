import React, { useState } from 'react';
import Image from 'next/image';
import DefaultLayout from '@/components/DefaultLayout';

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
      quote: 'I am grateful for the generous donation that has provided me with the opportunity to receive a quality education. It has changed my life and opened doors to a brighter future. Thank you!',
      author: 'Jane, Grade 8',
      image: '/images/testimonials/testimoial1.jpg',
    },
    {
      id: 5,
      quote: 'Thanks to the sponsorship, I have access to music lessons that allow me to pursue my passion for music. It has given me confidence and a sense of purpose. I am incredibly thankful!',
      author: 'John, Grade 6',
      image: '/images/testimonials/testimonial2.jpg',
    },
    {
      id: 6,
      quote: 'I want to express my gratitude for the support I have received. It has enabled me to participate in athletic competitions and develop my skills. Your sponsorship has made a significant impact on my life!',
      author: 'Sarah, Grade 9',
      image: '/images/testimonials/testimonial4.jpg',
    },
  ];
  
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openPdfModal = (pdf: string) => {
    setSelectedPdf(pdf);
  };

  const openImageModal = (image: string) => {
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
            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-500 rounded-full">Welcome to the Schield Centre</h1>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {news.map((item) => (
                <div key={item.id} className="bg-white shadow-lg rounded-lg p-6">
                  {item.pdf ? (
                    <div>
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => openPdfModal(item.pdf)}
                      >
                        {item.title}
                      </button>
                      <div className="mb-0">
                        {item.preview && (
                         <object
                         data={item.preview}
                         type="application/pdf"
                         width="100%"
                         height="275px"
                         onClick={() => openPdfModal(item.pdf)}
                       >
                         <p>PDF cannot be displayed</p>
                       </object>
                        )}
                      </div>
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
            <h2 className="text-3xl font-extrabold text-white mb-4">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((item) => (
                <div key={item.id} className="backdrop-blur-2xl shadow-lg rounded-lg p-6">
                  <Image
                      src={item.image}
                      alt={item.author}
                      className="rounded-full w-12 h-12 object-cover mr-4"
                      width={48}
                      height={48}
                    /> 
                    <div>
                      <p className="font-bold text-2xl text-green-300">{item.author}</p>
                    </div> 
                    <p className="font-bold text-xl text-gray-300">{item.quote}</p>
                  <div className="flex items-center mt-4">
                   
                   
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
