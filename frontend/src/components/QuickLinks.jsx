import { useEffect, useState } from "react";

import { apiFetch, API_ENDPOINTS } from "../api/api";
import "./QuickLinks.css";

function QuickLinks() {
  const [activeInfo, setActiveInfo] = useState(null);

  const [schemes, setSchemes] = useState([]);
  const [loadingSchemes, setLoadingSchemes] = useState(true);
  const [schemeError, setSchemeError] = useState("");

  const quickLinks = [
    {
      id: 1,
      icon: "📄",
      title: "View All Schemes",
      colorClass: "quick-link-blue",
      action: "schemes",
    },
    {
      id: 2,
      icon: "📋",
      title: "How to Apply?",
      colorClass: "quick-link-green",
      action: "apply",
    },
    {
      id: 3,
      icon: "👥",
      title: "Eligibility Criteria",
      colorClass: "quick-link-orange",
      action: "eligibility",
    },
    {
      id: 4,
      icon: "📑",
      title: "Required Documents",
      colorClass: "quick-link-purple",
      action: "documents",
    },
  ];

  useEffect(() => {
    setLoadingSchemes(true);
    setSchemeError("");

    apiFetch(API_ENDPOINTS.schemes)
      .then((data) => {
        const schemeList = Array.isArray(data)
          ? data
          : Array.isArray(data?.value)
          ? data.value
          : [];

        const validSchemes = schemeList
          .filter(
            (scheme) =>
              scheme?.scheme_desc &&
              scheme.scheme_desc.trim() !== ""
          )
          .map((scheme) => ({
            code: scheme.scheme_code,
            name: scheme.scheme_desc,
          }));

        setSchemes(validSchemes);
        setSchemeError("");
      })
      .catch((error) => {
        console.error("Quick Links schemes API error:", error);

        setSchemeError("Unable to load welfare schemes.");
        setSchemes([]);
      })
      .finally(() => {
        setLoadingSchemes(false);
      });
  }, []);

  const handleQuickLinkClick = (link) => {
    setActiveInfo(link.action);
  };

  const closeInfo = () => {
    setActiveInfo(null);
  };

  const getInfoContent = () => {
    switch (activeInfo) {
      case "schemes":
        return {
          title: "All Welfare Schemes",
          content:
            "The available welfare schemes are listed below.",
        };

      case "apply":
        return {
          title: "How to Apply?",
          content:
            "Select the welfare scheme that matches your requirement, review the eligibility conditions, prepare the required documents, and submit the application through the appropriate process.",
        };

      case "eligibility":
        return {
          title: "Eligibility Criteria",
          content:
            "Eligibility depends on the welfare scheme. Review the applicable scheme requirements before submitting an application.",
        };

      case "documents":
        return {
          title: "Required Documents",
          content:
            "Required documents may vary by scheme. Keep relevant identification, registration, bank, and supporting documents ready before applying.",
        };

      default:
        return null;
    }
  };

  const infoContent = getInfoContent();

  return (
    <section className="quick-links-section">
      <div className="quick-links-header">
        <h3>Quick Links</h3>

        <p>
          Access important welfare information
        </p>
      </div>

      <div className="quick-links-grid">
        {quickLinks.map((link) => (
          <button
            type="button"
            className={`quick-link-card ${link.colorClass}`}
            key={link.id}
            onClick={() => handleQuickLinkClick(link)}
          >
            <div className="quick-link-left">
              <span className="quick-link-icon">
                {link.icon}
              </span>

              <span className="quick-link-title">
                {link.title}
              </span>
            </div>

            <span
              className="quick-link-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        ))}
      </div>

      {infoContent && (
        <div className="quick-link-info-overlay">
          <div
            className="quick-link-info-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-link-info-title"
          >
            <div className="quick-link-info-header">
              <h4 id="quick-link-info-title">
                {infoContent.title}
              </h4>

              <button
                type="button"
                className="quick-link-info-close"
                onClick={closeInfo}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <p>{infoContent.content}</p>

            {/* ALL WELFARE SCHEMES */}
            {activeInfo === "schemes" && (
              <div className="quick-links-scheme-list">
                {loadingSchemes ? (
                  <div className="api-loading-state">
                    Loading welfare schemes...
                  </div>
                ) : schemeError ? (
                  <div className="api-error-state">
                    {schemeError}
                  </div>
                ) : schemes.length === 0 ? (
                  <div className="api-empty-state">
                    No welfare schemes available.
                  </div>
                ) : (
                  schemes.map((scheme) => (
                    <div
                      className="quick-links-scheme-item"
                      key={scheme.code}
                    >
                      <strong>
                        {scheme.name}
                      </strong>

                      <span>
                        Scheme Code: {scheme.code}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            <button
              type="button"
              className="quick-link-info-button"
              onClick={closeInfo}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default QuickLinks;