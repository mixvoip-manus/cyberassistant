import { useLanguage } from '@/contexts/LanguageContext';
import { Linkedin, Facebook, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  const { t, getAssetUrl } = useLanguage();

  const footerColumns = [
    {
      title: 'TELEPHONY',
      links: [
        { label: 'SIP Trunk', href: 'https://www.mixvoip.com/sip-trunk/' },
        { label: 'Call rates', href: 'https://www.mixvoip.com/call-rates/' },
        { label: 'Phone numbers', href: 'https://www.mixvoip.com/phone-numbers/' },
        { label: 'FMC SIP Trunk', href: 'https://www.mixvoip.com/fmc-sip-trunk/' },
      ],
    },
    {
      title: 'MOBILE',
      links: [
        { label: 'Luxembourg mobile', href: 'https://www.mixvoip.com/mobile/luxembourg/' },
        { label: 'Belgium mobile', href: 'https://www.mixvoip.com/mobile/belgium/' },
        { label: 'France mobile', href: 'https://www.mixvoip.com/mobile/france/' },
        { label: 'IoT and data mobile', href: 'https://www.mixvoip.com/iot/' },
        { label: 'Mobile Device Management', href: 'https://www.mixvoip.com/mdm/' },
      ],
    },
    {
      title: 'NETWORK AND IT',
      links: [
        { label: 'Co-managed LAN', href: 'https://www.mixvoip.com/co-managed-lan/' },
        { label: 'IT services', href: 'https://www.mixvoip.com/it-services/' },
        { label: 'Cybersecurity', href: 'https://www.mixvoip.com/cybersecurity/' },
        { label: 'IPTV', href: 'https://www.mixvoip.com/iptv/' },
      ],
    },
    {
      title: 'CLOUD PBX',
      links: [
        { label: 'Voxbi Cloud PBX', href: 'https://www.mixvoip.com/voxbi/' },
        { label: 'Features', href: 'https://www.mixvoip.com/cloud-pbx/features/' },
        { label: 'Microsoft Teams', href: 'https://www.mixvoip.com/microsoft-teams/' },
        { label: 'Integrations', href: 'https://www.mixvoip.com/integrations/' },
        { label: 'Tempus', href: 'https://www.mixvoip.com/tempus/' },
        { label: 'Pricing', href: 'https://www.mixvoip.com/cloud-pbx/pricing/' },
        { label: 'Downloads', href: 'https://www.mixvoip.com/downloads/' },
        { label: 'Roadmap', href: 'https://www.mixvoip.com/roadmap/' },
        { label: 'FMC Cloud PBX', href: 'https://www.mixvoip.com/fmc-cloud-pbx/' },
      ],
    },
    {
      title: 'HARDWARE',
      links: [
        { label: 'Desk phones', href: 'https://www.mixvoip.com/hardware/desk-phones/' },
        { label: 'Headsets', href: 'https://www.mixvoip.com/hardware/headsets/' },
        { label: 'Wireless phones', href: 'https://www.mixvoip.com/hardware/wireless-phones/' },
        { label: 'Conference systems', href: 'https://www.mixvoip.com/hardware/conference-systems/' },
        { label: 'Switches and Wi-Fi', href: 'https://www.mixvoip.com/hardware/switches-wifi/' },
        { label: 'Routers & Firewalls', href: 'https://www.mixvoip.com/hardware/routers-firewalls/' },
        { label: 'Doorbells & Intercoms', href: 'https://www.mixvoip.com/hardware/doorbells-intercoms/' },
        { label: 'All products', href: 'https://www.mixvoip.com/hardware/' },
      ],
    },
    {
      title: 'CONNECTIVITY',
      links: [
        { label: 'Internet in Luxembourg', href: 'https://www.mixvoip.com/internet/luxembourg/' },
        { label: 'Internet in Belgium', href: 'https://www.mixvoip.com/internet/belgium/' },
        { label: 'Internet in France', href: 'https://www.mixvoip.com/internet/france/' },
        { label: 'Internet in Germany', href: 'https://www.mixvoip.com/internet/germany/' },
        { label: 'Internet add-ons', href: 'https://www.mixvoip.com/internet-add-ons/' },
        { label: 'Mobile connectivity', href: 'https://www.mixvoip.com/mobile-connectivity/' },
        { label: 'Service Level Agreements', href: 'https://www.mixvoip.com/sla/' },
      ],
    },
    {
      title: 'INSIGHTS',
      links: [
        { label: '3CX', href: 'https://www.mixvoip.com/insights/3cx/' },
        { label: 'Innovaphone', href: 'https://www.mixvoip.com/insights/innovaphone/' },
        { label: 'Wildix', href: 'https://www.mixvoip.com/insights/wildix/' },
        { label: 'Emios', href: 'https://www.mixvoip.com/insights/emios/' },
        { label: 'Yeastar', href: 'https://www.mixvoip.com/insights/yeastar/' },
        { label: 'RingCentral', href: 'https://www.mixvoip.com/insights/ringcentral/' },
        { label: 'All Insights', href: 'https://www.mixvoip.com/insights/' },
      ],
    },
    {
      title: 'MIXVOIP',
      links: [
        { label: 'Contact us', href: 'https://www.mixvoip.com/contact/' },
        { label: 'About us', href: 'https://www.mixvoip.com/about/' },
        { label: 'Events', href: 'https://www.mixvoip.com/events/' },
        { label: 'Career', href: 'https://www.mixvoip.com/career/' },
        { label: 'Support', href: 'https://www.mixvoip.com/support/' },
        { label: 'Maintenance updates', href: 'https://www.mixvoip.com/maintenance/' },
        { label: 'Newsletter', href: 'https://www.mixvoip.com/newsletter/' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'Blog', href: 'https://www.mixvoip.com/blog/' },
        { label: 'Certification levels', href: 'https://www.mixvoip.com/certification-levels/' },
        { label: 'Partner program', href: 'https://www.mixvoip.com/partner-program/' },
        { label: 'Our accreditations', href: 'https://www.mixvoip.com/accreditations/' },
        { label: 'FAQs', href: 'https://www.mixvoip.com/faqs/' },
        { label: 'Impressum', href: 'https://www.mixvoip.com/legal/legal-notice/' },
        { label: 'Legal', href: 'https://www.mixvoip.com/legal/' },
        { label: 'GDPR', href: 'https://www.mixvoip.com/legal/gdpr/' },
        { label: 'Cookies', href: 'https://www.mixvoip.com/cookies/' },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer with link columns */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
          {/* Logo + Social + Description */}
          <div>
            <a href="https://www.mixvoip.com#/" target="_blank" rel="noopener noreferrer">
              <img
                src={getAssetUrl('images/mixvoip-logo.svg')}
                alt="Mixvoip"
                className="h-8 mb-6"
              />
            </a>
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mb-6">
              <a href="https://www.linkedin.com/company/mixvoip/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4D4D4D] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/mixvoip/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4D4D4D] transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/mixvoip" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4D4D4D] transition-colors" aria-label="X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@mixvoip" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4D4D4D] transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/mixvoip/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4D4D4D] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@mixvoip" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4D4D4D] transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Internet, IT, Cloud PBX, SIP trunk and mobile services in Luxembourg, Belgium, France, and Germany
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="font-bold text-[#4D4D4D] text-xs uppercase tracking-wider mb-3">
                  {column.title}
                </h4>
                <ul className="space-y-1.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-[#4D4D4D] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 py-6">
        <div className="container">
          <p className="text-sm text-gray-500">
            Copyright &copy; {new Date().getFullYear()} Mixvoip – Feel free to borrow, share, or adapt. | All prices listed are exclusive of VAT.
          </p>
        </div>
      </div>
    </footer>
  );
}
