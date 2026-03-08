const normalizeBaseUrl = (baseUrl) =>
  baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

const normalizePath = (path) => path.replace(/^\/+/, "");

const getRequestBody = (body, headers) => {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (body instanceof FormData || typeof body === "string") {
    return body;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return JSON.stringify(body);
};

export const buildApiUrl = (baseUrl, path) =>
  `${normalizeBaseUrl(baseUrl)}${normalizePath(path)}`;

export const apiRequest = async (baseUrl, path, options = {}) => {
  const { method = "GET", token, headers = {}, body } = options;
  const finalHeaders = new Headers(headers);

  if (token) {
    finalHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildApiUrl(baseUrl, path), {
    method,
    headers: finalHeaders,
    body: getRequestBody(body, finalHeaders),
  });

  const isJsonResponse = (response.headers.get("content-type") ?? "").includes(
    "application/json"
  );
  const payload = isJsonResponse ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && payload.message) ||
      `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};
