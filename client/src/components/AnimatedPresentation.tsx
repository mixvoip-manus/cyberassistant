import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Pause, ChevronLeft, ChevronRight, Shield, Scale, Building2, Lock, CreditCard, GraduationCap, Phone, CheckCircle2, Home, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TextSlide {
  id: number;
  type: 'text';
  titleKey: string;
  subtitleKey: string;
  contentKeys: string[];
  icon: React.ReactNode;
  bgGradient: string;
}

interface ImageSlide {
  id: number;
  type: 'image';
  titleKey: string;
  subtitleKey: string;
  imageSrc: string;
  footerKey: string;
  bgGradient: string;
  legendTitleKey: string;
  prepTitleKey: string;
  prepItems: string[];
  emergencyTitleKey: string;
  emergencyItems: string[];
}

type Slide = TextSlide | ImageSlide;

const slides: Slide[] = [
  // NEW Slide 1: House Scenario (Image-based)
  {
    id: 1,
    type: 'image',
    titleKey: 'presentation.slideHouse.title',
    subtitleKey: 'presentation.slideHouse.subtitle',
    imageSrc: '/images/house_lifecycle_complete.png',
    footerKey: 'presentation.slideHouse.footer',
    bgGradient: 'from-orange-50 via-white to-amber-50',
    legendTitleKey: 'presentation.slideHouse.legendTitle',
    prepTitleKey: 'presentation.slideHouse.prepTitle',
    prepItems: [
      'presentation.slideHouse.prep1',
      'presentation.slideHouse.prep2',
      'presentation.slideHouse.prep3',
      'presentation.slideHouse.prep4',
    ],
    emergencyTitleKey: 'presentation.slideHouse.emergencyTitle',
    emergencyItems: [
      'presentation.slideHouse.emergency1',
      'presentation.slideHouse.emergency2',
      'presentation.slideHouse.emergency3',
      'presentation.slideHouse.emergency4',
    ],
  },
  // NEW Slide 2: Cyber Scenario (Image-based)
  {
    id: 2,
    type: 'image',
    titleKey: 'presentation.slideCyber.title',
    subtitleKey: 'presentation.slideCyber.subtitle',
    imageSrc: '/images/cyber_lifecycle_complete.png',
    footerKey: 'presentation.slideCyber.footer',
    bgGradient: 'from-green-50 via-white to-blue-50',
    legendTitleKey: 'presentation.slideCyber.legendTitle',
    prepTitleKey: 'presentation.slideCyber.prepTitle',
    prepItems: [
      'presentation.slideCyber.prep1',
      'presentation.slideCyber.prep2',
      'presentation.slideCyber.prep3',
      'presentation.slideCyber.prep4',
    ],
    emergencyTitleKey: 'presentation.slideCyber.emergencyTitle',
    emergencyItems: [
      'presentation.slideCyber.emergency1',
      'presentation.slideCyber.emergency2',
      'presentation.slideCyber.emergency3',
      'presentation.slideCyber.emergency4',
    ],
  },
  // Original slides (renumbered)
  {
    id: 3,
    type: 'text',
    titleKey: 'presentation.slide1.title',
    subtitleKey: 'presentation.slide1.subtitle',
    contentKeys: ['presentation.slide1.point1', 'presentation.slide1.point2', 'presentation.slide1.point3'],
    icon: <Shield className="h-16 w-16" />,
    bgGradient: 'from-slate-900 via-slate-800 to-slate-900',
  },
  {
    id: 4,
    type: 'text',
    titleKey: 'presentation.slide2.title',
    subtitleKey: 'presentation.slide2.subtitle',
    contentKeys: ['presentation.slide2.point1', 'presentation.slide2.point2', 'presentation.slide2.point3'],
    icon: <Phone className="h-16 w-16" />,
    bgGradient: 'from-emerald-900 via-slate-900 to-slate-900',
  },
  {
    id: 5,
    type: 'text',
    titleKey: 'presentation.slide3.title',
    subtitleKey: 'presentation.slide3.subtitle',
    contentKeys: ['presentation.slide3.point1', 'presentation.slide3.point2', 'presentation.slide3.point3'],
    icon: <Scale className="h-16 w-16" />,
    bgGradient: 'from-blue-900 via-slate-900 to-slate-900',
  },
  {
    id: 6,
    type: 'text',
    titleKey: 'presentation.slide4.title',
    subtitleKey: 'presentation.slide4.subtitle',
    contentKeys: ['presentation.slide4.point1', 'presentation.slide4.point2', 'presentation.slide4.point3'],
    icon: <Building2 className="h-16 w-16" />,
    bgGradient: 'from-purple-900 via-slate-900 to-slate-900',
  },
  {
    id: 7,
    type: 'text',
    titleKey: 'presentation.slide5.title',
    subtitleKey: 'presentation.slide5.subtitle',
    contentKeys: ['presentation.slide5.point1', 'presentation.slide5.point2', 'presentation.slide5.point3'],
    icon: <Lock className="h-16 w-16" />,
    bgGradient: 'from-red-900 via-slate-900 to-slate-900',
  },
  {
    id: 8,
    type: 'text',
    titleKey: 'presentation.slide6.title',
    subtitleKey: 'presentation.slide6.subtitle',
    contentKeys: ['presentation.slide6.point1', 'presentation.slide6.point2', 'presentation.slide6.point3'],
    icon: <CreditCard className="h-16 w-16" />,
    bgGradient: 'from-orange-900 via-slate-900 to-slate-900',
  },
  {
    id: 9,
    type: 'text',
    titleKey: 'presentation.slide7.title',
    subtitleKey: 'presentation.slide7.subtitle',
    contentKeys: ['presentation.slide7.point1', 'presentation.slide7.point2', 'presentation.slide7.point3'],
    icon: <GraduationCap className="h-16 w-16" />,
    bgGradient: 'from-cyan-900 via-slate-900 to-slate-900',
  },
  {
    id: 10,
    type: 'text',
    titleKey: 'presentation.slide8.title',
    subtitleKey: 'presentation.slide8.subtitle',
    contentKeys: ['presentation.slide8.point1', 'presentation.slide8.point2', 'presentation.slide8.point3'],
    icon: <CheckCircle2 className="h-16 w-16" />,
    bgGradient: 'from-[#00B050] via-slate-900 to-slate-900',
  },
];

