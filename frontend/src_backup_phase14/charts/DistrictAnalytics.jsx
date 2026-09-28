import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../styles/districts.css";

const districtData = [
  {
    district: "District 99",
    workers: 42,
    applications: 18,
  },
];

function DistrictAnalytics() {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          District Analytics
        </h2>

        <p className="dashboard-section__subtitle">
          Worker registrations and welfare applications by district
        </p>
      </div>

      <div className="dashboard-grid dashboard-grid--2">
        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <div>
              <h3 className="dashboard-card__title">
                Workers by District
              </h3>

              <p className="dashboard-card__subtitle">
                Number of registered workers
              </p>
            </div>
          </div>

          <div className="district-chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="district" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="workers"
                  name="Workers"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <div>
              <h3 className="dashboard-card__title">
                Applications by District
              </h3>

              <p className="dashboard-card__subtitle">
                Linked welfare applications
              </p>
            </div>
          </div>

          <div className="district-chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="district" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="applications"
                  name="Applications"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DistrictAnalytics;