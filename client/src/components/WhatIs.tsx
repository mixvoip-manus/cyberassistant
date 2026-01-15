import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Scale, TrendingDown } from 'lucide-react';

export default function WhatIs() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            {t('what.title')}
          </h2>

          <div className="prose prose-lg max-w-none text-center mb-12">
            <p className="text-muted-foreground">{t('what.description')}</p>
            <p className="text-muted-foreground">{t('what.description2')}</p>
          </div>

          {/* Protection Categories */}
          <div className="text-center mb-8">
            <p className="text-lg font-semibold text-muted-foreground mb-6">
              {t('what.protect')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Attacks */}
            <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('what.attacks')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('what.attacks.desc')}
              </p>
            </div>

            {/* Fines */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('what.fines')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('what.fines.desc')}
              </p>
            </div>

            {/* Losses */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('what.losses')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('what.losses.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
