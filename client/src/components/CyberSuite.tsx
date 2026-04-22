import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Eye, Scale, BookOpen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CyberSuite() {
  const { t, getAssetUrl } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
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
      { threshold: 0.3 }
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
      angle: 180, // west (left)
    },
    {
      key: 'assistance',
      icon: <Shield className="h-6 w-6" />,
      color: '#00B050',
      gradient: 'from-green-500 to-emerald-400',
      glowColor: 'shadow-green-400/50',
      logo: '/images/mixvoip-logo.svg',
      logoAlt: 'Mixvoip',
      angle: -90, // north (top)
    },
    {
      key: 'assurance',
      icon: <Scale className="h-6 w-6" />,
      color: '#2563EB',
      gradient: 'from-blue-600 to-blue-400',
      glowColor: 'shadow-blue-400/50',
      logo: '/images/LeFoyer.svg',
      logoAlt: 'Le Foyer',
      angle: 0, // east (right)
    },
    {
      key: 'advisory',
      icon: <BookOpen className="h-6 w-6" />,
      color: '#7C3AED',
      gradient: 'from-purple-600 to-violet-400',
      glowColor: 'shadow-purple-400/50',
      logo: '/images/luxgaplogo.svg',
      logoAlt: 'Luxgap',
      angle: 90, // south (bottom)
    },
  ];

  const radius = 160; // radius of the circle

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Title with Partner Logos */}
          <div className={`mb-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-6">
              {/* Le Foyer Logo - left */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <img src={getAssetUrl('images/logo_le_foyer.svg')} alt="Le Foyer" className="h-36 md:h-48 object-contain brightness-0 invert opacity-90" />
              </div>

              {/* Title text - center */}
              <div className="flex-1 text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
                  <span className="text-xs font-semibold text-sky-300 uppercase tracking-widest">{t('cycle.badge')}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
                  {t('cycle.title')}
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  {t('cycle.subtitle')}
                </p>
              </div>

              {/* Luxgap + RSecure - right, stacked */}
              <div className="flex-shrink-0 flex flex-col items-center gap-5">
                <img src={getAssetUrl('images/luxgaplogo.svg')} alt="Luxgap" className="h-14 md:h-16 object-contain brightness-0 invert opacity-80" />
                <img src={getAssetUrl('images/Rsecure.svg')} alt="RSecure" className="h-14 md:h-16 object-contain brightness-0 invert opacity-80" />
              </div>
            </div>
          </div>

          {/* Main Layout: Circle + Details + Partner Logos */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Animated Circle */}
            <div className={`relative flex-shrink-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <div className="relative w-[380px] h-[380px] md:w-[420px] md:h-[420px]">
                
                {/* Rotating outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-600 animate-spin-slow" />
                
                {/* Static inner glow ring */}
                <div className="absolute inset-6 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm" />
                
                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-2xl transition-all duration-500 ${activeIndex !== null ? 'scale-110' : ''}`}>
                    <div className="text-center">
                      <div className="text-sm font-black text-white leading-tight">Cyber<br/>Suite</div>
                      <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{t('cycle.center')}</div>
                    </div>
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
                  {/* Curved path arrows: Respond(N) → Insure(E) → Advise(S) → Monitor(W) → Respond(N) */}
                  <path
                    d="M 250 55 A 170 170 0 0 1 365 170"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrowhead)"
                  />
                  <path
                    d="M 365 250 A 170 170 0 0 1 250 365"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrowhead)"
                  />
                  <path
                    d="M 170 365 A 170 170 0 0 1 55 250"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrowhead)"
                  />
                  <path
                    d="M 55 170 A 170 170 0 0 1 170 55"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrowhead)"
                  />
                </svg>
              </div>
            </div>

            {/* Detail Panel */}
            <div className={`flex-1 min-w-0 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>

              {activeIndex !== null ? (
                <div className="space-y-6">
                  {/* Active pillar detail */}
                  <div className={`rounded-2xl p-6 border transition-all duration-500`}
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

                  {/* Analogy */}
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🏠</span>
                      <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">{t('cycle.analogy.label')}</div>
                        <p className="text-sm text-slate-300">
                          {t(`cycle.${pillars[activeIndex].key}.analogy`)}
                        </p>
                      </div>
                    </div>
                  </div>

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
  );
}
