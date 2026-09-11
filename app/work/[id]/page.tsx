import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Header, Footer } from "../../components/chrome";
import { Flow } from "../../components/topology";
import { publishedProjects } from "../../../lib/store";

type Props = { params: Promise<{ id: string }> };
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = (await publishedProjects()).find(item => item.id === id);
  if (!project) return { title: "Case study" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: { title: `${project.title} | Umair Malik`, description: project.summary, type: "article", url: `/work/${project.id}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const projects = await publishedProjects();
  const index = projects.findIndex(item => item.id === id);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return <><Header /><main id="main" className="wrap"><header className="page-heading"><Link className="back-link" href="/#work"><ArrowLeft size={16} /> Selected work</Link><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p className="lead">{project.summary}</p></header><div className="case-layout"><aside className="case-sidebar"><p className="eyebrow">TECHNOLOGIES</p><ul>{project.technologies.map(item => <li key={item}>{item}</li>)}</ul></aside><article className="case-body"><section><h2>Problem</h2><p>{project.problem}</p></section><section><h2>Architecture</h2><Flow nodes={project.architecture} label={`${project.title} architecture`} /></section><section><h2>Implementation</h2><ul>{project.implementation.map(item => <li key={item}>{item}</li>)}</ul></section><section><h2>Troubleshooting</h2><p>{project.troubleshooting}</p></section><section><h2>Result</h2><p>{project.result}</p></section><nav className="case-nav" aria-label="Case study navigation"><Link className="text-link" href="/#work"><ArrowLeft size={16} /> All work</Link>{next && next.id !== project.id && <Link className="text-link" href={`/work/${next.id}`}>Next: {next.title} <ArrowRight size={16} /></Link>}</nav></article></div></main><Footer /></>;
}
