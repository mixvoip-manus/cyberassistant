import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle } from 'lucide-react';

interface StatCard {
  countryKey: string;
  statKey: string;
  source: string;
  sourceUrl: string;
  flag: string;
}

const stats: StatCard[] = [
  {
    countryKey: 'stats.luxembourg',
    statKey: 'stats.lu.stat',
    source: 'Check Point 2024',
    sourceUrl: 'https://research.checkpoint.com/',
    flag: '🇱🇺',
  },
  {
    countryKey: 'stats.germany',
    statKey: 'stats.de.stat',
    source: 'BSI 2024',
    sourceUrl: 'https://www.bsi.bund.de/',
    flag: '🇩🇪',
  },
  {
    countryKey: 'stats.france',
    statKey: 'stats.fr.stat',
    source: 'ANSSI 2024',
    sourceUrl: 'https://www.ssi.gouv.fr/',
    flag: '🇫🇷',
  },
  {
    countryKey: 'stats.belgium',
    statKey: 'stats.be.stat',
    source: 'Check Point 2024',
    sourceUrl: 'https://research.checkpoint.com/',
    flag: '🇧🇪',
  },
];

export default function Statistics() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('stats.title')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{stat.flag}</span>
                <h3 className="font-semibold text-lg">{t(stat.countryKey)}</h3>
              </div>
              <p className="text-2xl font-bold text-[#00B050] mb-3">{t(stat.statKey)}</p>
              <p className="text-xs text-muted-foreground">
                {t('stats.source')}:{' '}
                <a
                  href={stat.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  {stat.source}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Line */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="p-4 bg-amber-500/20 rounded-full">
              <AlertTriangle className="h-10 w-10 text-amber-400" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-semibold">{t('stats.bottomline')}</p>
              <p className="text-slate-400 text-sm mt-2">
                {t('stats.source')}: ENISA Threat Landscape 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
