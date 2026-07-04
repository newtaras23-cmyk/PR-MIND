import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/structuredData";

export function StructuredData() {
  const organization = buildOrganizationSchema();
  const website = buildWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
