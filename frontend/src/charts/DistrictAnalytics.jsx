import { useEffect, useState } from "react";
import { getDashboardDistricts } from "../api";

import TelanganaMap from "../components/TelanganaMap";
import TopDistricts from "../components/TopDistricts";

import "../styles/districts.css";

const districtNameByCode = {
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
  19: "Jangaon",
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

function DistrictAnalytics() {
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboardDistricts()
      .then((data) => {
        const workersByDistrict = Array.isArray(
          data?.workers_by_district
        )
          ? data.workers_by_district
          : [];

        const applicationsByDistrict = Array.isArray(
          data?.applications_by_district
        )
          ? data.applications_by_district
          : [];

        const workersMap = {};

        workersByDistrict.forEach((item) => {
          const code = Number(
            item.present_address_district ??
              item.present_addr_district
          );

          if (!Number.isNaN(code)) {
            workersMap[code] =
              Number(item.worker_count) || 0;
          }
        });

        const applicationsMap = {};

        applicationsByDistrict.forEach((item) => {
          const code = Number(
            item.worker__present_address_district ??
              item.worker__present_addr_district
          );

          if (!Number.isNaN(code)) {
            applicationsMap[code] =
              Number(item.application_count) || 0;
          }
        });

        const combinedData = Object.keys(
          districtNameByCode
        )
          .map(Number)
          .map((code) => ({
            districtCode: code,
            district: districtNameByCode[code],
            workers: workersMap[code] || 0,
            applications: applicationsMap[code] || 0,
          }))
          .filter(
            (item) =>
              item.workers > 0 ||
              item.applications > 0
          )
          .sort(
            (a, b) => b.workers - a.workers
          );

        setDistrictData(combinedData);
        setError("");
      })
      .catch((err) => {
        console.error(
          "District API error:",
          err
        );

        setDistrictData([]);
        setError(
          "Unable to load district data."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="dashboard-section district-analytics-section">
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          District-wise Registered Workers
        </h2>

        <p className="dashboard-section__subtitle">
          Worker registrations and welfare applications by district
        </p>
      </div>

      <div className="district-reference-card">

        {loading ? (
          <div className="api-loading-state">
            Loading district data...
          </div>
        ) : error ? (
          <div className="api-error-state">
            {error}
          </div>
        ) : districtData.length === 0 ? (
          <div className="api-empty-state">
            No district data available.
          </div>
        ) : (
          <div className="district-reference-layout">

            <div className="district-reference-map">
              <TelanganaMap />
            </div>

            <div className="district-reference-top">
              <TopDistricts />
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default DistrictAnalytics;