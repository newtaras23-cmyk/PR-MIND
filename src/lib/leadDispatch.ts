type LeadEntry = Record<string, unknown> & { name: string; channel: string; contact: string };

// Each dispatcher no-ops when its env vars are absent, so the pipeline runs
// safely with zero configuration and activates channel-by-channel later.

export async function sendResendEmail(entry: LeadEntry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return { skipped: true };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "PR-MIND <leads@prmind.example>",
      to,
      subject: `New lead: ${entry.name} (${entry.channel})`,
      text: JSON.stringify(entry, null, 2),
    }),
  });

  if (!response.ok) throw new Error(`Resend failed: ${response.status}`);
  return { skipped: false };
}

export async function sendTelegramNotification(entry: LeadEntry) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { skipped: true };

  const text = [
    "New lead",
    `Name: ${entry.name}`,
    `Channel: ${entry.channel}`,
    `Contact: ${entry.contact}`,
    entry.request ? `Request: ${entry.request}` : null,
    entry.utm_source ? `Source: ${entry.utm_source}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!response.ok) throw new Error(`Telegram failed: ${response.status}`);
  return { skipped: false };
}

export async function sendWebhook(entry: LeadEntry) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return { skipped: true };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  if (!response.ok) throw new Error(`Webhook failed: ${response.status}`);
  return { skipped: false };
}
