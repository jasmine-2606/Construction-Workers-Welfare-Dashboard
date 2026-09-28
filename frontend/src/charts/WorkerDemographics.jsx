import { useEffect, useState } from "react";
import { getDashboardDemographics } from "../api";
import { getGenderLabel } from "../data/codeMappings";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../styles/demographics.css";

function WorkerDemographics() {
  const [genderData, setGenderData] = useState([]);
  const [genderLoading, setGenderLoading] = useState(true);
  const [genderError, setGenderError] = useState("");
  const [totalWorkers, setTotalWorkers] = useState(0);

  const getPercentage = (value) => {
    if (!totalWorkers) {
      return "0.0";
    }

    return ((value / totalWorkers) * 100).toFixed(1);
  };

  useEffect(() => {
    getDashboardDemographics()
      .then((data) => {
        const formattedGenderData = Array.isArray(data.gender)
          ? data.gender
              .map((item) => ({
                name: getGenderLabel(item.gender),
                value: Number(item.total),
              }))
              .filter((item) => item.value > 0)
          : [];

        const total = Array.isArray(data.gender)
          ? data.gender.reduce(
              (sum, item) => sum + Number(item.total),
              0
            )
          : 0;

        setGenderData(formattedGenderData);
        setTotalWorkers(total);
        setGenderError("");
      })
      .catch((error) => {
        console.error("Gender API error:", error);

        setGenderData([]);
        setTotalWorkers(0);
        setGenderError("Unable to load gender data.");
      })
      .finally(() => {
        setGenderLoading(false);
      });
  }, []);

  return (
    <section className="dashboard-section worker-demographics-section">
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          Worker Demographics
        </h2>

        <p className="dashboard-section__subtitle">
          Demographic overview of registered construction workers
        </p>
      </div>

      <div className="dashboard-card demographics-reference-card">
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
          {genderLoading ? (
            <div className="api-loading-state">
              Loading gender data...
            </div>
          ) : genderError ? (
            <div className="api-error-state">
              {genderError}
            </div>
          ) : genderData.length === 0 ? (
            <div className="api-empty-state">
              No gender data available.
            </div>
          ) : (
            <>
              <div className="gender-donut-wrapper">
                <ResponsiveContainer
                  width="100%"
                  height={118}
                >
                  <PieChart>
                    <Pie
                      data={genderData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={32}
                      outerRadius={49}
                      paddingAngle={1}
                      startAngle={90}
                      endAngle={-270}
                    >
                      {genderData.map((entry, index) => (
                        <Cell
                          key={`gender-cell-${index}`}
                          fill={
                            index === 0
                              ? "#2387e8"
                              : "#ef4b83"
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="gender-donut-center">
                  <strong>{totalWorkers}</strong>
                  <span>Workers</span>
                </div>
              </div>

              <div className="gender-legend">
                {genderData.map((item, index) => (
                  <div
                    className="gender-legend__item"
                    key={item.name}
                  >
                    <span
                      className="gender-legend__dot"
                      style={{
                        backgroundColor:
                          index === 0
                            ? "#2387e8"
                            : "#ef4b83",
                      }}
                    />

                    <span className="gender-legend__name">
                      {item.name}
                    </span>

                    <span className="gender-legend__value">
                      {item.value} ({getPercentage(item.value)}%)
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default WorkerDemographics;