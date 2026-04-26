import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Scale, Users, CheckCircle2, Info, Clock, Zap, Building2, Star, Eye, Gavel, MapPin, Wifi, FileText, AlertTriangle, XCircle, ChevronDown } from 'lucide-react';

export default function PricingSection() {
  const { t, getAssetUrl } = useLanguage();

  // Accordion state: CyberAssistance & Le Foyer only (Advisory & SOC moved to dedicated pages)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    assistance: true,
    foyer: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-slate-50">
      <div className="container">
        {/* Section Header — hidden per user request */}

        {/* ============================================ */}
        {/* 1. Cyber Assistance (Mixvoip)                */}
        {/* ============================================ */}
        <div className="mb-8">
          {/* Clickable Header */}
          <button
            onClick={() => toggleSection('assistance')}
            className="w-full max-w-7xl mx-auto block"
          >
            <div className={`bg-[#00B050] overflow-hidden px-6 md:px-10 py-5 transition-all duration-300 hover:shadow-xl hover:brightness-110 cursor-pointer ${openSections.assistance ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
              <div className="flex items-center">
                {/* Le Foyer Logo embedded on green — large & left-aligned */}
                <img src={getAssetUrl('/images/logo_le_foyer.svg')} alt="Le Foyer" className="h-20 md:h-28 object-contain brightness-0 invert flex-shrink-0" />
                {/* Mixvoip CyberAssistance — centered in remaining space */}
                <div className="text-white flex flex-col items-center flex-1">
                  <div className="flex items-center gap-3">
                    <Shield className="h-7 w-7 md:h-8 md:w-8" />
                    <h3 className="text-xl md:text-2xl font-bold">Mixvoip CyberAssistance</h3>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openSections.assistance ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-green-100 text-sm mt-1">{t('pricing.assistance.tagline')}</p>
                  <span className="inline-block mt-2 px-4 py-1 bg-white/20 rounded-full text-xs font-medium text-white">{t('pricing.monthlyBilling')}</span>
                </div>
              </div>
              {!openSections.assistance && (
                <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/20">
                  <span className="text-white/90 text-sm font-medium">{t('pricing.viewPlans')}</span>
                  <ChevronDown className="h-4 w-4 text-white/90 animate-bounce" />
                </div>
              )}
            </div>
          </button>
          
          {/* Collapsible Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out max-w-7xl mx-auto ${openSections.assistance ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="bg-white rounded-b-2xl shadow-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left p-4 bg-slate-50 font-semibold text-slate-600 w-[200px]"></th>
                    <th className="p-4 text-center min-w-[140px]">
                      <div className="text-[#4A90D9] font-bold text-base">{t('pricing.assistance.office.title')}</div>
                      <div className="mt-1"><span className="text-xl font-bold text-[#4A90D9]">{t('pricing.assistance.office.price')}€</span><span className="text-xs text-muted-foreground"> / {t('pricing.assistance.office.priceNote')}</span></div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t('pricing.assistance.office.sla')}</div>
                    </th>
                    <th className="p-4 text-center min-w-[140px]">
                      <div className="text-[#E63946] font-bold text-base">{t('pricing.assistance.business.title')}</div>
                      <div className="mt-1"><span className="text-xl font-bold text-[#E63946]">{t('pricing.assistance.business.price')}€</span><span className="text-xs text-muted-foreground"> / {t('pricing.assistance.business.priceNote')}</span></div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t('pricing.assistance.business.sla')}</div>
                    </th>
                    <th className="p-4 text-center min-w-[140px] bg-orange-50 border-x-2 border-t-2 border-[#FF8C00] relative">
                      <div className="absolute -top-0 left-0 right-0 bg-[#FF8C00] text-white text-[10px] py-0.5 font-medium rounded-t">{t('pricing.assistance.advanced.badge')}</div>
                      <div className="text-[#FF8C00] font-bold text-base mt-2">{t('pricing.assistance.advanced.title')}</div>
                      <div className="mt-1"><span className="text-xl font-bold text-[#FF8C00]">{t('pricing.assistance.advanced.price')}€</span><span className="text-xs text-muted-foreground"> / {t('pricing.assistance.advanced.priceNote')}</span></div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t('pricing.assistance.advanced.sla')}</div>
                    </th>
                    <th className="p-4 text-center min-w-[140px]">
                      <div className="text-slate-800 font-bold text-base">{t('pricing.assistance.pro.title')}</div>
                      <div className="mt-1"><span className="text-xl font-bold text-slate-800">{t('pricing.onRequest')}</span></div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t('pricing.assistance.pro.sla')}</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Response Time Cyber */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-2"><Zap className="h-4 w-4 text-slate-400" />{t('pricing.assistance.responseCyber')}</td>
                    <td className="p-4 text-center text-slate-600">{t('pricing.assistance.office.responseCyber')}</td>
                    <td className="p-4 text-center font-bold text-[#E63946]">{t('pricing.assistance.business.responseCyber')}</td>
                    <td className="p-4 text-center font-bold text-[#FF8C00] bg-orange-50/50 border-x border-orange-100">{t('pricing.assistance.advanced.responseCyber')}</td>
                    <td className="p-4 text-center text-slate-600">{t('pricing.assistance.pro.responseCyber')}</td>
                  </tr>
                  {/* Intervention Onsite */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" />{t('pricing.assistance.interventionOnsite')}</td>
                    <td className="p-4 text-center"><XCircle className="h-4 w-4 text-red-400 mx-auto" /></td>
                    <td className="p-4 text-center text-slate-600">{t('pricing.assistance.business.interventionOnsite')}</td>
                    <td className="p-4 text-center text-slate-600 bg-orange-50/50 border-x border-orange-100">{t('pricing.assistance.advanced.interventionOnsite')}</td>
                    <td className="p-4 text-center text-slate-600">{t('pricing.assistance.pro.interventionOnsite')}</td>
                  </tr>
                  {/* Intervention Remote */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-2"><Wifi className="h-4 w-4 text-slate-400" />{t('pricing.assistance.interventionRemote')}</td>
                    <td className="p-4 text-center text-slate-600">{t('pricing.assistance.office.interventionRemote')}</td>
                    <td className="p-4 text-center text-slate-600">{t('pricing.assistance.business.interventionRemote')}</td>
                    <td className="p-4 text-center text-slate-600 bg-orange-50/50 border-x border-orange-100">{t('pricing.assistance.advanced.interventionRemote')}</td>
                    <td className="p-4 text-center text-slate-600">{t('pricing.assistance.pro.interventionRemote')}</td>
                  </tr>
                  {/* CNPD */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-2"><Gavel className="h-4 w-4 text-slate-400" />{t('pricing.assistance.cnpd')}</td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center bg-orange-50/50 border-x border-orange-100"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                  </tr>
                  {/* Incident Report */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-2"><FileText className="h-4 w-4 text-slate-400" />{t('pricing.assistance.incidentReport')}</td>
                    <td className="p-4 text-center"><XCircle className="h-4 w-4 text-red-400 mx-auto" /></td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center bg-orange-50/50 border-x border-orange-100"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                  </tr>
                  {/* CyberAssurance */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-500" />{t('pricing.assistance.cyberAssurance')}</td>
                    <td className="p-4 text-center text-xs text-slate-600">{t('pricing.assistance.office.cyberAssurance')}</td>
                    <td className="p-4 text-center text-xs text-slate-600">{t('pricing.assistance.business.cyberAssurance')}</td>
                    <td className="p-4 text-center text-xs text-slate-600 bg-orange-50/50 border-x border-orange-100">{t('pricing.assistance.advanced.cyberAssurance')}</td>
                    <td className="p-4 text-center text-xs"><a href="#cyberassurance" className="text-blue-600 hover:text-blue-800 underline cursor-pointer" onClick={(e) => { e.preventDefault(); document.getElementById('cyberassurance')?.scrollIntoView({ behavior: 'smooth' }); }}>Le Foyer Cyber Pro</a></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Minimum Requirement Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mt-4 max-w-7xl mx-auto">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-amber-800">{t('pricing.assistance.minRequirement')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* 2. Le Foyer Cyber Pro                        */}
        {/* ============================================ */}
        <div id="cyberassurance" className="mb-8">
          {/* Clickable Header */}
          <button
            onClick={() => toggleSection('foyer')}
            className="w-full max-w-7xl mx-auto block"
          >
            <div className={`bg-[#2563EB] text-white p-6 text-center transition-all duration-300 hover:shadow-xl hover:brightness-110 cursor-pointer ${openSections.foyer ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
              <div className="flex items-center justify-center gap-3">
                <Scale className="h-7 w-7" />
                <h3 className="text-2xl font-bold">{t('pricing.assurance.productName')}</h3>
                <ChevronDown className={`h-6 w-6 transition-transform duration-300 ${openSections.foyer ? 'rotate-180' : ''}`} />
              </div>
              <p className="text-sm text-blue-200 font-medium mt-1">{t('pricing.assurance.upgradeNote')}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-blue-100 text-sm">{t('cycle.poweredBy')}</span>
                <img src={getAssetUrl('/images/LeFoyer.svg')} alt="Le Foyer" className="h-5 brightness-0 invert" />
              </div>
              <span className="inline-block mt-2 px-4 py-1 bg-white/20 rounded-full text-xs font-medium text-white">{t('pricing.assurance.upgradeBadge')}</span>
              {!openSections.foyer && (
                <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/20">
                  <span className="text-white/90 text-sm font-medium">{t('pricing.viewPlans')}</span>
                  <ChevronDown className="h-4 w-4 text-white/90 animate-bounce" />
                </div>
              )}
            </div>
          </button>

          {/* Collapsible Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out max-w-7xl mx-auto ${openSections.foyer ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden">
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
                    {['cov1','cov2','cov3','cov4','cov5','cov6','cov7','cov8','cov9','cov10'].map(key => (
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
                    href="https://voxbi.me/mixvoip/sales"
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
        </div>

        {/* Advisory & SOC pricing moved to /{lang}/advisor and /{lang}/socaas */}
      </div>
    </section>
  );
}
