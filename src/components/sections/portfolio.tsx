"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function Portfolio() {
  const { t } = useLanguage();
  
  const portfolioItems = [
    {
      title: t('portfolio.project1'),
      description: t('portfolio.project1.desc'),
      image: "/api/placeholder/400/300",
      category: "Industrial",
      count: "50+ projects"
    },
    {
      title: t('portfolio.project2'),
      description: t('portfolio.project2.desc'),
      image: "/api/placeholder/400/300",
      category: "Residential",
      count: "200+ projects"
    },
    {
      title: t('portfolio.project3'),
      description: t('portfolio.project3.desc'),
      image: "/api/placeholder/400/300",
      category: "Commercial",
      count: "150+ projects"
    }
  ];
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            {t('portfolio.title')}
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('portfolio.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('portfolio.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-4 w-4 mr-2" />
                      {t('portfolio.viewAll')}
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                    <Button variant="ghost" size="sm">
                      {t('hero.cta.secondary')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg">
            {t('portfolio.viewAll')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
