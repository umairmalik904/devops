import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { techGroups } from "../data/portfolio";
import { publishedProjects } from "../lib/store";
import { Header, Footer } from "./components/chrome";
import { Topology, Flow } from "./components/topology";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await publishedProjects();
  const featured = projects[0];
  return <>
    <Header />
    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-meta"><span className="eyebrow">DEVOPS / CLOUD / INFRASTRUCTURE</span><span className="meta-secondary">Production systems & operations</span></div>
        <h1 id="hero-title">Umair Malik<span>DevOps & Infrastructure Engineer.</span></h1>
        <p className="hero-description">Building, operating and troubleshooting the systems behind production applications. From Linux and containers to the networks, databases and signals that connect them.</p>
        <div className="hero-actions"><a className="button primary" href="#work">Explore my work <ArrowRight size={17} /></a><Link className="text-link" href="/contact">Get in touch <ArrowUpRight size={17} /></Link></div>
        <div className="hero-foot"><span>Linux. Containers. Networks. Production.</span><a href="#work">Selected engineering work <span aria-hidden="true">↓</span></a></div>
      </section>
      <section className="work-band" id="work" aria-labelledby="work-title"><div className="wrap">
        <div className="section-head"><span className="section-index">01 / SELECTED WORK</span><h2 id="work-title">Inside the infrastructure.</h2><p>Application systems, network boundaries and the work of keeping production understandable.</p></div>
        {featured && <article className="flagship">
          <div className="project-heading"><div><p className="eyebrow">{featured.category}</p><h3><Link href={`/work/${featured.id}`}>{featured.title}</Link></h3></div><Link className="round-link" href={`/work/${featured.id}`} aria-label="Read the Reflys distributed infrastructure case study"><ArrowUpRight size={24} /></Link></div>
          <p className="project-summary">{featured.summary}</p><Topology />
          <div className="project-bottom"><span>Docker / Linux / PostgreSQL / Cassandra / Redis / Kafka</span><Link className="text-link" href={`/work/${featured.id}`}>Read case study <ArrowRight size={17} /></Link></div>
        </article>}
        <div className="featured-pair">{projects.slice(1, 3).map((p, i) => <article className="featured-project" key={p.id}>
          <p className="eyebrow">{p.category}</p><h3><Link href={`/work/${p.id}`}>{p.title}</Link></h3><p>{p.summary}</p>
          <Flow nodes={i === 0 ? ["Application logs", "Alloy", "Loki", "Grafana"] : ["Node 01", "Node 02", "Node 03"]} label={i === 0 ? "Log collection architecture" : "Three-node Proxmox cluster"} cluster={i === 1} />
          <Link className="text-link" href={`/work/${p.id}`}>Read case study <ArrowRight size={17} /></Link>
        </article>)}</div>
        <div className="work-list">{projects.slice(3).map((p, i) => <Link className="work-row" href={`/work/${p.id}`} key={p.id}><span className="row-number">{String(i + 4).padStart(2, "0")}</span><div><h3>{p.title}</h3><p>{p.summary}</p></div><span className="row-category">{p.category}</span><ArrowUpRight size={21} /></Link>)}</div>
      </div></section>
      <section className="wrap section-space" id="infrastructure" aria-labelledby="infra-title"><div className="section-head"><span className="section-index">02 / INFRASTRUCTURE</span><h2 id="infra-title">The stack, in context.</h2><p>Tools I work with across application delivery, infrastructure operations and diagnosis.</p></div><div className="stack-list">{techGroups.map((group) => <div className="stack-row" key={group.name}><h3>{group.name}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section>
      <section className="about-band" id="about" aria-labelledby="about-title"><div className="wrap about-layout"><div><span className="section-index">03 / ENGINEERING PRACTICE</span><h2 id="about-title">Close to the systems.<br />Accountable for the details.</h2></div><div className="about-copy"><p className="large-copy">I work where applications meet infrastructure.</p><p>My experience spans distributed Docker workloads, Linux administration, cloud networking, database infrastructure and observability. I work through the layers beneath an application: how traffic reaches it, how services communicate, where data lives and what the logs actually say.</p><p>That has meant investigating client IP handling behind an AWS load balancer, operating a three-node Proxmox cluster, building log collection with Alloy and Loki, and automating deployments through self-hosted runners.</p><p>I bring that same hands-on approach to migrations, mail platforms, SSH hardening and production troubleshooting.</p><a className="text-link" href="https://www.linkedin.com/in/umair-ops/" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={17} /></a></div></div></section>
      <section className="wrap contact-strip" id="contact"><span className="section-index">04 / CONTACT</span><div><h2>Let’s talk infrastructure.</h2><a className="contact-email" href="mailto:umair%40umairops.com"><span>umair</span><span aria-hidden="true">@</span><span>umairops.com</span> <ArrowUpRight size={26} /></a><p>Cloud infrastructure, deployment automation or a production system that needs attention.</p></div><Link className="button" href="/contact">Start a conversation <ArrowRight size={17} /></Link></section>
    </main><Footer />
  </>;
}
