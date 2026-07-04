import InsightsPage from "../../insights/page";

export { generateMetadata } from "../../insights/page";

export default function LocaleInsightsPage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  return <InsightsPage params={params} />;
}
