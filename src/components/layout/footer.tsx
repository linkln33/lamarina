"use client";

import Link from 'next/link';
import { Wrench, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary rounded-lg">
                <Wrench className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">LAMARINA BG</span>
            </div>
            <p className="text-slate-300 max-w-sm">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors">
                Facebook
              </Button>
              <Button variant="outline" size="sm" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors">
                LinkedIn
              </Button>
            </div>
          </div>

          {/* Quick Links and Services - Combined */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t('footer.quickLinks')}</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-slate-300 hover:text-white transition-colors">{t('nav.about')}</Link></li>
                  <li><Link href="/services" className="text-slate-300 hover:text-white transition-colors">{t('nav.services')}</Link></li>
                  <li><Link href="/portfolio" className="text-slate-300 hover:text-white transition-colors">{t('nav.portfolio')}</Link></li>
                  <li><Link href="/blog" className="text-slate-300 hover:text-white transition-colors">{t('nav.blog')}</Link></li>
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t('footer.services')}</h3>
                <ul className="space-y-2">
                  <li><Link href="/services/bending" className="text-slate-300 hover:text-white transition-colors">{t('services.bending')}</Link></li>
                  <li><Link href="/services/cutting" className="text-slate-300 hover:text-white transition-colors">{t('services.cutting')}</Link></li>
                  <li><Link href="/services/welding" className="text-slate-300 hover:text-white transition-colors">{t('services.welding')}</Link></li>
                  <li><Link href="/services/custom" className="text-slate-300 hover:text-white transition-colors">{t('services.custom')}</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300 text-sm">
                  С. БОЛЯРЦИ п.к.4114<br />
                  Обл. Пловдивска, Общ. Садово
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300 text-sm">+359 2 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300 text-sm">info@lamarina.bg</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                {t('footer.copyright')}
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('footer.privacy')}
                </Link>
                <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {t('footer.terms')}
                </Link>
              </div>
            </div>
      </div>
    </footer>
  );
}
