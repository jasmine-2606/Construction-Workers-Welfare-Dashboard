import "./KPICard.css";

function KPICard({
  title,
  value,
  subtitle,
  variant = "blue",
  icon,
  change,
}) {
  return (
    <div className={`kpi-card kpi-card--${variant}`}>
      <div className="kpi-card__icon">
        {icon}
      </div>

      <div className="kpi-card__content">
        <div className="kpi-card__title">
          {title}
        </div>

        <div className="kpi-card__bottom">
          <div className="kpi-card__value">
            {value}
          </div>

          {change !== null && change !== undefined && (
            <div
              className={`kpi-card__change ${
                change >= 0
                  ? "kpi-card__change--positive"
                  : "kpi-card__change--negative"
              }`}
            >
              <span aria-hidden="true">
                {change >= 0 ? "↑" : "↓"}
              </span>

              <span>
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>

        {subtitle && (
          <div className="kpi-card__subtitle">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

export default KPICard;