import type { Metadata } from "next";
import "./globals.css";
import "./refinement.css";

const siteUrl = "https://your-domain.example"; // Replace before deploying.

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Umair Malik | DevOps & Cloud Infrastructure Engineer",
  description: "DevOps engineer helping teams deploy, troubleshoot, and maintain production infrastructure with cloud, Docker, CI/CD, Linux, and AWS.",
  alternates: { canonical: "/" },
  openGraph: { title: "Umair Malik | DevOps & Cloud Infrastructure", description: "Reliable deployments, practical troubleshooting, and production infrastructure.", url: siteUrl, siteName: "Umair Malik", type: "website" },
  twitter: { card: "summary_large_image", title: "Umair Malik | DevOps & Cloud Infrastructure", description: "Reliable deployments and production infrastructure." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
