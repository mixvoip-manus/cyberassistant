import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Pause, ChevronLeft, ChevronRight, Shield, Scale, Building2, Lock, CreditCard, GraduationCap, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  titleKey: string;
  subtitleKey: string;
  contentKeys: string[];
  icon: React.ReactNode;
  bgGradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    titleKey: 'presentation.slide1.title',
    subtitleKey: 'presentation.slide1.subtitle',
    contentKeys: ['presentation.slide1.point1', 'presentation.slide1.point2', 'presentation.slide1.point3'],
    icon: <Shield className="h-16 w-16" />,
    bgGradient: 'from-slate-900 via-slate-800 to-slate-900',
  },
  {
    id: 2,
    titleKey: 'presentation.slide2.title',
    subtitleKey: 'presentation.slide2.subtitle',
    contentKeys: ['presentation.slide2.point1', 'presentation.slide2.point2', 'presentation.slide2.point3'],
    icon: <Phone className="h-16 w-16" />,
    bgGradient: 'from-emerald-900 via-slate-900 to-slate-900',
  },
  {
    id: 3,
    titleKey: 'presentation.slide3.title',
    subtitleKey: 'presentation.slide3.subtitle',
    contentKeys: ['presentation.slide3.point1', 'presentation.slide3.point2', 'presentation.slide3.point3'],
    icon: <Scale className="h-16 w-16" />,
    bgGradient: 'from-blue-900 via-slate-900 to-slate-900',
  },
  {
    id: 4,
    titleKey: 'presentation.slide4.title',
    subtitleKey: 'presentation.slide4.subtitle',
    contentKeys: ['presentation.slide4.point1', 'presentation.slide4.point2', 'presentation.slide4.point3'],
    icon: <Building2 className="h-16 w-16" />,
    bgGradient: 'from-purple-900 via-slate-900 to-slate-900',
  },
  {
    id: 5,
    titleKey: 'presentation.slide5.title',
    subtitleKey: 'presentation.slide5.subtitle',
    contentKeys: ['presentation.slide5.point1', 'presentation.slide5.point2', 'presentation.slide5.point3'],
    icon: <Lock className="h-16 w-16" />,
    bgGradient: 'from-red-900 via-slate-900 to-slate-900',
  },
  {
    id: 6,
    titleKey: 'presentation.slide6.title',
    subtitleKey: 'presentation.slide6.subtitle',
    contentKeys: ['presentation.slide6.point1', 'presentation.slide6.point2', 'presentation.slide6.point3'],
    icon: <CreditCard className="h-16 w-16" />,
    bgGradient: 'from-orange-900 via-slate-900 to-slate-900',
  },
  {
    id: 7,
    titleKey: 'presentation.slide7.title',
    subtitleKey: 'presentation.slide7.subtitle',
    contentKeys: ['presentation.slide7.point1', 'presentation.slide7.point2', 'presentation.slide7.point3'],
    icon: <GraduationCap className="h-16 w-16" />,
    bgGradient: 'from-cyan-900 via-slate-900 to-slate-900',
  },
  {
    id: 8,
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

  const SLIDE_DURATION = 8000; // 8 seconds per slide

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

  return (
    <section className="py-16 md:py-24 bg-slate-100">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('presentation.title')}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {t('presentation.subtitle')}
          </p>
        </div>

        {/* Presentation Container */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`relative bg-gradient-to-br ${slide.bgGradient} rounded-2xl overflow-hidden shadow-2xl aspect-video`}
          >
            {/* Progress Bar */}
            {isPlaying && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-700">
                <div
                  className="h-full bg-[#00B050] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Slide Content */}
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
