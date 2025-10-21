"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export function Shop() {
  const { t } = useLanguage();

  return (
    <section id="shop">
      <div className="py-12 bg-gradient-to-br from-blue-50/20 to-slate-50/30 dark:from-blue-950/10 dark:to-slate-900/30 relative overflow-hidden">
        {/* Subtle blue texture overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-blue-500/3"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/2 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('nav.shop')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('shop.description')}
            </p>
          </div>
          
          {/* Latest Listings Carousel */}
          <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">{t('shop.imagePlaceholder')}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t('shop.product1.title')}</h3>
                  <p className="text-primary font-bold text-xl mb-2">{t('shop.product1.price')}</p>
                  <p className="text-sm text-muted-foreground">{t('shop.product1.description')}</p>
                </div>
                
                <div className="bg-card rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">{t('shop.imagePlaceholder')}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t('shop.product2.title')}</h3>
                  <p className="text-primary font-bold text-xl mb-2">{t('shop.product2.price')}</p>
                  <p className="text-sm text-muted-foreground">{t('shop.product2.description')}</p>
                </div>
                
                <div className="bg-card rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">{t('shop.imagePlaceholder')}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t('shop.product3.title')}</h3>
                  <p className="text-primary font-bold text-xl mb-2">{t('shop.product3.price')}</p>
                  <p className="text-sm text-muted-foreground">{t('shop.product3.description')}</p>
                </div>
                
                <div className="bg-card rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">{t('shop.imagePlaceholder')}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t('shop.product4.title')}</h3>
                  <p className="text-primary font-bold text-xl mb-2">{t('shop.product4.price')}</p>
                  <p className="text-sm text-muted-foreground">{t('shop.product4.description')}</p>
                </div>
              </div>
            
            <div className="text-center mt-8">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                {t('shop.viewAll')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
