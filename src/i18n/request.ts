import { getRequestConfig } from "next-intl/server";
import { routing } from "../../next-intl.config";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested ?? routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
