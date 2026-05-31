import { getMessages, locales, type Locale } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Sejarah from "@/components/Sejarah";
import ClientSections from "@/components/ClientSections";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "id";

  const messages = await getMessages(validLocale);

  return (
    <main>
      <Navbar locale={validLocale} messages={messages} />
      <Hero messages={messages} />
      <Sejarah messages={messages} />
      <ClientSections messages={messages} />
    </main>
  );
}
