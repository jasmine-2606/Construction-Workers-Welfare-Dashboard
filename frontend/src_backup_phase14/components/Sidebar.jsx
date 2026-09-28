import "./Sidebar.css";

const menuItems = [
  {
    label: "Dashboard",
    icon: "⌂",
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
    label: "Reports",
    icon: "📊",
  },
  {
    label: "About",
    icon: "ℹ",
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

        <p className="dashboard-sidebar__message-text">
          Supporting the welfare and development of construction workers.
        </p>
      </div>

      <div className="dashboard-sidebar__illustration">
  <div className="dashboard-sidebar__illustration-art">
    <span>👷</span>
    <span>🏗️</span>
    <span>🏠</span>
  </div>

  <div className="dashboard-sidebar__illustration-title">
    Construction Workers
  </div>

  <div className="dashboard-sidebar__illustration-text">
    Welfare &amp; Community Support
  </div>
</div>
    </aside>
  );
}

export default Sidebar;