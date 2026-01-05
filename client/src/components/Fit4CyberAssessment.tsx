import React, { useState, useMemo, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { CheckCircle2, AlertTriangle, ChevronRight, ChevronLeft, ExternalLink, Send, Building2, Mail, Phone, User, Download, Upload, FileText, Euro, Zap, Shield } from 'lucide-react';
import assessmentData from '../data/assessment.json';
import productMappingData from '../data/productMapping.json';

type Language = 'en' | 'fr' | 'de';

interface Answer {
  id: number;
  score: number;
  exclusive: boolean;
  label: Record<Language, string>;
}

interface Question {
  id: number;
  category: string;
  section: string;
  maxPoints: number;
  label: Record<Language, string>;
  answers: Answer[];
}

interface ProductMapping {
  questionId: number;
  category: string;
  weakness: Record<Language, string>;
  products: {
    name: string;
    url: string;
    description: Record<Language, string>;
  }[];
}

const questions: Question[] = assessmentData.questions as Question[];
const productMapping: ProductMapping[] = productMappingData.productMapping as ProductMapping[];
const THRESHOLD = assessmentData.threshold;
const TOTAL_MAX_POINTS = assessmentData.totalMaxPoints;

// Translations
const translations = {
  en: {
    title: 'Fit4Cybersecurity Assessment',
    subtitle: 'Assess your company\'s cybersecurity in just 5 minutes. Based on the official NC3 Luxembourg standard.',
    questions: 'Questions',
    duration: 'Duration',
    minScore: 'Minimum Score',
    startAssessment: 'Start Assessment',
    alreadyHaveScore: 'I already have a score ≥65%',
    viewPricing: 'View Pricing First',
    question: 'Question',
    selectAll: 'Select all applicable answers',
    exclusive: 'Exclusive',
    back: 'Back',
    next: 'Next',
    viewResults: 'View Results',
    yourScore: 'Your Score',
    eligible: 'Eligible for Cyber Assistance',
    notEligible: 'Below 65% threshold',
    identifiedGaps: 'Identified Gaps & Recommended Solutions',
    points: 'Points',
    learnMore: 'Learn more',
    downloadReport: 'Download Report (PDF)',
    requestConsultation: 'Request Consultation',
    contactForm: 'Contact Form',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    company: 'Company',
    existingCustomer: 'I am already a Mixvoip customer',
    message: 'Message (optional)',
    uploadReport: 'Upload your Fit4Cybersecurity Report (PDF)',
    uploadRequired: 'Required for Fast-Track requests',
    submit: 'Send Request',
    submitting: 'Sending...',
    successTitle: 'Request Sent!',
    successMessage: 'Your email client should open with the pre-filled request. If not, please send an email to pberg@mixvoip.com',
    backToStart: 'Back to Start',
    pricingTitle: 'Cyber Assistance Pricing',
    pricingSubtitle: 'Transparent pricing for comprehensive cyber protection',
    perUserMonth: 'per user/month',
    noDeductible: 'No deductible',
    coverage: 'Coverage',
    basic: 'Basic',
    pro: 'Pro',
    enterprise: 'Enterprise',
    free: 'Free',
    forMixvoipCustomers: 'for Mixvoip customers',
    custom: 'Custom',
    contactSales: 'Contact Sales',
    backToAssessment: 'Back to Assessment',
    fastTrackTitle: 'Fast-Track Request',
    fastTrackSubtitle: 'You already have a Fit4Cybersecurity score of 65% or higher',
  },
  fr: {
    title: 'Évaluation Fit4Cybersecurity',
    subtitle: 'Évaluez la cybersécurité de votre entreprise en seulement 5 minutes. Basé sur le standard officiel NC3 Luxembourg.',
    questions: 'Questions',
    duration: 'Durée',
    minScore: 'Score minimum',
    startAssessment: 'Commencer l\'évaluation',
    alreadyHaveScore: 'J\'ai déjà un score ≥65%',
    viewPricing: 'Voir les prix d\'abord',
    question: 'Question',
    selectAll: 'Sélectionnez toutes les réponses applicables',
    exclusive: 'Exclusif',
    back: 'Retour',
    next: 'Suivant',
    viewResults: 'Voir les résultats',
    yourScore: 'Votre Score',
    eligible: 'Éligible pour Cyber Assistance',
    notEligible: 'En dessous du seuil de 65%',
    identifiedGaps: 'Lacunes identifiées & Solutions recommandées',
    points: 'Points',
    learnMore: 'En savoir plus',
    downloadReport: 'Télécharger le rapport (PDF)',
    requestConsultation: 'Demander une consultation',
    contactForm: 'Formulaire de contact',
    name: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    company: 'Entreprise',
    existingCustomer: 'Je suis déjà client Mixvoip',
    message: 'Message (optionnel)',
    uploadReport: 'Téléchargez votre rapport Fit4Cybersecurity (PDF)',
    uploadRequired: 'Requis pour les demandes Fast-Track',
    submit: 'Envoyer la demande',
    submitting: 'Envoi en cours...',
    successTitle: 'Demande envoyée!',
    successMessage: 'Votre client email devrait s\'ouvrir avec la demande pré-remplie. Sinon, envoyez un email à pberg@mixvoip.com',
    backToStart: 'Retour au début',
    pricingTitle: 'Tarifs Cyber Assistance',
    pricingSubtitle: 'Tarification transparente pour une protection cyber complète',
    perUserMonth: 'par utilisateur/mois',
    noDeductible: 'Sans franchise',
    coverage: 'Couverture',
    basic: 'Basic',
    pro: 'Pro',
    enterprise: 'Enterprise',
    free: 'Gratuit',
    forMixvoipCustomers: 'pour les clients Mixvoip',
    custom: 'Sur mesure',
    contactSales: 'Contacter les ventes',
    backToAssessment: 'Retour à l\'évaluation',
    fastTrackTitle: 'Demande Fast-Track',
    fastTrackSubtitle: 'Vous avez déjà un score Fit4Cybersecurity de 65% ou plus',
  },
  de: {
    title: 'Fit4Cybersecurity Assessment',
    subtitle: 'Bewerten Sie die Cybersicherheit Ihres Unternehmens in nur 5 Minuten. Basierend auf dem offiziellen NC3 Luxembourg Standard.',
    questions: 'Fragen',
    duration: 'Dauer',
    minScore: 'Mindest-Score',
    startAssessment: 'Assessment starten',
    alreadyHaveScore: 'Ich habe bereits einen Score ≥65%',
    viewPricing: 'Preise zuerst ansehen',
    question: 'Frage',
    selectAll: 'Wählen Sie alle zutreffenden Antworten aus',
    exclusive: 'Exklusiv',
    back: 'Zurück',
    next: 'Weiter',
    viewResults: 'Ergebnisse anzeigen',
    yourScore: 'Ihr Score',
    eligible: 'Berechtigt für Cyber Assistance',
    notEligible: 'Unter 65% Schwellenwert',
    identifiedGaps: 'Identifizierte Lücken & Empfohlene Lösungen',
    points: 'Punkte',
    learnMore: 'Mehr erfahren',
    downloadReport: 'Report herunterladen (PDF)',
    requestConsultation: 'Beratung anfordern',
    contactForm: 'Kontaktformular',
    name: 'Name',
    email: 'E-Mail',
    phone: 'Telefon',
    company: 'Firma',
    existingCustomer: 'Ich bin bereits Mixvoip-Kunde',
    message: 'Nachricht (optional)',
    uploadReport: 'Laden Sie Ihren Fit4Cybersecurity Report hoch (PDF)',
    uploadRequired: 'Erforderlich für Fast-Track-Anfragen',
    submit: 'Anfrage senden',
    submitting: 'Wird gesendet...',
    successTitle: 'Anfrage gesendet!',
    successMessage: 'Ihr E-Mail-Programm sollte sich mit der vorausgefüllten Anfrage öffnen. Falls nicht, senden Sie bitte eine E-Mail an pberg@mixvoip.com',
    backToStart: 'Zurück zum Start',
    pricingTitle: 'Cyber Assistance Preise',
    pricingSubtitle: 'Transparente Preise für umfassenden Cyber-Schutz',
    perUserMonth: 'pro Benutzer/Monat',
    noDeductible: 'Keine Selbstbeteiligung',
    coverage: 'Deckung',
    basic: 'Basic',
    pro: 'Pro',
    enterprise: 'Enterprise',
    free: 'Kostenlos',
    forMixvoipCustomers: 'für Mixvoip-Kunden',
    custom: 'Individuell',
    contactSales: 'Vertrieb kontaktieren',
    backToAssessment: 'Zurück zum Assessment',
    fastTrackTitle: 'Fast-Track Anfrage',
    fastTrackSubtitle: 'Sie haben bereits einen Fit4Cybersecurity Score von 65% oder höher',
  }
};

export default function Fit4CyberAssessment() {
  const { language } = useLanguage();
  const lang = language as Language;
  const t = translations[lang];
  
  const [currentStep, setCurrentStep] = useState<'intro' | 'assessment' | 'results' | 'contact' | 'pricing' | 'fasttrack'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number[]>>({});
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    isMixvoipCustomer: false,
    message: ''
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const score = useMemo(() => {
    let total = 0;
    Object.entries(selectedAnswers).forEach(([questionId, answerIds]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        answerIds.forEach(answerId => {
          const answer = question.answers.find(a => a.id === answerId);
          if (answer) {
            total += answer.score;
          }
        });
      }
    });
    return total;
  }, [selectedAnswers]);

  const scorePercentage = Math.round((score / TOTAL_MAX_POINTS) * 100);
  const isEligible = scorePercentage >= THRESHOLD;

  const gaps = useMemo(() => {
    const gapList: { question: Question; mapping: ProductMapping; earnedPoints: number }[] = [];
    
    questions.forEach(question => {
      const answers = selectedAnswers[question.id] || [];
      let earnedPoints = 0;
      answers.forEach(answerId => {
        const answer = question.answers.find(a => a.id === answerId);
        if (answer) earnedPoints += answer.score;
      });
      
      if (earnedPoints < question.maxPoints * 0.5) {
        const mapping = productMapping.find(m => m.questionId === question.id);
        if (mapping) {
          gapList.push({ question, mapping, earnedPoints });
        }
      }
    });
    
    return gapList.sort((a, b) => (b.question.maxPoints - b.earnedPoints) - (a.question.maxPoints - a.earnedPoints));
  }, [selectedAnswers]);

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const answer = question.answers.find(a => a.id === answerId);
    if (!answer) return;

    setSelectedAnswers(prev => {
      const current = prev[questionId] || [];
      
      if (answer.exclusive) {
        return { ...prev, [questionId]: [answerId] };
      } else {
        const exclusiveAnswerIds = question.answers.filter(a => a.exclusive).map(a => a.id);
        const filteredCurrent = current.filter(id => !exclusiveAnswerIds.includes(id));
        
        if (filteredCurrent.includes(answerId)) {
          return { ...prev, [questionId]: filteredCurrent.filter(id => id !== answerId) };
        } else {
          return { ...prev, [questionId]: [...filteredCurrent, answerId] };
        }
      }
    });
  };

  const generatePDFReport = () => {
    // Create a text-based report that can be printed/saved as PDF
    const reportDate = new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : lang === 'fr' ? 'fr-FR' : 'en-US');
    
    let reportContent = `
MIXVOIP CYBER ASSISTANCE
Fit4Cybersecurity Assessment Report
====================================
Date: ${reportDate}
Company: ${contactForm.company || 'Not specified'}

OVERALL SCORE
-------------
Score: ${scorePercentage}%
Points: ${score} / ${TOTAL_MAX_POINTS}
Status: ${isEligible ? 'ELIGIBLE for Cyber Assistance' : 'Below 65% threshold - Improvement needed'}

DETAILED RESULTS BY CATEGORY
----------------------------
`;

    questions.forEach(question => {
      const answers = selectedAnswers[question.id] || [];
      let earnedPoints = 0;
      answers.forEach(answerId => {
        const answer = question.answers.find(a => a.id === answerId);
        if (answer) earnedPoints += answer.score;
      });
      const percentage = Math.round((earnedPoints / question.maxPoints) * 100);
      reportContent += `\n${question.category}: ${earnedPoints}/${question.maxPoints} points (${percentage}%)`;
    });

    if (gaps.length > 0) {
      reportContent += `\n\nIDENTIFIED GAPS & RECOMMENDATIONS\n---------------------------------`;
      gaps.forEach(gap => {
        reportContent += `\n\n${gap.question.category} (${gap.earnedPoints}/${gap.question.maxPoints} points)`;
        reportContent += `\nWeakness: ${gap.mapping.weakness[lang]}`;
        reportContent += `\nRecommended solutions:`;
        gap.mapping.products.forEach(product => {
          reportContent += `\n  - ${product.name}: ${product.url}`;
        });
      });
    }

    reportContent += `\n\n====================================
Generated by Mixvoip Cyber Assistance
https://www.mixvoip.com/cyber-assistance/
Contact: pberg@mixvoip.com
`;

    // Create and download the report
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Fit4Cybersecurity_Report_${reportDate.replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    }
  };

  const handleSubmitContact = async (e: React.FormEvent, isFastTrack: boolean = false) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`${isFastTrack ? '[FAST-TRACK] ' : ''}Cyber Assistance Anfrage - ${contactForm.company}`);
    
    let body = '';
    
    if (isFastTrack) {
      body = encodeURIComponent(
`FAST-TRACK ANFRAGE: Cyber Assistance
=====================================

Kontaktdaten:
- Name: ${contactForm.name}
- Firma: ${contactForm.company}
- E-Mail: ${contactForm.email}
- Telefon: ${contactForm.phone || 'Nicht angegeben'}
- Bereits Mixvoip-Kunde: ${contactForm.isMixvoipCustomer ? 'Ja' : 'Nein'}

Status:
- Kunde bestätigt Score ≥65%
- Fit4Cybersecurity Report: ${uploadedFile ? 'Wird separat gesendet' : 'Nicht hochgeladen'}

Nachricht:
${contactForm.message || '(Keine zusätzliche Nachricht)'}

=====================================
HINWEIS: Bitte Report-PDF vom Kunden anfordern falls nicht beigefügt.
Gesendet von: Mixvoip Cyber Assistance Website`
      );
    } else {
      const gapsList = gaps.map(g => `- ${g.question.category}: ${g.earnedPoints}/${g.question.maxPoints} Punkte`).join('\n');
      const productsList = gaps.flatMap(g => g.mapping.products.map(p => `- ${p.name}: ${p.url}`)).join('\n');
      
      body = encodeURIComponent(
`NEUE ANFRAGE: Cyber Assistance Beratung
========================================

Kontaktdaten:
- Name: ${contactForm.name}
- Firma: ${contactForm.company}
- E-Mail: ${contactForm.email}
- Telefon: ${contactForm.phone || 'Nicht angegeben'}
- Bereits Mixvoip-Kunde: ${contactForm.isMixvoipCustomer ? 'Ja' : 'Nein'}

Assessment-Ergebnis:
- Score: ${scorePercentage}% (${isEligible ? 'Eligible für Cyber Assistance' : 'Unter 65% Threshold'})
- Erreichte Punkte: ${score} / ${TOTAL_MAX_POINTS}

Identifizierte Lücken:
${gapsList || '(Keine signifikanten Lücken)'}

Empfohlene Produkte:
${productsList || '(Keine spezifischen Empfehlungen)'}

Nachricht:
${contactForm.message || '(Keine zusätzliche Nachricht)'}

========================================
Gesendet von: Mixvoip Cyber Assistance Website`
      );
    }

    const mailtoLink = `mailto:pberg@mixvoip.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  // Intro Screen with Fast-Track Options
  if (currentStep === 'intro') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#00B050]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-[#00B050]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#00B050] mb-2">13</div>
            <div className="text-gray-600">{t.questions}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#00B050] mb-2">5 min</div>
            <div className="text-gray-600">{t.duration}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#00B050] mb-2">65%</div>
            <div className="text-gray-600">{t.minScore}</div>
          </div>
        </div>

        {/* Main CTA - Start Assessment */}
        <Button 
          onClick={() => setCurrentStep('assessment')}
          className="w-full bg-[#00B050] hover:bg-[#00873D] text-white py-4 text-lg mb-4"
        >
          {t.startAssessment}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>

        {/* Secondary Options */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button 
            variant="outline"
            onClick={() => setCurrentStep('fasttrack')}
            className="w-full border-[#00B050] text-[#00B050] hover:bg-[#00B050]/5 py-3"
          >
            <Zap className="mr-2 w-4 h-4" />
            {t.alreadyHaveScore}
          </Button>
          <Button 
            variant="outline"
            onClick={() => setCurrentStep('pricing')}
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
          >
            <Euro className="mr-2 w-4 h-4" />
            {t.viewPricing}
          </Button>
        </div>
      </div>
    );
  }

  // Pricing Screen
  if (currentStep === 'pricing') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.pricingTitle}</h2>
          <p className="text-gray-600">{t.pricingSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Basic */}
          <div className="border-2 border-gray-200 rounded-xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.basic}</h3>
              <div className="text-3xl font-bold text-[#00B050]">{t.free}*</div>
              <p className="text-sm text-gray-500">{t.forMixvoipCustomers}</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00B050] mr-2 flex-shrink-0" />
                {t.coverage}: €50,000
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00B050] mr-2 flex-shrink-0" />
                {t.noDeductible}*
              </li>
            </ul>
          </div>

          {/* Pro */}
          <div className="border-2 border-[#00B050] rounded-xl p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#00B050] text-white px-4 py-1 rounded-full text-sm font-medium">
              Popular
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.pro}</h3>
              <div className="text-3xl font-bold text-[#00B050]">€2</div>
              <p className="text-sm text-gray-500">{t.perUserMonth}</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00B050] mr-2 flex-shrink-0" />
                {t.coverage}: €150,000
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00B050] mr-2 flex-shrink-0" />
                {t.noDeductible}*
              </li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="border-2 border-gray-200 rounded-xl p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.enterprise}</h3>
              <div className="text-3xl font-bold text-[#00B050]">{t.custom}</div>
              <p className="text-sm text-gray-500">{t.contactSales}</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00B050] mr-2 flex-shrink-0" />
                {t.coverage}: €250,000+
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00B050] mr-2 flex-shrink-0" />
                {t.noDeductible}*
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mb-6">
          * {lang === 'de' ? 'Keine Selbstbeteiligung bei Online-Abschluss' : lang === 'fr' ? 'Sans franchise pour souscription en ligne' : 'No deductible for online subscription'}
        </p>

        <div className="flex gap-4">
          <Button 
            variant="outline"
            onClick={() => setCurrentStep('intro')}
            className="flex-1"
          >
            <ChevronLeft className="mr-2 w-4 h-4" />
            {t.backToAssessment}
          </Button>
          <Button 
            onClick={() => setCurrentStep('fasttrack')}
            className="flex-1 bg-[#00B050] hover:bg-[#00873D] text-white"
          >
            {t.requestConsultation}
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Fast-Track Screen
  if (currentStep === 'fasttrack') {
    if (submitSuccess) {
      return (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#00B050]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#00B050]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.successTitle}</h2>
          <p className="text-gray-600 mb-8">{t.successMessage}</p>
          <Button 
            onClick={() => {
              setCurrentStep('intro');
              setSubmitSuccess(false);
              setContactForm({ name: '', email: '', phone: '', company: '', isMixvoipCustomer: false, message: '' });
              setUploadedFile(null);
            }}
            className="bg-[#00B050] hover:bg-[#00873D] text-white"
          >
            {t.backToStart}
          </Button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#00B050]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-[#00B050]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.fastTrackTitle}</h2>
          <p className="text-gray-600">{t.fastTrackSubtitle}</p>
        </div>

        <form onSubmit={(e) => handleSubmitContact(e, true)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.name} *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.company} *</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={contactForm.company}
                  onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.email} *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.uploadReport}</label>
            <p className="text-xs text-gray-500 mb-2">{t.uploadRequired}</p>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#00B050] transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              {uploadedFile ? (
                <div className="flex items-center justify-center gap-2 text-[#00B050]">
                  <FileText className="w-6 h-6" />
                  <span>{uploadedFile.name}</span>
                </div>
              ) : (
                <div className="text-gray-500">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <span>Click to upload PDF</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isMixvoipCustomer"
              checked={contactForm.isMixvoipCustomer}
              onChange={(e) => setContactForm(prev => ({ ...prev, isMixvoipCustomer: e.target.checked }))}
              className="w-4 h-4 text-[#00B050] border-gray-300 rounded focus:ring-[#00B050]"
            />
            <label htmlFor="isMixvoipCustomer" className="ml-2 text-sm text-gray-700">
              {t.existingCustomer}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.message}</label>
            <textarea
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <Button 
              type="button"
              variant="outline"
              onClick={() => setCurrentStep('intro')}
              className="flex-1"
            >
              <ChevronLeft className="mr-2 w-4 h-4" />
              {t.back}
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#00B050] hover:bg-[#00873D] text-white"
            >
              {isSubmitting ? t.submitting : t.submit}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // Assessment Questions
  if (currentStep === 'assessment') {
    const question = questions[currentQuestion];
    const currentAnswers = selectedAnswers[question.id] || [];

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{t.question} {currentQuestion + 1} / {questions.length}</span>
            <span>{question.category}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{question.label[lang]}</h3>
          <p className="text-sm text-gray-500">{t.selectAll}</p>
        </div>

        <div className="space-y-3 mb-8">
          {question.answers.map((answer) => {
            const isSelected = currentAnswers.includes(answer.id);
            const isExclusive = answer.exclusive;
            
            return (
              <button
                key={answer.id}
                onClick={() => handleAnswerSelect(question.id, answer.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-[#00B050] bg-[#00B050]/5'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                    isSelected ? 'border-[#00B050] bg-[#00B050]' : 'border-gray-300'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-900">{answer.label[lang]}</span>
                    {isExclusive && (
                      <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                        {t.exclusive}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(prev => prev - 1);
              } else {
                setCurrentStep('intro');
              }
            }}
            className="flex-1"
          >
            <ChevronLeft className="mr-2 w-4 h-4" />
            {t.back}
          </Button>
          <Button
            onClick={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
              } else {
                setCurrentStep('results');
              }
            }}
            className="flex-1 bg-[#00B050] hover:bg-[#00873D] text-white"
          >
            {currentQuestion < questions.length - 1 ? t.next : t.viewResults}
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Results Screen
  if (currentStep === 'results') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
        {/* Score Display */}
        <div className="text-center mb-8">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isEligible ? 'bg-[#00B050]/10' : 'bg-amber-100'
          }`}>
            <div className="text-center">
              <div className={`text-4xl font-bold ${isEligible ? 'text-[#00B050]' : 'text-amber-600'}`}>
                {scorePercentage}%
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.yourScore}</h2>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            isEligible ? 'bg-[#00B050]/10 text-[#00B050]' : 'bg-amber-100 text-amber-700'
          }`}>
            {isEligible ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            {isEligible ? t.eligible : t.notEligible}
          </div>
          <p className="text-gray-500 mt-2">{score} / {TOTAL_MAX_POINTS} {t.points}</p>
        </div>

        {/* Gaps and Recommendations */}
        {gaps.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t.identifiedGaps}</h3>
            <div className="space-y-4">
              {gaps.map((gap, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{gap.question.category}</h4>
                      <p className="text-sm text-gray-600">{gap.mapping.weakness[lang]}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-amber-600 font-semibold">{gap.earnedPoints}/{gap.question.maxPoints}</span>
                      <p className="text-xs text-gray-500">{t.points}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {gap.mapping.products.map((product, pIndex) => (
                      <a
                        key={pIndex}
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-[#00B050]/5 rounded-lg hover:bg-[#00B050]/10 transition-colors"
                      >
                        <div>
                          <span className="font-medium text-[#00B050]">{product.name}</span>
                          <p className="text-sm text-gray-600">{product.description[lang]}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={generatePDFReport}
            className="flex-1"
          >
            <Download className="mr-2 w-4 h-4" />
            {t.downloadReport}
          </Button>
          <Button
            onClick={() => setCurrentStep('contact')}
            className="flex-1 bg-[#00B050] hover:bg-[#00873D] text-white"
          >
            {t.requestConsultation}
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Contact Form (after assessment)
  if (currentStep === 'contact') {
    if (submitSuccess) {
      return (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#00B050]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#00B050]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.successTitle}</h2>
          <p className="text-gray-600 mb-8">{t.successMessage}</p>
          <Button 
            onClick={() => {
              setCurrentStep('intro');
              setSubmitSuccess(false);
              setSelectedAnswers({});
              setCurrentQuestion(0);
              setContactForm({ name: '', email: '', phone: '', company: '', isMixvoipCustomer: false, message: '' });
            }}
            className="bg-[#00B050] hover:bg-[#00873D] text-white"
          >
            {t.backToStart}
          </Button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.contactForm}</h2>
          <p className="text-gray-600">Score: {scorePercentage}% ({score}/{TOTAL_MAX_POINTS})</p>
        </div>

        <form onSubmit={(e) => handleSubmitContact(e, false)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.name} *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.company} *</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={contactForm.company}
                  onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.email} *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isMixvoipCustomerContact"
              checked={contactForm.isMixvoipCustomer}
              onChange={(e) => setContactForm(prev => ({ ...prev, isMixvoipCustomer: e.target.checked }))}
              className="w-4 h-4 text-[#00B050] border-gray-300 rounded focus:ring-[#00B050]"
            />
            <label htmlFor="isMixvoipCustomerContact" className="ml-2 text-sm text-gray-700">
              {t.existingCustomer}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.message}</label>
            <textarea
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <Button 
              type="button"
              variant="outline"
              onClick={() => setCurrentStep('results')}
              className="flex-1"
            >
              <ChevronLeft className="mr-2 w-4 h-4" />
              {t.back}
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#00B050] hover:bg-[#00873D] text-white"
            >
              {isSubmitting ? t.submitting : t.submit}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return null;
}
