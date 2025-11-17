export function getXsrfToken() {
  const cookies = document.cookie.split("; ");
  const xsrfCookie = cookies.find((cookie) => cookie.startsWith("XSRF-TOKEN="));

  if (!xsrfCookie) return null; // No token found
  const token = xsrfCookie.split("=")[1];
  return decodeURIComponent(token);
}
