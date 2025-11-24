// ThailandTDACForm.jsx
import React, { useState } from "react";
import { useNavigate,} from "react-router-dom";



import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUser,
  FaPassport,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaCheckCircle,
  FaPaperPlane,
} from "react-icons/fa";

const initialForm = {
  first_name: "",
  last_name: "",
  dob: "",
  gender: "",
  passport_number: "",
  passport_valid_till: "",
  passport_place: "",
  email: "",
  phone: "",
};

const ThailandTDACForm = () => {
  
 

  

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const navigate = useNavigate();

  const requiredFields = ["first_name", "last_name", "passport_number", "email"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };



  const sendOtp = async () => {
    if (!form.phone) return alert("Enter phone number first");
    try {
      const res = await axios.post("http://localhost:3001/send-otp", {
        phone: form.phone.startsWith("+") ? form.phone : `+91${form.phone}`,
      });
      if (res.data.success) {
        alert(res.data.message);
        setOtpSent(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    if (!otp) return alert("Enter OTP first");
    try {
      const res = await axios.post("http://localhost:3001/verify-otp", {
        phone: form.phone,
        otp,
      });
      if (res.data.verified) {
        alert("✅ Phone verified!");
        setPhoneVerified(true);
      } else {
        alert("❌ Invalid OTP");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error verifying OTP");
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!phoneVerified) return alert("Please verify your phone number first");

  for (let field of requiredFields) {
    if (!form[field]?.trim()) {
      alert(`Please fill in ${field.replace("_", " ")}`);
      return;
    }
  }

  setLoading(true);
  try {
    const res = await axios.post("http://localhost:3001/apply", form);

    if (!res.data.success) {
      alert("Error: Something went wrong.");
      setLoading(false);
      return;
    }

    alert("Form submitted successfully!");

    // 👉 Now open next page (no data needed)
 
    navigate("/ThailandBooking", { state: { booking: res.data.data } });



    setForm(initialForm);
  } catch (err) {
    console.error(err?.response || err);
    alert("Error submitting form.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 p-4"
      style={{
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #e3f2fd 100%)",
      }}
    >
      <div
        className="shadow-lg p-5 rounded-5 w-100"
        style={{
          maxWidth: "750px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <div className="text-center mb-4">
      <h2 className="fw-bold text-primary mb-1 text-capitalize">
   Application Form
</h2>

          <p className="text-muted small">
            Fill in the form below and verify your mobile number to continue.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="progress mb-5" style={{ height: "8px", borderRadius: "10px" }}>
          <div
            className={`progress-bar ${
              phoneVerified ? "bg-success" : otpSent ? "bg-warning" : "bg-primary"
            }`}
            style={{
              width: phoneVerified ? "100%" : otpSent ? "60%" : "30%",
              transition: "width 0.5s ease",
            }}
          ></div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ===== PHONE VERIFICATION ===== */}
          <section className="mb-5">
            <h5 className="fw-semibold text-secondary mb-3">
              <FaPhoneAlt className="me-2 text-primary" />
              Phone Verification
            </h5>
            <div className="row g-3 align-items-end">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-white text-primary">
                    <FaPhoneAlt />
                  </span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Phone Number"
                    disabled={otpSent || phoneVerified}
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex gap-2">
                {!otpSent && !phoneVerified && (
                  <button
                    type="button"
                    className="btn btn-outline-primary w-100"
                    onClick={sendOtp}
                  >
                    Send OTP
                  </button>
                )}
                {otpSent && !phoneVerified && (
                  <>
                    <div className="input-group flex-grow-1">
                      <span className="input-group-text bg-white text-primary">
                        <FaCheckCircle />
                      </span>
                      <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="form-control"
                        placeholder="Enter OTP"
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary px-3"
                      onClick={verifyOtp}
                    >
                      Verify
                    </button>
                  </>
                )}
                {phoneVerified && (
                  <div className="text-success fw-semibold mt-2">
                    <FaCheckCircle className="me-1" />
                    Verified
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ===== PASSPORT DETAILS ===== */}
          <section className="mb-5">
            <h5 className="fw-semibold text-secondary mb-3">
              <FaPassport className="me-2 text-primary" />
              Passport Information
            </h5>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-white text-primary">
                    <FaUser />
                  </span>
                  <input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="First Name"
                    disabled={!phoneVerified}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-white text-primary">
                    <FaUser />
                  </span>
                  <input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Last Name"
                    disabled={!phoneVerified}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-white text-primary">
                    <FaCalendarAlt />
                  </span>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!phoneVerified}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-white text-primary">
                    <FaVenusMars />
                  </span>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="form-select"
                    disabled={!phoneVerified}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-white text-primary">
                    <FaPassport />
                  </span>
                  <input
                    name="passport_number"
                    value={form.passport_number}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Passport Number"
                    disabled={!phoneVerified}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-white text-primary">
                    <FaCalendarAlt />
                  </span>
                  <input
                    type="date"
                    name="passport_valid_till"
                    value={form.passport_valid_till}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!phoneVerified}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="input-group">
                  <span className="input-group-text bg-white text-primary">
                    <FaPassport />
                  </span>
                  <input
                    name="passport_place"
                    value={form.passport_place}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Place of Issue"
                    disabled={!phoneVerified}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ===== CONTACT DETAILS ===== */}
          <section className="mb-5">
            <h5 className="fw-semibold text-secondary mb-3">
              <FaEnvelope className="me-2 text-primary" />
              Contact Details
            </h5>
            <div className="input-group">
              <span className="input-group-text bg-white text-primary">
                <FaEnvelope />
              </span>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email Address"
                disabled={!phoneVerified}
              />
            </div>
          </section>

          {/* ===== SUBMIT BUTTON ===== */}
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary px-5 py-2 rounded-pill fw-semibold shadow-sm d-flex align-items-center gap-2"
              disabled={loading || !phoneVerified}
              style={{ transition: "all 0.3s ease" }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm"></span> Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThailandTDACForm;
