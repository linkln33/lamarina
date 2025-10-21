"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { GoogleMap } from '@/components/ui/google-map';

export function Contact() {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 bg-gradient-to-br from-blue-50/15 to-slate-50/25 dark:from-blue-950/8 dark:to-slate-900/25 relative overflow-hidden">
      {/* Subtle blue texture overlay */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-blue-500/2"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/1 to-transparent"></div>
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
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full bg-blue-50/70 dark:bg-blue-900/30 backdrop-blur-sm border-blue-200/50 dark:border-blue-700/40">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200">{t('hero.cta.primary')}</CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-300">
                  {t('contact.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder={t('contact.form.name')} className="bg-blue-100/60 dark:bg-blue-800/40 border-blue-200/60 dark:border-blue-600/40 text-blue-800 dark:text-blue-200 placeholder:text-blue-600 dark:placeholder:text-blue-400 focus:border-blue-400 dark:focus:border-blue-500" />
                  <Input placeholder={t('contact.form.lastname')} className="bg-blue-100/60 dark:bg-blue-800/40 border-blue-200/60 dark:border-blue-600/40 text-blue-800 dark:text-blue-200 placeholder:text-blue-600 dark:placeholder:text-blue-400 focus:border-blue-400 dark:focus:border-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder={t('contact.form.email')} type="email" className="bg-blue-100/60 dark:bg-blue-800/40 border-blue-200/60 dark:border-blue-600/40 text-blue-800 dark:text-blue-200 placeholder:text-blue-600 dark:placeholder:text-blue-400 focus:border-blue-400 dark:focus:border-blue-500" />
                  <Input placeholder={t('contact.form.phone')} className="bg-blue-100/60 dark:bg-blue-800/40 border-blue-200/60 dark:border-blue-600/40 text-blue-800 dark:text-blue-200 placeholder:text-blue-600 dark:placeholder:text-blue-400 focus:border-blue-400 dark:focus:border-blue-500" />
                </div>
                <Input placeholder={t('contact.form.company')} className="bg-blue-100/60 dark:bg-blue-800/40 border-blue-200/60 dark:border-blue-600/40 text-blue-800 dark:text-blue-200 placeholder:text-blue-600 dark:placeholder:text-blue-400 focus:border-blue-400 dark:focus:border-blue-500" />
                <Input placeholder={t('contact.form.subject')} className="bg-blue-100/60 dark:bg-blue-800/40 border-blue-200/60 dark:border-blue-600/40 text-blue-800 dark:text-blue-200 placeholder:text-blue-600 dark:placeholder:text-blue-400 focus:border-blue-400 dark:focus:border-blue-500" />
                <Textarea 
                  placeholder={t('contact.form.message')} 
                  className="min-h-[120px] bg-blue-100/60 dark:bg-blue-800/40 border-blue-200/60 dark:border-blue-600/40 text-blue-800 dark:text-blue-200 placeholder:text-blue-600 dark:placeholder:text-blue-400 focus:border-blue-400 dark:focus:border-blue-500"
                />
                <Button className="w-full bg-blue-600/90 hover:bg-blue-700 text-white backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200">
                  <Send className="mr-2 h-4 w-4" />
                  {t('contact.form.send')}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full bg-emerald-50/70 dark:bg-emerald-900/30 backdrop-blur-sm border-emerald-200/50 dark:border-emerald-700/40">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-200">{t('contact.info')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 flex-1">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-200/70 dark:bg-emerald-600/50 rounded-lg">
                    <MapPin className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-200">{t('contact.address')}</p>
                    <p className="text-emerald-700 dark:text-emerald-300 whitespace-pre-line">
                      {t('contact.addressDetails')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-200/70 dark:bg-emerald-600/50 rounded-lg">
                    <Phone className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-200">{t('contact.phone')}</p>
                    <p className="text-emerald-700 dark:text-emerald-300">+359 2 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-200/70 dark:bg-emerald-600/50 rounded-lg">
                    <Mail className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-200">{t('contact.email')}</p>
                    <p className="text-emerald-700 dark:text-emerald-300">info@lamarina.bg</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-200/70 dark:bg-emerald-600/50 rounded-lg">
                    <Clock className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-200">{t('contact.hours')}</p>
                    <p className="text-emerald-700 dark:text-emerald-300">
                      Понеделник - Петък: 8:00 - 17:00<br />
                      Събота: 9:00 - 13:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Full-width Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <GoogleMap
            center={{
              lat: 42.0710533,
              lng: 24.9521083
            }}
            zoom={15}
            marker={{
              position: {
                lat: 42.0710533,
                lng: 24.9521083
              },
              title: "LAMARINA BG",
              info: "С. БОЛЯРЦИ п.к.4114, Обл. Пловдивска, Общ. Садово"
            }}
            className="w-full h-96"
          />
        </motion.div>
      </div>
    </section>
  );
}
