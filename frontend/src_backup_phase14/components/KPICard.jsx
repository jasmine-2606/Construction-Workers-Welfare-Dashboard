import "./KPICard.css";

function KPICard({ title, value, subtitle, variant = "blue", icon }) {
  return (
    <div className={`kpi-card kpi-card--${variant}`}>
      <div className="kpi-card__top">
        <div className="kpi-card__icon">
          {icon}
        </div>
      </div>

      <div className="kpi-card__value">
        {value}
      </div>

      <div className="kpi-card__title">
        {title}
      </div>

      {subtitle && (
        <div className="kpi-card__subtitle">
          {subtitle}
        </div>
      )}
    </div>
  );
}

export default KPICard;