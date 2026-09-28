import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { getApplications } from "../api";

import "./RecentApplications.css";

const getApplicationStatus = (dclRemark) => {
  if (!dclRemark) {
    return "—";
  }

  const value = dclRemark.trim().toLowerCase();

  if (value === "approved") {
    return "Approved";
  }

  if (value === "accepted") {
    return "Accepted";
  }

  if (value === "reject" || value === "rejected") {
    return "Rejected";
  }

  if (value === "as per alo recommendation approved") {
    return "Approved";
  }

  return "—";
};

function RecentApplications() {
  const [applications, setApplications] = useState([]);
  const [allApplications, setAllApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [showAllApplications, setShowAllApplications] =
    useState(false);

  useEffect(() => {
    getApplications()
      .then((data) => {
        const applicationList = Array.isArray(data)
          ? data
          : Array.isArray(data.value)
          ? data.value
          : [];

        const latestApplications = [...applicationList]
          .sort(
            (a, b) =>
              new Date(b.created_dt) -
              new Date(a.created_dt)
          )
          .slice(0, 5);

        setAllApplications(applicationList);
        setApplications(latestApplications);
        setError("");
      })
      .catch((err) => {
        console.error(
          "Applications API error:",
          err
        );

        setApplications([]);
        setAllApplications([]);

        setError(
          "Unable to load applications."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };

  return (
    <section className="dashboard-section">
      {/* =====================================================
          SECTION HEADER
          ===================================================== */}
      <div className="applications-section-header">
  <div className="applications-section-heading">
    <h2 className="dashboard-section__title">
      Recent Scheme Applications
    </h2>

    <p className="dashboard-section__subtitle">
      Latest applications received under welfare schemes
    </p>
  </div>

  <button
    type="button"
    className="applications-view-all-button applications-view-all-button--header"
    onClick={() => setShowAllApplications(true)}
  >
    View All
  </button>
</div>

      {/* =====================================================
          MAIN APPLICATION CARD
          ===================================================== */}
      <div className="dashboard-card">
        <div className="applications-table-wrapper">

          {/* =================================================
              LOADING
              ================================================= */}
          {loading ? (
            <div className="api-loading-state">
              Loading applications...
            </div>

          /* =================================================
             ERROR
             ================================================= */
          ) : error ? (
            <div className="api-error-state">
              {error}
            </div>

          /* =================================================
             EMPTY
             ================================================= */
          ) : allApplications.length === 0 ? (
            <div className="api-empty-state">
              No applications available.
            </div>

          /* =================================================
             SUCCESS
             ================================================= */
          ) : (
            <>
              <table className="applications-table">
                <thead>
                  <tr>
                    <th>TRNO</th>
                    <th>Scheme Name</th>
                    <th>Application Date</th>
                    <th>Status</th>
                    <th>View</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id}>

                      {/* TRNO */}
                      <td>
                        {application.trno || "—"}
                      </td>

                      {/* SCHEME NAME */}
                      <td>
                        {application.scheme_name || "—"}
                      </td>

                      {/* APPLICATION DATE */}
                      <td>
                        {formatDate(
                          application.created_dt
                        )}
                      </td>

                      {/* STATUS */}
                      <td>
                        <span className="application-status">
                          {getApplicationStatus(
                            application.dcl_remark
                          )}
                        </span>
                      </td>

                      {/* VIEW */}
                      <td>
                        <button
                          type="button"
                          className="application-view-button"
                          onClick={() =>
                            setSelectedApplication(
                              application
                            )
                          }
                          aria-label={`View application ${
                            application.application_no || ""
                          }`}
                          title="View application"
                        >
                          👁
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

             
            </>
          )}
        </div>
      </div>

      {/* =====================================================
          APPLICATION DETAILS MODAL
          ===================================================== */}
      {selectedApplication &&
        createPortal(
          <div className="application-details-overlay">
            <div className="application-details-panel">

              <div className="application-details-header">
                <div>
                  <h3>
                    Application Details
                  </h3>

                  <p>
                    {selectedApplication.application_no ||
                      "Application"}
                  </p>
                </div>

                <button
                  type="button"
                  className="application-details-close"
                  onClick={() =>
                    setSelectedApplication(null)
                  }
                  aria-label="Close application details"
                >
                  ×
                </button>
              </div>

              <div className="application-details-grid">

                <div className="application-detail">
                  <span>
                    Application No.
                  </span>

                  <strong>
                    {selectedApplication.application_no ||
                      "—"}
                  </strong>
                </div>

                <div className="application-detail">
                  <span>TRNO</span>

                  <strong>
                    {selectedApplication.trno || "—"}
                  </strong>
                </div>

                <div className="application-detail">
                  <span>Worker</span>

                  <strong>
                    {selectedApplication.worker_name ||
                      "—"}
                  </strong>
                </div>

                <div className="application-detail">
                  <span>Welfare Scheme</span>

                  <strong>
                    {selectedApplication.scheme_name ||
                      "—"}
                  </strong>
                </div>

                <div className="application-detail">
                  <span>Subscheme</span>

                  <strong>
                    {selectedApplication.subscheme_name ||
                      "—"}
                  </strong>
                </div>

                <div className="application-detail">
                  <span>
                    Application Date
                  </span>

                  <strong>
                    {formatDate(
                      selectedApplication.created_dt
                    )}
                  </strong>
                </div>

                <div className="application-detail">
                  <span>Status</span>

                  <strong>
                    {getApplicationStatus(
                      selectedApplication.dcl_remark
                    )}
                  </strong>
                </div>

                <div className="application-detail">
                  <span>Remark</span>

                  <strong>
                    {selectedApplication.remark || "—"}
                  </strong>
                </div>

                <div className="application-detail">
                  <span>Board Remark</span>

                  <strong>
                    {selectedApplication.dcl_remark ||
                      "—"}
                  </strong>
                </div>

              </div>
            </div>
          </div>,
          document.body
        )}

      {/* =====================================================
          VIEW ALL APPLICATIONS MODAL
          ===================================================== */}
      {showAllApplications &&
        createPortal(
          <div className="application-details-overlay">
            <div className="applications-all-panel">

              <div className="application-details-header">
                <div>
                  <h3>
                    All Scheme Applications
                  </h3>

                  <p>
                    {allApplications.length} applications
                  </p>
                </div>

                <button
                  type="button"
                  className="application-details-close"
                  onClick={() =>
                    setShowAllApplications(false)
                  }
                  aria-label="Close all applications"
                >
                  ×
                </button>
              </div>

              <div className="applications-all-table-wrapper">

                {allApplications.length === 0 ? (
                  <div className="api-empty-state">
                    No applications available.
                  </div>
                ) : (
                  <table className="applications-table">
                    <thead>
                      <tr>
                        <th>TRNO</th>
                        <th>Scheme Name</th>
                        <th>Application Date</th>
                        <th>Status</th>
                        <th>View</th>
                      </tr>
                    </thead>

                    <tbody>
                      {allApplications.map(
                        (application) => (
                          <tr key={application.id}>

                            <td>
                              {application.trno || "—"}
                            </td>

                            <td>
                              {application.scheme_name ||
                                "—"}
                            </td>

                            <td>
                              {formatDate(
                                application.created_dt
                              )}
                            </td>

                            <td>
                              <span className="application-status">
                                {getApplicationStatus(
                                  application.dcl_remark
                                )}
                              </span>
                            </td>

                            <td>
                              <button
                                type="button"
                                className="application-view-button"
                                onClick={() => {
                                  setShowAllApplications(
                                    false
                                  );

                                  setSelectedApplication(
                                    application
                                  );
                                }}
                                aria-label={`View application ${
                                  application.application_no ||
                                  ""
                                }`}
                                title="View application"
                              >
                                👁
                              </button>
                            </td>

                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                )}

              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

export default RecentApplications;