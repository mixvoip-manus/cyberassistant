import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, Check, AlertCircle, X, CheckCircle2, Phone, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

// Coverage data
const coverageData = [
  {
    id: 'tech',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    titleKey: 'coverage.tech.title',
    subtitleKey: 'coverage.tech.subtitle',
    descriptionKey: 'coverage.tech.description',
    items: ['coverage.tech.item1', 'coverage.tech.item2', 'coverage.tech.item3', 'coverage.tech.item4', 'coverage.tech.item5', 'coverage.tech.item6'],
    exampleKey: 'coverage.tech.example',
    color: 'bg-emerald-500',
  },
  {
    id: 'legal',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    titleKey: 'coverage.legal.title',
    subtitleKey: 'coverage.legal.subtitle',
    descriptionKey: 'coverage.legal.description',
    items: ['coverage.legal.item1', 'coverage.legal.item2', 'coverage.legal.item3', 'coverage.legal.item4', 'coverage.legal.item5'],
    exampleKey: 'coverage.legal.example',
    color: 'bg-blue-500',
  },
  {
    id: 'business',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    titleKey: 'coverage.business.title',
    subtitleKey: 'coverage.business.subtitle',
    descriptionKey: 'coverage.business.description',
    items: ['coverage.business.item1', 'coverage.business.item2', 'coverage.business.item3', 'coverage.business.item4', 'coverage.business.item5', 'coverage.business.item6'],
    exampleKey: 'coverage.business.example',
    color: 'bg-amber-500',
  },
  {
    id: 'extortion',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    titleKey: 'coverage.extortion.title',
    subtitleKey: 'coverage.extortion.subtitle',
    descriptionKey: 'coverage.extortion.description',
    items: ['coverage.extortion.item1', 'coverage.extortion.item2', 'coverage.extortion.item3', 'coverage.extortion.item4'],
    exampleKey: 'coverage.extortion.example',
    color: 'bg-red-500',
  },
  {
    id: 'fraud',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titleKey: 'coverage.fraud.title',
    subtitleKey: 'coverage.fraud.subtitle',
    descriptionKey: 'coverage.fraud.description',
    items: ['coverage.fraud.item1', 'coverage.fraud.item2', 'coverage.fraud.item3', 'coverage.fraud.item4'],
    exampleKey: 'coverage.fraud.example',
    color: 'bg-purple-500',
  },
  {
    id: 'prevention',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    titleKey: 'coverage.prevention.title',
    subtitleKey: 'coverage.prevention.subtitle',
    descriptionKey: 'coverage.prevention.description',
    items: ['coverage.prevention.item1', 'coverage.prevention.item2', 'coverage.prevention.item3', 'coverage.prevention.item4', 'coverage.prevention.item5'],
    exampleKey: 'coverage.prevention.example',
    color: 'bg-teal-500',
  },
];

// FAQ keys
const faqKeys = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
  { q: 'faq.q6', a: 'faq.a6' },
];

export default function CoverageFAQ() {
  const { t } = useLanguage();
  const [openCoverageId, setOpenCoverageId] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section id="coverage-faq" className="section-padding bg-slate-50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT: Coverage Accordions */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 min-h-[72px] flex items-end">{t('coverage.title')}</h2>
            <div className="space-y-3">
              {coverageData.map((coverage) => (
                <div
                  key={coverage.id}
                  className="bg-white rounded-xl shadow-sm border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setOpenCoverageId(openCoverageId === coverage.id ? null : coverage.id)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors min-h-[52px]"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn('p-2 rounded-lg text-white', coverage.color)}>
                        {coverage.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{t(coverage.titleKey)}</h3>
                        <p className="text-xs text-muted-foreground">{t(coverage.subtitleKey)}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-muted-foreground transition-transform duration-200',
                        openCoverageId === coverage.id && 'rotate-180'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      openCoverageId === coverage.id ? 'max-h-[1000px]' : 'max-h-0'
                    )}
                  >
                    <div className="px-4 pb-4 pt-2 border-t border-border">
                      <p className="text-muted-foreground text-sm mb-4">{t(coverage.descriptionKey)}</p>
                      <div className="grid sm:grid-cols-2 gap-2 mb-4">
                        {coverage.items.map((itemKey, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-[#00B050] shrink-0 mt-0.5" />
                            <span className="text-xs">{t(itemKey)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3 border-l-4 border-[#00B050]">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-[#00B050] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-xs block mb-1">{t('coverage.example.label')}</span>
                            <p className="text-xs text-muted-foreground">{t(coverage.exampleKey)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: FAQ + Cyber Emergency */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 min-h-[72px] flex items-end">{t('faq.title')}</h2>
            
            {/* FAQ Accordions - Cyber Emergency is the first item */}
            <div className="space-y-3">
              {/* Cyber Emergency FAQ Item */}
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === -1 ? null : -1)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors min-h-[52px]"
                >
                  <span className="font-medium text-sm pr-4">
                    {t('pricing.selfQualification.title')}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200',
                      openFaqIndex === -1 && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    openFaqIndex === -1 ? 'max-h-[800px]' : 'max-h-0'
                  )}
                >
                  <div className="px-4 pb-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mt-3 mb-3">{t('pricing.selfQualification.subtitle')}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50/50 rounded-lg p-3">
                        <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5 mb-2">
                          <X className="h-4 w-4 text-red-500" />
                          {t('pricing.selfQualification.notCyber.title')}
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-600">
                          <li>• {t('pricing.selfQualification.notCyber.item1')}</li>
                          <li>• {t('pricing.selfQualification.notCyber.item2')}</li>
                          <li>• {t('pricing.selfQualification.notCyber.item3')}</li>
                          <li>• {t('pricing.selfQualification.notCyber.item4')}</li>
                          <li>• {t('pricing.selfQualification.notCyber.item5')}</li>
                        </ul>
                        <div className="mt-2 bg-white rounded p-2 border border-slate-200">
                          <p className="text-xs text-slate-500">{t('pricing.selfQualification.notCyber.action')}</p>
                          <a href="tel:+35220333399" className="text-sm font-bold text-blue-600">+352 20 33 33 99</a>
                        </div>
                      </div>
                      <div className="bg-red-50/50 rounded-lg p-3">
                        <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5 mb-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          {t('pricing.selfQualification.isCyber.title')}
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-600">
                          <li>• {t('pricing.selfQualification.isCyber.item1')}</li>
                          <li>• {t('pricing.selfQualification.isCyber.item2')}</li>
                          <li>• {t('pricing.selfQualification.isCyber.item3')}</li>
                          <li>• {t('pricing.selfQualification.isCyber.item4')}</li>
                          <li>• {t('pricing.selfQualification.isCyber.item5')}</li>
                        </ul>
                        <div className="mt-2 flex items-center gap-1.5 text-red-600 font-bold text-xs">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{t('pricing.selfQualification.isCyber.action')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regular FAQ Items */}
              {faqKeys.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors min-h-[52px]"
                  >
                    <span className="font-medium text-sm pr-4">{t(faq.q)}</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200',
                        openFaqIndex === index && 'rotate-180'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300',
                      openFaqIndex === index ? 'max-h-96' : 'max-h-0'
                    )}
                  >
                    <div className="px-4 pb-3 text-sm text-muted-foreground">{t(faq.a)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
