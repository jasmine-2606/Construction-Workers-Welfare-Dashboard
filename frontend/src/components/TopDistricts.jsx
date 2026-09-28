import { useEffect, useState } from "react";

import { apiFetch, API_ENDPOINTS } from "../api/api";
import "./TopDistricts.css";

const districtNames = {
  1: "Adilabad",
  2: "Kumurambheem Asifabad",
  3: "Mancherial",
  4: "Nirmal",
  5: "Nizamabad",
  6: "Jagtial",
  7: "Peddapalli",
  8: "Jayashankar Bhupalpally",
  9: "Bhadradri Kothagudem",
  10: "Mahabubabad",
  11: "Warangal",
  12: "Hanumakonda",
  13: "Karimnagar",
  14: "Rajanna Sircilla",
  15: "Kamareddy",
  16: "Sangareddy",
  17: "Medak",
  18: "Siddipet",
  19: "Jangoan",
  20: "Yadadri Bhuvanagiri",
  21: "Medchal-Malkajgiri",
  22: "Hyderabad",
  23: "Rangareddy",
  24: "Vikarabad",
  25: "Mahabubnagar",
  26: "Jogulamba Gadwal",
  27: "Wanaparthy",
  28: "Nagarkurnool",
  29: "Nalgonda",
  30: "Suryapet",
  31: "Khammam",
  32: "Mulugu",
  33: "Narayanpet",
};

function TopDistricts() {
  const [topDistricts, setTopDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    apiFetch(API_ENDPOINTS.districts)
      .then((data) => {
        const districtData = Array.isArray(
          data?.workers_by_district
        )
          ? data.workers_by_district
          : [];

        const formatted = districtData
          .map((item) => {
            const code = Number(item.present_addr_district);

            return {
              code,
              name:
                districtNames[code] ||
                `District ${code}`,
              workers: Number(item.worker_count) || 0,
            };
          })
          .filter((district) => district.workers > 0)
          .sort((a, b) => {
            if (b.workers !== a.workers) {
              return b.workers - a.workers;
            }

            return a.code - b.code;
          })
          .slice(0, 5);

        setTopDistricts(formatted);
      })
      .catch((error) => {
        console.error(
          "Top districts API error:",
          error
        );

        setError("Unable to load district data.");
        setTopDistricts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="top-districts-card">
      <div className="top-districts-card__header">
        <h3>Top Districts</h3>

        <p>
          Districts with the highest registered workers
        </p>
      </div>

      {loading ? (
        <div className="api-loading-state">
          Loading district data...
        </div>
      ) : error ? (
        <div className="api-error-state">
          {error}
        </div>
      ) : topDistricts.length === 0 ? (
        <div className="api-empty-state">
          No district data available.
        </div>
      ) : (
        <div className="top-districts-list">
          {topDistricts.map((district, index) => (
            <div
              className="top-district-item"
              key={district.code}
            >
              <div className="top-district-rank">
                {index + 1}
              </div>

              <div className="top-district-info">
                <span className="top-district-name">
                  {district.name}
                </span>

                <span className="top-district-workers">
                  {district.workers} workers
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopDistricts;