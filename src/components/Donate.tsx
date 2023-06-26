import React, { useEffect, useState } from 'react';

const DonateButton: React.FC = () => {
  // State to track whether the button is rendered
  const [isButtonRendered, setIsButtonRendered] = useState(false);

  useEffect(() => {
    // Check if the button is not already rendered
    if (!isButtonRendered) {
      // Create a new script element
      const script = document.createElement('script');
      script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';
      script.charset = 'UTF-8';
      script.async = true;

      // Script onload event handler
      script.onload = () => {
        if (window.PayPal && window.PayPal.Donation && window.PayPal.Donation.Button) {
          // Render the PayPal donation button
          window.PayPal.Donation.Button({
            env: 'production',
            hosted_button_id: 'WMBKQ9WVGWCXL',
            image: {
              src: 'https://pics.paypal.com/00/s/NWEzNmQ0NjktYTRmNy00YTZiLTkzMWYtMTU2MDU3MDQyNTYw/file.PNG',
              alt: 'Donate with PayPal button',
              title: 'PayPal - The safer, easier way to pay online!',
            },
          }).render('#donate-button');
        }
      };

      // Append the script to the donate-button-container element
      document.getElementById('donate-button-container')?.appendChild(script);

      // Set the button rendered state to true
      setIsButtonRendered(true);
    }
  }, []);

  return (
    <div id="donate-button-container">
      {/* Render the donate-button div if the button is rendered */}
      {isButtonRendered ? <div id="donate-button"></div> : null}
    </div>
  );
};

export default DonateButton;

