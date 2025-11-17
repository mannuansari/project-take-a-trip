import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      
      <p className="privacy-text">
        <strong>TAKE A TRIP</strong> is dedicated to protecting the privacy of users visiting our website, 
        <a href="http://www.takeatrips.co/" target="_blank" rel="noopener noreferrer"> www.takeatrips.co</a>. 
        This Privacy Policy explains how we collect, use, and safeguard your personal information. Content or services from external links are not governed by this policy, so we recommend reviewing the privacy practices of those websites.
      </p>

      <h2 className="privacy-subtitle">Privacy Policy Commitment</h2>
      <p className="privacy-text">
        While information is essential to providing exceptional service, the trust of our clients is our top priority. At TAKE A TRIP, we commit to:
      </p>
      <ol className="privacy-list">
        <li><strong>Security & Confidentiality:</strong> Strict standards for safeguarding customer information.</li>
        <li><strong>Limited Collection & Use:</strong> Collect only necessary information to deliver services effectively.</li>
        <li><strong>Authorized Access:</strong> Only trained employees can access data; violations have consequences.</li>
        <li><strong>Non-Disclosure:</strong> Information is shared externally only with consent, legal requirement, or agreements.</li>
        <li><strong>Control over Confidentiality:</strong> Customer consent is obtained when sharing with trusted partners.</li>
        <li><strong>Support Service Compliance:</strong> Partners follow our privacy standards and are audited regularly.</li>
        <li><strong>Complete & Accurate Records:</strong> We maintain updated and accurate customer records for convenience.</li>
      </ol>

      <h2 className="privacy-subtitle">Information We Collect</h2>
      <p className="privacy-text"><strong>General:</strong></p>
      <ul className="privacy-list">
        <li>Personally identifiable information (name, address, phone, email, computer info) collected during registration.</li>
        <li>We do not knowingly collect data from children under 13. Users under 18 require parental consent.</li>
      </ul>

      <p className="privacy-text"><strong>Website Usage Information:</strong></p>
      <ul className="privacy-list">
        <li>Automatically collected IP addresses and usage data for visitor behavior analysis.</li>
      </ul>

      <h2 className="privacy-subtitle">How We Use Information</h2>
      <ul className="privacy-list">
        <li>Fulfill purposes for which information was provided.</li>
        <li>Send notifications about products, services, or special offers.</li>
        <li>Enhance features and develop new services.</li>
        <li>Personalize content and advertising.</li>
      </ul>

      <h2 className="privacy-subtitle">Cookies</h2>
      <p className="privacy-text">
        Cookies improve navigation and user experience. Cookies are stored on your device when you sign in or use key features.
      </p>

      <h2 className="privacy-subtitle">Security</h2>
      <p className="privacy-text">
        Personally identifiable information is stored on limited access servers, safeguarded to protect against unauthorized access.
      </p>

      <h2 className="privacy-subtitle">Internet-based Transfers</h2>
      <p className="privacy-text">
        By using our website, you acknowledge and consent to international transmission of data across borders.
      </p>

      <h2 className="privacy-subtitle">Policy Modifications</h2>
      <p className="privacy-text">
        This policy may be updated, and changes will be posted on the website. Previously collected data will not be misused without consent.
      </p>

      <h2 className="privacy-subtitle">Comments and Questions</h2>
      <p className="privacy-text">
        For questions or concerns about our Privacy Policy, please contact us.
      </p>

      {/* Inline Styling for Responsiveness */}
      <style jsx>{`
        .privacy-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Arial', sans-serif;
          line-height: 1.7;
          color: #333;
        }

        .privacy-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 20px;
          text-decoration: underline #0d6efd;
          text-underline-offset: 8px;
        }

        .privacy-subtitle {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 30px;
          margin-bottom: 10px;
          color: #0d6efd;
        }

        .privacy-text {
          margin-bottom: 15px;
        }

        .privacy-list {
          margin-left: 20px;
          margin-bottom: 20px;
        }

        .privacy-list li {
          margin-bottom: 10px;
        }

        a {
          color: #0d6efd;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .privacy-container {
            padding: 15px;
            margin: 20px auto;
          }

          .privacy-title {
            font-size: 2rem;
          }

          .privacy-subtitle {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
