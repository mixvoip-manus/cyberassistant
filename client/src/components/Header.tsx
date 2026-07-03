import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

interface DropdownSubItem {
  label: string;
  description?: string;
  href: string;
  external?: boolean;
  isSubItem?: boolean;
  isArrowLink?: boolean;
}

interface DropdownColumn {
  title?: string;
  titleDescription?: string;
  items: DropdownSubItem[];
}

interface NavItem {
  label: string;
  href?: string;
  external?: boolean;
  columns?: DropdownColumn[];
}

export default function Header() {
  const { language, setLanguage, t, getAssetUrl } = useLanguage();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
  ];

  const navItems: NavItem[] = [
    {
      label: 'Cloud PBX',
      columns: [
        {
          items: [
            { label: 'Voxbi Cloud PBX', description: 'Dive into Voxbi\'s capabilities', href: 'https://www.mixvoip.com/voxbi/', external: true },
            { label: 'Features', description: 'Communication tools designed for meaningful talks', href: 'https://www.mixvoip.com/cloud-pbx/features/', external: true },
            { label: 'Pricing', description: 'Find the perfect fit for your budget', href: 'https://www.mixvoip.com/cloud-pbx/pricing/', external: true },
            { label: 'Hardware', description: 'Reliable devices for optimal use', href: 'https://www.mixvoip.com/hardware/', external: true },
            { label: 'Integrations', description: 'Connect to your favorite tools', href: 'https://www.mixvoip.com/integrations/', external: true },
          ],
        },
        {
          items: [
            { label: 'Microsoft Teams', description: 'Smooth Integration with Microsoft 365', href: 'https://www.mixvoip.com/microsoft-teams/', external: true },
            { label: 'Odoo', href: 'https://www.mixvoip.com/integrations/odoo/', external: true },
            { label: 'TAPI CTI', href: 'https://www.mixvoip.com/integrations/tapi/', external: true },
            { label: 'Microsoft calendar', href: 'https://www.mixvoip.com/integrations/', external: true },
          ],
        },
      ],
    },
    {
      label: 'Internet',
      columns: [
        {
          title: 'Why Mixvoip internet',
          titleDescription: 'Coverage, quality and uptime',
          items: [
            { label: 'Luxembourg', href: 'https://www.mixvoip.com/internet/luxembourg/', external: true, isSubItem: true },
            { label: 'Belgium', href: 'https://www.mixvoip.com/internet/belgium/', external: true, isSubItem: true },
            { label: 'Germany', href: 'https://www.mixvoip.com/internet/germany/', external: true, isSubItem: true },
            { label: 'France', href: 'https://www.mixvoip.com/internet/france/', external: true, isSubItem: true },
            { label: 'Mobile connectivity', description: 'Mobile, 5G, Satellite', href: 'https://www.mixvoip.com/mobile-connectivity/', external: true },
          ],
        },
        {
          title: 'Internet add-ons',
          titleDescription: 'Enhance your internet experience',
          items: [
            { label: 'DDOS protection', href: 'https://www.mixvoip.com/ddos-protection/', external: true, isSubItem: true },
            { label: 'SD-WAN and intersite', href: 'https://www.mixvoip.com/sd-wan/', external: true, isSubItem: true },
            { label: 'Firewalls', href: 'https://www.mixvoip.com/firewalls/', external: true, isSubItem: true },
          ],
        },
      ],
    },
    {
      label: 'Mobile',
      columns: [
        {
          items: [
            { label: 'Business mobile plans', description: 'SIM cards, voice, data, and FMC', href: 'https://www.mixvoip.com/mobile/', external: true },
            { label: 'Luxembourg', href: 'https://www.mixvoip.com/mobile/luxembourg/', external: true, isSubItem: true },
            { label: 'Belgium', href: 'https://www.mixvoip.com/mobile/belgium/', external: true, isSubItem: true },
            { label: 'France', href: 'https://www.mixvoip.com/mobile/france/', external: true, isSubItem: true },
            { label: 'MDM - Mobile Device Management', description: 'Control and secure company mobile devices', href: 'https://www.mixvoip.com/mdm/', external: true },
            { label: 'Data and IoT plans', description: 'SIM cards for tablets and IoT across Europe', href: 'https://www.mixvoip.com/iot/', external: true },
          ],
        },
      ],
    },
    {
      label: 'Use cases',
      columns: [
        {
          items: [
            { label: 'Small and medium businesses', description: 'Services, Agencies, Trades', href: 'https://www.mixvoip.com/smb/', external: true },
            { label: 'Communes', description: 'Municipalities, Public administrations', href: 'https://www.mixvoip.com/communes/', external: true },
            { label: 'Healthcare', description: 'Hospitals, Clinics, Retirement homes', href: 'https://www.mixvoip.com/healthcare/', external: true },
            { label: 'Local businesses', description: 'Stores, Boutiques, Outlets', href: 'https://www.mixvoip.com/local-businesses/', external: true },
            { label: 'Discover more industries', href: 'https://www.mixvoip.com/industries/', external: true, isArrowLink: true },
          ],
        },
      ],
    },
    {
      label: 'Support',
      href: 'https://www.mixvoip.com/support/',
      external: true,
    },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#1a1a2e] text-white text-sm">
        <div className="container flex items-center justify-center py-2 relative">
          <div className="flex items-center gap-4">
            <a
              href="https://voxbi.me/mixvoip/sales"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3EAA34] transition-colors"
            >
              {t('header.scheduleAMeeting')}
            </a>
            <span className="text-gray-500">|</span>
            <a
              href="https://my.mixvoip.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3EAA34] transition-colors"
            >
              {t('header.clientArea')}
            </a>
          </div>
          <div className="absolute right-4 flex items-center gap-1">
            {languages.map((lang, index) => (
              <span key={lang.code} className="flex items-center">
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-1 transition-colors ${
                    language === lang.code
                      ? 'text-[#3EAA34] font-semibold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
                {index < languages.length - 1 && (
                  <span className="text-gray-500 ml-1">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <a href="https://www.mixvoip.com" target="_blank" rel="noopener noreferrer">
            <img src={getAssetUrl('images/mixvoip-logo.svg')} alt="Mixvoip" className="h-8 md:h-10" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.columns && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.columns ? (
                  <>
                    <button className="flex items-center gap-1 text-[#4D4D4D] hover:text-[#3EAA34] transition-colors font-medium py-2">
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 bg-white shadow-xl rounded-lg py-6 border border-gray-100 min-w-[480px]">
                        <div className={`grid gap-6 px-6 ${item.columns.length > 1 ? 'grid-cols-2 divide-x divide-gray-100' : 'grid-cols-1'}`}>
                          {item.columns.map((column, colIndex) => (
                            <div key={colIndex} className={`space-y-1 ${colIndex > 0 ? 'pl-6' : ''}`}>
                              {column.title && (
                                <div className="mb-3">
                                  <div className="font-semibold text-[#4D4D4D]">{column.title}</div>
                                  {column.titleDescription && (
                                    <div className="text-sm text-gray-500">{column.titleDescription}</div>
                                  )}
                                </div>
                              )}
                              {column.items.map((subItem) => (
                                <a
                                  key={subItem.label}
                                  href={subItem.href}
                                  target={subItem.external ? '_blank' : undefined}
                                  rel={subItem.external ? 'noopener noreferrer' : undefined}
                                  className={`block py-1.5 transition-colors group ${subItem.isSubItem ? 'pl-4' : ''}`}
                                >
                                  {subItem.isArrowLink ? (
                                    <div className="flex items-center gap-2 text-[#4D4D4D] group-hover:text-[#3EAA34] font-medium">
                                      <ArrowRight className="w-4 h-4" />
                                      {subItem.label}
                                    </div>
                                  ) : (
                                    <>
                                      <div className={`text-[#4D4D4D] group-hover:text-[#3EAA34] ${subItem.isSubItem ? 'text-gray-600 before:content-["·"] before:mr-2' : 'font-medium'}`}>
                                        {subItem.label}
                                      </div>
                                      {subItem.description && (
                                        <div className="text-sm text-gray-500">{subItem.description}</div>
                                      )}
                                    </>
                                  )}
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-[#4D4D4D] hover:text-[#3EAA34] transition-colors font-medium py-2"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Button */}
          <a
            href="https://voxbi.me/mixvoip/sales"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 bg-[#3EAA34] text-white px-5 py-2.5 rounded font-semibold hover:bg-[#359929] transition-colors"
          >
            {t('header.contactUs')}
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container py-4 space-y-4">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    className="block py-2 text-[#4D4D4D] font-medium"
                  >
                    {item.label}
                  </a>
                ) : (
                  <div className="py-2 text-[#4D4D4D] font-medium">{item.label}</div>
                )}
              </div>
            ))}
            <a
              href="https://voxbi.me/mixvoip/sales"
              target="_blank"
              className="block w-full text-center bg-[#3EAA34] text-white px-5 py-2.5 rounded font-semibold"
            >
              {t('header.contactUs')}
            </a>
            {/* Mobile language switcher */}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { handleLanguageChange(lang.code); setMobileMenuOpen(false); }}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    language === lang.code
                      ? 'bg-[#3EAA34] text-white'
                      : 'text-[#4D4D4D] hover:bg-gray-100'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
