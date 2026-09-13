import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://umairops.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Umair Malik | DevOps & Infrastructure Engineer", template: "%s | Umair Malik" },
  description: "DevOps, cloud and infrastructure engineering by Umair Malik. Real work across Linux, Docker, AWS, CI/CD, Proxmox, networking, observability and production operations.",
  alternates: { canonical: "/" },
  openGraph: { title: "Umair Malik | DevOps & Cloud Infrastructure", description: "Reliable deployments, practical troubleshooting, and production infrastructure.", url: siteUrl, siteName: "Umair Malik", type: "website" },
  twitter: { card: "summary", title: "Umair Malik | DevOps & Infrastructure", description: "Linux, containers, cloud infrastructure and production operations." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const profile = { "@context": "https://schema.org", "@type": "Person", name: "Umair Malik", url: siteUrl, email: "mailto:umair%40umairops.com", jobTitle: "DevOps and Infrastructure Engineer", sameAs: ["https://www.linkedin.com/in/umair-ops/", "https://github.com/umairmalik904"], knowsAbout: ["Linux", "Docker", "AWS", "CI/CD", "Proxmox", "Networking", "Observability", "Production operations"] };
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }} /></body></html>;
}
