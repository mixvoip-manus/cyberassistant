import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Pause, ChevronLeft, ChevronRight, Shield, Scale, Building2, Lock, CreditCard, GraduationCap, Phone, CheckCircle2, Home, Server, Volume2, VolumeX } from 'lucide-react';
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
  imageSrcByLang?: Record<string, string>;
  footerKey: string;
  bgGradient: string;
  legendTitleKey: string;
  prepTitleKey: string;
  prepItems: string[];
  emergencyTitleKey: string;
  emergencyItems: string[];
}

interface SimpleImageSlide {
  id: number;
  type: 'simple-image';
  titleKey: string;
  subtitleKey: string;
  imageSrc: string;
  bgGradient: string;
}

type Slide = TextSlide | ImageSlide | SimpleImageSlide;

const slides: Slide[] = [
  // Welcome Slide (NEW - Position 1)
  {
    id: 1,
    type: 'text',
    titleKey: 'presentation.slideWelcome.title',
    subtitleKey: 'presentation.slideWelcome.subtitle',
    contentKeys: [],
    icon: <Shield className="h-16 w-16" />,
    bgGradient: 'from-slate-900 via-slate-800 to-slate-900',
  },
  // House Scenario (Image-based) - Position 2
  {
    id: 2,
    type: 'image',
    titleKey: 'presentation.slideHouse.title',
    subtitleKey: 'presentation.slideHouse.subtitle',
    imageSrc: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/house_lifecycle_complete_7d3a0414.png',
    imageSrcByLang: {
      de: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/house_lifecycle_complete_7d3a0414.png',
      en: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/house_lifecycle_en-X5Pe5zLEM22Qf5PL2NF3mL.png',
      fr: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/house_lifecycle_fr-QQudCjQ2AMAH6755GTMhV5.png',
    },
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
    imageSrc: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/cyber_lifecycle_complete_9ac9e5f3.png',
    imageSrcByLang: {
      de: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/cyber_lifecycle_complete_9ac9e5f3.png',
      en: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/cyber_lifecycle_en-bK3nVZwE86ZDupzQf8sqkM.png',
      fr: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/cyber_lifecycle_fr-4B5sGKw5sjtVm56CqURDs2.png',
    },
    footerKey: 'presentation.slideCyber.footer',
    bgGradient: 'from-green-50 via-white to-blue-50',
    legendTitleKey: 'presentation.slideCyber.legendTitle',
    prepTitleKey: 'presentation.slideCyber.prepTitle',
    prepItems: [
      'presentation.slideCyber.prep1',
      'presentation.slideCyber.prep2',
      'presentation.slideCyber.prep3',
      'presentation.slideCyber.prep4',
      'presentation.slideCyber.prep5',
    ],
    emergencyTitleKey: 'presentation.slideCyber.emergencyTitle',
    emergencyItems: [
      'presentation.slideCyber.emergency1',
      'presentation.slideCyber.emergency2',
      'presentation.slideCyber.emergency3',
      'presentation.slideCyber.emergency4',
      'presentation.slideCyber.emergency5',
    ],
  },
  // NEW Slide 4: Timeline/Flowchart
  {
    id: 4,
    type: 'simple-image',
    titleKey: 'presentation.slideTimeline.title',
    subtitleKey: 'presentation.slideTimeline.subtitle',
    imageSrc: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/cyber_timeline_flowchart_ae965303.png',
    bgGradient: 'from-slate-50 via-white to-slate-50',
  },
  // Original slides (renumbered)
  {
    id: 5,
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

// Audio files for slides by language
const slideAudioFiles: Record<string, Record<number, string>> = {
  de: {
    0: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_welcome_de_3571360f.wav', // Welcome (index 0)
    1: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide2_haus_de_v3_f786a0e4.wav', // House slide (index 1) - v3
    2: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide3_de_9215d95a.wav', // Cyber slide (index 2)
    3: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide4_timeline_de_v3_b95e4f2c.wav', // Timeline (index 3)
    4: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide5_socaas_de_v3_7172674c.wav', // SOCaaS + CyberAssistance (index 4)
    5: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide6_advisory_de_v3_6bebc4fd.wav', // CyberAdvisory (index 5)
    6: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_assurance_de_new_288abc49.wav', // CyberAssurance (index 6) - v2 no bundle language
    7: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_extortion_de_63cdb9bd.wav', // Cyber Extortion (index 7)
    8: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_fraud_de_f6180568.wav', // Cybercrime & Fraud (index 8)
    9: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_training_de_ec4ebd5b.wav', // Prevention & Training (index 9)
    10: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_closing_de_d1bc5878.wav', // Closing (index 10)
  },
  fr: {
    0: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_welcome_fr_726ef172.wav', // Welcome (index 0)
    1: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide2_haus_fr_v3_ed8455e7.wav', // House slide (index 1) - v3
    2: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide3_cyber_fr_v3_4e748e8d.wav', // Cyber slide (index 2)
    3: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide4_timeline_fr_v3_0d0737b9.wav', // Timeline (index 3)
    4: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide5_socaas_fr_v3_3f3e6523.wav', // SOCaaS + CyberAssistance (index 4)
    5: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide6_advisory_fr_v3_ef7475ee.wav', // CyberAdvisory (index 5)
    6: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_assurance_fr_new_705447bd.wav', // CyberAssurance (index 6) - v2 no bundle language
    7: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_extortion_fr_80d2710f.wav', // Cyber Extortion (index 7)
    8: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_fraud_fr_d6ff0d5f.wav', // Cybercrime & Fraud (index 8)
    9: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_training_fr_338a7b31.wav', // Prevention & Training (index 9)
    10: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_closing_fr_cc22975c.wav', // Closing (index 10)
  },
  en: {
    0: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_welcome_en_1ca10afb.wav', // Welcome (index 0)
    1: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide2_haus_en_v3_b3a30842.wav', // House slide (index 1) - v3
    2: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide3_cyber_en_v3_ed765cbb.wav', // Cyber slide (index 2)
    3: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide4_timeline_en_v3_a2bbd2e1.wav', // Timeline (index 3)
    4: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide5_socaas_en_v3_2e448452.wav', // SOCaaS + CyberAssistance (index 4)
    5: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide6_advisory_en_v3_b8e3fa5e.wav', // CyberAdvisory (index 5)
    6: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_assurance_en_new_27aa281c.wav', // CyberAssurance (index 6) - v2 no bundle language
    7: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_extortion_en_1fc75abb.wav', // Cyber Extortion (index 7)
    8: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_fraud_en_afe1ddd9.wav', // Cybercrime & Fraud (index 8)
    9: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_training_en_046eb9fd.wav', // Prevention & Training (index 9)
    10: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663071388273/nmC9YwcVcbHMjzuKkyoCJd/slide_closing_en_41779e4a.wav', // Closing (index 10)
  },
};

export default function AnimatedPresentation() {
  const { t, language, getAssetUrl } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Stop audio when slide changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsAudioPlaying(false);
    }
  }, [currentSlide]);

  // Toggle audio playback for current slide
  const toggleAudio = useCallback(() => {
    const langAudioFiles = slideAudioFiles[language];
    if (!langAudioFiles) return;
    const audioFile = langAudioFiles[currentSlide];
    if (!audioFile) return;

    if (isAudioPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(audioFile.startsWith('http') ? audioFile : getAssetUrl(audioFile.slice(1)));
      audio.onended = () => setIsAudioPlaying(false);
      audio.play();
      audioRef.current = audio;
      setIsAudioPlaying(true);
    }
  }, [currentSlide, isAudioPlaying, language]);

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
      <div className="text-center pt-4 pb-2 px-4 relative">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">
          {t(slide.titleKey)}
        </h3>
        <p className="text-sm text-slate-600">
          {t(slide.subtitleKey)}
        </p>
        {/* Audio Play Button - only for slides 1 and 2 (House and Cyber) */}
        {slideAudioFiles[language]?.[currentSlide] && (
          <button
            onClick={toggleAudio}
            className={`absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              isAudioPlaying 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-[#00B050] text-white hover:bg-[#00963f]'
            }`}
            title={isAudioPlaying ? t('presentation.audio.stop') : t('presentation.audio.play')}
          >
            {isAudioPlaying ? (
              <><VolumeX className="h-4 w-4" /> {t('presentation.audio.stopBtn')}</>
            ) : (
              <><Volume2 className="h-4 w-4" /> {t('presentation.audio.listenBtn')}</>
            )}
          </button>
        )}
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
            src={(() => { const src = slide.imageSrcByLang?.[language] || slide.imageSrc; return src.startsWith('http') ? src : getAssetUrl(src.slice(1)); })()}
            alt={t(slide.titleKey)}
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Slide Number */}
      <div className="absolute bottom-12 right-4 text-slate-500 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );

  // Render Simple Image Slide (no legend)
  const renderSimpleImageSlide = (slide: SimpleImageSlide) => (
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

      {/* Image - Full Width */}
      <div className="flex-1 flex items-center justify-center px-4 pb-4 min-h-0">
        <img 
          src={slide.imageSrc.startsWith('http') ? slide.imageSrc : getAssetUrl(slide.imageSrc.slice(1))} 
          alt={t(slide.titleKey)}
          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
        />
      </div>

      {/* Slide Number */}
      <div className="absolute bottom-4 right-4 text-slate-500 text-sm">
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
    <section className="py-8 md:py-12 bg-slate-100">
      <div className="container">

        {/* Presentation Container */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`relative ${slide.type === 'image' || slide.type === 'simple-image' ? '' : `bg-gradient-to-br ${slide.bgGradient}`} rounded-2xl overflow-hidden shadow-2xl aspect-video`}
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
              : slide.type === 'simple-image'
              ? renderSimpleImageSlide(slide as SimpleImageSlide)
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
