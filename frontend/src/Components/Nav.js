import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Nav() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);

  const countries = [
    { name: "Dubai visa (UAE)", link: "/visa/Dubai" },
    { name: "Thailand", link: "/visa/thailand" },
    { name: "Russia", link: "/visa/russia" },
    { name: "Switzerland", link: "/visa/switzerland" },
    { name: "Vietnam", link: "/visa/vietnam" },
    { name: "Indonesia", link: "/visa/indonesia" },
    { name: "Oman", link: "/visa/oman" },
    { name: "United States", link: "/visa/usa" },
    { name: "Hong Kong SAR China", link: "/visa/hongkong" },
    { name: "Egypt", link: "/visa/egypt" },
    { name: "Sri Lanka", link: "/visa/srilanka" },
    { name: "Georgia", link: "/visa/georgia" },
    { name: "Azerbaijan", link: "/visa/azerbaijan" },
    { name: "France", link: "/visa/france" },
    { name: "Malaysia", link: "/visa/malaysia" },
    { name: "United Kingdom", link: "/visa/Uk" },
    { name: "Turkiye", link: "/visa/turkey" },
    { name: "Australia", link: "/visa/Australia" },
    { name: "Japan", link: "/visa/Japan" },
    { name: "Italy", link: "/visa/Italy" },
    { name: "Germany", link: "/visa/Germany" },
    { name: "Greece", link: "/visa/Greece" },
    { name: "South Korea", link: "/visa/Southkorea" },
    { name: "Spain", link: "/visa/Spain" },
  ];

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const handleSelect = (country) => {
    setQuery("");
    setShowSuggestions(false);
    navigate(country.link.toLowerCase()); // ✅ ensures correct navigation
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = countries.find(
      (c) => c.name.toLowerCase() === query.trim().toLowerCase()
    );

    if (country) {
      handleSelect(country);
    } else {
      navigate("/not-found");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ===== Top Header ===== */}
      <div className="top-header shadow-sm text-center position-relative">
        {/* User Icon */}
        <Link to="/Contact" className="top-user-icon position-absolute">
          <FaUser size={26} />
        </Link>

        {/* Logo + Heading */}
        <div className="header-content d-flex align-items-center justify-content-center gap-3">
      <img
  src="/Videoes/images/2.jpg"
  alt="Travel Logo"
  className="travel-logo"
/>

          <div>
            <h1 className="header-title mb-1">
              Visa <span className="highlight-text">on Time</span>, Every Time
            </h1>
            <p className="header-subtitle">
              “A journey of a thousand miles begins with a single step.”
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="search-form mt-3 w-100 px-4"
          ref={dropdownRef}
        >
          <div className="search-bar shadow-sm mx-auto position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Search your destination..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              autoComplete="off"
            />
            <button type="submit" className="search-btn">
              <FaSearch />
            </button>

            {/* Auto Suggestion */}
            {showSuggestions && query && (
              <ul className="autocomplete-list shadow rounded">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(country)}
                      className="autocomplete-item"
                    >
                      {country.name}
                    </li>
                  ))
                ) : (
                  <li className="autocomplete-item no-results">
                    No results found
                  </li>
                )}
              </ul>
            )}
          </div>
        </form>

        <div className="header-outline"></div>
      </div>

      {/* ===== Navbar ===== */}
      <nav className="navbar-main shadow-sm mt-3">
        <div className="container navbar-container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            VisaPortal
          </Link>

          <ul className="nav-links d-flex gap-3">
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/about">About Us</Link></li>
            <li><Link className="nav-link" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="nav-link" to="/termscondition">Terms & Condition</Link></li>
            <li><Link className="nav-link" to="/contact">Contact</Link></li>
            <li><Link className="nav-link" to="/reviews">Reviews</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
