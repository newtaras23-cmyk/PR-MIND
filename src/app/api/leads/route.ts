import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { z } from "zod";
import { sendResendEmail, sendTelegramNotification, sendWebhook } from "@/lib/leadDispatch";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please share your name"),
  channel: z.string().trim().min(1, "Choose a contact channel"),
  contact: z.string().trim().min(3, "Please add a valid contact"),
  request: z.string().trim().optional(),
  company: z.string().optional(), // honeypot — real users leave this empty
  utm_source: z.string().trim().optional(),
  utm_medium: z.string().trim().optional(),
  utm_campaign: z.string().trim().optional(),
  utm_content: z.string().trim().optional(),
  utm_term: z.string().trim().optional(),
  gclid: z.string().trim().optional(),
  fbclid: z.string().trim().optional(),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Honeypot tripped — pretend success so the bot moves on, but do nothing.
    if (parsed.data.company) {
      return NextResponse.json({ success: true, message: "Lead received" });
    }

    const storagePath = path.join(process.cwd(), "data", "leads.json");
    await fs.mkdir(path.dirname(storagePath), { recursive: true });

    let existing: Array<Record<string, unknown>> = [];

    try {
      const file = await fs.readFile(storagePath, "utf8");
      existing = JSON.parse(file) as Array<Record<string, unknown>>;
    } catch (error) {
      const nodeError = error as NodeJS.ErrnoException;
      if (nodeError.code !== "ENOENT") {
        throw error;
      }
    }

    const entry = {
      id: crypto.randomUUID(),
      name: parsed.data.name,
      channel: parsed.data.channel,
      contact: parsed.data.contact,
      request: parsed.data.request,
      utm_source: parsed.data.utm_source,
      utm_medium: parsed.data.utm_medium,
      utm_campaign: parsed.data.utm_campaign,
      utm_content: parsed.data.utm_content,
      utm_term: parsed.data.utm_term,
      gclid: parsed.data.gclid,
      fbclid: parsed.data.fbclid,
      submittedAt: new Date().toISOString(),
    };

    existing.push(entry);
    await fs.writeFile(storagePath, JSON.stringify(existing, null, 2));

    const dispatchResults = await Promise.allSettled([
      sendResendEmail(entry),
      sendTelegramNotification(entry),
      sendWebhook(entry),
    ]);

    dispatchResults.forEach((result, index) => {
      if (result.status === "rejected") {
        const channel = ["resend", "telegram", "webhook"][index];
        console.error(`Lead dispatch failed (${channel}):`, result.reason);
      }
    });

    return NextResponse.json({ success: true, message: "Lead received", entry });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to save lead" },
      { status: 500 },
    );
  }
}
