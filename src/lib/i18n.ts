export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'id';

export async function getMessages(locale: Locale) {
  return (await import(`../../messages/${locale}.json`)).default;
}
