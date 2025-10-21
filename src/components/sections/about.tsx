"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about">
      <div className="py-12 bg-gradient-to-br from-blue-50/30 to-slate-50/50 dark:from-blue-950/20 dark:to-slate-900/50 relative overflow-hidden">
        {/* Subtle blue texture overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-blue-500/5"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/3 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">{t('about.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
