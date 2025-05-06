const API_BASE = "http://localhost:8000";

export async function fetchReports() {
  const res = await fetch(`${API_BASE}/reports`);
  return res.json();
}

export async function submitBug(data) {
  const res = await fetch(`${API_BASE}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
