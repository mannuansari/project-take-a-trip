import React from "react";
import { FaWhatsapp, FaEnvelope, FaXTwitter, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa6";


function Footer() {
  const socialLinks = [
    { icon: <FaWhatsapp />, link: "https://wa.me/919802345978", title: "WhatsApp", color: "#25D366" },
    { icon: <FaEnvelope />, link: "mailto:allianceideal@gmail.com", title: "Email", color: "#D44638" },
    { icon: <FaXTwitter />, link: "https://x.com/", title: "X / Twitter", color: "#1DA1F2" },
    { icon: <FaFacebook />, link: "https://www.facebook.com/share/18z1aBx5M6/?mibextid=wwXIfr", title: "Facebook", color: "#1877F2" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/take_a_trip06", title: "Instagram", color: "#E1306C" },
    { icon: <FaYoutube />, link: "https://youtube.com/@takeatrip319?si=A3G1KdJl7ZDq2hPi", title: "YouTube", color: "#FF0000" },
  ];

  return (
    <footer className="footer-container">
      {/* ===== Row 1: Company | Products | Tools | Offices ===== */}
      <div className="footer-grid">
        {/* Company */}
        <div className="footer-column">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-ul">
            <li><a href="/About" className="footer-link">Careers</a></li>
            <li><a href="#" className="footer-link">Blog</a></li>
            <li><a href="/Privacy" className="footer-link">Privacy Policy</a></li>
            <li><a href="/Termscondition" className="footer-link">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Products */}
        <div className="footer-column footer-column-bordered">
          <h4 className="footer-heading">Products</h4>
          <ul className="footer-ul">
            <li><a href="#" className="footer-link">Visa</a></li>
          </ul>
        </div>

        {/* Tools */}
        <div className="footer-column">
          <h4 className="footer-heading">Tools</h4>
          <ul className="footer-ul">
            {[
              "Visa Photo Creator",
              "Schengen Cover Letter",
              "Schengen Invitation Letter",
              "Visa Eligibility Quiz",
              "Visa Glossary",
              "UAE Status Checker",
              "Vietnam Status Checker",
              "Passport Mobility Index",
              "Schengen Appointment Checker",
              "DS-160 Tool"
            ].map((tool, index) => (
              <li key={index}><a href="#" className="footer-link">{tool}</a></li>
            ))}
          </ul>
        </div>

        {/* Offices */}
        <div className="footer-column footer-column-bordered-left">
          <h4 className="footer-heading">Offices</h4>
          <address className="footer-address">
            <p>📍 Vansh Tower, Office No.5,<br/>
            1st floor, 3-EC Road, Near Crossroad Mall,<br/>
            Next to Udupi Cafe, Dehradun-248001 (Uttarakhand)</p>
            <p>📍 447 Broadway STE 851, New York, NY, 10013</p>
          </address>
        </div>
      </div>

      {/* ===== Row 2: Social Icons ===== */}
      <div className="footer-social">
        <h4 className="footer-social-heading">Connect With Us</h4>
        <div className="footer-social-icons">
          {socialLinks.map((social, idx) => (
            <a key={idx} href={social.link} target="_blank" rel="noopener noreferrer" title={social.title} style={{ color: social.color }}>
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ===== Row 3: Copyright ===== */}
      <div className="footer-copy">
        <p>© 2025 Alliance Ideal. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
