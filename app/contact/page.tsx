import type { Metadata } from "next";
import { Footer, Header } from "../components/chrome";
import { EmailLink } from "../components/email-link";
import { ContactForm } from "./contact-form";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Contact", description: "Contact Umair Malik about DevOps, cloud infrastructure, deployment automation or production operations.", alternates: { canonical: "/contact" } };
export default function ContactPage() {
  return <><Header /><main id="main" className="wrap"><header className="page-heading"><p className="eyebrow">CONTACT</p><h1>Bring me the infrastructure problem.</h1><p className="lead">Share what you are deploying, operating or trying to fix. I’ll reply by email.</p></header><div className="contact-layout"><aside className="contact-details"><p>For direct contact:</p><EmailLink className="contact-email" iconSize={20} showAddress /><div className="contact-links"><a className="text-link" href="https://www.linkedin.com/in/umair-ops/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a><a className="text-link" href="https://github.com/umairmalik904" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a></div></aside><ContactForm /></div></main><Footer /></>;
}
