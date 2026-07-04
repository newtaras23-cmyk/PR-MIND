import CasesPage from "../../cases/page";

export { generateMetadata } from "../../cases/page";

export default function LocaleCasesPage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  return <CasesPage params={params} />;
}
