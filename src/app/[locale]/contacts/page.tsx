import ContactsPage from "../../contacts/page";

export { generateMetadata } from "../../contacts/page";

export default function LocaleContactsPage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  return <ContactsPage params={params} />;
}
