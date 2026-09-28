import "./Header.css";

function Header() {
  const handleSearch = () => {
    const schemeSection = document.getElementById("find-scheme");

    if (schemeSection) {
      schemeSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <>
      <header className="government-header">
        <div className="government-header__brand">
          <div className="government-header__logo">
            TG
          </div>

          <div className="government-header__identity">
            <div className="government-header__government">
              Government of Telangana
            </div>

            <h1 className="government-header__department">
              Labour, Employment, Training &amp; Factories Department
            </h1>

            <div className="government-header__motto">
              Welfare <span>|</span> Security <span>|</span> Dignity <span>|</span> Progress
            </div>
          </div>
        </div>

        <div className="government-header__actions">
          <button
  type="button"
  className="government-header__search"
  aria-label="Search"
  onClick={handleSearch}
>
  <span>⌕</span>
  <span>Search</span>
</button>

          <button
            type="button"
            className="government-header__action"
            aria-label="Notifications"
          >
            🔔
          </button>

          <button
            type="button"
            className="government-header__action government-header__profile"
            aria-label="User profile"
          >
            👤
          </button>
        </div>
      </header>

      <div className="government-banner">
        <div className="government-banner__content">
          <span className="government-banner__tag">
            CONSTRUCTION WORKERS WELFARE
          </span>

          <h2 className="government-banner__title">
            Empowering Workers, Strengthening Communities
          </h2>

          <p className="government-banner__text">
            Welfare, security and dignity for every registered construction worker.
          </p>
        </div>

        <div className="government-banner__illustration">
          <span>👷</span>
          <span>🏗️</span>
          <span>🏠</span>
        </div>
      </div>
    </>
  );
}

export default Header;