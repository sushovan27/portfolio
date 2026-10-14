"use client";

import React, { useEffect, useState } from "react";
import { Mail, Send, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../ui/icons";
import { CONTACT_EMAIL, validateContactFields, type ContactErrors } from "@/lib/contact";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;
    const validated = validateContactFields({ name, email, message });
    setErrors(validated.errors);
    setStatus("");
    if (Object.keys(validated.errors).length > 0) return;

    setName(validated.values.name);
    setEmail(validated.values.email);
    setMessage(validated.values.message);
    setIsSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated.values),
      });
      const result = await response.json().catch(() => null) as { error?: string; acknowledgementSent?: boolean } | null;
      if (!response.ok) throw new Error(result?.error || "Your message could not be sent. Please try again.");
      setStatus(result?.acknowledgementSent === false
        ? "Message sent. I will get back to you soon, but the acknowledgment email could not be sent."
        : "Message sent. Check your inbox for an acknowledgment.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Your message could not be sent. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <footer
      id="contact"
      className="w-full bg-surface-dark text-white pt-24 pb-12 border-t border-border-dark"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-20 border-b border-border-dark">
          {/* Left: Headline & Connect Badges */}
          <div className="col-span-1 min-w-0 lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-xs text-text-on-dark-muted uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber"></span>
                <span>05 // Get in Touch</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Have something interesting in mind<span className="text-accent-amber">?</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed mb-8">
                I am always curious to talk about systems engineering, Linux tools,
                web architectures, security experiments, and collaborative student builds.
              </p>

              {/* Direct Quick-Connect Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="px-4 py-2.5 rounded-lg border border-border-dark bg-surface-dark-elevated text-zinc-200 text-xs font-mono font-medium hover:border-accent-amber hover:text-white transition-all flex items-center gap-2 shadow-xs"
                >
                  <Mail className="w-4 h-4 text-accent-amber" />
                  <span>{CONTACT_EMAIL}</span>
                </a>

                <a
                  href="https://github.com/sushovanbuilds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg border border-border-dark bg-surface-dark-elevated text-zinc-200 text-xs font-mono font-medium hover:border-accent-amber hover:text-white transition-all flex items-center gap-2 shadow-xs"
                >
                  <GithubIcon className="w-4 h-4 text-zinc-400" />
                  <span>github.com/sushovanbuilds</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href="https://github.com/sushovan27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg border border-border-dark bg-surface-dark-elevated text-zinc-200 text-xs font-mono font-medium hover:border-accent-amber hover:text-white transition-all flex items-center gap-2 shadow-xs"
                >
                  <GithubIcon className="w-4 h-4 text-zinc-400" />
                  <span>github.com/sushovan27</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-border-dark/60">
              <span className="font-mono text-xs text-text-on-dark-muted block">
                Open to internships, research projects, open-source collaborations, and developer discussions.
              </span>
            </div>
          </div>

          {/* Right: Obsidian Contact Dispatch Form */}
          <div className="col-span-1 min-w-0 lg:col-span-5 bg-surface-dark-elevated p-6 sm:p-8 rounded-2xl border border-border-dark shadow-2xl">
            <h3 className="font-display font-semibold text-xl text-white mb-1.5">
              Send a direct dispatch
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Sends your message directly to my inbox.
            </p>

            {!isMounted ? (
              <div className="space-y-4" aria-hidden="true">
                <div className="h-10 animate-pulse rounded-lg bg-[#111317]" />
                <div className="h-10 animate-pulse rounded-lg bg-[#111317]" />
                <div className="h-24 animate-pulse rounded-lg bg-[#111317]" />
                <div className="h-11 animate-pulse rounded-lg bg-accent-amber/60" />
              </div>
            ) : <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div suppressHydrationWarning>
                <label
                  htmlFor="contact-name"
                  className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  suppressHydrationWarning
                  value={name}
                  maxLength={100}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  onChange={(e) => { setName(e.target.value); setErrors((current) => ({ ...current, name: undefined })); }}
                  placeholder="Your name or team"
                  className="w-full bg-[#111317] border border-border-dark rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent-amber focus:ring-1 focus:ring-accent-amber transition-colors"
                />
                {errors.name && <p id="contact-name-error" className="mt-1 text-xs text-red-400" role="alert">{errors.name}</p>}
              </div>

              <div suppressHydrationWarning>
                <label
                  htmlFor="contact-email"
                  className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  suppressHydrationWarning
                  value={email}
                  maxLength={254}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  onChange={(e) => { setEmail(e.target.value); setErrors((current) => ({ ...current, email: undefined })); }}
                  placeholder="name@example.com"
                  className="w-full bg-[#111317] border border-border-dark rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent-amber focus:ring-1 focus:ring-accent-amber transition-colors"
                />
                {errors.email && <p id="contact-email-error" className="mt-1 text-xs text-red-400" role="alert">{errors.email}</p>}
              </div>

              <div suppressHydrationWarning>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  suppressHydrationWarning
                  value={message}
                  maxLength={4000}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  onChange={(e) => { setMessage(e.target.value); setErrors((current) => ({ ...current, message: undefined })); }}
                  placeholder="What are you building or looking to explore together?"
                  className="w-full bg-[#111317] border border-border-dark rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent-amber focus:ring-1 focus:ring-accent-amber transition-colors resize-none"
                />
                {errors.message && <p id="contact-message-error" className="mt-1 text-xs text-red-400" role="alert">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 px-4 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm bg-accent-amber text-white hover:bg-[#e86b32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-wait disabled:opacity-70"
              >
                <><span>{isSending ? "Sending…" : "Send message"}</span><Send className="w-3.5 h-3.5" /></>
              </button>
              <p className="min-h-5 text-xs text-emerald-300" role="status" aria-live="polite">{status}</p>
            </form>}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            <span suppressHydrationWarning>
              © {new Date().getFullYear()} Sushovan Halder · CSE Student at RKMGEC.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#hero"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <span>Return to top</span>
              <ArrowUpRight className="w-3.5 h-3.5 -rotate-45" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
