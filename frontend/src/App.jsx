import { useEffect, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import KPICard from "./components/KPICard";
import WorkerDemographics from "./charts/WorkerDemographics";
import SchemeAnalytics from "./charts/SchemeAnalytics";
import DistrictAnalytics from "./charts/DistrictAnalytics";
import RecentApplications from "./components/RecentApplications";
import FindScheme from "./components/FindScheme";
import QuickLinks from "./components/QuickLinks";
import Announcements from "./components/Announcements";
import DashboardTitle from "./components/DashboardTitle";
import WelfareBenefits from "./components/WelfareBenefits";
import { getDashboardOverview } from "./api";

import "./App.css";
import "./Phase15Layout.css";

function App() {
  const [dashboardData, setDashboardData] = useState({
    total_workers: null,
    total_applications: null,
    worker_change: null,
    application_change: null,
  });

  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overviewError, setOverviewError] = useState("");

  useEffect(() => {
    getDashboardOverview()
      .then((data) => {
        setDashboardData({
          total_workers: data.total_workers,
          total_applications: data.total_applications,
          worker_change: data.worker_change,
          application_change: data.application_change,
        });

        setOverviewError("");
      })
      .catch((error) => {
        console.error(
          "Failed to load dashboard overview:",
          error
        );

        setOverviewError(
          "Unable to load dashboard overview."
        );

        setDashboardData({
          total_workers: null,
          total_applications: null,
          worker_change: null,
          application_change: null,
        });
      })
      .finally(() => {
        setOverviewLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-app">

      {/* =====================================================
          GOVERNMENT HEADER
          ===================================================== */}
      <Header />

      {/* =====================================================
          MAIN DASHBOARD LAYOUT
          SIDEBAR + MAIN CONTENT
          ===================================================== */}
      <div className="dashboard-layout">

        {/* ===================================================
            SIDEBAR
            =================================================== */}
        <Sidebar />

        {/* ===================================================
            MAIN CONTENT
            =================================================== */}
        <main className="dashboard-main">

          {/* =================================================
              DASHBOARD TITLE
              ================================================= */}
          <DashboardTitle />

          {/* =================================================
              OVERVIEW API ERROR
              ================================================= */}
          {overviewError && (
            <div className="api-error-state">
              {overviewError}
            </div>
          )}

          {/* =================================================
              KPI ROW
              ================================================= */}
          <section className="kpi-section">

            <KPICard
              title="Registered Workers"
              value={
                overviewLoading
                  ? "Loading..."
                  : overviewError
                  ? "—"
                  : dashboardData.total_workers ?? "—"
              }
              subtitle="Registered construction workers"
              variant="blue"
              icon="👥"
              change={dashboardData.worker_change}
            />

            <KPICard
              title="Scheme Applications"
              value={
                overviewLoading
                  ? "Loading..."
                  : overviewError
                  ? "—"
                  : dashboardData.total_applications ?? "—"
              }
              subtitle="Welfare applications received"
              variant="green"
              icon="📄"
              change={dashboardData.application_change}
            />

            <KPICard
  title="Approved Applications"
  value="—"
  subtitle="Approved welfare applications"
  variant="purple"
  icon="✓"
/>

            <KPICard
              title="Total Benefits Amount"
              value="—"
              subtitle="Total welfare benefits amount"
              variant="orange"
              icon="₹"
            />

            <KPICard
              title="Active Schemes"
              value="—"
              subtitle="Currently active welfare schemes"
              variant="red"
              icon="👥"
            />

          </section>

          {/* =================================================
              ANALYTICS ROW
              ================================================= */}
          <section className="analytics-section">

            <div className="analytics-card">
              <WorkerDemographics />
            </div>

            <div className="analytics-card">
              <SchemeAnalytics />
            </div>

            <div className="analytics-card">
              <DistrictAnalytics />
            </div>

          </section>

          {/* =================================================
              LOWER CONTENT
              ================================================= */}
          <section className="lower-section">

            <RecentApplications />

            <FindScheme />

            <div className="lower-column">

              <QuickLinks />

              <Announcements />

            </div>

          </section>

          {/* =================================================
              WELFARE BENEFITS
              ================================================= */}
          <WelfareBenefits />

        </main>
      </div>
    </div>
  );
}

export default App;