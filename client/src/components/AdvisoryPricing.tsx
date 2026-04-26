import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2 } from 'lucide-react';

export default function AdvisoryPricing() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Mixvoip CyberAdvisory</h2>
            <p className="text-purple-600 font-medium">{t('pricing.advisory.tagline')}</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl mx-auto">{t('pricing.advisory.subtitle')}</p>
          </div>

          {/* Advisory 3-Tier Packages */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* Starter */}
            <div className="p-5 bg-purple-50 rounded-xl border border-purple-200">
              <div className="text-center mb-4">
                <h4 className="text-lg font-bold text-purple-600">{t('pricing.advisory.starter.title')}</h4>
                <div className="text-xs text-muted-foreground mt-1">{t('pricing.advisory.starter.target')}</div>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-purple-600">{t('pricing.advisory.starter.price')}€</span>
                  <span className="text-sm text-muted-foreground"> {t('pricing.advisory.starter.priceNote')}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-purple-800 mb-3">{t('pricing.advisory.starter.desc')}</p>
              <div className="space-y-2">
                {['f1','f2','f3','f4','f5','f6','f7'].map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs">{t(`pricing.advisory.starter.${f}`)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-purple-200">
                <p className="text-xs text-muted-foreground italic">{t('pricing.advisory.starter.note')}</p>
              </div>
            </div>

            {/* Business (Recommended) */}
            <div className="p-5 bg-purple-100 rounded-xl border-2 border-purple-400 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">{t('pricing.advisory.business.recommended')}</span>
              </div>
              <div className="text-center mb-4 mt-2">
                <h4 className="text-lg font-bold text-purple-800">{t('pricing.advisory.business.title')}</h4>
                <div className="text-xs text-muted-foreground mt-1">{t('pricing.advisory.business.target')}</div>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-purple-800">{t('pricing.advisory.business.price')}€</span>
                  <span className="text-sm text-muted-foreground"> {t('pricing.advisory.business.priceNote')}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-purple-900 mb-3">{t('pricing.advisory.business.desc')}</p>
              <div className="space-y-2">
                {['f1','f2','f3','f4','f5','f6','f7','f8'].map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs">{t(`pricing.advisory.business.${f}`)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-center mb-4">
                <h4 className="text-lg font-bold text-slate-800">{t('pricing.advisory.expert.title')}</h4>
                <div className="text-xs text-muted-foreground mt-1">{t('pricing.advisory.expert.target')}</div>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-slate-800">{t('pricing.advisory.expert.price')}€</span>
                  <span className="text-sm text-muted-foreground"> {t('pricing.advisory.expert.priceNote')}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-700 mb-3">{t('pricing.advisory.expert.desc')}</p>
              <div className="space-y-2">
                {['f1','f2','f3','f4','f5','f6','f7'].map(f => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-slate-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs">{t(`pricing.advisory.expert.${f}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Over 100 people */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800">{t('pricing.advisory.over100')}</span>
              <span className="text-sm text-muted-foreground ml-2">{t('pricing.advisory.over100.desc')}</span>
            </div>
            <a href="https://voxbi.me/mixvoip/sales" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-purple-600 hover:text-purple-800 whitespace-nowrap">
              {t('pricing.advisory.over100.cta')} →
            </a>
          </div>

          {/* Add-on Options */}
          <div className="border-t border-slate-200 pt-6">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">{t('pricing.advisory.addon.title')}</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {/* XTI */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-800">{t('pricing.advisory.addon.xti.title')}</div>
                <div className="mt-1">
                  <span className="text-xl font-bold text-purple-600">{t('pricing.advisory.addon.xti.price')}€</span>
                  <span className="text-xs text-muted-foreground"> {t('pricing.advisory.addon.xti.priceNote')}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-4">{t('pricing.advisory.addon.xti.desc')}</p>
              </div>
              {/* BCP */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-800">{t('pricing.advisory.addon.bcp.title')}</div>
                <div className="mt-1">
                  <span className="text-xl font-bold text-purple-600">{t('pricing.advisory.addon.bcp.price')}€</span>
                  <span className="text-xs text-muted-foreground"> {t('pricing.advisory.addon.bcp.priceNote')}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-4">{t('pricing.advisory.addon.bcp.desc')}</p>
              </div>
              {/* LuxApps */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-800">{t('pricing.advisory.addon.luxapps.title')}</div>
                <div className="mt-1">
                  <span className="text-sm font-bold text-purple-600">{t('pricing.advisory.addon.luxapps.priceNote')}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-4">{t('pricing.advisory.addon.luxapps.desc')}</p>
              </div>
            </div>
          </div>

          {/* Billing Note */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-xs text-muted-foreground">{t('pricing.advisory.billingNote')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
