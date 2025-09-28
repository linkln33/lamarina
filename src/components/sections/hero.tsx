"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { CMS } from '@/lib/cms';
import { useState, useEffect } from 'react';

export function Hero() {
  const { t } = useLanguage();
  const [heroData, setHeroData] = useState(CMS.getHomepageContent().hero);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setHeroData(CMS.getHomepageContent().hero);
  }, []);

  const nextImage = () => {
    if (heroData.carousel?.images?.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === heroData.carousel.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (heroData.carousel?.images?.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? heroData.carousel.images.length - 1 : prev - 1
      );
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    if (heroData.carousel?.images?.length > 0) {
      const interval = setInterval(nextImage, 5000);
      return () => clearInterval(interval);
    }
  }, [heroData.carousel?.images?.length]);
  
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

          {/* Right Content - Picture Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="glass-card bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
              <CardContent className="p-0">
                {/* Carousel Container */}
                <div className="relative h-96 w-full">
                  {/* Images */}
                  <div className="relative h-full overflow-hidden">
                    {heroData.carousel?.images?.length > 0 ? (
                      heroData.carousel.images.map((image, index) => (
                      <motion.div
                        key={image.id}
                        className={`absolute inset-0 ${
                          index === currentImageIndex ? 'z-10' : 'z-0'
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: index === currentImageIndex ? 1 : 0,
                          scale: index === currentImageIndex ? 1 : 1.1
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                          <p className="text-sm text-white/90">{image.alt}</p>
                        </div>
                      </motion.div>
                      ))
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Wrench className="h-16 w-16 mx-auto mb-4 text-slate-400" />
                          <h3 className="text-lg font-semibold mb-2">Професионално оборудване</h3>
                          <p className="text-sm text-slate-300">Модерни машини за прецизна обработка</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation Arrows - only show if carousel has images */}
                  {heroData.carousel?.images?.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {/* Dots Indicator - only show if carousel has multiple images */}
                  {heroData.carousel?.images?.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                      {heroData.carousel.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex 
                              ? 'bg-white' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  )}
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
