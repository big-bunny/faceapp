import React, { useEffect } from 'react';

const DonateButton: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';
    script.charset = 'UTF-8';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.PayPal && window.PayPal.Donation && window.PayPal.Donation.Button) {
      window.PayPal.Donation.Button({
        env: 'production',
        hosted_button_id: 'WMBKQ9WVGWCXL',
        image: {
          src: 'https://pics.paypal.com/00/s/ZjkzMzc2ZTItN2I4ZC00NzJmLTkzN2MtMjIzNTBlMTQ4MDdm/file.PNG',
          alt: 'Donate with PayPal button',
          title: 'PayPal - The safer, easier way to pay online!',
        },
      }).render('#donate-button');
    }
  }, []);

  return <div id="donate-button" />;
};

export default DonateButton;
