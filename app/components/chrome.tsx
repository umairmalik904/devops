"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && open) { setOpen(false); button.current?.focus(); } };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><div className="wrap nav-inner"><Link href="/" className="brand" onClick={() => setOpen(false)}><span className="brand-mark" aria-hidden="true">u<span>/</span>m</span><span>Umair Malik</span></Link><button ref={button} className="menu-toggle icon-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button><nav id="primary-navigation" aria-label="Primary navigation" className={open ? "navigation open" : "navigation"}><Link onClick={() => setOpen(false)} href="/#work">Work</Link><Link onClick={() => setOpen(false)} href="/#infrastructure">Infrastructure</Link><Link onClick={() => setOpen(false)} href="/#about">About</Link><Link onClick={() => setOpen(false)} href="/contact">Contact <ArrowUpRight size={14} /></Link></nav></div></header></>;
}
export function Footer() {
  return <footer className="site-footer"><div className="wrap footer-inner"><div><Link href="/" className="footer-name">Umair Malik</Link><p>DevOps & Infrastructure Engineer</p></div><div className="footer-links"><a href="https://www.linkedin.com/in/umair-ops/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a><a href="https://github.com/umairmalik904" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a><a href="mailto:umair%40umairops.com">Email <ArrowUpRight size={14} /></a></div><div className="footer-meta"><span>© {new Date().getFullYear()} Umair Malik</span><Link href="/admin">Admin</Link></div></div></footer>;
}
