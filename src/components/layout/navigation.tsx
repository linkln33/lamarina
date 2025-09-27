"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { LanguageToggle } from './language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="p-2 bg-primary rounded-lg">
                  <Wrench className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">LAMARINA BG</span>
              </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-4">
                <LanguageToggle />
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin">
                    <Wrench className="h-4 w-4 mr-2" />
                    Админ
                  </Link>
                </Button>
              </div>

          {/* Mobile menu */}
          <div className="md:hidden">
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
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/30 rounded-md transition-all duration-200 hover:translate-x-0.5"
                        onClick={() => setIsOpen(false)}
                        style={{
                          animationDelay: `${index * 30}ms`,
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                
                {/* Footer Actions */}
                <div className="p-3 border-t border-border/30 space-y-2 mt-auto">
                  <div className="flex items-center justify-center space-x-2">
                    <LanguageToggle />
                    <Button asChild variant="outline" size="sm" className="text-xs h-7">
                      <Link href="/admin" onClick={() => setIsOpen(false)}>
                        <Wrench className="h-3 w-3 mr-1" />
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