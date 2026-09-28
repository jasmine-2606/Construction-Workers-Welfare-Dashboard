import { useState } from "react";
import "./Announcements.css";

function Announcements() {
  const [showAllAnnouncements, setShowAllAnnouncements] =
    useState(false);

  const announcements = [
    {
      id: 1,
      text: "Maternity Benefit applications are now open for 2025.",
    },
    {
      id: 2,
      text: "Renewal of worker registration can be done online.",
    },
  ];

  return (
    <section className="announcements-section">
      <div className="announcements-card">

        <div className="announcements-header">
          <div className="announcements-title-wrapper">
            <span className="announcements-icon">
              📢
            </span>

            <div>
              <h3>Important Announcements</h3>

              <p>
                Important welfare dashboard updates
              </p>
            </div>
          </div>

          <button
            type="button"
            className="announcements-view-all"
            onClick={() => setShowAllAnnouncements(true)}
          >
            View All
          </button>
        </div>

        <div className="announcements-list">
          {announcements.map((announcement) => (
            <div
              className="announcement-item"
              key={announcement.id}
            >
              <span
                className="announcement-status-dot"
                aria-hidden="true"
              ></span>

              <p>{announcement.text}</p>
            </div>
          ))}
        </div>
      </div>

      {showAllAnnouncements && (
        <div className="announcements-modal-overlay">
          <div
            className="announcements-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcements-modal-title"
          >
            <div className="announcements-modal-header">
              <div className="announcements-title-wrapper">
                <span className="announcements-icon">
                  📢
                </span>

                <div>
                  <h3 id="announcements-modal-title">
                    Important Announcements
                  </h3>

                  <p>
                    All available welfare updates
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="announcements-modal-close"
                onClick={() => setShowAllAnnouncements(false)}
                aria-label="Close announcements"
              >
                ×
              </button>
            </div>

            <div className="announcements-modal-list">
              {announcements.map((announcement) => (
                <div
                  className="announcement-item"
                  key={announcement.id}
                >
                  <span
                    className="announcement-status-dot"
                    aria-hidden="true"
                  ></span>

                  <p>{announcement.text}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="announcements-modal-button"
              onClick={() => setShowAllAnnouncements(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Announcements;