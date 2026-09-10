export const services = [
  { symbol: "☁", title: "Cloud & Infrastructure", description: "Set up cloud foundations that are clear to operate, from AWS services and access controls to storage and networking.", tags: ["AWS", "EC2", "VPC"] },
  { symbol: "◇", title: "Docker & Containerization", description: "Package applications consistently, solve build and networking issues, and prepare containers for production.", tags: ["Docker", "Compose", "Swarm"] },
  { symbol: "↗", title: "CI/CD", description: "Automate releases so your team does not have to manually SSH into a server for every deployment.", tags: ["GitHub Actions", "Pipelines"] },
  { symbol: "▣", title: "Server & Linux Administration", description: "Configure Linux servers, Nginx, processes, networking, and the operational details behind reliable apps.", tags: ["Linux", "Nginx", "PM2"] },
  { symbol: "⌕", title: "Production Troubleshooting", description: "Find issues that sit between the application, containers, database, DNS, reverse proxy, and environment.", tags: ["Debugging", "Incident response"] },
  { symbol: "◫", title: "Database & Infrastructure", description: "Resolve connectivity and environment issues around PostgreSQL, MySQL, Redis, migrations, and backups.", tags: ["PostgreSQL", "MySQL", "Redis"] },
  { symbol: "⇄", title: "Deployment & Migration", description: "Move applications safely between environments and support staging, production cutovers, domains, and SSL.", tags: ["Staging", "SSL", "DNS"] },
  { symbol: "◎", title: "Infrastructure Consulting", description: "Review an existing setup and identify practical improvements for clarity, safety, and maintainability.", tags: ["Review", "Architecture"] }
];
export const caseStudies = [
  { title: "Production domain redirect debugging", problem: "A production application had a www-to-apex redirect issue.", investigation: "Reviewed DNS, domain configuration, and redirect behavior across the production path.", solution: "Corrected the responsible redirect and domain configuration.", result: "The intended domain behavior was restored and verified in production.", technologies: ["DNS", "Domains", "Redirects"] },
  { title: "Failed production pipeline investigation", problem: "A CI/CD workflow was failing and blocking a production deployment.", investigation: "Traced the pipeline and deployment path to isolate the underlying failure.", solution: "Resolved the deployment issue and restored the workflow.", result: "The deployment process was functioning again.", technologies: ["GitHub Actions", "Docker", "CI/CD"] },
  { title: "PostgreSQL / container connectivity", problem: "An application through PM2 could not reach its expected PostgreSQL database in Docker.", investigation: "Compared environment variables, container names, ports, and actual database names.", solution: "Identified discrepancies in the application-to-database configuration.", result: "The connection path could be aligned with the intended database service.", technologies: ["PostgreSQL", "Docker", "PM2", "Linux"] },
  { title: "Production 404 investigation", problem: "A production application began returning 404 responses.", investigation: "Investigated the live state and recent changes affecting application routing.", solution: "Identified the problematic merge, reverted it, and verified the application.", result: "The application was restored to a functioning production state.", technologies: ["Incident response", "Rollback", "Production"] },
  { title: "S3 + CloudFront infrastructure", problem: "Application assets and images needed a cloud delivery setup.", investigation: "Mapped the storage and delivery requirements for the application assets.", solution: "Configured an S3 bucket with a CloudFront distribution.", result: "A CDN-backed asset delivery path was established.", technologies: ["AWS S3", "CloudFront", "CDN"] },
  { title: "Multi-environment infrastructure", problem: "Development, QA, and production used different apps, ports, processes, databases, and proxies.", investigation: "Worked through environment boundaries, service mappings, and operating processes.", solution: "Supported the environment-specific infrastructure and deployment architecture.", result: "The moving parts of separate environments were managed with clearer isolation.", technologies: ["Nginx", "Containers", "Databases", "Networking"] }
];
export const projects = [
  { name: "Production Domain Recovery", private: true, description: "A live application had an incorrect www-to-apex redirect path. The work focused on restoring predictable domain behaviour without exposing client details.", role: "Investigated DNS and domain configuration, corrected the redirect path, and verified the production result.", technologies: ["DNS", "Domains", "Redirects"] },
  { name: "CI/CD Pipeline Recovery", private: true, description: "A failing deployment workflow was blocking a production release. The engagement focused on finding the failure in the delivery path and getting releases moving again.", role: "Traced the pipeline, resolved the deployment issue, and restored a working release workflow.", technologies: ["GitHub Actions", "Docker", "CI/CD"] },
  { name: "Multi-Environment Application Operations", private: true, description: "An application estate spanning development, QA, and production needed clearer service boundaries and dependable day-to-day operations.", role: "Supported environment-specific servers, proxies, containers, databases, ports, and deployment processes.", technologies: ["Nginx", "Docker", "PostgreSQL", "Linux"] }
];
type TechItem = { name: string; level?: "foundational" };
type TechGroup = { name: string; items: TechItem[] };

export const techGroups: TechGroup[] = [
  { name: "Cloud", items: ["AWS","EC2","S3","CloudFront","VPC","IAM","EBS","EFS","ECS"].map(name => ({ name })) },
  { name: "DevOps", items: ["Docker","Docker Compose","Docker Swarm","GitHub Actions","CI/CD","Terraform"].map(name => ({ name, level: name === "Terraform" ? "foundational" : undefined })) },
  { name: "Servers", items: ["Linux","Ubuntu","Nginx","PM2"].map(name => ({ name })) },
  { name: "Databases", items: ["PostgreSQL","MySQL","Redis"].map(name => ({ name })) },
  { name: "Development", items: ["Node.js","Next.js","React","PHP","Laravel","Python","FastAPI"].map(name => ({ name })) },
  { name: "Tools", items: ["Git","GitHub","pgAdmin","REST APIs"].map(name => ({ name })) }
];
