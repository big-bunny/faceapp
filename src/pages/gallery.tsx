import DefaultLayout from '@/components/DefaultLayout';
import React, { useState, useRef, useEffect } from 'react';

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
    url: 'https://www.youtube.com/watch?v=TO35vEnSns4',
    album: 'Videos',
  },
  {
    id: 8,
    type: 'video',
    url: 'https://www.youtube.com/watch?v=Moyyh05Vr7M',
    album: 'Videos',
  },
  {
    id: 9,
    type: 'video',
    url: 'https://www.youtube.com/watch?v=oJyTmc9jdLw',
    album: 'Videos',
  },
  {
    id: 10,
    type: 'video',
    url: 'https://www.youtube.com/watch?v=p3tQDKkvbS8',
    album: 'Videos',
  },
  {
    id: 11,
    type: 'video',
    url: 'https://www.youtube.com/watch?v=ANfUg7aEbPI',
    album: 'Videos',
  },
  {
    id: 12,
    type: 'video',
    url: 'https://www.youtube.com/watch?v=rXSXbryBbh8',
    album: 'Videos',
  },
  {
    id: 13,
    type: 'video',
    url: 'https://www.youtube.com/watch?v=zmTFzMXKHR8',
    album: 'Videos',
  },
  {
    id: 14,
    type: 'video',
    url: '',
    album: 'Videos',
  },
  {
  id: 15,
  type: 'video',
  url: '/vedios/vedio1.mp4',
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
      <DefaultLayout>
        <div className=" min-h-screen">
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
                        className="bg-gray-200 rounded shadow p-6 cursor-pointer"
                        onClick={() => openModal(item.url)}
                      >
                        {item.type === 'image' && (
                          <img src={item.url} alt={`Image ${item.id}`} className="w-full h-32 object-cover mb-4" />
                        )}
                        {item.type === 'video' && (
                          <div className="relative w-full h-32 mb-4">
                            <iframe
                              width="100%"
                              height="100%"
                              src={item.url.replace('watch?v=', 'embed/')}
                              title={`Video ${item.id}`}
                              frameBorder="0"
                              allowFullScreen
                            ></iframe>
                          </div>
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
              {selectedImage.includes('youtube.com') ? (
                <div className="relative pb-0" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedImage.replace('watch?v=', 'embed/')}
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              ) : (
                <img src={selectedImage} alt="Full-size Image" className="w-full h-auto" />
              )}
              <button
                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </DefaultLayout>
    </>
  );
};

export default Gallery;
