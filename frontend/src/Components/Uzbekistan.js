
  import { Link } from "react-router-dom";
  import React, { useState,useRef } from "react";
  import { FaCheckCircle, FaChevronDown, FaChevronUp,FaSpinner,FaRegClock   } from "react-icons/fa";
  import { MdPhoneIphone, MdDateRange, MdEventNote } from "react-icons/md";
  import { Tooltip, OverlayTrigger } from "react-bootstrap";
  import Calendar from "react-calendar";
  import "react-calendar/dist/Calendar.css";
  import Collapse from "bootstrap/js/dist/collapse";
  import { FaStar } from "react-icons/fa";
  import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
  
  
  
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer } from "recharts";
  
  function Uzbekistan() {
     const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 15)); // default: 15 Oct
     const isSameDate = (date1, date2) =>
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  
    // Form data based on selected date
    const formData = isSameDate(selectedDate, new Date(2025, 9, 15))
      ? {
          title: "15 October",
          fee: 2500,
          theme: "bg-primary",
          icon: "bi-calendar-check",
        }
      : {
          title: "14 October",
          fee: 1800,
          theme: "bg-dark",
          icon: "bi-lightning-fill",
        };
    
   const emirates = [
    {
      name: "Sigiriya",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd4UL2W6qrF7R-J2wJLIEPe8dBgHWPfKftEA&s",
    },
    {
      name: "Sri Dalada Maligawa",
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/16/4f/7e/03/sri-dalada-maligawa-or.jpg",
    },
    {
      name: "Dambulla Royal Cave Temple",
      image:
        "https://minneriyasafari.com/wp-content/uploads/2023/12/22.jpg",
    },
    {
      name: "Galle Dutch Fort",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/24/05/e0/galle-fort.jpg?w=900&h=500&s=1",
    },
    {
      name: "Udawalawe",
      image:
        "https://media2.thrillophilia.com/images/photos/000/053/056/original/1596623195_shutterstock_726294346.jpg?",
    },
    {
      name: "Royal Botanic",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/8e/ce/cf/guilfoyle-s-volcano-at.jpg?w=900&h=500&s=1",
    },
    {
      name: "Horton Plains National park",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/5c/a2/a8/caption.jpg?w=800&h=400&s=1",
    },
  ];
  
    // Dummy Data for Chart
    const data = [
      { day: "Mon", hours: 42 },
      { day: "Tue", hours: 48 },
      { day: "Wed", hours: 50 },
      { day: "Thu", hours: 45 },
      { day: "Fri", hours: 52 },
      { day: "Sat", hours: 47 },
      { day: "Sun", hours: 44 },
    ];
  
   
  
  
   
  
    const getAmount = () =>
      selectedDate.toDateString() === new Date(2025, 8, 30).toDateString()
        ? 7000
        : 6500;
  
    const amount = getAmount();
    const faqData = [
    {
      id: 'general',
      title: 'General Information',
      content: (
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
    {
      id: 'application',
      title: 'Eligibility & Requirements',
      content: (
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
    {
      id: 'visa',
      title: 'Application Process',
      content: (
        <>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      )
    },
    {
      id: 'visa',
      title: 'Entry & Exit Process',
      content: (
        <>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      )
    },
    {
      id: 'visa',
      title: 'Status Tracking',
      content: (
        <>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      )
    },
    {
      id: 'visa',
      title: 'Refunds,Rejections & Reapplications',
      content: (
        <>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      )
    },
    {
      id: 'visa',
      title: 'Visa Extension & Overstays',
      content: (
        <>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      )
    },
    {
      id: 'visa',
      title: 'Child Application',
      content: (
        <>
           <h2>Do Indians </h2>
          <p>If you need to extend your visa, follow these steps.</p>
          <ul>
            <li>Log into your account</li>
            <li>Select "Request Extension"</li>
          </ul>
        </>
      )
    }
  ];
  
  
    const accordionRef = useRef(null);
  
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
      content:
        "Getting a visa for the UAE usually feels like endless paperwork but Atlys somehow made it chill. The process was smooth and all the docs I needed were listed right there. I could even pay for the visa.",
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
      content:
        "The whole experience was seamless from start to finish. Highly recommended!",
      isPopular: false,
      initials: "IG",
    },
  ]; 
  const [filter, setFilter] = useState("Most Recent");
  const containerStyle = {
    width: '100%',
    height: '500px'
  };
  
  // Center of Uzbekistan (Tashkent)
const center = {
  lat: 41.2995, // Tashkent latitude
  lng: 69.2401  // Tashkent longitude
};

// Nearby countries' capitals or representative coordinates
const nearbyCountries = [
  { name: 'Tashkent (Uzbekistan)', lat: 41.2995, lng: 69.2401 },
  { name: 'Nur-Sultan (Kazakhstan)', lat: 51.1605, lng: 71.4704 },
  { name: 'Bishkek (Kyrgyzstan)', lat: 42.8746, lng: 74.5698 },
  { name: 'Dushanbe (Tajikistan)', lat: 38.5598, lng: 68.7870 },
  { name: 'Ashgabat (Turkmenistan)', lat: 37.9601, lng: 58.3261 },
  { name: 'Kabul (Afghanistan)', lat: 34.5553, lng: 69.2075 },
  { name: 'Tehran (Iran)', lat: 35.6892, lng: 51.3890 }
];

const [activeTab, setActiveTab] = useState('sources');

   
  
    return (
      <div className="dubai-page">
        {/* -------------------- Banner -------------------- */}
        <div className="banner-container">
          <video autoPlay loop muted className="banner-video">
            <source src="/Videoes/uzbekistan.mp4" type="video/mp4" />
          </video>
          <div className="banner-overlay">
            <h1>Uzbekistan Visa for Indians</h1>
            <div className="banner-buttons">
              <Link to="/documents" className="btn btn-primary">
            check mark Visa guaranteed on 3 Nov 2025 at 10:50 AM
              </Link>
              <Link to="/ThailandTDACForm" className="btn btn-secondary">
                 Check Required Documents
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
             leaves 4.7 leaves Loved and Trusted by 1.25L Indians Rated 5 stars by crown moms, heart newlyweds, and heart last-minute planners
              </p>
            </div>
  
  {/* Visa Info */}
  <section className="visa-info mb-4">
    <h3>Uzbekistan Visa Information</h3>
    <hr />
    <div className="row">
      {[
        { icon: <MdDateRange />, title: "Length of Stay", desc: "30 days", tip: "Maximum stay days allowed." },
        { icon: <MdEventNote />, title: "Validity", desc: "90 days", tip: "Visa must be used within this validity period." },
        { icon: <FaCheckCircle />, title: "Entry", desc: "Multiple", tip: "Multiple entries allowed." },
        { icon: <MdPhoneIphone />, title: "Method", desc: "Paperless", tip: "Visa application is fully online." },
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
  </div>
              
              
          
            
                   
  
  
  
  
            {/* Emirates Section */}
            <div className="emirates-container">
              <h2>All 7 Emirates with 1 Visa</h2>
              <div className="emirates-grid">
                {emirates.map((emirate, index) => (
                  <div className="emirate-card" key={index}>
                    <img src={emirate.image} alt={emirate.name} />
                    <div className="emirate-name">{emirate.name}</div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Visa Requirements */}
            <div className="visa-container">
              <h2 className="section-title">Uzbekistan Visa Requirements</h2>
              <ul className="requirements">
                <li>📄 Passport</li>
              </ul>
  
              {/* Partners */}
              <h2 className="section-title">Partners We Work With</h2>
              <div className="partners">
                <img src="https://images.prismic.io/atlys/d6cb80c7-b854-430b-8582-47a9ee41e8d6_UAE+Ministry+of+Foreign+Affairs.png?auto=compress,format" alt="UAE Gov" />
                <img src="https://images.prismic.io/atlys/e0b0b285-555b-4d22-822b-7e06e4e6bf07_govDubai.png?auto=compress,format&rect=0,0,404,184&w=404&h=184" alt="Dubai Gov" />
                <img src="https://images.prismic.io/atlys/d5504196-40e8-41ba-a58d-768ccab8807d_iata.png?auto=compress,format&rect=0,0,356,240&w=356&h=240" alt="IATA" />
                <img src="https://images.prismic.io/atlys/1b957a44-9a9c-43a2-8644-bf918157abc2_image+%282%29.png?auto=compress,format" alt="Etihad" />
              </div>
  
              {/* Visa Process */}
              <h2 className="section-title">How Uzbekistan Visa Process Works</h2>
              <div className="timeline">
                <div className="step">
                  <div className="circle"></div>
                  <div className="content">
                    <h3>Step 1</h3>
                    <p><strong>Apply on Take-a-Trip</strong></p>
                    <p>Submit your documents on Take-a-trip — only pay government fee.</p>
                  </div>
                </div>
  
                <div className="step">
                  <div className="circle"></div>
                  <div className="content">
                    <h3>Step 2</h3>
                    <p><strong>Your Documents Are Verified</strong></p>
                    <p>Take-a-Trip verifies your documents and submits to Immigration.</p>
                  </div>
                </div>
  
                <div className="step">
                  <div className="circle"></div>
                  <div className="content">
                    <h3>Step 3</h3>
                    <p><strong>Your Visa Gets Processed</strong></p>
                    <p>We work with Immigration to ensure you get your Visa on time.</p>
                    <div className="status-box">
                      <p>📌 Application has been sent to the immigration supervisor</p>
                      <span>8 Jun, 5:45 AM ✅</span>
                      <p>📌 Application has been sent to internal intelligence</p>
                      <span>8 Jun, 5:45 AM ✅</span>
                    </div>
                  </div>
                </div>
  
                <div className="step">
                  <div className="circle"></div>
                  <div className="content">
                    <h3>Step 4</h3>
                    <p><strong>Get Your Visa on <span className="highlight">01 Oct, 10:25 AM</span></strong></p>
                    <div className="result-box">
                      <button className="btn green">Pay Take-a-Trip Fee</button>
                      <button className="btn blue">Take-a-Trip Fee Waived</button>
                      <button className="btn red">Government Fee Refunded</button>
                    </div>
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
                <h2>Statistics on Uzbekistan Visa</h2>
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
                <h2>Uzbekistan Visa Rejection Reasons</h2>
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
        <h3>Frequently Asked Questions</h3>
  
        {/* Buttons */}
        <div className="mb-3 d-flex flex-wrap gap-2">
          {faqData.map((faq) => (
            <button
              key={faq.id}
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleButtonClick(`collapse-${faq.id}`)}
            >
              {faq.title}
            </button>
          ))}
        </div>
  
        {/* Accordion */}
        <div className="accordion" id="faqAccordion" ref={accordionRef}>
          {faqData.map((faq, index) => (
            <div className="accordion-item" key={faq.id}>
              <h2 className="accordion-header" id={`heading-${faq.id}`}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"data-bs-target={`#collapse-${faq.id}`}
                 aria-expanded="false"
                  aria-controls={`collapse-${faq.id}`}
                >
                  {faq.title}
                </button>
              </h2>
              <div id={`collapse-${faq.id}`} className="accordion-collapse collapse" aria-labelledby={`heading-${faq.id}`} data-bs-parent="#faqAccordion">
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
    <iframe
  title="Uzbekistan Map"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps?q=Uzbekistan&output=embed"
/>

  
  
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
              Take-a-Trip has strict sourcing guidelines and relies on official government websites. 
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
  
  export default Uzbekistan;
  
  
  
