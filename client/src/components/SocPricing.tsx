import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

export default function SocPricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Mixvoip SOC as a Service</h2>
            <p className="text-cyan-600 font-medium">{t('pricing.socaas.tagline')}</p>
          </div>

          {/* SOCaaS Packages */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* R-SOC Tranquility */}
            <div className="text-center p-4 bg-cyan-50 rounded-xl border-2 border-cyan-200">
              <div className="font-bold text-cyan-700 text-lg">R-SOC Tranquility</div>
              <div className="text-xs text-muted-foreground mt-1">{t('pricing.socaas.tranquility.target')}</div>
              <div className="mt-3">
                <span className="text-3xl font-bold text-cyan-700">7,20€</span>
                <span className="text-sm text-muted-foreground"> / {t('pricing.socaas.perUserMonth')}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{t('pricing.socaas.pack5')}</div>
              <div className="mt-4 space-y-2 text-left text-sm">
                {['f1','f2','f3','f4'].map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>{t(`pricing.socaas.tranquility.${f}`)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* R-SOC Full */}
            <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-800 text-lg">R-SOC</div>
              <div className="text-xs text-muted-foreground mt-1">{t('pricing.socaas.full.target')}</div>
              <div className="mt-3">
                <span className="text-3xl font-bold text-slate-800">10€</span>
                <span className="text-sm text-muted-foreground"> / {t('pricing.socaas.perUserMonth')}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{t('pricing.socaas.pack5')}</div>
              <div className="mt-4 space-y-2 text-left text-sm">
                {['f1','f2','f3','f4'].map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-700 flex-shrink-0 mt-0.5" />
                    <span>{t(`pricing.socaas.full.${f}`)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise */}
            <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-800 text-lg">Enterprise</div>
              <div className="text-xs text-muted-foreground mt-1">{t('pricing.socaas.enterprise.target')}</div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-slate-800">{t('pricing.onRequest')}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">&nbsp;</div>
              <div className="mt-4 space-y-2 text-left text-sm">
                {['f1','f2','f3','f4'].map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-700 flex-shrink-0 mt-0.5" />
                    <span>{t(`pricing.socaas.enterprise.${f}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-right mt-2">* {t('pricing.vatNote')}</p>
        </div>
      </div>
    </section>
  );
}
