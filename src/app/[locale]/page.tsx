import Home from "../page";

export { generateMetadata } from "../page";

export default function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  return <Home params={params} />;
}
