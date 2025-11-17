import React, { useState } from "react";
import { Link } from "react-router-dom";


import axios from "axios";

function Home() {




  // === Countries & Stats (unchanged) ===
  const countries = [
    { name: "Dubai visa (UAE)", video: "/Videoes/dubai1.mp4", link: "/visa/Dubai" },
    { name: "Thailand", video: "/Videoes/thailand.avif", link: "/visa/Thailand" },
    { name: "Azerbaijan", video: "/Videoes/azerbaijan.jpg", link: "/visa/Azerbaijan" },
    { name: "Russia", video: "/Videoes/russia.jpg", link: "/visa/Russia" },
    { name: "Vietnam", video: "/Videoes/vietnam.mp4", link: "/visa/Vietnam" },
    { name: "Sri Lanka", video: "/Videoes/srilanka.mp4", link: "/visa/Srilanka" },
    { name: "Hong Kong SAR China", video: "/Videoes/hong kong.mp4", link: "/visa/Hongkong" },
    { name: "Uzbekistan", video: "/Videoes/uzbekistan.mp4", link: "/visa/Uzbekistan" },
    { name: "Combodia", video: "/Videoes/combodia.mp4", link: "/visa/Combodia" },
    { name: "Indonesia", video: "/Videoes/indonesia.mp4", link: "/visa/Indonesia" },
    { name: "Malasia", video: "/Videoes/malasia.mp4", link: "/visa/Malasia" },
    { name: "France", video: "/Videoes/france.mp4", link: "/visa/France" },
    { name: "United Kingdom", video: "/Videoes/unitedkingdom.mp4", link: "/visa/Uk" },
    { name: "Turkey", video: "/Videoes/turkey.mp4", link: "/visa/Turkey" },
    { name: "Australia", video: "/Videoes/austrailia.mp4", link: "/visa/Australia" },
    { name: "Japan", video: "/Videoes/japan.mp4", link: "/visa/Japan" },
    { name: "Italy", video: "/Videoes/italy.mp4", link: "/visa/Italy" },
    { name: "Germany", video: "/Videoes/german.mp4", link: "/visa/Germany" },
    { name: "Greece", video: "/Videoes/greece.mp4", link: "/visa/greece" },
    { name: "South Korea", video: "/Videoes/southkorea.mp4", link: "/visa/Southkorea" },
    { name: "Spain", video: "/Videoes/spain.mp4", link: "/visa/Spain" },
  ];

  const stats = [
    { value: "97.2%", title: "Visas on time", description: "Never miss your trip. Visas on Atlys come 2x faster" },
    { value: "7L+", title: "Visas Processed", description: "India's 2nd largest visa processing platform in just a year." },
    { value: "5.3 ⭐", title: "Rating", description: "Highest reviews across Trustpilot, app stores & experts" },
  ];

  return (
    <div className="home-container">
      {/* Banner */}
      <div className="banner position-relative">
        <img
          src="https://img.freepik.com/free-photo/tree-holiday-beautiful-summer-lagoon_1203-5340.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Banner"
          className="w-100"
        />
        <div className="banner-overlay text-center text-white">
          <h1>Your Visa, On Time.</h1>
          <p>Fast. Reliable. Trusted by millions worldwide.</p>
        </div>
      </div>

      {/* Countries */}
      <h2 className="section-title mt-5">Popular Destinations</h2>
      <div className="country-grid">
        {countries.map((country, index) => (
          <Link to={country.link} key={index} className="country-card">
            <video
              src={country.video}
              alt={country.name}
              autoPlay
              muted
              loop
              playsInline
              className="w-100 rounded"
            />
            <div className="country-info text-center mt-2">
              <h5>{country.name}</h5>
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <section className="stats d-flex justify-content-around flex-wrap mt-5">
        {stats.map((stat, index) => (
          <div className="stat-box text-center p-3 m-2 shadow rounded" key={index}>
            <h3>{stat.value}</h3>
            <h4>{stat.title}</h4>
            <p>{stat.description}</p>
          </div>
        ))}
      </section>

     
    </div>
  );
}

export default Home;
