import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Eye, Scale, BookOpen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CyberSuite() {
  const { t, getAssetUrl } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Intersection observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate through pillars
  useEffect(() => {
    if (!isVisible || !autoRotate) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % 4));
    }, 2500);
    return () => clearInterval(interval);
  }, [isVisible, autoRotate]);

  const pillars = [
    {
      key: 'socaas',
      icon: <Eye className="h-6 w-6" />,
      color: '#0EA5E9',
      gradient: 'from-sky-500 to-cyan-400',
      glowColor: 'shadow-sky-400/50',
      logo: '/images/Rsecure.svg',
      logoAlt: 'RSecure',
      angle: 180,
    },
    {
      key: 'assistance',
      icon: <Shield className="h-6 w-6" />,
      color: '#00B050',
      gradient: 'from-green-500 to-emerald-400',
      glowColor: 'shadow-green-400/50',
      logo: '/images/mixvoip-logo.svg',
      logoAlt: 'Mixvoip',
      angle: -90,
    },
    {
      key: 'assurance',
      icon: <Scale className="h-6 w-6" />,
      color: '#2563EB',
      gradient: 'from-blue-600 to-blue-400',
      glowColor: 'shadow-blue-400/50',
      logo: '/images/LeFoyer.svg',
      logoAlt: 'Le Foyer',
      angle: 0,
    },
    {
      key: 'advisory',
      icon: <BookOpen className="h-6 w-6" />,
      color: '#7C3AED',
      gradient: 'from-purple-600 to-violet-400',
      glowColor: 'shadow-purple-400/50',
      logo: '/images/luxgaplogo.svg',
      logoAlt: 'Luxgap',
      angle: 90,
    },
  ];

  const radius = 160;

  return (
    <>
      {/* Green banner: Cyber Suite by Mixvoip */}
      <div className="pt-16 md:pt-20">
        <div className="bg-[#00B050] py-3">
          <div className="container">
            <p className="text-white font-bold text-center text-lg md:text-xl tracking-wide">
              Cyber Suite by Mixvoip
            </p>
          </div>
        </div>
      </div>

      {/* Main dark section with Le Foyer left, title, circle, details, partner logos */}
      <section ref={sectionRef} className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="container">
          <div className="max-w-7xl mx-auto">

            {/* Top area: Le Foyer left + Title right */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 pt-10 md:pt-14 pb-8 md:pb-10">
              {/* Le Foyer logo — large, dominant */}
              <div className="flex-shrink-0 bg-white rounded-2xl p-5 md:p-6 shadow-lg">
                <img
                  src={getAssetUrl('images/logo_le_foyer.svg')}
                  alt="Le Foyer"
                  className="h-20 md:h-28 w-auto object-contain"
                />
              </div>

              {/* Title + subtitle */}
              <div className={`text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="text-2xl md:text-4xl font-bold mb-3 text-white">
                  {t('cycle.title')}
                </h2>
                <p className="text-base md:text-lg text-slate-400 max-w-xl">
                  {t('cycle.subtitle')}
                </p>
              </div>
            </div>

            {/* Circle + Details + Partner logos row */}
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 pb-16 md:pb-20">
              
              {/* Animated Circle */}
              <div className={`relative flex-shrink-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px]">
                  
                  {/* Rotating outer ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-600 animate-spin-slow" />
                  
                  {/* Static inner glow ring */}
                  <div className="absolute inset-6 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm" />
                  
                  {/* Center logo */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-2xl transition-all duration-500 ${activeIndex !== null ? 'scale-110' : ''}`}>
                      <img
                        src={getAssetUrl('images/mixvoip-logo.svg')}
                        alt="Mixvoip"
                        className="h-8 w-auto brightness-0 invert"
                      />
                    </div>
                  </div>

                  {/* Pillar nodes on the circle */}
                  {pillars.map((pillar, index) => {
                    const angleRad = (pillar.angle * Math.PI) / 180;
                    const x = Math.cos(angleRad) * radius;
                    const y = Math.sin(angleRad) * radius;
                    const isActive = activeIndex === index;

                    return (
                      <div
                        key={pillar.key}
                        className="absolute z-20"
                        style={{
                          left: `calc(50% + ${x}px - 44px)`,
                          top: `calc(50% + ${y}px - 44px)`,
                        }}
                      >
                        {/* Connection line to center */}
                        <div
                          className={`absolute w-px bg-gradient-to-b transition-all duration-500 ${isActive ? 'opacity-80' : 'opacity-20'}`}
                          style={{
                            height: `${radius - 56}px`,
                            left: '44px',
                            top: '44px',
                            transformOrigin: 'top center',
                            transform: `rotate(${pillar.angle + 180}deg)`,
                            background: `linear-gradient(to bottom, ${pillar.color}, transparent)`,
                          }}
                        />
                        
                        {/* Node */}
                        <button
                          onClick={() => { setActiveIndex(index); setAutoRotate(false); }}
                          className={`w-[88px] h-[88px] rounded-full flex flex-col items-center justify-center transition-all duration-500 cursor-pointer border-2 ${
                            isActive
                              ? `bg-gradient-to-br ${pillar.gradient} border-white/30 shadow-lg ${pillar.glowColor} scale-110`
                              : 'bg-slate-800 border-slate-600 hover:border-slate-500 hover:scale-105'
                          }`}
                        >
                          <div className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                            {pillar.icon}
                          </div>
                          <span className={`text-[9px] font-bold mt-1 uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                            {t(`cycle.${pillar.key}.short`)}
                          </span>
                        </button>

                        {/* Pulse ring when active */}
                        {isActive && (
                          <div
                            className="absolute inset-0 rounded-full animate-ping-slow"
                            style={{ border: `2px solid ${pillar.color}`, opacity: 0.3 }}
                          />
                        )}
                      </div>
                    );
                  })}

                  {/* Curved arrows between nodes */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 420">
                    <defs>
                      <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#475569" />
                      </marker>
                    </defs>
                    <path d="M 250 55 A 170 170 0 0 1 365 170" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
                    <path d="M 365 250 A 170 170 0 0 1 250 365" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
                    <path d="M 170 365 A 170 170 0 0 1 55 250" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
                    <path d="M 55 170 A 170 170 0 0 1 170 55" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
                  </svg>
                </div>
              </div>

              {/* Detail Panel */}
              <div className={`flex-1 min-w-0 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                {activeIndex !== null ? (
                  <div className="space-y-5">
                    {/* Active pillar detail */}
                    <div className="rounded-2xl p-6 border transition-all duration-500"
                      style={{
                        backgroundColor: `${pillars[activeIndex].color}10`,
                        borderColor: `${pillars[activeIndex].color}30`,
                      }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillars[activeIndex].gradient} flex items-center justify-center text-white shadow-lg`}
                        >
                          {pillars[activeIndex].icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {t(`cycle.${pillars[activeIndex].key}.title`)}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {t(`cycle.${pillars[activeIndex].key}.role`)}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        {t(`cycle.${pillars[activeIndex].key}.description`)}
                      </p>

                      {/* Partner logo */}
                      <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: `${pillars[activeIndex].color}20` }}>
                        <span className="text-xs text-slate-500">{t('cycle.poweredBy')}</span>
                        <img
                          src={getAssetUrl(pillars[activeIndex].logo.slice(1))}
                          alt={pillars[activeIndex].logoAlt}
                          className="h-5 object-contain brightness-0 invert opacity-60"
                        />
                      </div>
                    </div>

                    {/* Analogy — hidden */}

                    {/* Navigation dots */}
                    <div className="flex gap-2 pt-2">
                      {pillars.map((p, i) => (
                        <button
                          key={p.key}
                          onClick={() => { setActiveIndex(i); setAutoRotate(false); }}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            i === activeIndex ? 'w-8' : 'w-2 hover:w-4'
                          }`}
                          style={{ backgroundColor: i === activeIndex ? p.color : '#475569' }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center lg:text-left">
                    <p className="text-slate-400 text-lg">{t('cycle.clickToExplore')}</p>
                  </div>
                )}
              </div>

              {/* Luxgap + RSecure stacked on the right */}
              <div className={`hidden lg:flex flex-col items-center gap-4 flex-shrink-0 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <div className="bg-white rounded-xl shadow-md w-[180px] h-[70px] flex items-center justify-center px-4">
                  <img
                    src={getAssetUrl('images/luxgap-full.webp')}
                    alt="Luxgap"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="bg-white rounded-xl shadow-md w-[180px] h-[70px] flex items-center justify-center px-4">
                  <img
                    src={getAssetUrl('images/rsecure-full.png')}
                    alt="RSecure"
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Mobile: Luxgap + RSecure row */}
              <div className="flex lg:hidden items-center justify-center gap-6">
                <div className="bg-white rounded-xl shadow-md w-[150px] h-[56px] flex items-center justify-center px-3">
                  <img
                    src={getAssetUrl('images/luxgap-full.webp')}
                    alt="Luxgap"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div className="bg-white rounded-xl shadow-md w-[150px] h-[56px] flex items-center justify-center px-3">
                  <img
                    src={getAssetUrl('images/rsecure-full.png')}
                    alt="RSecure"
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Custom animations */}
        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 30s linear infinite;
          }
          @keyframes ping-slow {
            0% { transform: scale(1); opacity: 0.3; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          .animate-ping-slow {
            animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `}</style>
      </section>
    </>
  );
}
