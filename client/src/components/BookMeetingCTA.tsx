import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar } from 'lucide-react';

const translations = {
  en: {
    title: 'Ready to protect your business?',
    subtitle: 'Talk to our cybersecurity experts and find the right Cyber Suite for your needs.',
    cta: 'Book a meeting',
  },
  fr: {
    title: 'Prêt à protéger votre entreprise ?',
    subtitle: 'Parlez à nos experts en cybersécurité et trouvez la Cyber Suite adaptée à vos besoins.',
    cta: 'Prendre rendez-vous',
  },
  de: {
    title: 'Bereit, Ihr Unternehmen zu schützen?',
    subtitle: 'Sprechen Sie mit unseren Cybersecurity-Experten und finden Sie die passende Cyber Suite.',
    cta: 'Termin buchen',
  },
};

export default function BookMeetingCTA() {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <section className="py-12 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">{t.title}</h3>
            <p className="text-slate-300 text-sm max-w-lg">{t.subtitle}</p>
          </div>
          <a
            href="https://voxbi.me/mixvoip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00B050] hover:bg-[#00963f] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors whitespace-nowrap shadow-lg shadow-[#00B050]/20"
          >
            <Calendar className="h-5 w-5" />
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
