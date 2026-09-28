import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../styles/schemes.css";

const schemeData = [
  {
    name: "Accidental Death",
    applications: 10,
  },
  {
    name: "Disability",
    applications: 1,
  },
  {
    name: "Natural Death",
    applications: 9,
  },
  {
    name: "Maternity",
    applications: 7,
  },
  {
    name: "Marriage Gift",
    applications: 4,
  },
  {
    name: "Distress Relief",
    applications: 1,
  },
  {
    name: "Artificial Limbs",
    applications: 0,
  },
];

function SchemeAnalytics() {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          Welfare Schemes Analytics
        </h2>

        <p className="dashboard-section__subtitle">
          Applications received across welfare schemes
        </p>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-card__header">
          <div>
            <h3 className="dashboard-card__title">
              Scheme-wise Applications
            </h3>

            <p className="dashboard-card__subtitle">
              Number of applications received for each welfare scheme
            </p>
          </div>
        </div>

        <div className="scheme-chart">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={schemeData}
              margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                angle={-25}
                textAnchor="end"
                interval={0}
              />

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
    </section>
  );
}

export default SchemeAnalytics;