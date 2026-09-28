import "./WelfareBenefits.css";
import constructionBanner from "../assets/construction-banner.png";

function WelfareBenefits() {
  const benefits = [
  {
    id: 1,
    icon: "🛡",
    title: "Social Security",
    subtitle: "for Workers",
    colorClass: "welfare-benefit-blue",
  },
  {
    id: 2,
    icon: "👥",
    title: "Better Opportunities",
    subtitle: "for Families",
    colorClass: "welfare-benefit-green",
  },
  {
    id: 3,
    icon: "⚙",
    title: "Skill Development",
    subtitle: "for a Brighter Future",
    colorClass: "welfare-benefit-orange",
  },
  {
    id: 4,
    icon: "❤",
    title: "Healthy Workers",
    subtitle: "Stronger Telangana",
    colorClass: "welfare-benefit-red",
  },
];

  return (
    <section className="welfare-benefits-section">
  <div
    className="welfare-benefits-decoration"
    aria-hidden="true"
  >
    <img
      src={constructionBanner}
      alt=""
    />
  </div>
      <div className="welfare-benefits-header">
        <h2>Worker Welfare Benefits</h2>

        <p>
          Key areas of construction worker welfare support
        </p>
      </div>

      <div className="welfare-benefits-grid">
  {benefits.map((benefit) => (
    <div
      className={`welfare-benefit-card ${benefit.colorClass}`}
      key={benefit.id}
    >
      <div className="welfare-benefit-icon">
        {benefit.icon}
      </div>

      <div className="welfare-benefit-content">
        <h3>{benefit.title}</h3>

        <p>{benefit.subtitle}</p>
      </div>
    </div>
  
        ))}
      </div>
    </section>
  );
}

export default WelfareBenefits;