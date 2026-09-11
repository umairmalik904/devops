"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LogOut, Plus, Trash2 } from "lucide-react";
import type { Project } from "../../data/portfolio";

type Message = { id: string; name: string; email: string; subject: string; message: string; receivedAt: string };
const emptyProject = (): Project => ({ id: "", title: "", category: "", summary: "", problem: "", architecture: [""], implementation: [""], troubleshooting: "", result: "", technologies: [""], published: true });

async function api(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "The request failed.");
  return data;
}

export function Admin({ authenticated }: { authenticated: boolean }) {
  const [signedIn, setSignedIn] = useState(authenticated);
  if (!signedIn) return <Login onSuccess={() => setSignedIn(true)} />;
  return <Dashboard onSignOut={() => setSignedIn(false)} />;
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setWorking(true); setError("");
    try {
      await api("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) });
      onSuccess();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to sign in."); }
    finally { setWorking(false); }
  }
  return <main id="main" className="wrap"><div className="login-wrap"><Link className="back-link" href="/"><ArrowLeft size={16} /> Portfolio</Link><p className="eyebrow">ADMINISTRATION</p><h1>Sign in to manage the portfolio.</h1><form className="form" onSubmit={submit}><label>Email<input name="email" type="email" required autoComplete="username" /></label><label>Password<input name="password" type="password" required autoComplete="current-password" /></label><button className="button primary" disabled={working}>{working ? "Signing in…" : "Sign in"}</button>{error && <p className="form-status error" role="alert">{error}</p>}</form></div></main>;
}

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [view, setView] = useState<"projects" | "messages">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Project>(emptyProject());
  const [notice, setNotice] = useState("");
  const [working, setWorking] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const pending = useRef<{ type: "project" | "message"; id: string } | null>(null);

  const load = useCallback(async () => {
    try {
      const [projectData, messageData] = await Promise.all([api("/api/admin/projects"), api("/api/admin/messages")]);
      setProjects(projectData); setMessages(messageData);
    } catch (reason) { setNotice(reason instanceof Error ? reason.message : "Unable to load content."); }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function signOut() { await api("/api/admin/session", { method: "DELETE", headers: { "Content-Type": "application/json" } }); onSignOut(); }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setWorking(true); setNotice("");
    const normalized = { ...selected, architecture: selected.architecture.map(x => x.trim()).filter(Boolean), implementation: selected.implementation.map(x => x.trim()).filter(Boolean), technologies: selected.technologies.map(x => x.trim()).filter(Boolean) };
    try {
      const saved = await api("/api/admin/projects", { method: selected.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(normalized) });
      setSelected(saved); await load(); setNotice("Project saved. Published changes are now visible on the site.");
    } catch (reason) { setNotice(reason instanceof Error ? reason.message : "Unable to save project."); }
    finally { setWorking(false); }
  }
  function askDelete(type: "project" | "message", id: string) { pending.current = { type, id }; dialog.current?.showModal(); }
  async function remove() {
    const target = pending.current; if (!target) return;
    dialog.current?.close(); setWorking(true);
    try {
      await api(`/api/admin/${target.type === "project" ? "projects" : "messages"}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: target.id }) });
      if (target.type === "project") setSelected(emptyProject());
      await load(); setNotice(`${target.type === "project" ? "Project" : "Message"} deleted.`);
    } catch (reason) { setNotice(reason instanceof Error ? reason.message : "Unable to delete this item."); }
    finally { setWorking(false); pending.current = null; }
  }

  return <main id="main" className="wrap"><header className="admin-heading"><div><p className="eyebrow">PORTFOLIO ADMIN</p><h1>Content management</h1></div><button className="icon-button" aria-label="Sign out" title="Sign out" onClick={signOut}><LogOut size={19} /></button></header><nav className="admin-tabs"><a href="#projects" aria-current={view === "projects" ? "page" : undefined} onClick={event => { event.preventDefault(); setView("projects"); }}>Projects</a><a href="#messages" aria-current={view === "messages" ? "page" : undefined} onClick={event => { event.preventDefault(); setView("messages"); }}>Inbox ({messages.length})</a><Link href="/">View site</Link></nav>{notice && <p className="form-status" role="status">{notice}</p>}{view === "projects" ? <><div className="admin-toolbar"><p>{projects.length} case studies</p><button className="button" onClick={() => setSelected(emptyProject())}><Plus size={16} /> New project</button></div><div className="admin-layout"><aside className="admin-list" aria-label="Projects">{projects.map(project => <button key={project.id} aria-pressed={selected.id === project.id} onClick={() => setSelected(project)}><span>{project.title}</span><small>{project.published ? "Published" : "Draft"} · {project.category}</small></button>)}</aside><ProjectEditor project={selected} onChange={setSelected} onSubmit={save} working={working} onDelete={() => selected.id && askDelete("project", selected.id)} /></div></> : <section className="inbox">{messages.length === 0 ? <p className="empty-state">No enquiries have arrived yet.</p> : messages.map(item => <article className="message" key={item.id}><header className="message-heading"><div><h2>{item.subject}</h2><small>{item.name} · {new Date(item.receivedAt).toLocaleString()}</small></div><button className="icon-button" aria-label={`Delete message from ${item.name}`} onClick={() => askDelete("message", item.id)}><Trash2 size={17} /></button></header><a href={`mailto:${item.email}`}>{item.email}</a><p>{item.message}</p></article>)}</section>}<dialog className="confirm-dialog" ref={dialog} onCancel={() => { pending.current = null; }}><h2>Delete this item?</h2><p>This cannot be undone.</p><div className="hero-actions"><button className="button" onClick={() => dialog.current?.close()}>Cancel</button><button className="button primary" onClick={remove}>Delete</button></div></dialog></main>;
}

function ProjectEditor({ project, onChange, onSubmit, working, onDelete }: { project: Project; onChange: (project: Project) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void; working: boolean; onDelete: () => void }) {
  const set = (key: keyof Project, value: string | boolean | string[]) => onChange({ ...project, [key]: value });
  return <form className="form editor" onSubmit={onSubmit}><h2>{project.id ? "Edit case study" : "New case study"}</h2><div className="form-grid"><label>Title<input required minLength={3} maxLength={120} value={project.title} onChange={e => set("title", e.target.value)} /></label><label>Category<input required minLength={2} maxLength={70} value={project.category} onChange={e => set("category", e.target.value)} /></label></div><label>Summary<textarea required minLength={10} maxLength={500} rows={3} value={project.summary} onChange={e => set("summary", e.target.value)} /></label><label>Problem<textarea required minLength={10} maxLength={5000} rows={5} value={project.problem} onChange={e => set("problem", e.target.value)} /></label><LineField label="Architecture" hint="One layer per line" value={project.architecture} rows={4} onChange={value => set("architecture", value)} /><LineField label="Implementation" hint="One point per line" value={project.implementation} rows={7} onChange={value => set("implementation", value)} /><label>Troubleshooting<textarea required minLength={10} maxLength={5000} rows={5} value={project.troubleshooting} onChange={e => set("troubleshooting", e.target.value)} /></label><label>Result<textarea required minLength={10} maxLength={5000} rows={4} value={project.result} onChange={e => set("result", e.target.value)} /></label><LineField label="Technologies" hint="One technology per line" value={project.technologies} rows={5} onChange={value => set("technologies", value)} /><label className="checkbox"><input type="checkbox" checked={project.published} onChange={e => set("published", e.target.checked)} /> Published on the portfolio</label><div className="editor-actions"><button className="button primary" disabled={working}>{working ? "Saving…" : "Save project"}</button>{project.id && <button className="button" type="button" onClick={onDelete}><Trash2 size={16} /> Delete</button>}</div></form>;
}

function LineField({ label, hint, value, rows, onChange }: { label: string; hint: string; value: string[]; rows: number; onChange: (value: string[]) => void }) {
  return <label>{label} <small>{hint}</small><textarea required rows={rows} value={value.join("\n")} onChange={event => onChange(event.target.value.split("\n"))} /></label>;
}
