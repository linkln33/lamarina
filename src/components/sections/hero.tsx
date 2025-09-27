"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { CMS } from '@/lib/cms';
import { useState, useEffect } from 'react';

export function Hero() {
  const { t } = useLanguage();
  const [heroData, setHeroData] = useState(CMS.getHomepageContent().hero);

  useEffect(() => {
    setHeroData(CMS.getHomepageContent().hero);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with industrial pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit bg-white/10 text-white border-white/20 hover:bg-white/20">
                <div className="flex items-center mr-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                {t('hero.experience')}
              </Badge>
              
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    {heroData.title}
                    <span className="block text-blue-400">{heroData.subtitle}</span>
                  </h1>

                  <p className="text-xl text-slate-300 max-w-lg">
                    {heroData.description}
                  </p>
            </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg border-2 border-primary-foreground/20 hover:border-primary-foreground/40">
                    {heroData.ctaPrimary}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm">
                    {heroData.ctaSecondary}
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{heroData.stats.projects}</div>
                    <div className="text-sm text-slate-400">{t('stats.projects')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{heroData.stats.experience}</div>
                    <div className="text-sm text-slate-400">{t('stats.experience')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{heroData.stats.clients}</div>
                    <div className="text-sm text-slate-400">{t('stats.clients')}</div>
                  </div>
                </div>
          </motion.div>

          {/* Right Content - Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="glass-card bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-accent/20 rounded-lg">
                          <Wrench className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{heroData.features.equipment.title}</h3>
                          <p className="text-slate-300">{heroData.features.equipment.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-success/20 rounded-lg">
                          <Shield className="h-6 w-6 text-success" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{heroData.features.quality.title}</h3>
                          <p className="text-slate-300">{heroData.features.quality.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-warning/20 rounded-lg">
                          <Clock className="h-6 w-6 text-warning" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{heroData.features.speed.title}</h3>
                          <p className="text-slate-300">{heroData.features.speed.description}</p>
                        </div>
                      </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-success/20 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
