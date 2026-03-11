import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Scale, Users, CheckCircle2, Info, Clock, Zap, Building2, Star, Eye, Gavel } from 'lucide-react';

export default function PricingSection() {
  const { t, getAssetUrl } = useLanguage();

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

        {/* ============================================ */}
        {/* 1. SOCaaS powered by RSecure                 */}
        {/* ============================================ */}
        <div className="mb-16">
          <div className="bg-[#0891B2] text-white p-4 text-center rounded-t-2xl max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <Eye className="h-7 w-7" />
              <h3 className="text-2xl font-bold">Mixvoip SOC as a Service</h3>
            </div>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-cyan-100 text-sm">{t('cycle.poweredBy')}</span>
              <img src={getAssetUrl('/images/Rsecure.svg')} alt="RSecure" className="h-5 brightness-0 invert" />
            </div>
            <p className="text-cyan-100 text-sm mt-1">{t('pricing.socaas.tagline')}</p>
          </div>
          
          <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
            <div className="p-6">
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
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.tranquility.f1')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.tranquility.f2')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.tranquility.f3')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.tranquility.f4')}</span>
                    </div>
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
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-700 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.full.f1')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-700 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.full.f2')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-700 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.full.f3')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-700 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.full.f4')}</span>
                    </div>
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
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-700 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.enterprise.f1')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-700 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.enterprise.f2')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-700 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.enterprise.f3')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-slate-700 flex-shrink-0 mt-0.5" />
                      <span>{t('pricing.socaas.enterprise.f4')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* SOCaaS Analogy */}
              <div className="bg-cyan-50 rounded-xl p-4 text-center">
                <p className="text-sm text-cyan-800 font-medium">
                  🔍 {t('pricing.socaas.analogy')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* 2. Cyber Assistance (Mixvoip)                */}
        {/* ============================================ */}
        <div className="mb-16">
          {/* Cyber Assistance Header Bar */}
          <div className="bg-[#00B050] text-white p-4 text-center rounded-t-2xl max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <Shield className="h-8 w-8" />
              <h3 className="text-2xl font-bold">Mixvoip CyberAssistance</h3>
            </div>
            <p className="text-green-100 text-sm mt-1">{t('pricing.assistance.tagline')}</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-0 max-w-7xl mx-auto">
            
            {/* Basic */}
            <div className="bg-white shadow-lg overflow-hidden border-r border-slate-200">
              <div className="p-5">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-[#4A90D9]">{t('pricing.assistance.basic.title')}</h4>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-[#4A90D9]">{t('pricing.assistance.basic.price')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t('pricing.assistance.basic.priceNote')}</p>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Zap className="h-3.5 w-3.5 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.entry')}</div>
                      <div className="text-muted-foreground">Fit4Cybersecurity ≥ 65%</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-3.5 w-3.5 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.users')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.basic.users')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.availability')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.basic.availability')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.response')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.basic.response')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-3.5 w-3.5 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.crisis')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.basic.crisis')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Essentiel */}
            <div className="bg-white shadow-xl overflow-hidden border-r border-slate-200">
              <div className="p-5">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-[#E63946]">{t('pricing.assistance.essentiel.title')}</h4>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-[#E63946]">{t('pricing.assistance.essentiel.price')}€</span>
                    <span className="text-xs text-muted-foreground"> / {t('pricing.assistance.essentiel.priceNote')}</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Users className="h-3.5 w-3.5 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.users')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.essentiel.users')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.availability')}</div>
                      <div className="text-muted-foreground font-bold text-[#E63946]">{t('pricing.assistance.essentiel.availability')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.response')}</div>
                      <div className="text-muted-foreground font-bold text-[#E63946]">{t('pricing.assistance.essentiel.response')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-3.5 w-3.5 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.crisis')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.essentiel.crisis')}</div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <Info className="h-3 w-3" />
                      <span className="text-xs font-medium">{t('pricing.assistance.essentiel.recommendation')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced - Featured */}
            <div className="bg-white shadow-lg overflow-hidden border-x-2 border-b-2 border-[#FF8C00] relative">
              <div className="absolute top-0 left-0 right-0 bg-[#FF8C00] text-white text-center text-xs py-1 font-medium">
                {t('pricing.assistance.etendu.badge')}
              </div>
              <div className="p-5 pt-7">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-[#FF8C00]">{t('pricing.assistance.etendu.title')}</h4>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-[#FF8C00]">{t('pricing.assistance.etendu.price')}€</span>
                    <span className="text-xs text-muted-foreground"> / {t('pricing.assistance.etendu.priceNote')}</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Star className="h-3.5 w-3.5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.entry')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.etendu.entry')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-3.5 w-3.5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.users')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.etendu.users')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.availability')}</div>
                      <div className="text-muted-foreground font-bold text-[#FF8C00]">{t('pricing.assistance.etendu.availability')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.response')}</div>
                      <div className="text-muted-foreground font-bold text-[#FF8C00]">{t('pricing.assistance.etendu.response')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-3.5 w-3.5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.crisis')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.etendu.crisis')}</div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <Info className="h-3 w-3" />
                      <span className="text-xs font-medium">{t('pricing.assistance.etendu.recommendation')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro */}
            <div className="bg-white shadow-lg overflow-hidden">
              <div className="p-5">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-slate-800">{t('pricing.assistance.pro.title')}</h4>
                  <div className="mt-2">
                    <span className="text-xl font-bold text-slate-800">{t('pricing.assistance.pro.priceNote')}</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Zap className="h-3.5 w-3.5 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.entry')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.pro.entry')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building2 className="h-3.5 w-3.5 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.users')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.pro.users')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.availability')}</div>
                      <div className="text-muted-foreground font-bold">{t('pricing.assistance.pro.availability')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.response')}</div>
                      <div className="text-muted-foreground font-bold">{t('pricing.assistance.pro.response')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-3.5 w-3.5 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.crisis')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.pro.crisis')}</div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <Info className="h-3 w-3" />
                      <span className="text-xs font-medium">{t('pricing.assistance.pro.recommendation')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Firefighter Analogy - directly under Cyber Assistance */}
          <div className="bg-slate-100 rounded-b-2xl p-4 border-t border-slate-200 max-w-7xl mx-auto">
            <h4 className="text-sm font-bold mb-3 text-center text-slate-700">{t('pricing.analogy.title')}</h4>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                <div className="text-lg mb-1">🚒</div>
                <div className="font-bold text-[#4A90D9] text-xs">Basic</div>
                <div className="text-xs text-muted-foreground mt-1">{t('pricing.analogy.basic')}</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                <div className="text-lg mb-1">🚒</div>
                <div className="font-bold text-[#E63946] text-xs">Essentiel</div>
                <div className="text-xs text-muted-foreground mt-1">{t('pricing.analogy.essentiel')}</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                <div className="text-lg mb-1">🏭</div>
                <div className="font-bold text-[#FF8C00] text-xs">Advanced</div>
                <div className="text-xs text-muted-foreground mt-1">{t('pricing.analogy.etendu')}</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                <div className="text-lg mb-1">✈️</div>
                <div className="font-bold text-slate-800 text-xs">Pro</div>
                <div className="text-xs text-muted-foreground mt-1">{t('pricing.analogy.pro')}</div>
              </div>
            </div>
          </div>

          {/* CyberAssurance Cost Notice */}
          <div className="max-w-7xl mx-auto mt-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-blue-800 text-sm flex items-center gap-2">
                  {t('pricing.assurance.costNote')}
                  <img src={getAssetUrl('/images/LeFoyer.svg')} alt="Le Foyer" className="h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Self-Qualification & False Alarm Policy Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-t-2xl shadow-lg overflow-hidden">
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
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-700 mb-2">{t('pricing.selfQualification.notCyber.action')}</p>
                    <a href="tel:+35220333399" className="text-blue-600 font-bold">+352 20 33 33 99</a>
                  </div>
                </div>
                
                {/* IS a Cyber Emergency */}
                <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                  <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {t('pricing.selfQualification.isCyber.title')}
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t('pricing.selfQualification.isCyber.item1')}</li>
                    <li>• {t('pricing.selfQualification.isCyber.item2')}</li>
                    <li>• {t('pricing.selfQualification.isCyber.item3')}</li>
                    <li>• {t('pricing.selfQualification.isCyber.item4')}</li>
                    <li>• {t('pricing.selfQualification.isCyber.item5')}</li>
                  </ul>
                  <div className="mt-4">
                    <p className="text-sm font-bold text-red-700">{t('pricing.selfQualification.isCyber.action')}</p>
                  </div>
                </div>
              </div>
              
              {/* False Alarm Policy */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4">{t('pricing.falseAlarm.title')}</h4>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="font-medium text-[#4A90D9]">Basic</div>
                    <div className="text-muted-foreground mt-1">{t('pricing.falseAlarm.basic')}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="font-medium text-[#E63946]">Essentiel</div>
                    <div className="text-muted-foreground mt-1">{t('pricing.falseAlarm.essentiel')}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="font-medium text-[#FF8C00]">Advanced</div>
                    <div className="text-muted-foreground mt-1">{t('pricing.falseAlarm.etendu')}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="font-medium text-slate-800">Pro</div>
                    <div className="text-muted-foreground mt-1">{t('pricing.falseAlarm.pro')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* 3. CyberAssurance powered by Le Foyer        */}
        {/* ============================================ */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
            <div className="bg-[#2563EB] text-white p-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <Scale className="h-6 w-6" />
                <h3 className="text-xl font-bold">Mixvoip CyberAssurance</h3>
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-blue-100 text-sm">{t('cycle.poweredBy')}</span>
                <img src={getAssetUrl('/images/LeFoyer.svg')} alt="Le Foyer" className="h-5 brightness-0 invert" />
              </div>
              <p className="text-blue-100 text-sm mt-1">{t('pricing.assurance.tagline')}</p>
            </div>
            <div className="p-6">
              {/* CyberAssurance info */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                <Info className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">{t('pricing.assurance.costNote')}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="font-bold text-blue-700 text-lg">{t('pricing.assurance.essentiel.title')}</div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-blue-700">{t('pricing.assurance.essentiel.price')}€</span>
                    <span className="text-sm text-muted-foreground"> / {t('pricing.assurance.essentiel.priceNote')}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{t('pricing.assurance.essentiel.desc')}</div>
                </div>
                <div className="text-center p-4 bg-blue-100 rounded-lg border-2 border-blue-400">
                  <div className="font-bold text-blue-800 text-lg">{t('pricing.assurance.etendu.title')}</div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-blue-800">{t('pricing.assurance.etendu.price')}€</span>
                    <span className="text-sm text-muted-foreground"> / {t('pricing.assurance.etendu.priceNote')}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{t('pricing.assurance.etendu.desc')}</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-700 text-lg">{t('pricing.assurance.pro.title')}</div>
                  <div className="mt-2">
                    <span className="text-xl font-bold text-slate-700">{t('pricing.onRequest')}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{t('pricing.assurance.pro.desc')}</div>
                </div>
              </div>
              
              {/* Assurance Services Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.assurance.feature1')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.assurance.feature2')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.assurance.feature4')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.assurance.feature5')}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.assurance.feature6')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.assurance.feature7')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.assurance.feature8')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.assurance.feature3New')}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">{t('pricing.yearlyContract')}</div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>{t('pricing.assurance.disclaimer')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* 4. CyberAdvisory powered by Luxgap           */}
        {/* ============================================ */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
            <div className="bg-[#7C3AED] text-white p-4 text-center">
              <div className="flex items-center justify-center gap-3">
                <Gavel className="h-6 w-6" />
                <h3 className="text-xl font-bold">Mixvoip CyberAdvisory</h3>
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-purple-100 text-sm">{t('cycle.poweredBy')}</span>
                <img src={getAssetUrl('/images/luxgaplogo.svg')} alt="Luxgap" className="h-5 brightness-0 invert" />
              </div>
              <p className="text-purple-100 text-sm mt-1">{t('pricing.advisory.tagline')}</p>
            </div>
            <div className="p-6">
              {/* Advisory Packages */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="font-bold text-purple-600 text-lg">{t('pricing.advisory.essentiel.title')}</div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-purple-600">{t('pricing.advisory.essentiel.price')}€</span>
                    <span className="text-sm text-muted-foreground"> / {t('pricing.year')}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{t('pricing.advisory.essentiel.desc')}</div>
                </div>
                <div className="text-center p-4 bg-purple-100 rounded-lg border-2 border-purple-400">
                  <div className="font-bold text-purple-800 text-lg">{t('pricing.advisory.etendu.title')}</div>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-purple-800">{t('pricing.advisory.etendu.price')}€</span>
                    <span className="text-sm text-muted-foreground"> / {t('pricing.year')}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{t('pricing.advisory.etendu.desc')}</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-700 text-lg">{t('pricing.advisory.pro.title')}</div>
                  <div className="mt-2">
                    <span className="text-xl font-bold text-slate-700">{t('pricing.onRequest')}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{t('pricing.advisory.pro.desc')}</div>
                </div>
              </div>
              
              {/* Advisory Services Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.advisory.feature1')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.advisory.feature2')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.advisory.feature3')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.advisory.feature4')}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.advisory.feature5')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.advisory.feature6')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.advisory.feature7')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{t('pricing.advisory.feature8')}</span>
                  </div>
                </div>
              </div>
              

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
