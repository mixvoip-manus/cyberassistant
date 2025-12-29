import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <img
              src="/images/Mixvoip-logo-white-green-slash-RGB.png"
              alt="Mixvoip"
              className="h-10 w-auto mb-4"
            />
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
              {t('footer.disclaimer')}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#00B050]" />
                <a href="tel:+352203333 00" className="hover:text-white transition-colors">
                  +352 20 33 33 00
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#00B050]" />
                <a href="mailto:support@mixvoip.com" className="hover:text-white transition-colors">
                  support@mixvoip.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#00B050] mt-0.5" />
                <span>{t('footer.address')}</span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href="https://www.mixvoip.com/legal/legal-notice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t('footer.legal')}
                </a>
              </li>
              <li>
                <a
                  href="https://www.mixvoip.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a
                  href="https://www.mixvoip.com/legal/gdpr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t('footer.gdpr')}
                </a>
              </li>
              <li>
                <a
                  href="https://www.mixvoip.com/legal/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container py-4">
          <p className="text-center text-sm text-slate-500">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
