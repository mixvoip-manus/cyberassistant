import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToCalculator = () => {
    const element = document.getElementById('assessment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCoverage = () => {
    const element = document.getElementById('coverage');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#00B050]/10 text-[#00B050] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              <span>Powered by Mixvoip + Luxembourg Insurance</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              {t('hero.subtitle')}
            </p>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              {t('hero.description')}
            </p>

            {/* Price Badge */}
            <div className="inline-flex items-center gap-3 bg-white border border-border rounded-xl px-6 py-4 shadow-sm mb-8">
              <div className="text-left">
                <p className="text-sm text-muted-foreground">{t('hero.price')}</p>
                <p className="text-2xl font-bold text-[#00B050]">{t('hero.priceValue')}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToCalculator}
                size="lg"
                className="bg-[#00B050] hover:bg-[#00873D] text-white text-lg px-8 py-6"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={scrollToCoverage}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
              >
                {t('hero.ctaSecondary')}
              </Button>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-border p-8 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#00B050]/10 rounded-xl flex items-center justify-center">
                    <Shield className="h-8 w-8 text-[#00B050]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Cyber Assistance</h3>
                    <p className="text-muted-foreground">Complete Protection</p>
                  </div>
                </div>

                {/* Protection Items */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-[#00B050]" />
                    <span className="font-medium">{t('what.attacks')}</span>
                    <span className="ml-auto text-sm text-muted-foreground">24/7 Response</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-[#00B050]" />
                    <span className="font-medium">{t('what.fines')}</span>
                    <span className="ml-auto text-sm text-muted-foreground">GDPR Coverage</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-[#00B050]" />
                    <span className="font-medium">{t('what.losses')}</span>
                    <span className="ml-auto text-sm text-muted-foreground">Up to €250k</span>
                  </div>
                </div>

                {/* Coverage Badge */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Insurance Coverage</span>
                    <span className="font-bold text-[#00B050]">€50k - €250k</span>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#00B050]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-100 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
