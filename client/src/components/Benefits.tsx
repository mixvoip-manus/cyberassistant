import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, FileX, Sliders } from 'lucide-react';

export default function Benefits() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: <Shield className="h-8 w-8" />,
      titleKey: 'benefits.coverage.title',
      descriptionKey: 'benefits.coverage.description',
      color: 'text-[#00B050]',
      bgColor: 'bg-[#00B050]/10',
    },
    {
      icon: <FileX className="h-8 w-8" />,
      titleKey: 'benefits.nodeductible.title',
      descriptionKey: 'benefits.nodeductible.description',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: <Sliders className="h-8 w-8" />,
      titleKey: 'benefits.limits.title',
      descriptionKey: 'benefits.limits.description',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('benefits.title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className={`w-16 h-16 ${benefit.bgColor} rounded-xl flex items-center justify-center mb-6 ${benefit.color}`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{t(benefit.titleKey)}</h3>
              <p className="text-muted-foreground">{t(benefit.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
