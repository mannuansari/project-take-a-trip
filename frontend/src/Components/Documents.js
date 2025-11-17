import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const documents = [
  { name: "Passport Book", description: "Valid passport with at least 6 months validity.", icon: "🛂", color: "#4e73df" },
  { name: "Passport Photo", description: "Recent passport-sized color photograph.", icon: "📸", color: "#1cc88a" },
  { name: "Visa Document", description: "Tourist or business visa depending on nationality.", icon: "📝", color: "#36b9cc" },
  { name: "Flight Tickets", description: "Confirmed round-trip flight tickets.", icon: "🎫", color: "#f6c23e" },
  { name: "Hotel Reservation", description: "Confirmed hotel booking in Dubai.", icon: "🏨", color: "#e74a3b" },
  { name: "Travel Insurance", description: "Valid travel insurance covering medical expenses.", icon: "🩺", color: "#858796" },
];

const Documents = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".doc-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fade-in");
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <div className="container my-5 py-5">
      <h1 className="text-center mb-3 fw-bold display-4 text-primary heading-underline">
        ✨ Essential Dubai Travel Documents
      </h1>
      <p className="text-center mb-5 text-muted fs-5">
        Ensure you have all the necessary documents for a smooth and hassle-free journey.
      </p>

      <div className="row g-4">
        {documents.map((doc, index) => (
          <div className="col-md-4" key={index}>
            <div className="card doc-card h-100 p-4">
              <div
                className="icon-circle mb-3 d-flex justify-content-center align-items-center"
                style={{
                  background: `linear-gradient(135deg, ${doc.color}, #ffffff33)`,
                  boxShadow: `0 8px 20px ${doc.color}66`,
                  color: "#fff",
                }}
              >
                {doc.icon}
              </div>
              <div className="card-header text-center fw-bold" style={{ fontSize: "1.3rem", borderBottom: `2px solid ${doc.color}33`, marginBottom: "12px", paddingBottom: "5px", color: "#fff", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
                {doc.name}
              </div>
              <div className="card-body text-center px-3 flex-grow-1">
                <p className="card-text text-light fs-6">{doc.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
