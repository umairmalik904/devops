"use client";
import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your message.");
      form.reset(); setStatus("sent"); setMessage("Thanks. Your message has been received and saved securely.");
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Unable to send your message."); }
  }
  return <form className="form" onSubmit={submit}><div className="form-grid"><label>Name<input name="name" required minLength={2} maxLength={120} autoComplete="name" /></label><label>Email<input name="email" required type="email" maxLength={254} autoComplete="email" /></label></div><label>Subject<input name="subject" required minLength={3} maxLength={160} /></label><label>Message<textarea name="message" required minLength={20} maxLength={5000} rows={7} /></label><label className="trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><button className="button primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"} <ArrowRight size={16} /></button>{message && <p className={`form-status ${status === "error" ? "error" : ""}`} role="status">{message}</p>}<p className="form-note">Your details are used only to respond to this enquiry.</p></form>;
}