export default function AnimatedPresentation() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 10000; // 10 seconds per slide (longer for image slides)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (isPlaying) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + (100 / (SLIDE_DURATION / 100));
        });
      }, 100);

      interval = setInterval(() => {
        nextSlide();
      }, SLIDE_DURATION);
    }

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isPlaying, nextSlide]);

  const slide = slides[currentSlide];

  // Render Image Slide
  const renderImageSlide = (slide: ImageSlide) => (
    <div className={`absolute inset-0 flex flex-col bg-gradient-to-br ${slide.bgGradient}`}>
      {/* Header */}
      <div className="text-center pt-4 pb-2 px-4">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">
          {t(slide.titleKey)}
        </h3>
        <p className="text-sm text-slate-600">
          {t(slide.subtitleKey)}
        </p>
      </div>

      {/* Main Content: Legend + Image */}
      <div className="flex-1 flex gap-3 px-4 pb-2 min-h-0">
        {/* Legend */}
        <div className="w-40 flex-shrink-0 bg-white rounded-lg p-3 shadow-md overflow-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 text-center">
            {t(slide.legendTitleKey)}
          </div>
          
          {/* Preparation Section */}
          <div className="mb-3">
            <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded mb-2 inline-block">
              ✓ {t(slide.prepTitleKey)}
            </div>
            <div className="space-y-1">
              {slide.prepItems.map((key, idx) => (
                <div key={idx} className="text-xs text-slate-700 flex items-start gap-1">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Section */}
          <div>
            <div className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded mb-2 inline-block">
              ⚠ {t(slide.emergencyTitleKey)}
            </div>
            <div className="space-y-1">
              {slide.emergencyItems.map((key, idx) => (
                <div key={idx} className="text-xs text-slate-700 flex items-start gap-1">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <img 
            src={slide.imageSrc} 
            alt={t(slide.titleKey)}
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Footer */}
      <div className={`py-2 px-4 text-center ${slide.id === 1 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-green-500 to-blue-500'}`}>
        <p className="text-sm font-bold text-white">
          {t(slide.footerKey)}
        </p>
      </div>

      {/* Slide Number */}
      <div className="absolute bottom-12 right-4 text-slate-500 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );

  // Render Text Slide
  const renderTextSlide = (slide: TextSlide) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-white">
      {/* Icon */}
      <div className="mb-6 text-[#00B050] animate-pulse">
        {slide.icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-3 animate-fadeIn">
        {t(slide.titleKey)}
      </h3>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-slate-300 text-center mb-8 animate-fadeIn animation-delay-200">
        {t(slide.subtitleKey)}
      </p>

      {/* Content Points */}
      <div className="space-y-3 max-w-2xl">
        {slide.contentKeys.map((key, index) => (
          <div
            key={key}
            className="flex items-center gap-3 animate-slideIn"
            style={{ animationDelay: `${(index + 1) * 200}ms` }}
          >
            <CheckCircle2 className="h-5 w-5 text-[#00B050] flex-shrink-0" />
            <span className="text-slate-200">{t(key)}</span>
          </div>
        ))}
      </div>

      {/* Slide Number */}
      <div className="absolute bottom-4 right-4 text-slate-500 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-slate-100">
      <div className="container">

        {/* Presentation Container */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`relative ${slide.type === 'image' ? '' : `bg-gradient-to-br ${slide.bgGradient}`} rounded-2xl overflow-hidden shadow-2xl aspect-video`}
          >
            {/* Progress Bar */}
            {isPlaying && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-700 z-10">
                <div
                  className="h-full bg-[#00B050] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Slide Content */}
            {slide.type === 'image' 
              ? renderImageSlide(slide as ImageSlide)
              : renderTextSlide(slide as TextSlide)
            }
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Navigation Dots */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-[#00B050] w-8'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                variant="default"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="rounded-full bg-[#00B050] hover:bg-[#00963f]"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slideIn {
          opacity: 0;
          animation: slideIn 0.5s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </section>
  );
}
