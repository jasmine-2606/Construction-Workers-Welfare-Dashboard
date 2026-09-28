import "./WelfareBenefits.css";

const benefits = [
  {
    title: "Financial Assistance",
    description:
      "Support available through eligible construction worker welfare schemes.",
    icon: "₹",
    variant: "orange",
  },
  {
    title: "Health & Disability",
    description:
      "Welfare support for disability, medical needs and eligible assistance.",
    icon: "♥",
    variant: "red",
  },
  {
    title: "Family Welfare",
    description:
      "Benefits supporting maternity, marriage and eligible family needs.",
    icon: "👨‍👩‍👧",
    variant: "pink",
  },
  {
    title: "Worker Support",
    description:
      "Training, skills and other welfare support for registered workers.",
    icon: "👷",
    variant: "blue",
  },
];

function WelfareBenefits() {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          Worker Welfare Benefits
        </h2>

        <p className="dashboard-section__subtitle">
          Key areas of construction worker welfare support
        </p>
      </div>

      <div className="welfare-benefits">
        {benefits.map((benefit) => (
          <div
            className={`welfare-benefit welfare-benefit--${benefit.variant}`}
            key={benefit.title}
          >
            <div className="welfare-benefit__icon">
              {benefit.icon}
            </div>

            <div className="welfare-benefit__content">
              <h3>{benefit.title}</h3>

              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WelfareBenefits;