import { Link } from "react-router-dom";
import axios from "axios"; 
import React, { useState, useRef } from "react";
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";
import { MdPhoneIphone, MdDateRange, MdEventNote } from "react-icons/md";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Collapse from "bootstrap/js/dist/collapse";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer } from "recharts";

function Russia() {
  // ✅ Single function to compare dates
  const isSameDate = (d1, d2) => d1.toDateString() === d2.toDateString();

  // ---------- State ----------
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 1));
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('sources');
  const [filter, setFilter] = useState("Most Recent");
  const accordionRef = useRef(null);

  // ---------- Form Data ----------
  const formData = isSameDate(selectedDate, new Date(2025, 9, 15))
    ? { title: "15 October", fee: 2500, theme: "bg-primary", icon: "bi-calendar-check" }
    : { title: "14 October", fee: 1800, theme: "bg-dark", icon: "bi-lightning-fill" };

  const handleDateSelect = (date) => setSelectedDate(date);
  const toggleTimeline = () => setIsTimelineOpen(!isTimelineOpen);

const emirates = [
  {
    name: "Moscow",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/RedSquare_Moscow_%28pixinn.net%29.jpg",
  },
  {
    name: "Saint Petersburg",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Saint_Petersburg_Panorama_%28pixinn.net%29.jpg",
  },
  {
    name: "Kazan",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Kazan_Kremlin_and_Qolsharif_Mosque.jpg",
  },
  {
    name: "Sochi",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Sochi_coastline.jpg",
  },
  {
    name: "Yekaterinburg",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Yekaterinburg_skyline.jpg",
  },
  {
    name: "Novosibirsk",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Novosibirsk_City_View.jpg",
  },
  {
    name: "Vladivostok",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Vladivostok_Russky_Bridge_Sunset.jpg",
  },
];


  const data = [
    { day: "Mon", hours: 42 },
    { day: "Tue", hours: 48 },
    { day: "Wed", hours: 50 },
    { day: "Thu", hours: 45 },
    { day: "Fri", hours: 52 },
    { day: "Sat", hours: 47 },
    { day: "Sun", hours: 44 },
  ];

  const faqData = [
    { id: 'general', title: 'General Information', content: (
        <>
          <p>This is some general information about the service.</p>
          <img src="https://via.placeholder.com/300x150" alt="example" className="img-fluid mb-2" />
          <ul>
            <li>Detail A</li>
            <li>Detail B</li>
          </ul>
        </>
      ) 
    },
    { id: 'application', title: 'Eligibility & Requirements', content: (
        <>
          <p>Steps to apply:</p>
          <ol>
            <li>Fill the form</li>
            <li>Upload documents</li>
            <li>Submit application</li>
          </ol>
          <img src="https://via.placeholder.com/400x200" alt="steps" className="img-fluid" />
        </>
      ) 
    },
    { id: 'visa1', title: 'Application Process', content: (
        <>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      ) 
    },
    { id: 'visa2', title: 'Entry & Exit Process', content: (
        <>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      ) 
    },
    { id: 'visa3', title: 'Status Tracking', content: (
        <>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      ) 
    },
    { id: 'visa4', title: 'Refunds, Rejections & Reapplications', content: (
        <>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      ) 
    },
    { id: 'visa5', title: 'Visa Extension & Overstays', content: (
        <>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      ) 
    },
    { id: 'visa6', title: 'Child Application', content: (
        <>
          <h2>Do Indians </h2>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      ) 
    },
  ];

  const handleButtonClick = (targetId) => {
    const target = accordionRef.current.querySelector(`#${targetId}`);
    if (target) {
      const collapseElement = new Collapse(target, { toggle: true });
      collapseElement.show();
    }
  };

  const reviews = [
    {
      id: 1,
      name: "Daksh Verma",
      location: "Jammu, Jammu and Kashmir",
      group: "Family",
      tag: "FREQUENT TRAVELLER",
      date: "2 Nov, 2024",
      rating: 5,
      title: "Easy UAE Visa Process with Atlys",
      content: "Getting a visa for the UAE usually feels like endless paperwork but Atlys somehow made it chill. The process was smooth and all the docs I needed were listed right there. I could even pay for the visa.",
      isPopular: true,
      initials: "DV",
    },
    {
      id: 2,
      name: "Indrajit Gogoi",
      location: "Tawang, Arunachal Pradesh",
      group: "Family",
      tag: "FREQUENT TRAVELLER",
      date: "2 Nov, 2024",
      rating: 5,
      title: "Super smooth UAE Visa Process",
      content: "The whole experience was seamless from start to finish. Highly recommended!",
      isPopular: false,
      initials: "IG",
    },
  ];

  const containerStyle = { width: '100%', height: '500px' };
  const center = { lat: 25.276987, lng: 55.296249 };
  const nearbyCountries = [
    { name: 'Dubai (UAE)', lat: 25.276987, lng: 55.296249 },
    { name: 'Muscat (Oman)', lat: 23.5880, lng: 58.3829 },
    { name: 'Riyadh (Saudi Arabia)', lat: 24.7136, lng: 46.6753 },
    { name: 'Doha (Qatar)', lat: 25.276987, lng: 51.5200 },
    { name: 'Manama (Bahrain)', lat: 26.2235, lng: 50.5876 },
    { name: 'Kuwait City (Kuwait)', lat: 29.3759, lng: 47.9774 },
    { name: 'Tehran (Iran)', lat: 35.6892, lng: 51.3890 }
  ];
