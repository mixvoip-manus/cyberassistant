import { useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export default function Header() {
  const { language, setLanguage, t, getAssetUrl } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Left: Mixvoip Logo + Cyber Suite branding */}
          <div className="flex items-center gap-3 md:gap-4">
            <a href="https://www.mixvoip.com" className="flex items-center gap-2 flex-shrink-0">
              <img
                src={getAssetUrl('images/mixvoip-logo.svg')}
                alt="Mixvoip"
                className="h-8 md:h-10 w-auto"
              />
            </a>
            <div className="border-l border-slate-300 pl-3 md:pl-4">
              <div className="text-base md:text-xl font-bold text-slate-800 leading-tight">Cyber Suite</div>
              <div className="text-[10px] md:text-xs text-slate-500 font-medium">by Mixvoip</div>
            </div>
          </div>

          {/* Center: Partner Logos (desktop only) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <img
              src={getAssetUrl('images/logo_le_foyer.svg')}
              alt="Le Foyer"
              className="h-12 xl:h-14 object-contain"
            />
            <div className="w-px h-8 bg-slate-200" />
            <img
              src={getAssetUrl('images/luxgaplogo.svg')}
              alt="Luxgap"
              className="h-7 xl:h-8 object-contain"
            />
            <div className="w-px h-8 bg-slate-200" />
            <img
              src={getAssetUrl('images/Rsecure.svg')}
              alt="RSecure"
              className="h-7 xl:h-8 object-contain"
            />
          </div>

          {/* Right: Nav + Language + CTA */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.pricing')}
              </button>
              <a
                href="https://voxbi.me/mixvoip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.contact')}
              </a>
            </nav>
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentLang.flag}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? 'bg-accent' : ''}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button */}
            <Button
              onClick={() => scrollToSection('assessment')}
              className="hidden sm:flex bg-[#00B050] hover:bg-[#00873D] text-white"
            >
              {t('nav.calculate')}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            {/* Partner logos in mobile menu */}
            <div className="flex items-center justify-center gap-4 pb-4 mb-4 border-b border-border">
              <img
                src={getAssetUrl('images/logo_le_foyer.svg')}
                alt="Le Foyer"
                className="h-10 object-contain"
              />
              <img
                src={getAssetUrl('images/luxgaplogo.svg')}
                alt="Luxgap"
                className="h-6 object-contain"
              />
              <img
                src={getAssetUrl('images/Rsecure.svg')}
                alt="RSecure"
                className="h-6 object-contain"
              />
            </div>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection('pricing')}
                className="px-4 py-2 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {t('nav.pricing')}
              </button>
              <a
                href="https://voxbi.me/mixvoip"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {t('nav.contact')}
              </a>
              <Button
                onClick={() => scrollToSection('assessment')}
                className="mt-2 bg-[#00B050] hover:bg-[#00873D] text-white"
              >
                {t('nav.calculate')}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
