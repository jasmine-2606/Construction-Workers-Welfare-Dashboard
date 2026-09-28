import { useEffect, useMemo, useState } from "react";
import { getDashboardSchemes } from "../api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import "../styles/schemes.css";

function SchemeAnalytics() {
  const [schemeData, setSchemeData] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardSchemes()
      .then((data) => {
        const shortLabels = {
          1: "Accidental",
          2: "Disability",
          3: "Natural Death",
          4: "Maternity",
          9: "Marriage",
          12: "Distress",
          13: "Artificial Limbs",
        };

        const formattedData = Array.isArray(data.schemes)
          ? data.schemes
              .filter(
                (scheme) =>
                  Number(scheme.application_count) > 0
              )
              .map((scheme) => ({
                code: scheme.scheme_code,
                name: scheme.scheme_desc,
                shortName:
                  shortLabels[scheme.scheme_code] ||
                  scheme.scheme_desc ||
                  `Scheme ${scheme.scheme_code}`,
                applications:
                  Number(scheme.application_count) || 0,
              }))
          : [];

        setSchemeData(formattedData);
        setError("");
      })
      .catch((err) => {
        console.error("Scheme API error:", err);

        setSchemeData([]);
        setError("Unable to load scheme data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredSchemeData = useMemo(() => {
    if (selectedScheme === "all") {
      return schemeData;
    }

    return schemeData.filter(
      (scheme) =>
        String(scheme.code) === selectedScheme
    );
  }, [schemeData, selectedScheme]);

  return (
    <section className="dashboard-section scheme-analytics-section">

      {/* SECTION HEADER */}
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          Welfare Schemes Analytics
        </h2>

        <p className="dashboard-section__subtitle">
          Applications received across welfare schemes
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="dashboard-card scheme-analytics-card">

        <div className="dashboard-card__header">
          <div>
            <h3 className="dashboard-card__title">
              Scheme-wise Applications
            </h3>

            <p className="dashboard-card__subtitle">
              Applications received for each welfare scheme
            </p>
          </div>

          <div className="scheme-filter">
            <label htmlFor="scheme-select">
              Scheme
            </label>

            <select
              id="scheme-select"
              value={selectedScheme}
              onChange={(event) =>
                setSelectedScheme(event.target.value)
              }
            >
              <option value="all">
                All
              </option>

              {schemeData.map((scheme) => (
                <option
                  key={scheme.code}
                  value={String(scheme.code)}
                >
                  {scheme.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CHART */}
        <div className="scheme-chart">
          {loading ? (
            <div className="api-loading-state">
              Loading scheme data...
            </div>
          ) : error ? (
            <div className="api-error-state">
              {error}
            </div>
          ) : filteredSchemeData.length === 0 ? (
            <div className="api-empty-state">
              No scheme application data available.
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={150}
            >
              <BarChart
                data={filteredSchemeData}
                margin={{
                  top: 14,
                  right: 6,
                  left: -18,
                  bottom: 28,
                }}
                barCategoryGap="28%"
              >
                <CartesianGrid
                  stroke="#e5ebf2"
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="shortName"
                  interval={0}
                  tick={{
                    fontSize: 7,
                    fill: "#60758d",
                  }}
                  tickLine={false}
                  axisLine={{
                    stroke: "#d9e2ec",
                  }}
                />

                <YAxis
                  allowDecimals={false}
                  domain={[0, 10]}
                  ticks={[0, 2, 4, 6, 8, 10]}
                  tick={{
                    fontSize: 7,
                    fill: "#60758d",
                  }}
                  tickLine={false}
                  axisLine={false}
                  width={22}
                />

                <Tooltip
                  formatter={(value) => [
                    value,
                    "Applications",
                  ]}
                  labelFormatter={(label) =>
                    `Scheme: ${label}`
                  }
                  contentStyle={{
                    border: "1px solid #dbe3ec",
                    borderRadius: "6px",
                    fontSize: "9px",
                  }}
                />

                <Bar
                  dataKey="applications"
                  name="Applications"
                  fill="#1268d4"
                  radius={[3, 3, 0, 0]}
                  maxBarSize={24}
                >
                  <LabelList
                    dataKey="applications"
                    position="top"
                    fill="#17375e"
                    fontSize={7}
                    fontWeight={700}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
}

export default SchemeAnalytics;