import TermsPage from "../../terms/page";

export { generateMetadata } from "../../terms/page";

export default function LocaleTermsPage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  return <TermsPage params={params} />;
}
