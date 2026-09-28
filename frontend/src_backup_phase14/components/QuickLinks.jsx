import "./QuickLinks.css";

const links = [
  {
    title: "Worker Registration",
    description: "View registered construction workers",
    icon: "👷",
  },
  {
    title: "Welfare Schemes",
    description: "Explore available welfare schemes",
    icon: "🏛️",
  },
  {
    title: "Applications",
    description: "View welfare applications",
    icon: "📋",
  },
  {
    title: "District Analytics",
    description: "View district-wise statistics",
    icon: "📊",
  },
];

function QuickLinks() {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          Quick Links
        </h2>

        <p className="dashboard-section__subtitle">
          Frequently accessed dashboard sections
        </p>
      </div>

      <div className="quick-links">
        {links.map((link) => (
          <a
            href="#"
            className="quick-link"
            key={link.title}
          >
            <div className="quick-link__icon">
              {link.icon}
            </div>

            <div className="quick-link__content">
              <h3>{link.title}</h3>

              <p>{link.description}</p>
            </div>

            <span className="quick-link__arrow">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default QuickLinks;