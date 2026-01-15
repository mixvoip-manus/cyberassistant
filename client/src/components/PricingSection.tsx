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
                  <div className="px-4 py-2 bg-slate-50 rounded text-center">
                    <span className="font-bold text-blue-600">€50,000</span>
                  </div>
                  <div className="px-4 py-2 bg-slate-50 rounded text-center">
                    <span className="font-bold text-blue-600">€100,000</span>
                  </div>
                  <div className="px-4 py-2 bg-slate-50 rounded text-center">
                    <span className="font-bold text-blue-600">€250,000</span>
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
                  <span className="text-sm">{t('pricing.assurance.feature3')}</span>
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
