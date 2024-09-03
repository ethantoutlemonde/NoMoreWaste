import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from 'react-i18next';
import "../../css/home.css";
import ReceiptPDF from './ReceiptPDF';
import homepageImage from '../../assets/img/homepage.png';

const stripePromise = loadStripe('pk_test_oKhSR5nslBRnBZpjO6KuzZeX');

const DonationComponent = () => {
  const { t } = useTranslation(); // Utilisation de useTranslation pour accéder aux traductions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(1000); 
  const [showReceipt, setShowReceipt] = useState(false); 

  const stripe = useStripe();
  const elements = useElements();

  const handleSliderChange = (event) => {
    setAmount(parseInt(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!elements) {
      setError(t("stripe_elements_not_available")); // Utilisation de t pour la traduction
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      setSuccess(false);
    } else {
      setSuccess(true);
      setError(null);
    }
  };

  const handleDownloadReceipt = () => {
    setShowReceipt(true);
  };

  const handleReceiptClose = () => {
    setShowReceipt(false);
  };

  return (
    <>
      <div className="bg-cover bg-center h-screen" style={{backgroundImage: `url(${homepageImage})`}}>
        <div className="flex justify-center items-center h-full">
          <div className="w-full md:w-1/2 p-20 max-h-full bg-white bg-opacity-80 rounded-lg">
            <h2 className="text-center text-3xl text-black mb-6">{t("donate")}</h2>
            <form onSubmit={handleSubmit} className="text-black">
              <CardNumberElement className="bg-white border border-black rounded-lg p-2.5 mb-4" />
              <CardExpiryElement className="bg-white border border-black rounded-lg p-2.5 mb-4" />
              <CardCvcElement className="bg-white border border-black rounded-lg p-2.5 mb-4" />
              <input
                type="text"
                name="postal_code"
                placeholder={t("Postal code")}
                className="bg-white border border-black rounded-lg p-2.5 mb-4 w-full"
                required
              />
              <div className="flex items-center">
                <input
                  type="range"
                  value={amount}
                  min="1"
                  max="1500"
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-black-200 rounded-lg appearance-none cursor-pointer mb-4 mr-2"
                />
                <span className="text-sm text-gray-500 text-black">{amount}</span>
              </div>
              <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                {loading ? t("Processing...") : t("Pay")} {/* Traduction de "Processing..." et "Pay" */}
              </button>
            </form>
            {success && (
              <>
                <button onClick={handleDownloadReceipt} className="mt-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                  {t("Download Receipt")} {/* Traduction de "Download Receipt" */}
                </button>
              </>
            )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </div>
        </div>
      </div>
      {showReceipt && <ReceiptPDF amount={amount} onClose={handleReceiptClose} />} {/* Passer le montant et la fonction de fermeture */}
    </>
  );
};

export default DonationComponent;
