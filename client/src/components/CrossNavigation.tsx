import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, BookOpen, Eye } from 'lucide-react';
import { Link } from 'wouter';

interface CrossNavigationProps {
  /** Which page we're currently on — hide that link */
  currentPage: 'assistance' | 'advisor' | 'socaas';
}

export default function CrossNavigation({ currentPage }: CrossNavigationProps) {
  const { language, t } = useLanguage();

  const pages = [
    {
      key: 'assistance',
      path: `/${language}/`,
      icon: <Shield className="h-5 w-5" />,
      title: 'CyberAssistance',
      subtitle: t('pricing.assistance.tagline'),
      color: 'bg-[#00B050]',
      hoverColor: 'hover:bg-[#00963f]',
    },
    {
      key: 'advisor',
      path: `/${language}/advisor`,
      icon: <BookOpen className="h-5 w-5" />,
      title: 'CyberAdvisory',
      subtitle: t('pricing.advisory.tagline'),
      color: 'bg-[#7C3AED]',
      hoverColor: 'hover:bg-[#6D28D9]',
    },
    {
      key: 'socaas',
      path: `/${language}/socaas`,
      icon: <Eye className="h-5 w-5" />,
      title: 'SOC as a Service',
      subtitle: t('pricing.socaas.tagline'),
      color: 'bg-[#0891B2]',
      hoverColor: 'hover:bg-[#0E7490]',
    },
  ];

  const otherPages = pages.filter(p => p.key !== currentPage);

  return (
    <section className="py-12 bg-slate-100">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-lg font-bold text-slate-700 mb-6">
            {t('crossnav.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {otherPages.map(page => (
              <Link key={page.key} href={page.path}>
                <div className={`${page.color} ${page.hoverColor} text-white rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}>
                  <div className="flex items-center gap-3 mb-2">
                    {page.icon}
                    <span className="text-lg font-bold">{page.title}</span>
                  </div>
                  <p className="text-sm text-white/80">{page.subtitle}</p>
                  <span className="inline-block mt-3 text-sm font-medium text-white/90">
                    {t('crossnav.explore')} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
