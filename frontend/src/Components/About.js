import React from "react";
import "../App.css"; // Make sure to include this if you have global styles

function About() {
  return (
    <div className="about-container">
      {/* Introduction Section */}
      <div className="take-a-trip-container text-center px-3 py-5">
        <h2 className="about-heading">
          Welcome to <span className="highlight">TAKE A TRIP</span>
        </h2>
        <p className="lead-text">
          Welcome to <strong>TAKE A TRIP</strong>, where every journey begins with a commitment to empower
          travelers through easy and instant bookings, providing an array of comprehensive choices. Our story,
          cultivated from a single idea, has evolved into a pioneering force in India’s online travel space.
          We are <strong>Go standard by IATA</strong>.
        </p>

        <p className="about-paragraph">
          In 2016, <strong>IDEAL MIGRATE ALLIANCE PRIVATE LIMITED</strong> was founded by 
          <strong> Aadesh Srivastav</strong> and <strong>Late Shri Dinesh Srivastav</strong> – seamlessly connecting
          travelers to best-value products and services. Initially serving the US–India travel market, our journey
          was fueled by robust technology and unwavering customer support.
        </p>

        <div className="image-container my-4">
          <img
            src="https://c0.wallpaperflare.com/preview/587/135/765/map-travel-travel-map-explore-thumbnail.jpg"
            alt="World Map"
            className="world-map img-fluid shadow-sm rounded"
          />
        </div>

        <p className="about-paragraph">
          After consolidating its position as a customer-first brand, <strong>TAKE A TRIP</strong> launched in India in 2016.
          The surge of low-cost flights prompted us to provide online travel solutions, making booking easier and faster.
        </p>

        <p className="about-paragraph">
          We continually innovate with features for booking flights, hotels, and packages. Partnerships with leading
          brands in aviation, hospitality, and homestays have diversified our offerings.
        </p>
      </div>

      {/* Expansion and Growth */}
      <div className="take-a-trip-container px-3 py-5 bg-light">
        <section className="intro-section mb-4">
          <p>
            Our journey doesn’t stop at flights and hotels. We ventured into ground transport, offering hassle-free
            booking services for cabs, buses, and trains. Features like <strong>my Biz</strong> and <strong>my Partner</strong>
            showcase our commitment to diverse travel needs.
          </p>
          <p>
            Our story isn’t confined to India. <strong>TAKE A TRIP</strong> expanded to the Gulf market,
            providing exciting deals for flights and hotels internationally.
          </p>
          <p>
            We continue to innovate and evolve, providing unparalleled travel experiences and building trust
            with millions of travelers worldwide.
          </p>
        </section>

        <section className="why-section mb-4">
          <h2 className="about-heading text-center mb-3">Why Take A Trip?</h2>
          <ol className="why-list px-3">
            <li>
              <strong>Freedom to Explore:</strong> Enjoy the freedom to create your own adventure, tailoring every
              aspect of your trip to suit your preferences.
            </li>
            <li>
              <strong>Reliable Information:</strong> Access accurate and up-to-date details about destinations,
              activities, and accommodations to make informed travel decisions.
            </li>
            <li>
              <strong>Customer-Centric Approach:</strong> Your satisfaction is our priority. Our support team ensures
              smooth and enjoyable experiences from start to finish.
            </li>
          </ol>
        </section>

        <section className="closing-section text-center">
          <p>
            ‘Take A Trip’ is more than a website; it’s your travel companion. Your next adventure is a click away – join
            us and <strong>let’s take a trip together!</strong>
          </p>
        </section>
      </div>

      {/* Certificates Section */}
      <div className="certificates-section d-flex justify-content-center flex-wrap gap-4 py-5 bg-white">
        <img
          src="/Videoes/images/certificate.jpg"
          alt="Certificate"
          className="certificate-img shadow-sm rounded"
        />
        <img
          src="/Videoes/images/certificate2.jpg"
          alt="Certificate"
          className="certificate-img shadow-sm rounded"
        />
      </div>

      {/* Styles */}
      <style jsx>{`
        .about-heading {
          font-size: 2rem;
          font-weight: 700;
          text-decoration: underline #0d6efd;
          text-underline-offset: 8px;
          text-align: center;
          margin-bottom: 1rem;
        }

        .highlight {
          color: #0d6efd;
        }

        .lead-text {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .about-paragraph {
          margin-bottom: 1rem;
          line-height: 1.7;
        }

        .image-container {
          display: flex;
          justify-content: center;
        }

        .world-map {
          max-width: 600px;
          width: 100%;
        }

        .why-list {
          list-style-type: decimal;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .certificates-section .certificate-img {
          max-width: 300px;
          width: 100%;
          height: auto;
        }

        @media (max-width: 768px) {
          .about-heading {
            font-size: 1.6rem;
          }
          .why-list {
            padding-left: 1rem;
          }
          .certificates-section {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

export default About;
