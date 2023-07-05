import React, { useEffect, useState } from 'react';

interface WindowWithPayPal extends Window {
  PayPal?: {
    Donation?: {
      Button?: any; // Adjust the type if you have specific typings for the PayPal Donation Button
    };
  };
}

const DonateButton: React.FC = () => {
  const [isButtonRendered, setIsButtonRendered] = useState(false);

  useEffect(() => {
    if (!isButtonRendered) {
      const script = document.createElement('script');
      script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';
      script.charset = 'UTF-8';
      script.async = true;

      script.onload = () => {
        const PayPal = (window as WindowWithPayPal).PayPal?.Donation?.Button;
        if (PayPal) {
          PayPal({
            env: 'production',
            hosted_button_id: 'WMBKQ9WVGWCXL',
            image: {
              src: 'https://pics.paypal.com/00/s/NWEzNmQ0NjktYTRmNy00YTZiLTkzMWYtMTU2MDU3MDQyNTYw/file.PNG',
              alt: 'Donate with PayPal button',
              title: 'PayPal - The safer, easier way to pay online!',
            },
          })?.render('#donate-button');
        }
      };

      document.getElementById('donate-button-container')?.appendChild(script);

      setIsButtonRendered(true);
    }
  }, [isButtonRendered]);

  return (
    <div id="donate-button-container">
      {isButtonRendered ? <div id="donate-button"></div> : null}
    </div>
  );
};

export default DonateButton;
