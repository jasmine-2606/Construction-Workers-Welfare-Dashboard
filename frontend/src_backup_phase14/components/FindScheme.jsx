import { useState } from "react";
import "./FindScheme.css";

const schemes = [
  {
    code: 1,
    name: "Accidental Death & Funeral Expenses",
    applications: 10,
    description:
      "Financial assistance available under accidental death welfare support.",
    subschemes: [
      "Fatall Accident Relief (Accidental Death)",
    ],
  },
  {
    code: 2,
    name: "Disability",
    applications: 1,
    description:
      "Welfare assistance available for eligible construction workers with disability.",
    subschemes: [
      "Total Permanent Disability",
      "50% & above Partial Permanent",
      "26% to 49% Partial Permanent Disability",
      "Up to 25% Partial Permanent Disability",
    ],
  },
  {
    code: 3,
    name: "Natural Death & Funeral Expenses",
    applications: 9,
    description:
      "Financial assistance available for eligible natural death cases.",
    subschemes: [
      "Natural Death",
    ],
  },
  {
    code: 4,
    name: "Maternity Benefit",
    applications: 7,
    description:
      "Maternity welfare assistance available to eligible workers and dependents.",
    subschemes: [
      "1st Maternity benefit for wife or self",
      "2nd Maternity benefit for wife or self",
      "1st Maternity Benefit for First Daughter",
      "2nd Maternity Benefit for First Daughter",
      "1st Maternity Benefit for Second Daughter",
      "2nd Maternity Benefit for Second Daughter",
    ],
  },
  {
    code: 9,
    name: "Marriage Gift",
    applications: 4,
    description:
      "Marriage assistance available under the construction workers welfare programme.",
    subschemes: [
      "Marriage Gift for First Daughter",
      "Marriage Gift for Second Daughter",
      "Marriage Gift for unmarried women worker",
    ],
  },
  {
    code: 12,
    name: "Application for Claiming of Distress relief",
    applications: 1,
    description:
      "Distress relief assistance available for eligible workers.",
    subschemes: [
      "Loss of earning during medical treatment",
    ],
  },
  {
    code: 13,
    name: "Sanction of Artifical Limbs",
    applications: 0,
    description:
      "Assistance for eligible workers requiring artificial limbs.",
    subschemes: [
      "Sanction of Artifical Limbs",
    ],
  },
];

function FindScheme() {
  const [selectedCode, setSelectedCode] = useState("");

  const selectedScheme = schemes.find(
    (scheme) => scheme.code === Number(selectedCode)
  );

  return (
    <section
  id="find-scheme"
  className="dashboard-section"
>
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          Find a Welfare Scheme
        </h2>

        <p className="dashboard-section__subtitle">
          Explore available welfare schemes and their benefits
        </p>
      </div>

      <div className="dashboard-card">
        <div className="find-scheme__controls">
          <label htmlFor="scheme-select">
            Select a welfare scheme
          </label>

          <select
            id="scheme-select"
            value={selectedCode}
            onChange={(event) => setSelectedCode(event.target.value)}
          >
            <option value="">
              Select a scheme
            </option>

            {schemes.map((scheme) => (
              <option key={scheme.code} value={scheme.code}>
                {scheme.name}
              </option>
            ))}
          </select>
        </div>

        {selectedScheme ? (
          <div className="find-scheme__result">
            <div className="find-scheme__result-header">
              <div>
                <span className="find-scheme__code">
                  Scheme {selectedScheme.code}
                </span>

                <h3>{selectedScheme.name}</h3>
              </div>

              <div className="find-scheme__applications">
                <strong>{selectedScheme.applications}</strong>
                <span>Applications</span>
              </div>
            </div>

            <p className="find-scheme__description">
              {selectedScheme.description}
            </p>

            <div className="find-scheme__subschemes">
              <h4>Available Subschemes</h4>

              <ul>
                {selectedScheme.subschemes.map((subscheme) => (
                  <li key={subscheme}>
                    {subscheme}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="find-scheme__empty">
            Select a scheme above to view its details.
          </div>
        )}
      </div>
    </section>
  );
}

export default FindScheme;