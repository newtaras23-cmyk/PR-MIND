import ServicesPage from "../../services/page";

export { generateMetadata } from "../../services/page";

export default function LocaleServicesPage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  return <ServicesPage params={params} />;
}
