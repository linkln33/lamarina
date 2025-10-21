"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { LanguageToggle } from './language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 80; // 80px offset for navbar
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsOpen(false); // Close mobile menu
  };

  const navItems = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#portfolio', label: t('nav.portfolio') },
    { href: '#news', label: t('nav.news') },
    { href: '#shop', label: t('nav.shop') },
  ];


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="w-full px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Far Left */}
          <Link href="/" className="flex items-center space-x-3 pl-2">
            <div className="relative w-16 h-16">
              <Image
                src="/logo.png"
                alt="LAMARINA BG Logo"
                fill
                className="object-contain"
                priority
                style={{
                  background: 'transparent',
                  filter: 'drop-shadow(0 0 0 transparent)',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            <span className="text-xl font-bold text-foreground">LAMARINA BG</span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions - Far Right */}
          <div className="hidden md:flex items-center space-x-2 pr-2">
            <LanguageToggle />
            <Button asChild variant="outline" size="sm">
              <Link href="/admin">
                <Wrench className="h-4 w-4 mr-2" />
                Админ
              </Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2 pr-2">
            <LanguageToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Отвори меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 h-1/2 bg-background/80 backdrop-blur-lg border-l border-border/30 shadow-xl">
                <SheetHeader className="pb-2">
                  <SheetTitle className="text-center text-sm">Меню</SheetTitle>
                </SheetHeader>
                
                {/* Navigation Links */}
                <div className="px-3 py-2">
                  <nav className="space-y-0.5">
                    {navItems.map((item, index) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className="block w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/30 rounded-md transition-all duration-200 hover:translate-x-0.5"
                        style={{
                          animationDelay: `${index * 30}ms`,
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
                
                {/* Footer Actions */}
                <div className="p-3 border-t border-border/30 space-y-2 mt-auto">
                  <div className="flex items-center justify-center">
                    <Button asChild size="sm" className="text-sm h-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href="/admin" onClick={() => setIsOpen(false)}>
                        <Wrench className="h-4 w-4 mr-1.5" />
                        Админ
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}