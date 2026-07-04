import PrivacyPage from "../../privacy/page";

export { generateMetadata } from "../../privacy/page";

export default function LocalePrivacyPage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  return <PrivacyPage params={params} />;
}
