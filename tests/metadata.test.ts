import { describe, expect, it } from "vitest";
import { buildMetadata } from "../src/lib/metadata";

describe("buildMetadata", () => {
  it("creates a canonical metadata object for the homepage", () => {
    const metadata = buildMetadata({
      title: "Reputation strategy",
      description: "A clear reputation strategy for founders.",
      path: "/",
    });

    expect(metadata.title).toBe("Reputation strategy | PR-MIND");
    expect(metadata.description).toBe("A clear reputation strategy for founders.");
    expect(metadata.metadataBase).toEqual(new URL("https://prmind.example"));
    // Canonical is locale-prefixed (defaults to "en") so each language variant
    // gets its own canonical URL — a shared canonical would tell Google the
    // uk/ variant is a duplicate of en/ and drop it from the index.
    expect(metadata.alternates?.canonical).toBe("https://prmind.example/en");
  });

  it("adds open graph fields for inner pages", () => {
    const metadata = buildMetadata({
      title: "Services",
      path: "/services",
    });

    expect(metadata.openGraph?.title).toBe("Services | PR-MIND");
    expect(metadata.openGraph?.url).toBe("https://prmind.example/en/services");
    expect(metadata.twitter?.card).toBe("summary_large_image");
  });

  it("builds a distinct canonical per locale for the same path", () => {
    const en = buildMetadata({ title: "Services", path: "/services", locale: "en" });
    const uk = buildMetadata({ title: "Services", path: "/services", locale: "uk" });

    expect(en.alternates?.canonical).toBe("https://prmind.example/en/services");
    expect(uk.alternates?.canonical).toBe("https://prmind.example/uk/services");
    expect(en.alternates?.canonical).not.toBe(uk.alternates?.canonical);
  });

  it("exposes mutually complete hreflang alternates", () => {
    const metadata = buildMetadata({ title: "Services", path: "/services" });
    const languages = metadata.alternates?.languages as Record<string, string>;

    expect(languages.en).toBe("https://prmind.example/en/services");
    expect(languages.uk).toBe("https://prmind.example/uk/services");
    expect(languages["x-default"]).toBe("https://prmind.example/en/services");
  });
});
