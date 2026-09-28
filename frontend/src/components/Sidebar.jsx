import "./Sidebar.css";
import workerIllustration from "../assets/worker-illustration.png";

const menuItems = [
  {
    label: "Dashboard",
    icon: "🏠",
    active: true,
  },
  {
    label: "Workers",
    icon: "👤",
  },
  {
    label: "Schemes",
    icon: "💼",
  },
  {
    label: "Applications",
    icon: "📄",
  },
  {
    label: "District Analysis",
    icon: "📍",
  },
  {
    label: "Find a Scheme",
    icon: "🔍",
  },
  {
    label: "Reports & Analytics",
    icon: "📊",
  },
  {
    label: "About",
    icon: "ℹ️",
  },
];

function Sidebar() {
  const handleFindScheme = () => {
    const schemeSection = document.getElementById("find-scheme");

    if (schemeSection) {
      schemeSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__menu">
        <div className="dashboard-sidebar__heading">
          Dashboard Menu
        </div>

        <nav className="dashboard-sidebar__nav">
          {menuItems.map((item) => (
  <button
    type="button"
    key={item.label}
    className={`dashboard-sidebar__item ${
      item.active ? "dashboard-sidebar__item--active" : ""
    }`}
    onClick={
      item.label === "Find a Scheme"
        ? handleFindScheme
        : undefined
    }
  >
              <span className="dashboard-sidebar__icon">
                {item.icon}
              </span>

              <span className="dashboard-sidebar__label">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="dashboard-sidebar__message">
  <div className="dashboard-sidebar__message-title">
    Empowered Workers
  </div>

  <div className="dashboard-sidebar__message-title">
    Stronger Communities
  </div>
</div>

<div className="dashboard-sidebar__illustration">
  <div className="dashboard-sidebar__illustration-art">
    <img
      src={workerIllustration}
      alt="Construction worker"
    />
  </div>

  <div className="dashboard-sidebar__illustration-title">
    Safe Workers
  </div>

  <div className="dashboard-sidebar__illustration-text">
    Prosperous Telangana
  </div>
</div>

  <div className="dashboard-sidebar__illustration-title">
    Construction Workers
  </div>

  <div className="dashboard-sidebar__illustration-text">
    Welfare &amp; Community Support
  </div>

    </aside>
  );
}

export default Sidebar;