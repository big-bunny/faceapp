import DefaultLayout from '@/components/DefaultLayout';
import React, { useState, useRef, useEffect } from 'react';

interface GalleryItem {
  id: number;
  type: 'image' | 'video' | 'youtube';
  url: string;
  album: string;
  videoUrl?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: 'image',
    url: '/images/gallery/community/constryction/preprimaryconstruction2020duringcovidclosure/community1.jpg',
    album: 'Covid',
  },
  {
    id: 2,
    type: 'image',
    url: '/images/gallery/community/constryction/preprimaryconstruction2020duringcovidclosure/community2.jpg',
    album: 'Covid',
  },
  {
    id: 3,
    type: 'image',
    url: '/images/gallery/community/constryction/preprimaryconstruction2020duringcovidclosure/community3.jpg',
    album: 'Covid',
  },
  {
    id: 4,
    type: 'image',
    url: '/images/gallery/community/constryction/preprimaryconstruction2020duringcovidclosure/community4.jpg',
    album: 'Covid',
  },
  {
    id: 5,
    type: 'image',
    url: '/images/gallery/community/constryction/preprimaryconstruction2020duringcovidclosure/community5.jpg',
    album: 'Covid',
  },
  {
    id: 1,
    type: 'image',
    url: '/images/gallery/community/constryction/preprimaryconstruction2020duringcovidclosure/social-distance.jpg',
    album: 'Covid',
  },
  {
    id: 7,
    type: 'video',
    url: '/videos/video_thumbnail.jpg',
    album: 'Video Album',
    videoUrl: '/videos/video1.mp4',
  },
  {
    id: 8,
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=rXSXbryBbh8',
    album: 'YouTube Album',
  },
  {
    id: 9,
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=zmTFzMXKHR8',
    album: 'YouTube Album',
  },
  {
    id: 10,
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=ANfUg7aEbPI',
    album: 'YouTube Album',
  },
  {
    id: 11,
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=p3tQDKkvbS8',
    album: 'YouTube Album',
  },
  {
    id: 12,
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=oJyTmc9jdLw',
    album: 'YouTube Album',
  },
  {
    id: 13,
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=Moyyh05Vr7M',
    album: 'YouTube Album',
  },
  {
    id: 14,
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=TO35vEnSns4',
    album: 'YouTube Album',
  },
  
  {
    id: 15,
    type: 'image',
    url: '/images/gallery/community/Fahion show.JPG',
    album: 'Graduation',
  },
  {
    id: 16,
    type: 'image',
    url: '/images/gallery/community/graduation1.JPG',
    album: 'Graduation',
  },
  {
    id: 17,
    type: 'image',
    url: '/images/gallery/community/graduation2.JPG',
    album: 'Graduation',
  },
  {
    id: 18,
    type: 'image',
    url: '/images/gallery/community/graduation3.JPG',
    album: 'Graduation',
  },
  {
    id: 19,
    type: 'image',
    url: '/images/gallery/community/graduation4.JPG',
    album: 'Graduation',
  },
  {
    id: 20,
    type: 'image',
    url: '/images/gallery/community/graduation5.JPG',
    album: 'Graduation',
  },
  {
    id: 21,
    type: 'image',
    url: '/images/gallery/community/graduation6.JPG',
    album: 'Graduation',
  },
  {
    id: 22,
    type: 'image',
    url: '/images/gallery/community/graduation7.JPG',
    album: 'Graduation',
  },
  {
    id: 23,
    type: 'image',
    url: '/images/gallery/community/graduation8.jpg',
    album: 'Graduation',
  },
  {
    id: 24,
    type: 'image',
    url: '/images/gallery/community/graduation9.JPG',
    album: 'Graduation',
  },

  // Add more gallery items as needed
];
const Gallery: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const albums = [...new Set(galleryItems.map((item) => item.album))];

  const openModal = (item: GalleryItem) => {
    setSelectedMedia(item);
  };

  const closeModal = () => {
    setSelectedMedia(null);
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

  const getYoutubeVideoId = (url: string): string => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9\-_]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  return (
    <>
      <DefaultLayout>
        <div className="min-h-screen ">
          <main className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Gallery</h1>

            {albums.map((album) => (
              <section key={album} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{album}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryItems
                    .filter((item) => item.album === album)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded shadow p-6 cursor-pointer hover:shadow-lg transition duration-300"
                        onClick={() => openModal(item)}
                      >
                        {item.type === 'image' && (
                          <img src={item.url} alt={`Image ${item.id}`} className="w-full h-32 object-cover mb-4" />
                        )}
                        {item.type === 'video' && (
                          <div className="relative w-full">
                            <video
                              src={item.videoUrl}
                              controls
                              className="w-full h-auto"
                            >
                              Sorry, your browser doesn't support embedded videos.
                            </video>
                          </div>
                        )}
                        {item.type === 'youtube' && (
                          <div className="relative w-full">
                            <iframe
                              src={`https://www.youtube.com/embed/${getYoutubeVideoId(item.url)}`}
                              title="YouTube Video"
                              className="w-full h-auto"
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

        {selectedMedia && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={closeModal}>
            <div ref={modalRef} className="max-w-2xl bg-white rounded-lg p-4">
              {selectedMedia.type === 'image' && (
                <img src={selectedMedia.url} alt="Full-size Image" className="w-full h-auto" />
              )}
              {selectedMedia.type === 'video' && (
                <div className="relative w-full">
                  <video
                    src={selectedMedia.videoUrl}
                    controls
                    className="w-full h-auto"
                  >
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                </div>
              )}
              {selectedMedia.type === 'youtube' && (
                <div className="relative w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(selectedMedia.url)}`}
                    title="YouTube Video"
                    className="w-full h-auto"
                    allowFullScreen
                  ></iframe>
                </div>
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



