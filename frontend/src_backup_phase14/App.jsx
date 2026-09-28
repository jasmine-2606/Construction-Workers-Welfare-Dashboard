import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import KPICard from "./components/KPICard";
import WorkerDemographics from "./charts/WorkerDemographics";
import SchemeAnalytics from "./charts/SchemeAnalytics";
import DistrictAnalytics from "./charts/DistrictAnalytics";
import TelanganaMap from "./components/TelanganaMap";
import RecentApplications from "./components/RecentApplications";
import FindScheme from "./components/FindScheme";
import QuickLinks from "./components/QuickLinks";
import Announcements from "./components/Announcements";
import DashboardTitle from "./components/DashboardTitle";
import WelfareBenefits from "./components/WelfareBenefits";
import "./App.css";

function App() {
  return (
    <div className="dashboard-layout">
      <Header />

<DashboardTitle />

<div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-main">
          <section className="dashboard-section">
            <div className="dashboard-section__header">
              <h2 className="dashboard-section__title">
                Construction Workers Welfare Dashboard
              </h2>

              <p className="dashboard-section__subtitle">
                Overview of registered workers, welfare schemes and applications
              </p>
            </div>

            <div className="dashboard-grid dashboard-grid--4">
              <KPICard
                title="Total Workers"
                value="42"
                subtitle="Registered construction workers"
                variant="blue"
                icon="👷"
              />

              <KPICard
                title="Welfare Schemes"
                value="14"
                subtitle="Available welfare schemes"
                variant="green"
                icon="🏛️"
              />

              <KPICard
                title="Applications"
                value="32"
                subtitle="Welfare applications received"
                variant="purple"
                icon="📋"
              />

              <KPICard
                title="Subschemes"
                value="26"
                subtitle="Welfare scheme categories"
                variant="orange"
                icon="📊"
              />
            </div>
          </section>
          <WorkerDemographics />

          <SchemeAnalytics />
          <DistrictAnalytics />
          <section className="dashboard-section">
  <div className="dashboard-section__header">
    <h2 className="dashboard-section__title">
      Telangana District Map
    </h2>

    <p className="dashboard-section__subtitle">
      Geographic view of construction worker welfare data
    </p>
  </div>

  <div className="dashboard-card">
    <TelanganaMap />
  </div>
</section>
<RecentApplications />
<FindScheme />
<div className="dashboard-grid dashboard-grid--2">
  <QuickLinks />
  <Announcements />
</div>
<WelfareBenefits />
          
        </main>
      </div>
    </div>
  );
}

export default App;