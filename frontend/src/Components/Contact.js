import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked!", formData); // debug

    fetch("http://localhost:3001/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          setFormData({ name: "", email: "", phone: "", message: "" });
          setSubmitted(true);
        } else {
          alert("❌ Failed to send message. Try again.");
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  return (
    <div className="contact-page container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Contact Us</h1>
        <p className="text-muted mt-3">
          Have questions or need travel assistance? Reach out to us and we’ll help you plan your perfect trip!
        </p>
      </div>

      <div className="row g-4">
        {/* LEFT: Contact Info */}
        <div className="col-lg-4 col-md-5 col-12">
          <div className="contact-info p-4 bg-light rounded shadow-sm h-100">
            <h3 className="mb-4">Get in Touch</h3>
            <p><FaMapMarkerAlt className="me-2 text-primary" />Vansh Tower Office No.5, EC ROAD</p>
            <p><FaPhoneAlt className="me-2 text-primary" />7505574128</p>
            <p><FaPhoneAlt className="me-2 text-primary" />9802345978</p>
            <p><FaEnvelope className="me-2 text-primary" />allianceideal@gmail.com</p>
            <h5 className="mt-4">Office Hours</h5>
            <p className="mb-1">Mon - Fri: 10:00 AM - 5:00 PM</p>
            <p>Sat - Sun: 10:00 AM - 4:00 PM</p>
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="col-lg-8 col-md-7 col-12">
          <div className="contact-form p-4 bg-white rounded shadow-sm h-100">
            <h3 className="mb-4">Send Us a Message</h3>
            {submitted && <div className="alert alert-success">✅ Thank you! Your message has been sent.</div>}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    onClick={handleSubmit} // ensures click triggers submit
                  >
                    <FaPaperPlane className="me-2" /> Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="map-container mt-5 rounded shadow-sm" style={{ height: "400px", overflow: "hidden", border: "2px solid #eaeaea" }}>
        <iframe
          title="Travel Office Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.123456789!2d105.841234!3d21.028567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab0b2b5c6c23%3A0x123456789abcdef!2sVansh%20Tower%2C%202nd%20Floor%2C%20Udapi%20Cafe!5e0!3m2!1sen!2s!4v1696000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
