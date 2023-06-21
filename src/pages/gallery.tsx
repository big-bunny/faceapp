import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { Component, useState, useRef, useEffect } from 'react';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  album: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: 'image',
    url: '/images/gallery/150775132_3458967564230842_4208870214561631053_n.jpg',
    album: 'Album 1',
  },
  {
    id: 2,
    type: 'image',
    url: '/images/gallery/150775132_3458967564230842_4208870214561631053_n.jpg',
    album: 'Album 1',
  },
  {
    id: 3,
    type: 'image',
    url: '/images/gallery/150775132_3458967564230842_4208870214561631053_n.jpg',
    album: 'Album 1',
  },
  {
    id: 4,
    type: 'image',
    url: '/images/gallery/160371107_3532267930234138_1658256621100914370_n.jpg',
    album: 'Album 2',
  },
  {
    id: 5,
    type: 'image',
    url: '/images/gallery/160371107_3532267930234138_1658256621100914370_n.jpg',
    album: 'Album 2',
  }, {
    id: 6,
    type: 'image',
    url: '/images/gallery/160371107_3532267930234138_1658256621100914370_n.jpg',
    album: 'Album 2',
  },
  {
    id: 7,
    type: 'video',
    url: '/path/to/album2/video1.mp4',
    album: 'Vedios',
  }, {
    id: 8,
    type: 'video',
    url: '/path/to/album2/video1.mp4',
    album: 'Vedios',
  }, {
    id: 9,
    type: 'video',
    url: '/path/to/album2/video1.mp4',
    album: 'Vedios',
  }, {
    id: 10,
    type: 'video',
    url: '/path/to/album2/video1.mp4',
    album: 'Vedios',
  },
  // Add more gallery items as needed
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Get unique album names
  const albums = [...new Set(galleryItems.map((item) => item.album))];

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header isAuthenticated={undefined} />
      <div className="bg-gray-100 min-h-screen">
        <main className="max-w-4xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">Gallery</h1>

          {/* Render albums */}
          {albums.map((album) => (
            <section key={album} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{album}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Filter items based on the current album */}
                {galleryItems
                  .filter((item) => item.album === album)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded shadow p-6 cursor-pointer"
                      onClick={() => openModal(item.url)}
                    >
                      {item.type === 'image' && (
                        <img src={item.url} alt={`Image ${item.id}`} className="w-full h-32 object-cover mb-4" />
                      )}
                      {item.type === 'video' && (
                        <video src={item.url} controls className="w-full h-32 object-cover mb-4">
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </main>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div ref={modalRef} className="max-w-2xl bg-white rounded-lg p-4">
            <img src={selectedImage} alt="Full-size Image" className="w-full h-auto" />
            <button
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Gallery;

