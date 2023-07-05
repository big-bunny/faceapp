import { useMemo, useState, useEffect } from 'react';
import DefaultLayout from '@/components/DefaultLayout';

const AboutPage = () => {
  const carouselData = useMemo(
    () => [
      {
        title: 'Students and Principal',
        image: 'images/sliders/slide-1.jpg',
        text:
          'At Schield Center, we strive to create a nurturing learning environment that values diversity and inclusivity. We believe that education is not just about acquiring knowledge and skills, but also about developing critical thinking, creativity, and a passion for lifelong learning.',
      },
      {
        title: 'Trophy',
        image: 'images/sliders/slide-2.jpg',
        text:
          'Our mission is to empower children to face the challenges and opportunities of the 21st century by providing a well-rounded education that includes academic, social, and emotional development. We aim to cultivate a culture of curiosity, inquiry, and collaboration that prepares our students to be responsible global citizens.',
      },
      {
        title: 'Students and Principal 2',
        image: 'images/sliders/slide-3.jpg',
        text:
          'Through our work, we hope to inspire a new generation of children who are confident, resilient, and empowered to pursue their dreams and make a positive impact in the world.',
      },
      {
        title: 'Students and Principal 3',
        image: 'images/sliders/slide-4.jpg',
        text:
          'At Schield Center, we are committed to providing quality education to every child, regardless of their background or financial situation. However, many children in Kajiado face significant barriers to education, including poverty, limited access to schools, and cultural beliefs that prioritize traditional practices over formal education.',
      },
      {
        title: 'Students and Principal 4',
        image: 'images/sliders/slide-5.jpg',
        text:
          'To overcome these challenges, Schield Center relies on the generous support of sponsors who share our vision and values. With their help, we are able to provide scholarships, uniforms, books, and other school supplies to hundreds of children each year. We also work closely with local schools and communities to identify the most vulnerable children and provide them with the resources they need to thrive.',
      },
    ],
    []
  );

  const [currentCarousel, setCurrentCarousel] = useState(carouselData[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCurrentCarousel(carouselData[i]);
      i = (i + 1) % carouselData.length;
    }, 45000);

    return () => clearInterval(interval);
  }, [carouselData]);

  return (
    <>
      <DefaultLayout>
        <div id="about" className="mt-20 rounded-lg text-gray-700 my-8">
          <div className="container mx-auto px-8 py-10">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-2/3 flex">
                <header
                  className="min-h-screen bg-fixed rounded-lg bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: `url('${currentCarousel.image}')` }}
                >
                  <div className="bg-green-500 bg-opacity-25 px-4 py-8 md:px-12 rounded-3xl shadow-md border border-red-500">
                    <div className="text-2xl text-black font-bold leading-relaxed">
                      <p>{currentCarousel.text}</p>
                    </div>
                  </div>
                </header>
              </div>

              <div className="w-full lg:w-1/3 px-4 py-8 lg:py-0">
                <div className="text-3xl text-green-500 text-center py-10">
                  <p>
                    Schield Center is a school located in Kajiado, officially established in 2008 by Patricia Schield,
                    an American woman who made a courageous decision. Patricia sold everything she owned and utilized her
                    inheritance to initiate the school. Tragically, Patricia passed away in 2008 before witnessing her dreams
                    come to fruition. Feeling like she had failed, Patricia&apos;s dying wish to Joseph Mboya was to establish the
                    school through trustees and fundraising efforts.
                  </p>
                </div>

                <div className="text-center py-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    type="button"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default AboutPage;