//const handlePayment = async () => {
 // try {
   // const totalAmount = amount + 1000; // govt + service fee

    // Call backend to create Razorpay order
    //const { data } = await axios.post("http://localhost:3001/create-order", {
      //amount: totalAmount, // send amount in INR
    //});

    //const options = {
      //key:  "", // Razorpay Key ID
      //amount: data.amount, // amount in paise (from backend)
      //currency: "INR",
      //name: "Dubai Visa Application",
      //description: "Visa Payment",
      //order_id: data.id,
      //handler: function (response) {
        //alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // Optionally call backend to mark payment as successful
      //},
      //theme: {
        //color: "#3399cc",
      //},
    //};

    //const rzp = new window.Razorpay(options);
    //rzp.open();
  //} catch (err) {
   // console.error(err);
   // alert("Payment failed. Please try again.");
  //}
//};
  return (
    <div className="dubai-page">
      {/* -------------------- Banner -------------------- */}
      <div className="banner-container">
        <video autoPlay loop muted className="banner-video">
          <source src="/Videoes/dubai.mp4" type="video/mp4" />
        </video>
        <div className="banner-overlay">
          <h1>Russia Visa for Indians</h1>
          <div className="banner-buttons">
            <Link to="/Documents" className="btn btn-primary">
              Check Required Documents
            </Link>
            <Link to="/Apply" className="btn btn-secondary">
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      <div className="main-content">
        {/* ---------------- Left Section ---------------- */}
        <div className="left-section">
          {/* Trust Section */}
          <div className="rating-section">
            <p>
              Loved and Trusted by 1.25L Indians
              <br />
              Rated 5 stars by moms, newlyweds, and 🕐 last-minute planners
            </p>
          </div>

         {/* Visa Info */}
           <section className="visa-info mb-4">
  <h3>Russia Visa Information</h3>
  <hr />
  <div className="row">
    {[
      { icon: <MdDateRange />, title: "Length of Stay", desc: "30 days", tip: "Maximum duration allowed per visit." },
      { icon: <MdEventNote />, title: "Validity", desc: "90 days", tip: "Visa must be used within this validity period." },
      { icon: <FaCheckCircle />, title: "Entry", desc: "Single / Double", tip: "You can choose single or double entry." },
      { icon: <MdPhoneIphone />, title: "Method", desc: "E-Visa (Online)", tip: "Apply and receive electronically." },
    ].map((item, idx) => (
      <div className="col-md-3 mb-2" key={idx}>
        <OverlayTrigger placement="top" overlay={<Tooltip>{item.tip}</Tooltip>}>
          <div className="info-box p-2 border rounded d-flex flex-column align-items-center">
            {item.icon}
            <strong>{item.title}</strong>
            <p>{item.desc}</p>
          </div>
        </OverlayTrigger>
      </div>
    ))}
  </div>
</section>

          {/* -------- Date Options -------- */}
          <div className="visa-selection">
            <div className="visa-duration">
               <h1>Visa Duration Time</h1>
              <ol className="duration-list">
                <li>1 Month - 3-4 days</li>
                    <li>2 Month - 1 week</li>
                     </ol>
                 </div>



            {/* Calendar shown only when timeline is open */}
            {isTimelineOpen && (
              <div className="calendar-container">
                <Calendar
                  value={selectedDate}
                  onChange={handleDateSelect}
                  tileClassName={({ date }) =>
                    isSameDate(date, selectedDate) ? "selected-calendar-date" : null
                  }
                />
              </div>
            )}
          </div>

          {/* Emirates Section */}
       <div className="emirates-grid">
  {emirates.map((emirate, index) => (
    <div className="emirate-card shadow rounded overflow-hidden position-relative" key={index} style={{ cursor: "pointer" }}>
      <img src={emirate.image} alt={emirate.name} className="img-fluid w-100" style={{ transition: "transform 0.3s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      />
      <div className="emirate-name position-absolute bottom-0 w-100 text-center py-2 text-white" style={{ background: "rgba(0,0,0,0.5)" }}>
        {emirate.name}
      </div>
    </div>
  ))}
</div>


          {/* Visa Requirements */}
         <div className="visa-container">
  <h2 className="section-title">Russia Visa Requirements</h2>
  <ul className="requirements">
    <li>📄 Valid Passport (minimum 6 months validity)</li>
    <li>🖼️ Recent Passport-size Photograph</li>
    <li>📝 Completed Online Visa Application Form</li>
    <li>🏨 Proof of Accommodation / Hotel Booking</li>
    <li>✈️ Confirmed Return Flight Ticket</li>
    <li>💳 Proof of Financial Means (Bank Statement)</li>
    <li>📧 Email Address for e-Visa Delivery</li>
  </ul>

  {/* Partners */}
  <h2 className="section-title">Partners We Work With</h2>
  <div className="partners">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Emblem_of_the_Russian_Federation.svg"
      alt="Government of Russia"
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/8/84/Aeroflot_Logo.svg"
      alt="Aeroflot Airlines"
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/1/12/IATAlogo.svg"
      alt="IATA"
    />
  </div>
</div>

            {/* Visa Process */}
            <h2 className="section-title">How Russia Visa Process Works</h2>
<div className="timeline">
  <div className="step">
    <div className="circle"></div>
    <div className="content">
      <h3>Step 1</h3>
      <p><strong>Apply Online</strong></p>
      <p>Submit your Russia e-Visa application on Atlys — pay only the official visa fee.</p>
    </div>
  </div>

  <div className="step">
    <div className="circle"></div>
    <div className="content">
      <h3>Step 2</h3>
      <p><strong>Document Verification</strong></p>
      <p>Our team verifies your uploaded documents and forwards them to the Russian Consulate.</p>
    </div>
  </div>

  <div className="step">
    <div className="circle"></div>
    <div className="content">
      <h3>Step 3</h3>
      <p><strong>Visa Processing</strong></p>
      <p>Russian authorities review your application and process your e-Visa.</p>
      <div className="status-box">
        <p>📌 Application submitted to the Russian Ministry of Foreign Affairs</p>
        <span>12 Oct, 9:15 AM ✅</span>
        <p>📌 Under review by Visa Processing Center</p>
        <span>13 Oct, 2:40 PM ✅</span>
      </div>
    </div>
  </div>

  <div className="step">
    <div className="circle"></div>
    <div className="content">
      <h3>Step 4</h3>
      <p><strong>Receive Your Russia e-Visa on <span className="highlight">15 Oct, 11:00 AM</span></strong></p>
      <div className="result-box">
        <button className="btn green">Pay Atlys Fee</button>
        <button className="btn blue">Atlys Fee Waived</button>
        <button className="btn red">Government Fee Refunded</button>
      </div>
    </div>
  </div>
</div>

          {/* Visa Stats */}
          <div className="visa-stats-container">
            <div className="approval-section">
              <h2>Want to know if your Visa will be approved?</h2>
              <div className="approval-card">
                <div className="text">
                  <h3>Learn Your <br /> Chances of Approval</h3>
                  <p>Answer 6 questions to know your chances</p>
                  <a href="/">Evaluate my chances →</a>
                </div>
            
              </div>
            </div>

            <div className="stats-section">
              <h2>Statistics on Dubai Visa</h2>
              <div className="stats-card">
                <div className="left-info">
                  <h4>VISA PROCESSING TIME</h4>
                  <p><strong>What is this?</strong></p>
                  <p>This shows the average time a visa decision took to be delivered on</p>
                  <p><strong>Wednesday, 1 October</strong></p>
                  <p className="blue">1 Day 23 Hrs 41 Mins</p>
                </div>
                <div className="chart">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ReTooltip />
                      <Line type="monotone" dataKey="hours" stroke="#4a4eff" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="rejection-section">
              <h2>Dubai Visa Rejection Reasons</h2>
              <p>Factors that can get your visa rejected</p>
              <ul>
                <li>
                  <strong>📄 Expired Passport</strong><br />
                  Applying with a passport that has expired or expires within 6 months
                </li>
                <li>
                  <strong>📝 Criminal Record</strong><br />
                  Having a criminal history that disqualifies you from obtaining a visa.
                </li>
                <li>
                  <strong>⚠️ Previous Visa Violations</strong><br />
                  Having overstayed or violated the terms of a previous visa.
                </li>
              </ul>
            </div>
          </div>
 <div className="container my-4">
  <h3 className="mb-3">Frequently Asked Questions</h3>

  {/* FAQ Buttons */}
  <div className="mb-3 d-flex flex-wrap gap-2">
    {faqData.map((faq, index) => (
      <button
        key={faq.id + index}
        className="btn btn-outline-primary btn-sm"
        onClick={() => handleButtonClick(`collapse-${faq.id}-${index}`)}
      >
        {faq.title}
      </button>
    ))}
  </div>

  {/* Accordion */}
  <div className="accordion" id="faqAccordion" ref={accordionRef}>
    {faqData.map((faq, index) => (
      <div className="accordion-item mb-2 shadow-sm border rounded" key={faq.id + index}>
        <h2 className="accordion-header" id={`heading-${faq.id}-${index}`}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${faq.id}-${index}`}
            aria-expanded="false"
            aria-controls={`collapse-${faq.id}-${index}`}
          >
            {faq.title}
          </button>
        </h2>
        <div
          id={`collapse-${faq.id}-${index}`}
          className="accordion-collapse collapse"
          aria-labelledby={`heading-${faq.id}-${index}`}
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body">
            {faq.content}
          </div>
        </div>
      </div>
    ))}
  </div>

      <div className="container my-5">
      <h2>Reviews</h2>

      {/* Header Summary */}
      <div className="d-flex align-items-center justify-content-between flex-wrap mt-3">
        <div>
          <h1 className="display-5 fw-bold mb-0">4.86</h1>

          <p className="text-muted">821 Reviews</p>
        </div>
        <div>
          <h6 className="fw-bold">Common Keywords Found in Reviews</h6>
          <ul className="list-inline mb-0">
            {[
              "Quick Decision",
              "Easy Application",
              "Customer Support",
              "Documentation",
              "On Time",
            ].map((kw) => (
              <li key={kw} className="list-inline-item me-2 text-success">
                ✅ {kw}
              </li>
            ))}
          </ul>
        </div>
      </div>
   
      {/* Filters */}
      <div className="d-flex gap-3 align-items-center flex-wrap mb-4 mt-4">
        <select
          className="form-select"
          style={{ maxWidth: "200px" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>Most Recent</option>
          <option>Highest Rated</option>
          <option>Lowest Rated</option>
        </select>

        <select className="form-select" style={{ maxWidth: "200px" }}>
          <option>Frequent Traveller</option>
          <option>First Time Traveller</option>
        </select>

        <select className="form-select" style={{ maxWidth: "200px" }}>
          <option>Family</option>
          <option>Solo</option>
          <option>Business</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="review-list">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="card mb-4 p-3 shadow-sm border"
            style={{ position: "relative" }}
          >
            {rev.isPopular && (
              <span className="badge bg-info position-absolute" style={{ top: "10px", left: "10px" }}>
                Popular Review
              </span>
            )}
            <div className="d-flex align-items-center mb-2">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                style={{ width: "40px", height: "40px" }}
              >
                {rev.initials}
              </div>
              <div>
                <h6 className="mb-0">{rev.name}</h6>
                <small className="text-muted">
                  📍 {rev.location} | 👨‍👩‍👧‍👦 {rev.group}
                </small>
              </div>
            </div>
            <div className="d-flex align-items-center mb-2">
              {[...Array(rev.rating)].map((_, i) => (
                <FaStar key={i} className="text-warning me-1" />
              ))}
              <small className="ms-auto text-muted">{rev.date}</small>
            </div>
            <span className="badge bg-success mb-2">{rev.tag}</span>
            <h5>{rev.title}</h5>
            <p>
              {rev.content.length > 150 ? (
                <>
                  {rev.content.slice(0, 150)}... <a href="/">Read More</a>
                </>
              ) : (
                rev.content
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  
    </div>
    <div style={{ width: '100%', height: '450px' }}>
      <iframe title="Dubai Map" width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7217.315987396791!2d55.27603138633063!3d25.197197143291787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42890f269c23%3A0x9bcb81d8c36bcec9!2sDubai!5e0!3m2!1sen!2sae!4v1696000000000!5m2!1sen!2sae"
      ></iframe>
    </div>
        <div className="review-section">
      <h2>How We Reviewed This Page</h2>
      <div className="tabs">
        <button
          className={activeTab === 'sources' ? 'active' : ''}
          onClick={() => setActiveTab('sources')}
        >
          📄 SOURCES
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          📜 HISTORY
        </button>
      </div>

      {activeTab === 'sources' && (
        <div className="tab-content">
          <p>
            Atlys has strict sourcing guidelines and relies on official government websites. 
            We avoid using tertiary references. You can learn more about how we ensure our 
            content is accurate and current by reading our <a href="#">editorial policy</a>.
          </p>
          <ul>
            <li>
              Official Website of the UAE Government. (Web).{' '}
              <a href="https://u.ae/#" target="_blank" rel="noopener noreferrer">
                https://u.ae/#
              </a>
            </li>
            <li>
              UAE Department of Culture And Tourism. (Web).{' '}
              <a href="https://dct.gov.ae/en/default.aspx" target="_blank" rel="noopener noreferrer">
                https://dct.gov.ae/en/default.aspx
              </a>
            </li>
            <li>
              UAE Ministry of Foreign Affairs. (Web).{' '}
              <a href="https://www.mofa.gov.ae/EN" target="_blank" rel="noopener noreferrer">
                https://www.mofa.gov.ae/EN
              </a>
            </li>
          </ul>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="tab-content">
          <p>This is where the change history would go. (Placeholder)</p>
        </div>
      )}
    </div>
  
        </div>

        {/* ---------------- Right Section ---------------- */}
       <div className="visa-application p-3" style={{ backgroundColor: 'white',  height :'360px'}}>
       
         {/* -------- Date Tabs -------- */}
         <div className="tabs d-flex gap-2 mb-3">
           {[ 
             { date: new Date(2025, 9, 15), label: "15 October", fee: 2500, theme: "bg-primary", icon: "bi-calendar-check" },
             { date: new Date(2025, 9, 14), label: "14 October", fee: 1800, theme: "bg-dark", icon: "bi-lightning-fill" }
           ].map((tab, idx) => (
             <span
               key={idx}
               className={`badge rounded-pill cursor-pointer ${
                 isSameDate(selectedDate, tab.date)
                   ? `${tab.theme} text-white`
                   : "bg-light text-dark"
               }`}
               style={{  }}
               onClick={() => setSelectedDate(tab.date)}
             >
               <i className={`bi ${tab.icon} me-1`}></i> {tab.label}
             </span>
           ))}
         </div>
       
         {/* -------- Dynamic Visa Info -------- */}
         <div className={`${formData.theme} text-white p-3 rounded mb-3 d-flex align-items-center`}>
           <i className="bi bi-check-circle-fill me-2"></i>
           <strong>Get Your Visa in 3 days</strong>
         </div>
       
         {/* Price Breakdown */}
         <div className="price-breakdown mb-3">
           <h6>Price Breakdown</h6>
           <div className="d-flex">
             <span><a href="#">Government fee</a></span>
             <span>₹{formData.fee} × 1</span>
           </div>
           <div className="d-flex ">
             <span><a href="#">Take a Trip Fees</a></span>
             <span><s>₹1,000</s> <strong>₹0 for now</strong></span>
           </div>
           <div className="note mt-2 small text-primary">
             No advance payment. Pay only when you get your visa
           </div>
         </div>
       
         {/* Total Amount */}
         <div className="total-amount mb-3">
           <h6>Total Amount</h6>
           <h3>₹{formData.fee}</h3>
         </div>
       
         {/* Additional clickable options inside form */}
         <div className="date-options mb-3">
           <h6>Quick Date Options:</h6>
           {[ 
             { date: new Date(2025, 9, 15), label: "15 Oct" },
             { date: new Date(2025, 9, 14), label: "14 Oct" }
           ].map((opt, idx) => (
             <button
               key={idx}
               className={`btn btn-sm me-2 ${isSameDate(selectedDate, opt.date) ? "btn-primary" : "btn-outline-secondary"}`}
               onClick={() => setSelectedDate(opt.date)}
             >
               {opt.label}
             </button>
           ))}
         </div>
       
         {/* Start Application */}
         <Link to="/ThailandTDACForm" className="btn btn-primary w-100">
           Start Application
         </Link>
       </div>
       </div>
       </div>
  );
}

export default Russia;
