import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlaneDeparture, FaHotel, FaRegStickyNote, FaArrowLeft, FaCreditCard, FaClock } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ThailandBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  // ---- States ----
  // ticketOption: 'none' | 'upload' | 'book'
  const [ticketOption, setTicketOption] = useState("none");
  const [ticketFile, setTicketFile] = useState(null);

  // hotelOption: 'none' | 'upload' | 'book'
  const [hotelOption, setHotelOption] = useState("none");
  const [hotelFile, setHotelFile] = useState(null);
  const [hotelType, setHotelType] = useState("");

  const [notes, setNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  // ---- Prices ----
  const TICKET_PRICE = 15000;
  const HOTEL_PRICES = { "5-star": 8000, "4-star": 5000, "3-star": 3000 };
  const TAKE_A_TRIP_FEE = 2000;
  const GOVT_FEE = 1000;

  // ---- Derived prices based on chosen options ----
  const ticketPrice = ticketOption === "book" ? TICKET_PRICE : 0; // if user asks us to book, charge
  const hotelPrice = hotelOption === "book" && hotelType ? HOTEL_PRICES[hotelType] : 0; // only charge if 'book' + type selected
  const total = ticketPrice + hotelPrice + TAKE_A_TRIP_FEE + GOVT_FEE;

  // ---- Form validation helpers ----
  const ticketNeedsUploadButMissing = ticketOption === "upload" && !ticketFile;
  const hotelNeedsUploadButMissing = hotelOption === "upload" && !hotelFile;
  const hotelBookButNoType = hotelOption === "book" && !hotelType;

  const canProceed = !processing && !ticketNeedsUploadButMissing && !hotelNeedsUploadButMissing && !hotelBookButNoType;

  // ---- Handle Booking + Payment ----
  const handleBookingAndPayment = async () => {
    if (!booking) {
      alert("Booking data missing. Please fill the TDAC form first.");
      return;
    }

    // final safety checks
    if (ticketNeedsUploadButMissing) {
      alert("You selected to upload a genuine ticket. Please upload it or choose the 'Skip - we will book' option.");
      return;
    }
    if (hotelNeedsUploadButMissing) {
      alert("You selected to upload hotel proof. Please upload it or choose the 'Let us book' option.");
      return;
    }
    if (hotelBookButNoType) {
      alert("Please select a hotel type for booking (5★ / 4★ / 3★).");
      return;
    }

    setProcessing(true);

    try {
      const formData = new FormData();
      formData.append("formId", booking?.id || "");

      // Ticket details
      formData.append("ticketOption", ticketOption);
      formData.append("ticketPrice", ticketPrice);
      if (ticketFile) formData.append("ticketFile", ticketFile);

      // Hotel details
      formData.append("hotelOption", hotelOption);
      formData.append("hotelType", hotelType || "");
      formData.append("hotelPrice", hotelPrice);
      if (hotelFile) formData.append("hotelFile", hotelFile);

      // Fees & meta
      formData.append("takeATripFee", TAKE_A_TRIP_FEE);
      formData.append("govtFee", GOVT_FEE);
      formData.append("total", total);
      formData.append("notes", notes);

      // Save booking to backend
      await axios.post("http://localhost:3001/save-booking", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Razorpay check
      if (!window.Razorpay) {
        alert("Payment gateway not loaded. Please refresh and try again.");
        setProcessing(false);
        return;
      }

      const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with your key
        amount: total * 100,
        currency: "INR",
        name: "Take A Trip",
        description: "Thailand Booking Payment",
        handler: function (response) {
          alert("✅ Payment Successful! ID: " + response.razorpay_payment_id);
          navigate("/payment-success", {
            state: { booking, total, paymentId: response.razorpay_payment_id },
          });
        },
        prefill: {
          name: `${booking.first_name || ""} ${booking.last_name || ""}`,
          email: booking.email || "",
          contact: booking.phone || "",
        },
        theme: { color: "#0d6efd" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Booking Error:", err);
      alert("Error processing booking. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  // ---- Missing booking fallback ----
  if (!booking) {
    return (
      <div className="text-center text-danger mt-5">
        <p>No booking data found. Please fill the TDAC form first.</p>
      </div>
    );
  }

  // ---- JSX ----
  return (
    <div className="container py-5">
      <div className="shadow-lg rounded-4 p-5 bg-white" style={{ maxWidth: "820px", margin: "0 auto", borderTop: "6px solid #0d6efd" }}>
        {/* Heading */}
        <h3 className="text-center text-primary fw-bold mb-2">🇹🇭 Thailand Booking Portal</h3>
        <p className="text-center text-secondary mb-4">
          Hello, <strong>{booking.first_name} {booking.last_name}</strong> — Complete your booking below.
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="d-flex justify-content-between">
            <small className="text-muted">Visa Processing (Approx 30 days)</small>
            <small className="text-primary fw-semibold">In Progress</small>
          </div>
          <div className="progress mt-2" style={{ height: "8px" }}>
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" style={{ width: "45%" }}></div>
          </div>
        </div>

        {/* Flight Ticket - improved UX */}
        <div className="border rounded-3 p-3 mb-4">
          <h5><FaPlaneDeparture className="text-primary me-2" />Flight Ticket</h5>

          <div className="row mt-3">
            <div className="col-md-6 mb-2">
              <div className={`card p-3 ${ticketOption === 'upload' ? 'border-primary' : ''}`} role="button" onClick={() => setTicketOption('upload')}>
                <strong>Upload your genuine ticket</strong>
                <div className="small text-muted">If you already have a booked ticket — upload proof and we will NOT charge the ticket fee.</div>
                <div className="mt-2">
                  <input type="file" className="form-control" accept="image/*,.pdf" onChange={(e) => setTicketFile(e.target.files[0])} />
                  {ticketOption === 'upload' && !ticketFile && <small className="text-danger d-block mt-1">Please upload ticket proof or choose "We will book".</small>}
                  {ticketFile && <small className="text-success d-block mt-1">✅ Ticket uploaded — no ticket charge applied.</small>}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-2">
              <div className={`card p-3 ${ticketOption === 'book' ? 'border-primary' : ''}`} role="button" onClick={() => { setTicketOption('book'); setTicketFile(null); }}>
                <strong>Skip / I don't have ticket</strong>
                <div className="small text-muted">We will arrange the flight for you — <span className="fw-bold">₹{TICKET_PRICE}</span> will be charged.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Section - improved UX */}
        <div className="border rounded-3 p-3 mb-4">
          <h5><FaHotel className="text-primary me-2" />Hotel Booking</h5>

          <div className="row mt-3">
            <div className="col-md-6 mb-2">
              <div className={`card p-3 ${hotelOption === 'upload' ? 'border-primary' : ''}`} role="button" onClick={() => setHotelOption('upload')}>
                <strong>Upload hotel booking / proof</strong>
                <div className="small text-muted">Have a confirmed hotel? Upload the booking proof and we won't charge for hotel booking.</div>
                <div className="mt-2">
                  <input type="file" className="form-control" accept="image/*,.pdf" onChange={(e) => setHotelFile(e.target.files[0])} />
                  {hotelOption === 'upload' && !hotelFile && <small className="text-danger d-block mt-1">Please upload hotel proof or choose "Let us book".</small>}
                  {hotelFile && <small className="text-success d-block mt-1">✅ Hotel proof uploaded — no hotel charge applied.</small>}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-2">
              <div className={`card p-3 ${hotelOption === 'book' ? 'border-primary' : ''}`} role="button" onClick={() => { setHotelOption('book'); setHotelFile(null); }}>
                <strong>Let us book hotel for you</strong>
                <div className="small text-muted">Choose a hotel category below — charges apply when selected.</div>
                {hotelOption === 'book' && (
                  <div className="mt-2">
                    <select className="form-select" value={hotelType} onChange={(e) => setHotelType(e.target.value)}>
                      <option value="">--Select Hotel Category--</option>
                      <option value="5-star">5★ Luxury - ₹{HOTEL_PRICES["5-star"]}</option>
                      <option value="4-star">4★ Comfort - ₹{HOTEL_PRICES["4-star"]}</option>
                      <option value="3-star">3★ Budget - ₹{HOTEL_PRICES["3-star"]}</option>
                    </select>
                    {!hotelType && <small className="text-danger d-block mt-1">Please select a hotel category to include hotel charges.</small>}
                    {hotelType && <small className="text-success d-block mt-1">Selected: {hotelType} — ₹{HOTEL_PRICES[hotelType]}</small>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="form-label"><FaRegStickyNote className="me-2 text-primary" />Notes (Optional)</label>
          <textarea className="form-control" rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requests or notes..."></textarea>
        </div>

        {/* Summary */}
        <div className="border rounded-3 p-3 mb-4 bg-light">
          <h5>🧾 Summary</h5>
          <p>Ticket: <strong>₹{ticketPrice}</strong> {ticketOption === 'upload' && ticketFile && <span className="text-success">(Uploaded)</span>}</p>
          <p>Hotel: <strong>₹{hotelPrice}</strong> {hotelOption === 'upload' && hotelFile && <span className="text-success">(Uploaded)</span>}</p>
          <p>Take-a-Trip Fee: <strong>₹{TAKE_A_TRIP_FEE}</strong></p>
          <p>Government Fee: <strong>₹{GOVT_FEE}</strong></p>
          <hr />
          <h5>Total: <span className="text-success">₹{total}</span></h5>
          <small className="text-muted d-block mt-2">Tip: Choose the upload option and provide genuine proof to avoid extra charges.</small>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}><FaArrowLeft className="me-2" />Back</button>
          <button className="btn btn-primary d-flex align-items-center" onClick={handleBookingAndPayment} disabled={!canProceed}>
            <FaCreditCard className="me-2" />{processing ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 border-top pt-3">
          <FaClock className="text-primary me-2" />
          <small className="text-muted">Visa processing may take <strong>up to 30 working days</strong>.</small>
        </div>
      </div>
    </div>
  );
}
