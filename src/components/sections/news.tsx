"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export function News() {
  const { t } = useLanguage();

  return (
    <section id="news">
      <div className="py-12 bg-gradient-to-br from-blue-50/25 to-slate-50/40 dark:from-blue-950/15 dark:to-slate-900/40 relative overflow-hidden">
        {/* Subtle blue texture overlay */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-blue-500/4"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/2 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('news.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('news.description')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">{t('news.imagePlaceholder')}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('news.article1.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('news.article1.description')}</p>
              <span className="text-sm text-primary">{t('news.article1.date')}</span>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">{t('news.imagePlaceholder')}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('news.article2.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('news.article2.description')}</p>
              <span className="text-sm text-primary">{t('news.article2.date')}</span>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">{t('news.imagePlaceholder')}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('news.article3.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('news.article3.description')}</p>
              <span className="text-sm text-primary">{t('news.article3.date')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
