export function embedSecurityHeaders(response: Response, origin = 'http://localhost:5173'): Response {
  let headers;

  if (response.headers != undefined) {
    headers = new Headers(response.headers);
  } else {
    headers = new Headers();
  }

  //headers.set('Access-Control-Allow-Origin', origin);
  //headers.set('Access-Control-Allow-Credentials', 'true');
  headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  headers.set('Content-type', "application/json");
  headers.set('X-Content-Type-Options', "nosniff");

  //New 

  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  // Ensure caches know the response varies by Origin.
  headers.append("Vary", "Origin");

  /* ---------- Core security headers ---------- */
  headers.set("Strict-Transport-Security", "max-age=900; includeSubDomains; preload");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data:; " +
    "font-src 'self'; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none';"
  );
  headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), fullscreen=(), payment=()"
  );
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-XSS-Protection", "0");
  headers.set("Cache-Control", "no-store");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
