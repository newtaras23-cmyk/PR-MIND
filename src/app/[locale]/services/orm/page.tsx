import OrmServicePage from "../../../services/orm/page";

export { generateMetadata } from "../../../services/orm/page";

export default function LocaleOrmServicePage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  return <OrmServicePage params={params} />;
}
