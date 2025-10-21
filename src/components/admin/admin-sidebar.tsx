"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Image, 
  Users, 
  Settings,
  Wrench,
  Globe,
  BarChart3,
  Mail,
  Shield,
  Home,
  X,
  ShoppingCart,
  ShoppingBag,
  Receipt
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const getNavigation = (t: (key: string) => string) => [
  { name: t('admin.dashboard'), href: '/admin', icon: LayoutDashboard },
  { name: t('admin.homepage'), href: '/admin/homepage', icon: Home },
  { name: t('admin.listings'), href: '/admin/listings', icon: Package },
  { name: t('admin.products'), href: '/admin/products', icon: ShoppingBag },
  { name: t('admin.orders'), href: '/admin/orders', icon: ShoppingCart },
  { name: t('admin.invoices'), href: '/admin/invoices', icon: Receipt },
  { name: t('admin.blog'), href: '/admin/blog', icon: FileText },
  { name: t('admin.portfolio'), href: '/admin/portfolio', icon: Image },
  { name: t('admin.users'), href: '/admin/users', icon: Users },
  { name: t('admin.pages'), href: '/admin/pages', icon: Globe },
  { name: t('admin.analytics'), href: '/admin/analytics', icon: BarChart3 },
  { name: t('admin.messages'), href: '/admin/messages', icon: Mail },
  { name: t('admin.settings'), href: '/admin/settings', icon: Settings },
  { name: t('admin.security'), href: '/admin/security', icon: Shield },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const navigation = getNavigation(t);

  return (
    <>
      {/* Mobile overlay - only show on mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "w-64 bg-card border-r border-border h-full",
        // On mobile: fixed position with transform
        "md:relative md:transform-none",
        "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out",
        // Mobile visibility
        isOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop: always visible
        "md:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary rounded-lg">
                <Wrench className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">LAMARINA BG</span>
            </div>
            {/* Close button only on mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      // Close mobile sidebar when navigating
                      if (typeof window !== 'undefined' && window.innerWidth < 768) {
                        onClose();
                      }
                    }}
                    className={cn(
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    <item.icon className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    )} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Profile */}
          <div className="flex-shrink-0 border-t border-border p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">A</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">Администратор</p>
                <p className="text-xs text-muted-foreground">admin@lamarina.bg</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}