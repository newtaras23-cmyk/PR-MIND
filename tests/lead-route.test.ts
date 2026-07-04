import { describe, expect, it } from "vitest";
import { POST } from "../src/app/api/leads/route";

describe("lead API route", () => {
  it("rejects malformed payloads", async () => {
    const request = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "A" }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("accepts a valid payload", async () => {
    const request = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Alex",
        channel: "telegram",
        contact: "@alex",
        request: "Need a review",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
