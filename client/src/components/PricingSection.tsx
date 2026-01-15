import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Scale, Users, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingSection() {
  const { t } = useLanguage();

  const scrollToAssessment = () => {
    const element = document.getElementById('assessment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Cyber Assistance */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#00B050]">
            <div className="bg-[#00B050] text-white p-6 text-center">
              <Shield className="h-12 w-12 mx-auto mb-3" />
              <h3 className="text-2xl font-bold">Cyber Assistance</h3>
              <p className="text-green-100 text-sm mt-1">{t('pricing.assistance.tagline')}</p>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-[#00B050]">€2</div>
                <div className="text-muted-foreground">{t('pricing.perUserMonth')}</div>
                <div className="text-sm text-muted-foreground mt-1">{t('pricing.yearlyContract')}</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t('pricing.assistance.feature1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t('pricing.assistance.feature2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t('pricing.assistance.feature3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#00B050] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t('pricing.assistance.feature4')}</span>
                </li>
              </ul>
              <div className="text-xs text-muted-foreground text-center bg-slate-50 p-2 rounded">
                {t('pricing.required')}
              </div>
            </div>
          </div>

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
                  <div className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded">
                    <span>€50,000</span>
                    <span className="font-bold text-blue-600">€0.50/user</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded">
                    <span>€100,000</span>
                    <span className="font-bold text-blue-600">€1.00/user</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded">
                    <span>€250,000</span>
                    <span className="font-bold text-blue-600">€2.00/user</span>
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
                    <div className="text-xl font-bold mt-1">€500<span className="text-sm font-normal text-muted-foreground">/year</span></div>
                  </div>
                  <div className="px-4 py-3 bg-slate-50 rounded">
                    <div className="font-bold text-purple-600">Standard</div>
                    <div className="text-sm text-muted-foreground">CISO as a Service</div>
                    <div className="text-xl font-bold mt-1">€2,000<span className="text-sm font-normal text-muted-foreground">/year</span></div>
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

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">{t('pricing.cta.text')}</p>
          <Button 
            onClick={scrollToAssessment}
            className="bg-[#00B050] hover:bg-[#00873D] text-white px-8 py-6 text-lg"
          >
            {t('pricing.cta.button')}
          </Button>
        </div>
      </div>
    </section>
  );
}
