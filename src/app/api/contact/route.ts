import { NextResponse } from "next/server";
import { CONTACT_EMAIL, validateContactFields, type ContactFields } from "@/lib/contact";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 8_192;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

async function sendResendEmail(
  apiKey: string,
  payload: Record<string, string | string[]>,
): Promise<Response> {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
}

async function readResendId(response: Response): Promise<string | null> {
  const result = await response.json().catch(() => null) as { id?: unknown } | null;
  return typeof result?.id === "string" ? result.id : null;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ error: "Send the form using the contact page." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "Your message is too large. Please shorten it and try again." }, { status: 413 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "The form data was not valid. Please try again." }, { status: 400 });
  }

  if (!input || typeof input !== "object") {
    return NextResponse.json({ error: "The form data was not valid. Please try again." }, { status: 400 });
  }

  const candidate = input as Record<string, unknown>;
  if (typeof candidate.name !== "string" || typeof candidate.email !== "string" || typeof candidate.message !== "string") {
    return NextResponse.json({ error: "Complete all fields before sending." }, { status: 400 });
  }

  const validated = validateContactFields(candidate as ContactFields);
  if (Object.keys(validated.errors).length > 0) {
    return NextResponse.json({ error: Object.values(validated.errors)[0] }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Contact email is unavailable: RESEND_API_KEY or CONTACT_FROM_EMAIL is not configured.");
    return NextResponse.json({ error: "Email delivery is temporarily unavailable. Please email me directly instead." }, { status: 503 });
  }

  try {
    const senderName = escapeHtml(validated.values.name);
    const senderEmail = escapeHtml(validated.values.email);
    const message = escapeHtml(validated.values.message).replace(/\n/g, "<br />");

    const inboxResponse = await sendResendEmail(apiKey, {
      from,
      to: [CONTACT_EMAIL],
      reply_to: validated.values.email,
      subject: `Portfolio inquiry from ${validated.values.name}`,
      text: `From: ${validated.values.name} (${validated.values.email})\n\nMessage:\n${validated.values.message}`,
      html: `
        <div style="margin:0;background:#f3f2ef;padding:32px 16px;font-family:Inter,Arial,sans-serif;color:#17181b">
          <div style="max-width:640px;margin:0 auto;overflow:hidden;border:1px solid #d5d6d7;border-radius:16px;background:#ffffff;box-shadow:0 10px 30px rgba(23,24,27,.08)">
            <div style="padding:24px 28px;background:#111317;color:#ffffff">
              <div style="font:600 11px/1.4 'Courier New',monospace;letter-spacing:.14em;text-transform:uppercase;color:#ff793d">05 // Portfolio Dispatch</div>
              <h1 style="margin:10px 0 0;font-size:26px;line-height:1.2;font-weight:700">New message from your portfolio</h1>
            </div>
            <div style="padding:28px">
              <div style="margin-bottom:24px;padding:16px;border-left:3px solid #ff793d;background:#fff7f2">
                <div style="font:600 11px/1.4 'Courier New',monospace;letter-spacing:.08em;text-transform:uppercase;color:#686b70">Sender</div>
                <div style="margin-top:6px;font-size:18px;font-weight:700">${senderName}</div>
                <a href="mailto:${senderEmail}" style="display:inline-block;margin-top:4px;color:#c94f20;font-size:14px">${senderEmail}</a>
              </div>
              <div style="font:600 11px/1.4 'Courier New',monospace;letter-spacing:.08em;text-transform:uppercase;color:#686b70">Message</div>
              <p style="margin:10px 0 0;font-size:16px;line-height:1.7">${message}</p>
            </div>
            <div style="padding:18px 28px;border-top:1px solid #e8e8e8;color:#686b70;font:12px/1.5 'Courier New',monospace">Reply directly to this email to contact ${senderName}.</div>
          </div>
        </div>
      `,
    });

    if (!inboxResponse.ok) {
      console.error("Contact email provider rejected the inbox message:", inboxResponse.status);
      return NextResponse.json({ error: "Your message could not be delivered. Please try again or email me directly." }, { status: 502 });
    }
    const inboxEmailId = await readResendId(inboxResponse);
    if (!inboxEmailId) {
      console.error("Contact email provider accepted the inbox message without returning an email ID.");
      return NextResponse.json({ error: "The message provider returned an incomplete delivery response. Please try again." }, { status: 502 });
    }

    const acknowledgementResponse = await sendResendEmail(apiKey, {
      from,
      to: [validated.values.email],
      reply_to: CONTACT_EMAIL,
      subject: "We received your portfolio message",
      text: `Hi ${validated.values.name},\n\nThank you for reaching out through my portfolio. I received your message and will get back to you as soon as possible.\n\nYour message:\n${validated.values.message}\n\nBest,\nSushovan Halder`,
      html: `
        <div style="margin:0;background:#f3f2ef;padding:32px 16px;font-family:Inter,Arial,sans-serif;color:#17181b">
          <div style="max-width:640px;margin:0 auto;overflow:hidden;border:1px solid #d5d6d7;border-radius:16px;background:#ffffff;box-shadow:0 10px 30px rgba(23,24,27,.08)">
            <div style="padding:24px 28px;background:#111317;color:#ffffff">
              <div style="font:600 11px/1.4 'Courier New',monospace;letter-spacing:.14em;text-transform:uppercase;color:#ff793d">Portfolio Dispatch // Received</div>
              <h1 style="margin:10px 0 0;font-size:26px;line-height:1.2;font-weight:700">Thanks for reaching out, ${senderName}.</h1>
            </div>
            <div style="padding:28px">
              <p style="margin:0;font-size:16px;line-height:1.7">Your message has been received successfully. I will review it and get back to you as soon as possible.</p>
              <div style="margin-top:24px;padding:16px;border-left:3px solid #ff793d;background:#fff7f2">
                <div style="font:600 11px/1.4 'Courier New',monospace;letter-spacing:.08em;text-transform:uppercase;color:#686b70">Your message</div>
                <p style="margin:8px 0 0;font-size:14px;line-height:1.7">${message}</p>
              </div>
            </div>
            <div style="padding:18px 28px;border-top:1px solid #e8e8e8;color:#686b70;font:12px/1.5 'Courier New',monospace">This is an automatic acknowledgment. Please reply to this email if you need to add anything.</div>
          </div>
        </div>
      `,
    });

    if (!acknowledgementResponse.ok) {
      const providerError = await acknowledgementResponse.text();
      console.error(
        "Contact acknowledgement email was rejected:",
        acknowledgementResponse.status,
        providerError.slice(0, 500),
      );
      return NextResponse.json(
        { error: "Your message reached my inbox, but the acknowledgment email could not be sent to your address. Please check that your email is correct or email me directly." },
        { status: 502 },
      );
    }

    const acknowledgementEmailId = await readResendId(acknowledgementResponse);
    if (!acknowledgementEmailId) {
      console.error("Contact email provider accepted the acknowledgment without returning an email ID.", { inboxEmailId });
      return NextResponse.json({ error: "Your message was delivered, but the acknowledgment response was incomplete. Please try again." }, { status: 502 });
    }

    console.info("Portfolio contact emails queued.", { inboxEmailId, acknowledgementEmailId });
    return NextResponse.json({ sent: true, acknowledgementSent: true }, { status: 200 });
  } catch (error) {
    console.error("Contact email provider request failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Email delivery is temporarily unavailable. Please try again or email me directly." }, { status: 502 });
  }
}
