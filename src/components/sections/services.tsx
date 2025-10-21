"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Wrench,
  Scissors,
  Zap,
  Settings,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function Services() {
  const { t } = useLanguage();
  
  // Icon mapping
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Wrench,
    Scissors,
    Zap,
    Settings
  };

  const services = [
    {
      icon: Wrench,
      title: t('services.service1.title'),
      description: t('services.service1.description'),
      features: [t('services.service1.feature1'), t('services.service1.feature2'), t('services.service1.feature3')],
      color: "bg-warning/10 text-warning border-warning/20"
    },
    {
      icon: Scissors,
      title: t('services.service2.title'),
      description: t('services.service2.description'),
      features: [t('services.service2.feature1'), t('services.service2.feature2'), t('services.service2.feature3')],
      color: "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-700"
    },
    {
      icon: Zap,
      title: t('services.service3.title'),
      description: t('services.service3.description'),
      features: [t('services.service3.feature1'), t('services.service3.feature2'), t('services.service3.feature3')],
      color: "bg-success/10 text-success border-success/20"
    },
    {
      icon: Settings,
      title: t('services.service4.title'),
      description: t('services.service4.description'),
      features: [t('services.service4.feature1'), t('services.service4.feature2'), t('services.service4.feature3')],
      color: "bg-primary/10 text-primary border-primary/20"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50/20 to-slate-50/30 dark:from-blue-950/10 dark:to-slate-900/30 relative overflow-hidden">
      {/* Subtle blue texture overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-blue-500/3"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/2 to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group flex flex-col">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col">
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors mt-auto">
                    {t('services.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
