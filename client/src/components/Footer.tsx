import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { t, getAssetUrl } = useLanguage();

  const offices = [
    {
      country: 'Luxembourg (HQ)',
      company: 'MIXVOIP SA',
      address: '70, rue des Prés',
      city: 'L-7333 Steinsel',
      phone: '+352 20 33 33 00',
    },
    {
      country: 'Belgium',
      company: 'MIXVOIP SRL',
      address: 'Avenue de Finlande 5',
      city: 'B-1420 Braine l\'Alleud',
      phone: '+32 2895 02 00',
    },
    {
      country: 'Germany',
      company: 'MIXVOIP GMBH',
      address: 'Max-Planck-Straße 22',
      city: 'D-54296 Trier',
      phone: '+49 651 9374 88 00',
    },
    {
      country: 'France',
      company: 'MIXVOIP SAS',
      address: '4, rue Marconi',
      city: 'F-57000 Metz',
      phone: '+33 3 67 39 12 00',
    },
  ];

  return (
    <footer id="contact" className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Logo & Description */}
          <div>
            <a href="https://www.mixvoip.com">
              <img
                src={getAssetUrl('images/mixvoip-logo.svg')}
                alt="Mixvoip"
                className="h-10 w-auto mb-4"
              />
            </a>

          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#00B050]" />
                <a href="tel:+35220333300" className="hover:text-white transition-colors">
                  +352 20 33 33 00
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#00B050]" />
                <a href="mailto:support@mixvoip.com" className="hover:text-white transition-colors">
                  support@mixvoip.com
                </a>
              </li>
            </ul>
            <a
              href="https://voxbi.me/mixvoip/sales"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-[#00B050] hover:bg-[#00963f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {t('nav.contact')}
            </a>
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

        {/* Office Locations */}
        <div className="border-t border-slate-800 pt-8">
          <h4 className="font-semibold mb-6 text-center">{t('footer.offices')}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office) => (
              <div key={office.country} className="text-center">
                <h5 className="font-medium text-[#00B050] mb-2">{office.country}</h5>
                <p className="text-slate-400 text-sm">
                  {office.company}<br />
                  {office.address}<br />
                  {office.city}
                </p>
                <a
                  href={`tel:${office.phone.replace(/\s/g, '')}`}
                  className="text-slate-400 text-sm hover:text-white transition-colors"
                >
                  {office.phone}
                </a>
              </div>
            ))}
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
