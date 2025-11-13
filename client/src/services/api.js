const baseUrl = import.meta.env.VITE_API_URL || "/api";

export function apiFetch(
  path,
  { method = "GET", body, token, isForm = false } = {}
) {
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!isForm) headers["Content-Type"] = "application/json";
  return fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  }).then(async (res) => {
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // Handle 401 authentication errors
      if (res.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      throw new Error(data.message || "Request failed");
    }
    return data;
  });
}
