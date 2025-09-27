"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
              <SheetContent side="right" className="w-full max-w-sm bg-background/95 backdrop-blur-md border-l border-border/50">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border/50">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 bg-primary rounded-lg">
                            <Wrench className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <span className="text-lg font-bold text-foreground">LAMARINA BG</span>
                        </div>
                  </div>
                  
                  {/* Navigation Links */}
                  <div className="flex-1 px-4 py-6">
                    <nav className="space-y-1">
                      {navItems.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-all duration-300 hover:translate-x-1"
                          onClick={() => setIsOpen(false)}
                          style={{
                            animationDelay: `${index * 50}ms`,
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  
                      {/* Footer Actions */}
                      <div className="p-4 border-t border-border/50 space-y-4">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-2">Избери език</p>
                          <LanguageToggle />
                        </div>
                        <div className="text-center">
                          <Button asChild variant="outline" size="sm" className="w-full text-sm">
                            <Link href="/admin" onClick={() => setIsOpen(false)}>
                              <Wrench className="h-4 w-4 mr-2" />
                              Админ панел
                            </Link>
                          </Button>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">
                            © 2024 LAMARINA BG. Всички права запазени.
                          </p>
                        </div>
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