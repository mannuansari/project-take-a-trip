import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>

      <p className="terms-text">Welcome to <strong>TAKE A TRIP</strong>!</p>

      <p className="terms-text">
        These terms and conditions outline the rules and regulations for using <strong>TAKE A TRIP</strong>'s Website, located at 
        <a href="http://www.takeatrips.co/" target="_blank" rel="noopener noreferrer"> www.takeatrips.co</a>.
      </p>

      <p className="terms-text">
        By accessing this website, you accept these terms and conditions. Do not continue to use TAKE A TRIP if you do not agree to all the terms stated on this page.
      </p>

      <p className="terms-text">
        The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer Notice: "Client", "You", and "Your" refers to you, the user. "Company", "We", "Us", and "Our" refers to TAKE A TRIP. "Party" or "Parties" refers to both the Client and the Company.
      </p>

      <h2 className="terms-subtitle">Cookies</h2>
      <p className="terms-text">
        We use cookies to improve user experience. By using TAKE A TRIP, you consent to cookies in accordance with our Privacy Policy.
      </p>
      <p className="terms-text">
        Cookies help retrieve user details for each visit and enable certain website functionalities. Some affiliate/advertising partners may also use cookies.
      </p>

      <h2 className="terms-subtitle">License</h2>
      <p className="terms-text">
        Unless otherwise stated, TAKE A TRIP and/or its licensors own all intellectual property rights for content on this website. All rights are reserved. You may access the content for personal use only, subject to restrictions.
      </p>

      <p className="terms-text">You must not:</p>
      <ul className="terms-list">
        <li>Republish material from TAKE A TRIP</li>
        <li>Sell, rent, or sub-license content from TAKE A TRIP</li>
        <li>Reproduce, duplicate, or copy content from TAKE A TRIP</li>
        <li>Redistribute content from TAKE A TRIP</li>
      </ul>

      <h2 className="terms-subtitle">User Comments</h2>
      <p className="terms-text">
        Certain areas of the website allow users to post and exchange opinions and information. TAKE A TRIP does not filter, edit, publish, or review Comments before they appear. Comments reflect the views of the user and not TAKE A TRIP.
      </p>
      <p className="terms-text">
        TAKE A TRIP reserves the right to monitor all Comments and remove any deemed inappropriate, offensive, or in breach of these Terms and Conditions.
      </p>

      {/* Responsive styling */}
      <style jsx>{`
        .terms-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Arial', sans-serif;
          line-height: 1.7;
          color: #333;
        }

        .terms-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 25px;
          text-decoration: underline #0d6efd;
          text-underline-offset: 8px;
        }

        .terms-subtitle {
          font-size: 1.5rem;
          font-weight: 600;
          color: #0d6efd;
          margin-top: 30px;
          margin-bottom: 10px;
        }

        .terms-text {
          margin-bottom: 15px;
        }

        .terms-list {
          margin-left: 20px;
          margin-bottom: 20px;
        }

        .terms-list li {
          margin-bottom: 8px;
        }

        a {
          color: #0d6efd;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .terms-container {
            padding: 15px;
            margin: 20px auto;
          }

          .terms-title {
            font-size: 2rem;
          }

          .terms-subtitle {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;
