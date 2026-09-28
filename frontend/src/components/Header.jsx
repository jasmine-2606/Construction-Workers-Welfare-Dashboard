import "./Header.css";

import { useState } from "react";

import telanganaEmblem from "../assets/telangana-emblem.png";
import constructionBanner from "../assets/construction-banner.png";

function Header() {
  const handleSearch = () => {
    const schemeSection =
      document.getElementById("find-scheme");

    if (schemeSection) {
      schemeSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* =====================================================
          GOVERNMENT HEADER
          ===================================================== */}

      <header className="government-header">

        {/* GOVERNMENT BRAND */}
        <div className="government-header__brand">

          <div
            className="government-header__logo"
            aria-label="Government of Telangana"
          >
            <img
              src={telanganaEmblem}
              alt="Government of Telangana emblem"
            />
          </div>

          <div className="government-header__identity">

            <div className="government-header__government">
              Government of Telangana
            </div>

            <h1 className="government-header__department">
              Labour, Employment, Training &amp; Factories Department
            </h1>

            <div className="government-header__motto">
              <span>Welfare</span>
              <span>|</span>
              <span>Security</span>
              <span>|</span>
              <span>Dignity</span>
              <span>|</span>
              <span>Progress</span>
            </div>

          </div>
        </div>

        {/* HEADER ACTIONS */}
        <div className="government-header__actions">

          {/* SEARCH */}
          <div className="government-header__search">

            <svg
              className="government-header__search-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />

              <path
                d="M16 16L21 21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="text"
              className="government-header__search-input"
              placeholder="Search schemes, workers, applications..."
              aria-label="Search schemes, workers and applications"
              onFocus={handleSearch}
            />

          </div>

          {/* NOTIFICATION */}
          <button
            type="button"
            className="government-header__action government-header__notification"
            aria-label="Notifications"
          >
            <svg
              className="government-header__icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M10 21h4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>

            <span className="government-header__notification-badge">
              3
            </span>
          </button>

          {/* PROFILE */}
          <button
            type="button"
            className="government-header__action government-header__profile"
            aria-label="User profile"
          >
            <svg
              className="government-header__icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="8"
                r="3.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <path
                d="M5.5 20c.7-3.3 3-5 6.5-5s5.8 1.7 6.5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

        </div>
      </header>

      {/* =====================================================
          CONSTRUCTION WORKERS BANNER
          ===================================================== */}

      <section className="government-banner">

        {/* BANNER TEXT */}
        <div className="government-banner__content">

          <span className="government-banner__tag">
            CONSTRUCTION WORKERS WELFARE
          </span>

          <h2 className="government-banner__title">
            Empowering Workers, Strengthening Communities
          </h2>

          <p className="government-banner__text">
            Welfare, security and dignity for every registered
            construction worker.
          </p>

        </div>

        {/* BANNER IMAGE */}
        <div
          className="government-banner__illustration"
          aria-label="Construction workers and Telangana infrastructure"
        >
          <img
            src={constructionBanner}
            alt="Construction workers and Telangana infrastructure"
          />
        </div>

      </section>
    </>
  );
}

export default Header;