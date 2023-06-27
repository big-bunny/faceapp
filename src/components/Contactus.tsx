import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarker, faComments } from '@fortawesome/free-solid-svg-icons';
import { faComments as farComments } from '@fortawesome/free-solid-svg-icons';

const ContactSection: React.FC = () => {
  useEffect(() => {
    // Load the script for the live chat button
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.setAttribute('data-use-service-core', 'true');
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  const contactInfo = [
    {
      title: 'Phone',
      icon: faPhone,
      address: '+254110883547',
    },
    {
      title: 'E-mail',
      icon: faEnvelope,
      address: 'schieldcenter@gmail.com',
    },
    {
      title: 'Address',
      icon: faMapMarker,
      address: 'Noosolian Namannga-Highway',
    },
  ];

  return (
    <section id="contact" className="container rounded-full py-20">
      {/* Navigation bar for the contact section */}
      <nav className="md:w-2/3 bg-gradient-to-r from-accent to-white  backdrop-blur-3xl rounded-xl shadow-md mx-auto">
        <nav className="flex justify-evenly bg-right bg-no-repeat bg-contain text-primary">
          <div className="flex justify-between items-center w-full p-8 md:p-12">
            <div className="flex flex-column items-center h-full">
              {/* Title for the contact section */}
              <div>
                <h2 className="text-xl font-bold font-bolder pb-8">Contact Us!</h2>

                {/* Displaying the contact information */}
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex font-medium pb-4">
                    <FontAwesomeIcon icon={info.icon} className="mr-4" />
                    {info.address}
                  </div>
                ))}
              </div>
            </div>

            {/* Icon for the contact section */}
            <div className="text-secondary">
              <FontAwesomeIcon icon={farComments} className="fa-10x hidden lg:inline" />
            </div>
          </div>
        </nav>
      </nav>

      {/* Live chat button using Elfsight Widget */}
      <div className="elfsight-app-96263e89-f948-418d-97c0-2374ce49da17"></div>
    </section>
  );
};

export default ContactSection;
