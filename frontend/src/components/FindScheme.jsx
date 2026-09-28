import { useEffect, useState } from "react";

import workerIllustration from "../assets/worker-illustration.png";
import { apiFetch, API_ENDPOINTS } from "../api/api";
import "./FindScheme.css";

function FindScheme() {
  const [selectedNeed, setSelectedNeed] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [schemes, setSchemes] = useState([]);
  const [loadingSchemes, setLoadingSchemes] = useState(true);
  const [schemeError, setSchemeError] = useState("");

  const [searchResults, setSearchResults] = useState([]);
const [hasSearched, setHasSearched] = useState(false);

const [selectedScheme, setSelectedScheme] = useState(null);

  const needs = [
    {
      value: "death",
      label: "Death assistance",
    },
    {
      value: "disability",
      label: "Disability support",
    },
    {
      value: "maternity",
      label: "Maternity support",
    },
    {
      value: "marriage",
      label: "Marriage assistance",
    },
    {
      value: "distress",
      label: "Distress relief",
    },
    {
      value: "artificial-limbs",
      label: "Artificial limb assistance",
    },
  ];

  const categories = [
    {
      value: "financial",
      label: "Financial Assistance",
    },
    {
      value: "medical",
      label: "Medical Support",
    },
    {
      value: "family",
      label: "Family & Social Support",
    },
    {
      value: "emergency",
      label: "Emergency Assistance",
    },
  ];

  const districts = [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hanumakonda",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Kumurambheem Asifabad",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal-Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri",
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
        console.error("Schemes API error:", error);

        setSchemeError("Unable to load welfare schemes.");
        setSchemes([]);
      })
      .finally(() => {
        setLoadingSchemes(false);
      });
  }, []);

  const handleFindSchemes = () => {
    let filteredSchemes = [...schemes];

    if (selectedNeed) {
      const needKeywords = {
        death: ["Accidental Death", "Natural Death"],
        disability: ["Disability", "Artifical Limbs"],
        maternity: ["Maternity"],
        marriage: ["Marriage"],
        distress: ["Distress"],
        "artificial-limbs": ["Artifical Limbs"],
      };

      const keywords = needKeywords[selectedNeed] || [];

      if (keywords.length > 0) {
        filteredSchemes = filteredSchemes.filter((scheme) =>
          keywords.some((keyword) =>
            scheme.name
              .toLowerCase()
              .includes(keyword.toLowerCase())
          )
        );
      }
    }

    /*
      Category and district are currently captured as search criteria
      because the schemes API does not provide authoritative category
      or district eligibility fields.
    */

    setSearchResults(filteredSchemes);
    setHasSearched(true);
  };

  return (
    <section
      id="find-scheme"
      className="dashboard-section"
    >
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          Find a Scheme
        </h2>

        <p className="dashboard-section__subtitle">
          Find the right welfare scheme based on your needs
        </p>
      </div>

      <div
  className={`dashboard-card find-scheme-card ${
    hasSearched ? "find-scheme-card--results" : ""
  }`}
>
        {/* LEFT CONTENT */}
        <div className="find-scheme-content">

          <div className="find-scheme-intro">
            <div className="find-scheme-intro__icon">
              👷
            </div>

            <div>
              <h3>
                Find the right welfare scheme
              </h3>

              <p>
                Based on your needs and eligibility
              </p>
            </div>
          </div>

          <div className="find-scheme-form">

            {/* NEED */}
            <div className="find-scheme-field">
              <label htmlFor="need-select">
                Select your need
              </label>

              <select
                id="need-select"
                value={selectedNeed}
                onChange={(event) =>
                  setSelectedNeed(event.target.value)
                }
              >
                <option value="">
                  Select your need
                </option>

                {needs.map((need) => (
                  <option
                    key={need.value}
                    value={need.value}
                  >
                    {need.label}
                  </option>
                ))}
              </select>
            </div>

            {/* CATEGORY */}
            <div className="find-scheme-field">
              <label htmlFor="category-select">
                Select category
              </label>

              <select
                id="category-select"
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
              >
                <option value="">
                  Select category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.value}
                    value={category.value}
                  >
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* DISTRICT */}
            <div className="find-scheme-field">
              <label htmlFor="district-select">
                Select district
              </label>

              <select
                id="district-select"
                value={selectedDistrict}
                onChange={(event) =>
                  setSelectedDistrict(event.target.value)
                }
              >
                <option value="">
                  Select district
                </option>

                {districts.map((district) => (
                  <option
                    key={district}
                    value={district}
                  >
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* FIND BUTTON */}
            <button
              type="button"
              className="find-scheme-button"
              onClick={handleFindSchemes}
              disabled={loadingSchemes || !!schemeError}
            >
              Find Schemes
              <span aria-hidden="true">
                →
              </span>
            </button>
          </div>

          {/* API LOADING STATE */}
          {loadingSchemes && (
            <div className="api-loading-state">
              Loading welfare schemes...
            </div>
          )}

          {/* API ERROR STATE */}
          {!loadingSchemes && schemeError && (
            <div className="api-error-state">
              {schemeError}
            </div>
          )}

          {/* API EMPTY STATE */}
          {!loadingSchemes &&
            !schemeError &&
            schemes.length === 0 && (
              <div className="api-empty-state">
                No welfare schemes are currently available.
              </div>
            )}

          {/* API SUCCESS COUNT */}
          {!loadingSchemes &&
            !schemeError &&
            schemes.length > 0 && (
              <div className="find-scheme-api-count">
                {schemes.length} welfare schemes available
              </div>
            )}

          {/* SEARCH SUMMARY */}
          {hasSearched &&
            !loadingSchemes &&
            !schemeError &&
            schemes.length > 0 && (
              <div className="find-scheme-search-summary">
                <strong>Search criteria:</strong>

                <span>
                  Need:{" "}
                  {selectedNeed
                    ? needs.find(
                        (need) =>
                          need.value === selectedNeed
                      )?.label
                    : "Any"}
                </span>

                <span>
                  Category:{" "}
                  {selectedCategory
                    ? categories.find(
                        (category) =>
                          category.value === selectedCategory
                      )?.label
                    : "Any"}
                </span>

                <span>
                  District: {selectedDistrict || "Any"}
                </span>
              </div>
            )}

          {/* SEARCH RESULTS */}
          {hasSearched &&
            !loadingSchemes &&
            !schemeError &&
            schemes.length > 0 && (
              <div className="find-scheme-results">
                <h4>
                  {searchResults.length} scheme
                  {searchResults.length !== 1 ? "s" : ""} found
                </h4>

                {searchResults.length === 0 ? (
                  <div className="api-empty-state">
                    No schemes match your selected criteria.
                  </div>
                ) : (
                  <div className="find-scheme-results-list">
                    {searchResults.map((scheme) => (
                      <div
                        className="find-scheme-result-item"
                        key={scheme.code}
                      >
                        <div className="find-scheme-result-icon">
                          ✓
                        </div>

                        <div className="find-scheme-result-content">
                          <strong>
                            {scheme.name}
                          </strong>

                          <span>
                            Scheme Code: {scheme.code}
                          </span>

                          <small>
                            Welfare support available under this scheme
                          </small>
                        </div>

                        <button
  type="button"
  className="find-scheme-result-button"
  onClick={() => setSelectedScheme(scheme)}
>
  View Details →
</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
        </div>

        {/* WORKER ILLUSTRATION */}
        <div className="find-scheme-illustration">
          <div className="find-scheme-illustration__image">
            <img
              src={workerIllustration}
              alt="Construction worker"
            />
          </div>

          <span>
            Welfare Support
          </span>
        </div>
      </div>
      {selectedScheme && (
  <div
    className="find-scheme-details-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="find-scheme-details-title"
  >
    <div className="find-scheme-details-modal">
      <div className="find-scheme-details-header">
        <div>
          <h3 id="find-scheme-details-title">
            Scheme Details
          </h3>

          <p>
            Welfare scheme information
          </p>
        </div>

        <button
          type="button"
          className="find-scheme-details-close"
          onClick={() => setSelectedScheme(null)}
          aria-label="Close scheme details"
        >
          ×
        </button>
      </div>

      <div className="find-scheme-details-content">
        <div className="find-scheme-detail-item">
          <span>Scheme Name</span>

          <strong>
            {selectedScheme.name || "—"}
          </strong>
        </div>

        <div className="find-scheme-detail-item">
          <span>Scheme Code</span>

          <strong>
            {selectedScheme.code ?? "—"}
          </strong>
        </div>

        <div className="find-scheme-detail-note">
          Scheme details currently available through the
          welfare schemes API are shown above.
        </div>
      </div>
    </div>
  </div>
)}
    </section>
  );
}

export default FindScheme;