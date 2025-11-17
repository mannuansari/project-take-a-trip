import React, { useEffect, useState } from "react";
import axios from "axios";

// Star rating component
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        style={{ color: i <= rating ? "#FFD700" : "#ddd", fontSize: "18px", marginRight: "2px" }}
      >
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: "", review: "", rating: 5 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleRatingChange = (e) => setFormData({ ...formData, rating: Number(e.target.value) });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.review) return alert("Name and review are required");

    setLoading(true);
    axios
      .post("http://localhost:3001/reviews", formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setReviews([res.data, ...reviews]);
          setFormData({ name: "", review: "", rating: 5 });
        } else {
          alert(res.data.message || "Failed to submit review");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        alert("Error submitting review");
      });
  };

  return (
    <div className="reviews-container" style={{ maxWidth: 900, margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#1d3557" }}>Customer Reviews</h1>

      {/* Review Form */}
      <form
        className="review-form"
        onSubmit={handleSubmit}
        style={{
          background: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "40px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.05)"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
          <textarea
            name="review"
            placeholder="Your Review"
            value={formData.review}
            onChange={handleChange}
            required
            rows={4}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ fontWeight: "500" }}>Rating:</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleRatingChange}
              style={{ padding: "6px 10px", borderRadius: "5px", fontSize: "1rem" }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#1d3557",
              color: "#fff",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              transition: "0.3s"
            }}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="reviews-list" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {reviews.length === 0 && (
          <p style={{ textAlign: "center", color: "#666" }}>No reviews yet. Be the first to review!</p>
        )}
        {reviews.map((r) => (
          <div
            key={r.id}
            className="review-card"
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              transition: "0.3s",
            }}
          >
            <div
              className="review-header"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}
            >
              <span style={{ fontWeight: "600", fontSize: "1rem", color: "#1d3557" }}>{r.name}</span>
              <StarRating rating={r.rating || 5} />
            </div>
            <p style={{ color: "#333", lineHeight: "1.6" }}>{r.review}</p>
            <small style={{ color: "#999", fontSize: "0.85rem" }}>
              {new Date(r.date).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
