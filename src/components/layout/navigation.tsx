"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Wrench, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LanguageToggle } from './language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { href: '/about', label: t('nav.about') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/services', label: t('nav.services') },
    { href: '/blog', label: t('nav.blog') },
  ];

  const productCategories = [
    { href: '/products/roofing-systems', label: t('nav.products.roofing') },
    { href: '/products/metal-structures', label: t('nav.products.structures') },
    { href: '/products/bending', label: t('nav.products.bending') },
    { href: '/products/cutting', label: t('nav.products.cutting') },
    { href: '/products/welding', label: t('nav.products.welding') },
    { href: '/products/custom', label: t('nav.products.custom') },
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
            
            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium">
                  {t('nav.products.title')}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {productCategories.map((category) => (
                  <DropdownMenuItem key={category.href} asChild>
                    <Link href={category.href} className="w-full">
                      {category.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
                    
                    {/* Products Section in Mobile */}
                    <div className="pt-2 border-t border-border/30">
                      <div className="px-3 py-2 text-sm font-semibold text-foreground">
                        {t('nav.products.title')}
                      </div>
                      {productCategories.map((category, index) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          className="block px-6 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent/30 rounded-md transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                          style={{
                            animationDelay: `${(navItems.length + index) * 30}ms`,
                          }}
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
                
                {/* Footer Actions */}
                <div className="p-3 border-t border-border/30 space-y-2 mt-auto">
                  <div className="flex items-center justify-center space-x-2">
                    <LanguageToggle />
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