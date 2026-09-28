import { useEffect, useMemo, useState } from "react";

import {
  GeoJSON,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import { apiFetch, API_ENDPOINTS } from "../api/api";

import "leaflet/dist/leaflet.css";
import "./TelanganaMap.css";

function DistrictSelector({ geoJsonData, selectedDistrict }) {
  const map = useMap();

  useEffect(() => {
    if (!geoJsonData || !selectedDistrict) {
      return;
    }

    const selectedFeature = geoJsonData.features.find(
      (feature) =>
        feature?.properties?.DISTRICT_N === selectedDistrict
    );

    if (!selectedFeature) {
      return;
    }

    const layer = L.geoJSON(selectedFeature);
    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [25, 25],
        maxZoom: 9,
      });
    }
  }, [geoJsonData, selectedDistrict, map]);

  return null;
}

function FitTelangana({ geoJsonData }) {
  const map = useMap();

  useEffect(() => {
    if (!geoJsonData) {
      return;
    }

    const layer = L.geoJSON(geoJsonData);
    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [10, 10],
      });
    }
  }, [geoJsonData, map]);

  return null;
}

function TelanganaMap() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  const [districtData, setDistrictData] = useState({});

  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [geoJsonLoading, setGeoJsonLoading] = useState(true);
  const [geoJsonError, setGeoJsonError] = useState("");

  const [districtLoading, setDistrictLoading] = useState(true);
  const [districtError, setDistrictError] = useState("");

  useEffect(() => {
    setGeoJsonLoading(true);
    setGeoJsonError("");

    fetch("/src/data/telangana-districts.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load Telangana GeoJSON");
        }

        return response.json();
      })
      .then((data) => {
        setGeoJsonData(data);
        setGeoJsonError("");
      })
      .catch((error) => {
        console.error("GeoJSON error:", error);

        setGeoJsonError(
          "Unable to load Telangana district map."
        );

        setGeoJsonData(null);
      })
      .finally(() => {
        setGeoJsonLoading(false);
      });
  }, []);

  useEffect(() => {
    setDistrictLoading(true);
    setDistrictError("");

    apiFetch(API_ENDPOINTS.districts)
      .then((data) => {
        const workerDistricts = Array.isArray(
          data?.workers_by_district
        )
          ? data.workers_by_district
          : [];

        const workerMap = {};

        workerDistricts.forEach((item) => {
          workerMap[item.present_addr_district] =
            Number(item.worker_count) || 0;
        });

        setDistrictData(workerMap);
        setDistrictError("");
      })
      .catch((error) => {
        console.error("District API error:", error);

        setDistrictError(
          "Unable to load district worker data."
        );

        setDistrictData({});
      })
      .finally(() => {
        setDistrictLoading(false);
      });
  }, []);

  const districtNames = useMemo(() => {
    if (!geoJsonData) {
      return [];
    }

    return geoJsonData.features
      .map((feature) => feature?.properties?.DISTRICT_N)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [geoJsonData]);

  const districtCodeByName = {
    Adilabad: 1,
    "Kumurambheem Asifabad": 2,
    Mancherial: 3,
    Nirmal: 4,
    Nizamabad: 5,
    Jagtial: 6,
    Peddapalli: 7,
    "Jayashankar Bhupalpally": 8,
    "Bhadradri Kothagudem": 9,
    Mahabubabad: 10,
    Warangal: 11,
    Hanumakonda: 12,
    Karimnagar: 13,
    "Rajanna Sircilla": 14,
    Kamareddy: 15,
    Sangareddy: 16,
    Medak: 17,
    Siddipet: 18,
    Jangoan: 19,
    "Yadadri Bhuvanagiri": 20,
    Medchal_Malkajgiri: 21,
    Hyderabad: 22,
    Rangareddy: 23,
    Vikarabad: 24,
    Mahabubnagar: 25,
    "Jogulamba Gadwal": 26,
    Wanaparthy: 27,
    Nagarkurnool: 28,
    Nalgonda: 29,
    Suryapet: 30,
    Khammam: 31,
    Mulugu: 32,
    Narayanpet: 33,
  };

  const getWorkerCount = (districtName) => {
    const districtCode = districtCodeByName[districtName];

    return districtData[districtCode] || 0;
  };

  const getDistrictColor = (workerCount) => {
    if (workerCount >= 8) return "#0b63ce";
    if (workerCount >= 6) return "#2f80d1";
    if (workerCount >= 4) return "#5c9cdb";
    if (workerCount >= 2) return "#8bb8e8";
    if (workerCount >= 1) return "#c4dcf3";

    return "#eef5fb";
  };

 const getDistrictStyle = (feature) => {
  const districtName = feature?.properties?.DISTRICT_N;

  const workerCount = getWorkerCount(districtName);

  const isSelected =
    selectedDistrict === districtName;

  return {
    fillColor: getDistrictColor(workerCount),
    weight: isSelected ? 2 : 0.8,
    opacity: 1,
    color: isSelected ? "#17375e" : "#b7c9dc",
    fillOpacity: isSelected ? 1 : 0.95,
  };
};

  const showDistrictLoading =
    districtLoading && !districtError;

  const showDistrictEmpty =
    !districtLoading &&
    !districtError &&
    Object.keys(districtData).length === 0;

  return (
    <div className="telangana-map">

      <div className="district-map-toolbar">
        <label htmlFor="district-select">
          Select District
        </label>

        <select
          id="district-select"
          value={selectedDistrict}
          onChange={(event) =>
            setSelectedDistrict(event.target.value)
          }
          disabled={!geoJsonData}
        >
          <option value="">
            All Districts
          </option>

          {districtNames.map((district) => (
            <option
              key={district}
              value={district}
            >
              {district.replaceAll("_", "-")}
            </option>
          ))}
        </select>
      </div>

      {/* GEOJSON ERROR */}
      {!geoJsonLoading && geoJsonError && (
        <div className="api-error-state">
          {geoJsonError}
        </div>
      )}

      {/* DISTRICT API STATE */}
      {showDistrictLoading && (
        <div className="api-loading-state">
          Loading district worker data...
        </div>
      )}

      {!districtLoading && districtError && (
        <div className="api-error-state">
          {districtError}
        </div>
      )}

      {showDistrictEmpty && (
        <div className="api-empty-state">
          No district worker data available.
        </div>
      )}

      <MapContainer
        center={[17.385, 78.4867]}
        zoom={7}
        scrollWheelZoom={false}
        className="telangana-map__container"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoJsonData && (
          <>
            {!selectedDistrict && (
              <FitTelangana
                geoJsonData={geoJsonData}
              />
            )}

            <DistrictSelector
              geoJsonData={geoJsonData}
              selectedDistrict={selectedDistrict}
            />

            <GeoJSON
              key={selectedDistrict}
              data={geoJsonData}
              style={getDistrictStyle}
              onEachFeature={(feature, layer) => {
                const districtName =
                  feature?.properties?.DISTRICT_N ||
                  "Unknown District";

                const workerCount =
                  getWorkerCount(districtName);

                layer.bindPopup(`
                  <div class="district-popup">
                    <div class="district-popup__title">
                      ${districtName.replaceAll("_", "-")}
                    </div>

                    <div class="district-popup__workers">
                      Registered Workers:
                      <strong>${workerCount}</strong>
                    </div>
                  </div>
                `);
              }}
            />
          </>
        )}
      </MapContainer>

      <div className="district-map-legend">
        <div className="district-map-legend__title">
          Registered Workers
        </div>

        <div className="district-map-legend__labels">
          <span>Low</span>
          <span>High</span>
        </div>

        <div className="district-map-legend__scale">
          <span
            className="legend-box"
            style={{ backgroundColor: "#eef5fb" }}
          />
          <span
            className="legend-box"
            style={{ backgroundColor: "#c4dcf3" }}
          />
          <span
            className="legend-box"
            style={{ backgroundColor: "#8bb8e8" }}
          />
          <span
            className="legend-box"
            style={{ backgroundColor: "#5c9cdb" }}
          />
          <span
            className="legend-box"
            style={{ backgroundColor: "#2f80d1" }}
          />
          <span
            className="legend-box"
            style={{ backgroundColor: "#0b63ce" }}
          />
        </div>

        <div className="district-map-legend__values">
          <span>0</span>
          <span>1</span>
          <span>2+</span>
          <span>4+</span>
          <span>6+</span>
          <span>8+</span>
        </div>
      </div>
    </div>
  );
}

export default TelanganaMap;