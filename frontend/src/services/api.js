const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getDashboardOverview() {
  const response = await fetch(
    `${API_BASE_URL}/dashboard/overview/`
  );

  if (!response.ok) {
    throw new Error(
      `Dashboard overview request failed: ${response.status}`
    );
  }

  return response.json();
}

export async function getDashboardDemographics() {
  const response = await fetch(
    `${API_BASE_URL}/dashboard/demographics/`
  );

  if (!response.ok) {
    throw new Error(
      `Dashboard demographics request failed: ${response.status}`
    );
  }

  return response.json();
}