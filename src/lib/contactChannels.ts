// TODO: handles — fill real values via env before M6 (see TZ §0, §6A.1).
export type ContactChannel = {
  id: string;
  label: string;
  href: string | null;
};

export function getContactChannels(): ContactChannel[] {
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_HANDLE;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const signal = process.env.NEXT_PUBLIC_SIGNAL_HANDLE;
  const viber = process.env.NEXT_PUBLIC_VIBER_NUMBER;
  const messenger = process.env.NEXT_PUBLIC_MESSENGER_USERNAME;

  return [
    { id: "telegram", label: "Telegram", href: telegram ? `https://t.me/${telegram}` : null },
    { id: "whatsapp", label: "WhatsApp", href: whatsapp ? `https://wa.me/${whatsapp}` : null },
    { id: "signal", label: "Signal", href: signal ? `https://signal.me/#p/${signal}` : null },
    { id: "viber", label: "Viber", href: viber ? `viber://chat?number=${viber}` : null },
    { id: "messenger", label: "Messenger", href: messenger ? `https://m.me/${messenger}` : null },
    { id: "phone", label: "+38 (000) 000 00 00", href: "tel:+380000000000" },
    { id: "email", label: "hello@prmind.example", href: "mailto:hello@prmind.example" },
  ];
}
