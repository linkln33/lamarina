// This file is kept for compatibility but we use custom LanguageContext
// The actual translation logic is in /src/contexts/LanguageContext.tsx
export const locales = ['bg', 'en'] as const;
export type Locale = (typeof locales)[number];
