"use client";

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === 'bg' ? 'default' : 'outline'}
        size="sm"
        className="flex items-center gap-1"
        onClick={() => setLanguage('bg')}
      >
        🇧🇬 БГ
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        className="flex items-center gap-1"
        onClick={() => setLanguage('en')}
      >
        🇬🇧 EN
      </Button>
    </div>
  );
}