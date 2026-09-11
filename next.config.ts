import type { NextConfig } from "next";

const developmentEval = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";
const securityHeaders = [
  { key: "Content-Security-Policy", value: `default-src 'self'; script-src 'self' 'unsafe-inline'${developmentEval}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'` },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  poweredByHeader: false,
  agentRules: false,
  async headers() { return [{ source: "/:path*", headers: securityHeaders }]; },
};
export default nextConfig;
