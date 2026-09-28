import "./Announcements.css";

const announcements = [
  {
    title: "Welfare scheme applications are being monitored",
    date: "Dashboard Update",
  },
  {
    title: "Worker registration statistics are available",
    date: "Information",
  },
  {
    title: "District-wise welfare data is available",
    date: "Analytics",
  },
];

function Announcements() {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          Announcements
        </h2>

        <p className="dashboard-section__subtitle">
          Important welfare dashboard updates
        </p>
      </div>

      <div className="dashboard-card">
        <div className="announcements-list">
          {announcements.map((announcement, index) => (
            <div
              className="announcement-item"
              key={index}
            >
              <div className="announcement-item__icon">
                !
              </div>

              <div className="announcement-item__content">
                <h3>{announcement.title}</h3>

                <span>{announcement.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Announcements;