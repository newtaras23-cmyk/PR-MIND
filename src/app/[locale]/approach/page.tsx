import ApproachPage from "../../approach/page";

export { generateMetadata } from "../../approach/page";

export default function LocaleApproachPage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  return <ApproachPage params={params} />;
}
