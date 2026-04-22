import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Scale, Users, CheckCircle2, Info, Clock, Zap, Building2, Star, Eye, Gavel, MapPin, Wifi, FileText, AlertTriangle, XCircle } from 'lucide-react';

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
            <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white">{t('pricing.monthlyBilling')}</span>
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
          {/* Cyber Assistance Header Bar - Split Layout */}
          <div className="flex rounded-t-2xl max-w-7xl mx-auto overflow-hidden">
            {/* Left: Green with Mixvoip CyberAssistance */}
            <div className="bg-[#00B050] text-white p-6 flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-3">
                <Shield className="h-8 w-8" />
                <h3 className="text-2xl font-bold">Mixvoip CyberAssistance</h3>
              </div>
              <p className="text-green-100 text-sm mt-1">{t('pricing.assistance.tagline')}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white">{t('pricing.monthlyBilling')}</span>
            </div>
            {/* Right: White with Le Foyer Logo */}
            <div className="bg-white flex items-center justify-center p-6 w-[280px] border-t border-r border-slate-200">
              <img src={getAssetUrl('/images/logo_le_foyer.svg')} alt="Le Foyer" className="h-20 object-contain" />
            </div>
          </div>
          
          {/* Minimum Requirement Notice */}
          <div className="bg-amber-50 border-x border-amber-200 px-4 py-2 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 justify-center">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
              <span className="text-xs font-medium text-amber-800">{t('pricing.assistance.minRequirement')}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-0 max-w-7xl mx-auto">
            
            {/* Office */}
            <div className="bg-white shadow-lg overflow-hidden border-r border-slate-200">
              <div className="p-5">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-[#4A90D9]">{t('pricing.assistance.office.title')}</h4>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-[#4A90D9]">{t('pricing.assistance.office.price')}€</span>
                    <span className="text-xs text-muted-foreground"> / {t('pricing.assistance.office.priceNote')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{t('pricing.assistance.office.sla')}</p>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Zap className="h-3.5 w-3.5 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.responseCyber')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.office.responseCyber')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.interventionOnsite')}</div>
                      <div className="text-muted-foreground text-red-400">{t('pricing.assistance.office.interventionOnsite')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Wifi className="h-3.5 w-3.5 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.interventionRemote')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.office.interventionRemote')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Gavel className="h-3.5 w-3.5 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.cnpd')}</div>
                      <div className="text-emerald-600 font-medium">{t('pricing.assistance.office.cnpd')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-3.5 w-3.5 text-[#4A90D9] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.incidentReport')}</div>
                      <div className="text-red-400">{t('pricing.assistance.office.incidentReport')}</div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-1.5 text-emerald-600">
                      <Shield className="h-3 w-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-medium">{t('pricing.assistance.cyberAssurance')}</div>
                        <div className="text-xs text-muted-foreground">{t('pricing.assistance.office.cyberAssurance')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business */}
            <div className="bg-white shadow-xl overflow-hidden border-r border-slate-200">
              <div className="p-5">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-[#E63946]">{t('pricing.assistance.business.title')}</h4>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-[#E63946]">{t('pricing.assistance.business.price')}€</span>
                    <span className="text-xs text-muted-foreground"> / {t('pricing.assistance.business.priceNote')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{t('pricing.assistance.business.sla')}</p>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Zap className="h-3.5 w-3.5 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.responseCyber')}</div>
                      <div className="text-muted-foreground font-bold text-[#E63946]">{t('pricing.assistance.business.responseCyber')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.interventionOnsite')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.business.interventionOnsite')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Wifi className="h-3.5 w-3.5 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.interventionRemote')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.business.interventionRemote')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Gavel className="h-3.5 w-3.5 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.cnpd')}</div>
                      <div className="text-emerald-600 font-medium">{t('pricing.assistance.business.cnpd')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-3.5 w-3.5 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.incidentReport')}</div>
                      <div className="text-emerald-600 font-medium">{t('pricing.assistance.business.incidentReport')}</div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-1.5 text-emerald-600">
                      <Shield className="h-3 w-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-medium">{t('pricing.assistance.cyberAssurance')}</div>
                        <div className="text-xs text-muted-foreground">{t('pricing.assistance.business.cyberAssurance')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced - Featured */}
            <div className="bg-white shadow-lg overflow-hidden border-x-2 border-b-2 border-[#FF8C00] relative">
              <div className="absolute top-0 left-0 right-0 bg-[#FF8C00] text-white text-center text-xs py-1 font-medium">
                {t('pricing.assistance.advanced.badge')}
              </div>
              <div className="p-5 pt-7">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold text-[#FF8C00]">{t('pricing.assistance.advanced.title')}</h4>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-[#FF8C00]">{t('pricing.assistance.advanced.price')}€</span>
                    <span className="text-xs text-muted-foreground"> / {t('pricing.assistance.advanced.priceNote')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{t('pricing.assistance.advanced.sla')}</p>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Zap className="h-3.5 w-3.5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.responseCyber')}</div>
                      <div className="text-muted-foreground font-bold text-[#FF8C00]">{t('pricing.assistance.advanced.responseCyber')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.interventionOnsite')}</div>
                      <div className="text-muted-foreground">{t('pricing.assistance.advanced.interventionOnsite')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Wifi className="h-3.5 w-3.5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.interventionRemote')}</div>
                      <div className="text-muted-foreground font-bold text-[#FF8C00]">{t('pricing.assistance.advanced.interventionRemote')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Gavel className="h-3.5 w-3.5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.cnpd')}</div>
                      <div className="text-emerald-600 font-medium">{t('pricing.assistance.advanced.cnpd')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-3.5 w-3.5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.incidentReport')}</div>
                      <div className="text-emerald-600 font-medium">{t('pricing.assistance.advanced.incidentReport')}</div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-1.5 text-emerald-600">
                      <Shield className="h-3 w-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-medium">{t('pricing.assistance.cyberAssurance')}</div>
                        <div className="text-xs text-muted-foreground">{t('pricing.assistance.advanced.cyberAssurance')}</div>
                      </div>
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
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{t('pricing.assistance.pro.sla')}</p>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2">
                    <Zap className="h-3.5 w-3.5 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.responseCyber')}</div>
                      <div className="text-muted-foreground font-bold">{t('pricing.assistance.pro.responseCyber')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.interventionOnsite')}</div>
                      <div className="text-muted-foreground font-bold">{t('pricing.assistance.pro.interventionOnsite')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Wifi className="h-3.5 w-3.5 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.interventionRemote')}</div>
                      <div className="text-muted-foreground font-bold">{t('pricing.assistance.pro.interventionRemote')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Gavel className="h-3.5 w-3.5 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.cnpd')}</div>
                      <div className="text-emerald-600 font-medium">{t('pricing.assistance.pro.cnpd')}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-3.5 w-3.5 text-slate-800 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{t('pricing.assistance.incidentReport')}</div>
                      <div className="text-emerald-600 font-medium">{t('pricing.assistance.pro.incidentReport')}</div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <a href="#cyberassurance" className="flex items-start gap-1.5 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                      <Info className="h-3 w-3 flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-medium underline">{t('pricing.assistance.pro.cyberAssurance')}</span>
                    </a>
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
                <div className="font-bold text-[#4A90D9] text-xs">Office</div>
                <div className="text-xs text-muted-foreground mt-1">{t('pricing.analogy.office')}</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                <div className="text-lg mb-1">🚒</div>
                <div className="font-bold text-[#E63946] text-xs">Business</div>
                <div className="text-xs text-muted-foreground mt-1">{t('pricing.analogy.business')}</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                <div className="text-lg mb-1">🏭</div>
                <div className="font-bold text-[#FF8C00] text-xs">Advanced</div>
                <div className="text-xs text-muted-foreground mt-1">{t('pricing.analogy.advanced')}</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                <div className="text-lg mb-1">✈️</div>
                <div className="font-bold text-slate-800 text-xs">Pro</div>
                <div className="text-xs text-muted-foreground mt-1">{t('pricing.analogy.pro')}</div>
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
                    <div className="font-medium text-[#4A90D9]">Office</div>
                    <div className="text-muted-foreground mt-1">{t('pricing.falseAlarm.office')}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="font-medium text-[#E63946]">Business</div>
                    <div className="text-muted-foreground mt-1">{t('pricing.falseAlarm.business')}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="font-medium text-[#FF8C00]">Advanced</div>
                    <div className="text-muted-foreground mt-1">{t('pricing.falseAlarm.advanced')}</div>
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
        {/* 3. Le Foyer Cyber Pro (formerly CyberAssurance) */}
        {/* ============================================ */}
        <div id="cyberassurance" className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto">
            {/* Header */}
            <div className="bg-[#2563EB] text-white p-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <Scale className="h-7 w-7" />
                <h3 className="text-2xl font-bold">{t('pricing.assurance.productName')}</h3>
              </div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-blue-100 text-sm">{t('cycle.poweredBy')}</span>
                <img src={getAssetUrl('/images/LeFoyer.svg')} alt="Le Foyer" className="h-5 brightness-0 invert" />
              </div>
              <p className="text-blue-100 text-sm mt-1">{t('pricing.assurance.tagline')}</p>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* On Request + Contract Info */}
              <div className="text-center mb-8">
                <div className="text-3xl font-bold text-[#2563EB] mb-3">{t('pricing.assurance.onRequest')}</div>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-2">{t('pricing.assurance.consultInfo')}</p>
                <p className="text-sm font-medium text-slate-700 max-w-lg mx-auto">{t('pricing.assurance.contractInfo')}</p>
              </div>

              {/* Coverage List */}
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-slate-800 mb-4 text-sm">{t('pricing.assurance.coverageTitle')}</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {['cov1','cov2','cov3','cov4','cov5','cov6','cov7','cov8','cov9'].map(key => (
                    <div key={key} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{t(`pricing.assurance.${key}`)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book a Meeting CTA */}
              <div className="text-center">
                <a
                  href="https://voxbi.me/mixvoip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
                >
                  {t('pricing.assurance.bookMeeting')} →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* 4. CyberAdvisory powered by Luxgap           */}
        {/* ============================================ */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-7xl mx-auto">
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
              <p className="text-purple-200 text-xs mt-1 max-w-2xl mx-auto">{t('pricing.advisory.subtitle')}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white">{t('pricing.monthlyBilling')}</span>
            </div>
            <div className="p-6">
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
                <a href="https://voxbi.me/mixvoip" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-purple-600 hover:text-purple-800 whitespace-nowrap">
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
        </div>
      </div>
    </section>
  );
}
