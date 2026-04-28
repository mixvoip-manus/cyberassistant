import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Scale, CheckCircle2, XCircle, ChevronDown, Zap, MapPin, Wifi, Gavel, FileText, Star, Download, Calendar } from 'lucide-react';

const BROCHURE_URLS: Record<string, { url: string; filename: string }> = {
  en: { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/pasted_file_kpZV6T_Brochurescyberpro_EN-Equidem_ab8081cc.pdf', filename: 'Foyer-CyberPro-Brochure-EN.pdf' },
  fr: { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/pasted_file_z3z2xr_Depliantscyberpro_FR-Equidem_38660b1b.pdf', filename: 'Foyer-CyberPro-Brochure-FR.pdf' },
  de: { url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/brochure_DE_6234704c.pdf', filename: 'Foyer-CyberPro-Broschure-DE.pdf' },
};

function downloadBrochure(lang: string) {
  const brochure = BROCHURE_URLS[lang] || BROCHURE_URLS.en;
  fetch(brochure.url)
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = brochure.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
}

export default function PricingSection() {
  const { t, language, getAssetUrl } = useLanguage();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-slate-50">
      <div className="container">

        {/* Single merged table: CyberAssistance + Foyer Cyber Pro */}
        <div className="mb-8">
          {/* Clickable Header */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full max-w-7xl mx-auto block"
          >
            <div className={`bg-[#00B050] overflow-hidden px-6 md:px-10 py-5 transition-all duration-300 hover:shadow-xl hover:brightness-110 cursor-pointer ${isOpen ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
              <div className="flex items-center">
                {/* Foyer Logo — large & left-aligned */}
                <img src={getAssetUrl('/images/foyer-logo-new.jpg')} alt="Foyer" className="h-20 md:h-28 object-contain flex-shrink-0 rounded-lg" />
                {/* Title — centered */}
                <div className="text-white flex flex-col items-center flex-1">
                  <div className="flex items-center gap-3">
                    <Shield className="h-7 w-7 md:h-8 md:w-8" />
                    <h3 className="text-xl md:text-2xl font-bold">Mixvoip CyberAssistance</h3>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-green-100 text-sm mt-1">{t('pricing.assistance.tagline')}</p>
                  <span className="inline-block mt-2 px-4 py-1 bg-white/20 rounded-full text-xs font-medium text-white">{t('pricing.monthlyBilling')}</span>
                </div>
              </div>
              {!isOpen && (
                <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/20">
                  <span className="text-white/90 text-sm font-medium">{t('pricing.viewPlans')}</span>
                  <ChevronDown className="h-4 w-4 text-white/90 animate-bounce" />
                </div>
              )}
            </div>
          </button>
          
          {/* Collapsible Content */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out max-w-7xl mx-auto ${isOpen ? 'max-h-[8000px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="bg-white rounded-b-2xl shadow-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left p-4 bg-slate-50 font-semibold text-slate-600 w-[200px]"></th>
                    <th className="p-4 text-center min-w-[160px]">
                      <div className="text-[#4A90D9] font-bold text-base">{t('pricing.assistance.office.title')}</div>
                      <div className="mt-1"><span className="text-xl font-bold text-[#4A90D9]">{t('pricing.assistance.office.price')}€</span><span className="text-xs text-muted-foreground"> / {t('pricing.assistance.office.priceNote')}</span></div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t('pricing.assistance.office.sla')}</div>
                    </th>
                    <th className="p-4 text-center min-w-[160px]">
                      <div className="text-[#E63946] font-bold text-base">{t('pricing.assistance.business.title')}</div>
                      <div className="mt-1"><span className="text-xl font-bold text-[#E63946]">{t('pricing.assistance.business.price')}€</span><span className="text-xs text-muted-foreground"> / {t('pricing.assistance.business.priceNote')}</span></div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t('pricing.assistance.business.sla')}</div>
                    </th>
                    <th className="p-4 text-center min-w-[160px] bg-orange-50 border-x-2 border-t-2 border-[#FF8C00] relative">
                      <div className="absolute -top-0 left-0 right-0 bg-[#FF8C00] text-white text-[10px] py-0.5 font-medium rounded-t">{t('pricing.assistance.advanced.badge')}</div>
                      <div className="text-[#FF8C00] font-bold text-base mt-2">{t('pricing.assistance.advanced.title')}</div>
                      <div className="mt-1"><span className="text-xl font-bold text-[#FF8C00]">{t('pricing.assistance.advanced.price')}€</span><span className="text-xs text-muted-foreground"> / {t('pricing.assistance.advanced.priceNote')}</span></div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t('pricing.assistance.advanced.sla')}</div>
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
                  </tr>
                  {/* Intervention Onsite */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" />{t('pricing.assistance.interventionOnsite')}</td>
                    <td className="p-4 text-center"><XCircle className="h-4 w-4 text-red-400 mx-auto" /></td>
                    <td className="p-4 text-center text-slate-600">{t('pricing.assistance.business.interventionOnsite')}</td>
                    <td className="p-4 text-center text-slate-600 bg-orange-50/50 border-x border-orange-100">{t('pricing.assistance.advanced.interventionOnsite')}</td>
                  </tr>
                  {/* Intervention Remote */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-2"><Wifi className="h-4 w-4 text-slate-400" />{t('pricing.assistance.interventionRemote')}</td>
                    <td className="p-4 text-center text-slate-600">{t('pricing.assistance.office.interventionRemote')}</td>
                    <td className="p-4 text-center text-slate-600">{t('pricing.assistance.business.interventionRemote')}</td>
                    <td className="p-4 text-center text-slate-600 bg-orange-50/50 border-x border-orange-100">{t('pricing.assistance.advanced.interventionRemote')}</td>
                  </tr>
                  {/* CNPD */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-2"><Gavel className="h-4 w-4 text-slate-400" />{t('pricing.assistance.cnpd')}</td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center bg-orange-50/50 border-x border-orange-100"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                  </tr>
                  {/* Incident Report */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-2"><FileText className="h-4 w-4 text-slate-400" />{t('pricing.assistance.incidentReport')}</td>
                    <td className="p-4 text-center"><XCircle className="h-4 w-4 text-red-400 mx-auto" /></td>
                    <td className="p-4 text-center"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                    <td className="p-4 text-center bg-orange-50/50 border-x border-orange-100"><CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                  </tr>
                  {/* CyberAssistance by Foyer */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-500" />{t('pricing.assistance.cyberAssurance')}</td>
                    <td className="p-4 text-center text-xs text-slate-600">{t('pricing.assistance.office.cyberAssurance')}</td>
                    <td className="p-4 text-center text-xs text-slate-600">{t('pricing.assistance.business.cyberAssurance')}</td>
                    <td className="p-4 text-center text-xs text-slate-600 bg-orange-50/50 border-x border-orange-100">{t('pricing.assistance.advanced.cyberAssurance')}</td>
                  </tr>
                  {/* Franchise row */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50 bg-emerald-50/30">
                    <td className="p-4 font-medium text-slate-700">
                      <div className="flex items-center gap-2"><Scale className="h-4 w-4 text-emerald-500" />{t('pricing.assistance.franchise')}</div>
                      <p className="text-[10px] text-emerald-600/70 mt-0.5 ml-6">{t('pricing.assistance.franchiseNote')}</p>
                    </td>
                    <td className="p-4 text-center"><span className="text-emerald-600 font-bold text-sm">0 €</span></td>
                    <td className="p-4 text-center"><span className="text-emerald-600 font-bold text-sm">0 €</span></td>
                    <td className="p-4 text-center bg-orange-50/50 border-x border-orange-100"><span className="text-emerald-600 font-bold text-sm">0 €</span></td>
                  </tr>

                  {/* ── Foyer Cyber Pro upgrade — seamless premium tier ── */}
                  <tr className="border-t-2 border-blue-200/50">
                    <td colSpan={4} className="p-0">
                      <div className="bg-gradient-to-r from-blue-50/80 via-blue-100/60 to-blue-50/80 px-6 py-3">
                        <div className="flex items-center gap-4">
                          <img src={getAssetUrl('/images/equidem-logo.png')} alt="Equidem" className="h-8 md:h-10 object-contain flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Scale className="h-4 w-4 text-blue-600" />
                              <span className="text-blue-800 font-semibold text-sm">{t('pricing.assurance.productName')}</span>
                              <span className="text-[10px] font-medium bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Premium Upgrade</span>
                            </div>
                            <p className="text-blue-600/70 text-xs mt-0.5">{t('pricing.assurance.upgradeNote')}</p>
                          </div>
                        </div>

                      </div>
                    </td>
                  </tr>

                  {/* Contract Info */}
                  <tr className="border-b border-blue-100 bg-blue-50">
                    <td colSpan={4} className="p-4 text-center">
                      <p className="text-sm text-slate-600 max-w-2xl mx-auto">{t('pricing.assurance.contractInfo')}</p>
                    </td>
                  </tr>

                  {/* Coverage List */}
                  <tr className="bg-blue-50">
                    <td colSpan={4} className="p-6">
                      <h4 className="font-bold text-slate-800 mb-4 text-sm text-center">{t('pricing.assurance.coverageTitle')}</h4>
                      <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                        {['cov1','cov2','cov3','cov4','cov5','cov6','cov7','cov8','cov9','cov10'].map(key => (
                          <div key={key} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700">{t(`pricing.assurance.${key}`)}</span>
                          </div>
                        ))}
                      </div>
                      {/* Action row: Brochure | On Request | Book a meeting */}
                      <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-blue-200/50">
                        <button
                          onClick={() => downloadBrochure(language)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 shadow-md hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
                        >
                          <Download className="h-4 w-4" />
                          {t('pricing.assurance.brochure')}
                        </button>
                        <span className="text-blue-300">|</span>
                        <span className="text-blue-800 font-bold text-lg">{t('pricing.assurance.onRequest')}</span>
                        <span className="text-blue-300">|</span>
                        <a
                          href="https://voxbi.me/mixvoip/sales"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#00B050] hover:bg-[#009040] rounded-lg px-5 py-2.5 shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                        >
                          <Calendar className="h-4 w-4" />
                          {t('pricing.assurance.bookMeeting')}
                        </a>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Advisory & SOC pricing moved to /{lang}/advisor and /{lang}/socaas */}
      </div>
    </section>
  );
}
