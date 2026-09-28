import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import "../styles/demographics.css";

const genderData = [
  { name: "Male", value: 41 },
  { name: "Female", value: 1 },
];

const ageData = [
  { name: "18-25", value: 4 },
  { name: "26-35", value: 12 },
  { name: "36-45", value: 17 },
  { name: "46-55", value: 9 },
  { name: "56+", value: 0 },
];

function WorkerDemographics() {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          Worker Demographics
        </h2>

        <p className="dashboard-section__subtitle">
          Demographic overview of registered construction workers
        </p>
      </div>

      <div className="dashboard-grid dashboard-grid--2">
        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <div>
              <h3 className="dashboard-card__title">
                Gender Distribution
              </h3>

              <p className="dashboard-card__subtitle">
                Registered workers by gender
              </p>
            </div>
          </div>

          <div className="demographics-chart">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  <Cell />
                  <Cell />
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card__header">
            <div>
              <h3 className="dashboard-card__title">
                Age Distribution
              </h3>

              <p className="dashboard-card__subtitle">
                Workers grouped by age
              </p>
            </div>
          </div>

          <div className="demographics-chart">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkerDemographics;