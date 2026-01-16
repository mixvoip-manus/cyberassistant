import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Scale, Users, CheckCircle2, Info, Clock, Zap, Building2 } from 'lucide-react';

export default function PricingSection() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Cyber Assistance Packages */}
        <div className="mb-16">
          {/* Cyber Assistance Header Bar */}
          <div className="bg-[#00B050] text-white p-4 text-center rounded-t-2xl max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <Shield className="h-8 w-8" />
              <h3 className="text-2xl font-bold">Cyber Assistance</h3>
            </div>
            <p className="text-green-100 text-sm mt-1">{t('pricing.assistance.tagline')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0 max-w-6xl mx-auto">
            
            {/* Basic */}
            <div className="bg-white shadow-lg overflow-hidden border-r border-slate-200 md:rounded-bl-2xl">
              <div className="p-6">
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-[#4A90D9]">{t('pricing.assistance.basic.title')}</h4>
                  <div className="mt-3">
                    <span className="text-3xl font-bold text-[#4A90D9]">{t('pricing.assistance.basic.price')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t('pricing.assistance.basic.priceNote')}</p>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.entry')}</div>
                      <div className="text-muted-foreground">Fit4Cybersecurity ≥ 60%</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.users')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.basic.users')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.availability')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.basic.availability')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.response')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.basic.response')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.crisis')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.basic.crisis')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro - Featured */}
            <div className="bg-white shadow-xl overflow-hidden border-x-2 border-b-2 border-[#E63946] relative">
              <div className="absolute top-0 left-0 right-0 bg-[#E63946] text-white text-center text-xs py-1 font-medium">
                {t('pricing.mostPopular')}
              </div>
              <div className="p-6 pt-8">
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-[#E63946]">{t('pricing.assistance.pro.title')}</h4>
                  <div className="mt-3">
                    <span className="text-3xl font-bold text-[#E63946]">€2</span>
                    <span className="text-muted-foreground">/{t('pricing.perUserMonth')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t('pricing.yearlyContract')}</p>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.entry')}</div>
                      <div className="text-muted-foreground">Fit4Cybersecurity ≥ 80%</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.users')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.pro.users')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.availability')}</div>
                      <div className="text-muted-foreground font-bold text-[#E63946]">{t('pricing.assistance.pro.availability')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.response')}</div>
                      <div className="text-muted-foreground font-bold text-[#E63946]">{t('pricing.assistance.pro.response')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.crisis')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.pro.crisis')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise */}
            <div className="bg-white shadow-lg overflow-hidden border-l border-slate-200 md:rounded-br-2xl">
              <div className="p-6">
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-slate-800">{t('pricing.assistance.enterprise.title')}</h4>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-slate-800">{t('pricing.onRequest')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t('pricing.assistance.enterprise.priceNote')}</p>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.entry')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.enterprise.entry')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="h-4 w-4 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.users')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.enterprise.users')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.availability')}</div>
                      <div className="text-muted-foreground font-bold">{t('pricing.assistance.enterprise.availability')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.response')}</div>
                      <div className="text-muted-foreground font-bold">{t('pricing.assistance.enterprise.response')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.crisis')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.enterprise.crisis')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Self-Qualification & False Alarm Policy Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-amber-500 text-white p-4 text-center">
              <h3 className="text-xl font-bold">{t('pricing.selfQualification.title')}</h3>
              <p className="text-amber-100 text-sm mt-1">{t('pricing.selfQualification.subtitle')}</p>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Not a Cyber Emergency */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    {t('pricing.selfQualification.notCyber.title')}
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t('pricing.selfQualification.notCyber.item1')}</li>
                    <li>• {t('pricing.selfQualification.notCyber.item2')}</li>
                    <li>• {t('pricing.selfQualification.notCyber.item3')}</li>
                    <li>• {t('pricing.selfQualification.notCyber.item4')}</li>
                    <li>• {t('pricing.selfQualification.notCyber.item5')}</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm font-medium text-slate-700 mb-2">{t('pricing.selfQualification.notCyber.action')}</p>
                    <div className="space-y-2">
                      <a href="https://www.mixvoip.com/sla/" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-600 hover:underline">→ Mixvoip SLA</a>
                      <a href="https://www.mixvoip.com/contact/support/" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-600 hover:underline">→ Mixvoip Support</a>
                    </div>
                  </div>
                </div>
                {/* Is a Cyber Emergency */}
                <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                  <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('pricing.selfQualification.isCyber.title')}
                  </h4>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• {t('pricing.selfQualification.isCyber.item1')}</li>
                    <li>• {t('pricing.selfQualification.isCyber.item2')}</li>
                    <li>• {t('pricing.selfQualification.isCyber.item3')}</li>
                    <li>• {t('pricing.selfQualification.isCyber.item4')}</li>
                    <li>• {t('pricing.selfQualification.isCyber.item5')}</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-red-200">
                    <p className="text-sm font-bold text-red-700">{t('pricing.selfQualification.isCyber.action')}</p>
                  </div>
                </div>
              </div>
              
              {/* False Alarm Policy */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4">{t('pricing.falseAlarm.title')}</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-[#4A90D9]/10 rounded-lg p-3">
                    <div className="font-bold text-[#4A90D9]">Basic</div>
                    <div className="text-muted-foreground mt-1">{t('pricing.falseAlarm.basic')}</div>
                  </div>
                  <div className="bg-[#E63946]/10 rounded-lg p-3">
                    <div className="font-bold text-[#E63946]">Pro</div>
                    <div className="text-muted-foreground mt-1">{t('pricing.falseAlarm.pro')}</div>
                  </div>
                  <div className="bg-slate-100 rounded-lg p-3">
                    <div className="font-bold text-slate-800">Enterprise</div>
                    <div className="text-muted-foreground mt-1">{t('pricing.falseAlarm.enterprise')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Cyber Assurance */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-6 text-center">
              <Scale className="h-12 w-12 mx-auto mb-3" />
              <h3 className="text-2xl font-bold">Cyber Assurance</h3>
              <p className="text-blue-100 text-sm mt-1">{t('pricing.assurance.tagline')}</p>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-sm text-muted-foreground mb-2">{t('pricing.assurance.coverage')}</div>
                <div className="space-y-2">
                  <div className="px-4 py-2 bg-slate-50 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600">€50,000</span>
                      <span className="text-sm text-muted-foreground">200€ / {t('pricing.year')}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{t('pricing.assurance.deductible')}: 500€</div>
                  </div>
                  <div className="px-4 py-2 bg-slate-50 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600">€100,000</span>
                      <span className="text-sm text-muted-foreground">350€ / {t('pricing.year')}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{t('pricing.assurance.deductible')}: 1.000€</div>
                  </div>
                  <div className="px-4 py-2 bg-slate-50 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600">€250,000</span>
                      <span className="text-sm text-muted-foreground">750€ / {t('pricing.year')}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{t('pricing.assurance.deductible')}: 2.500€</div>
                  </div>
                  <div className="px-4 py-3 bg-blue-50 rounded border border-blue-200 text-center">
                    <div className="font-bold text-blue-600">Enterprise</div>
                    <div className="text-sm text-muted-foreground">{t('pricing.assurance.enterprise')}</div>
                    <div className="text-lg font-bold mt-1 text-blue-600">{t('pricing.onRequest')}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-2">{t('pricing.yearlyContract')}</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t('pricing.assurance.feature1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t('pricing.assurance.feature2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t('pricing.assurance.feature3New')}</span>
                </li>
              </ul>
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-blue-50 p-3 rounded">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{t('pricing.assurance.partner')}</span>
              </div>
            </div>
          </div>

          {/* Cyber Advisory */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-purple-600 text-white p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-3" />
              <h3 className="text-2xl font-bold">Cyber Advisory</h3>
              <p className="text-purple-100 text-sm mt-1">{t('pricing.advisory.tagline')}</p>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="space-y-3">
                  <div className="px-4 py-3 bg-slate-50 rounded">
                    <div className="font-bold text-purple-600">Light</div>
                    <div className="text-sm text-muted-foreground">DPO as a Service</div>
                    <div className="text-xl font-bold mt-1">€500<span className="text-sm font-normal text-muted-foreground">/{t('pricing.year')}</span></div>
                  </div>
                  <div className="px-4 py-3 bg-slate-50 rounded">
                    <div className="font-bold text-purple-600">Standard</div>
                    <div className="text-sm text-muted-foreground">CISO as a Service</div>
                    <div className="text-xl font-bold mt-1">€2,000<span className="text-sm font-normal text-muted-foreground">/{t('pricing.year')}</span></div>
                  </div>
                  <div className="px-4 py-3 bg-purple-50 rounded border border-purple-200">
                    <div className="font-bold text-purple-600">Enterprise</div>
                    <div className="text-sm text-muted-foreground">{t('pricing.advisory.enterprise')}</div>
                    <div className="text-lg font-bold mt-1 text-purple-600">{t('pricing.onRequest')}</div>
                  </div>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t('pricing.advisory.feature1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t('pricing.advisory.feature2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t('pricing.advisory.feature3')}</span>
                </li>
              </ul>
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-purple-50 p-3 rounded">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>{t('pricing.advisory.partner')}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
