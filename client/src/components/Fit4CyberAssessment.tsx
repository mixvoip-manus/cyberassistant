import React, { useState, useMemo, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { CheckCircle2, AlertTriangle, ChevronRight, ChevronLeft, ExternalLink, Send, Building2, Mail, Phone, User, Download, Upload, FileText, Euro, Zap, Shield } from 'lucide-react';
import assessmentData from '../data/assessment.json';
import productMappingData from '../data/productMapping.json';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    basicFeature1: 'Best-effort response',
    basicFeature2: 'Core user recovery',
    basicFeature3: 'Business hours support',
    basicNote: '*For Mixvoip customers with Fit4Cyber score ≥60%',
    proFeature1: '24/7, 1h guaranteed response',
    proFeature2: 'Full system recovery',
    proFeature3: 'Round-the-clock support',
    proFeature4: 'Insurance selectable',
    enterpriseFeature1: 'Dedicated team',
    enterpriseFeature2: 'Fully custom solution',
    enterpriseFeature3: 'Priority support',
    enterpriseFeature4: 'Custom insurance limits',
    selectPackage: 'Select',
    step1Title: 'Step 1: Choose Your Package',
    step2Title: 'Step 2: Choose Insurance Coverage',
    insuranceCoverage: 'Insurance Coverage',
    coverage50k: '€50,000',
    coverage150k: '€150,000',
    coverageCustom: 'Over €150,000',
    price50k: '€2',
    price150k: '€6',
    priceCustom: 'Custom',
    continueToInsurance: 'Continue',
    backToPackages: 'Back to Packages',
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
    basicFeature1: 'Réponse best-effort',
    basicFeature2: 'Récupération utilisateur principal',
    basicFeature3: 'Support heures ouvrables',
    basicNote: '*Pour les clients Mixvoip avec score Fit4Cyber ≥60%',
    proFeature1: '24/7, réponse garantie 1h',
    proFeature2: 'Récupération système complète',
    proFeature3: 'Support 24h/24',
    proFeature4: 'Assurance au choix',
    enterpriseFeature1: 'Équipe dédiée',
    enterpriseFeature2: 'Solution personnalisée',
    enterpriseFeature3: 'Support prioritaire',
    enterpriseFeature4: 'Limites d\'assurance personnalisées',
    selectPackage: 'Sélectionner',
    step1Title: 'Étape 1: Choisissez votre forfait',
    step2Title: 'Étape 2: Choisissez la couverture d\'assurance',
    insuranceCoverage: 'Couverture d\'assurance',
    coverage50k: '50 000 €',
    coverage150k: '150 000 €',
    coverageCustom: 'Plus de 150 000 €',
    price50k: '2 €',
    price150k: '6 €',
    priceCustom: 'Sur mesure',
    continueToInsurance: 'Continuer',
    backToPackages: 'Retour aux forfaits',
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
    basicFeature1: 'Best-Effort-Reaktion',
    basicFeature2: 'Core-User-Wiederherstellung',
    basicFeature3: 'Support zu Geschäftszeiten',
    basicNote: '*Für Mixvoip-Kunden mit Fit4Cyber-Score ≥60%',
    proFeature1: '24/7, 1h garantierte Reaktion',
    proFeature2: 'Vollständige Systemwiederherstellung',
    proFeature3: 'Rund-um-die-Uhr-Support',
    proFeature4: 'Versicherung wählbar',
    enterpriseFeature1: 'Dediziertes Team',
    enterpriseFeature2: 'Vollständig individuelle Lösung',
    enterpriseFeature3: 'Prioritäts-Support',
    enterpriseFeature4: 'Individuelle Versicherungslimits',
    selectPackage: 'Auswählen',
    step1Title: 'Schritt 1: Wählen Sie Ihr Paket',
    step2Title: 'Schritt 2: Wählen Sie die Versicherungsdeckung',
    insuranceCoverage: 'Versicherungsdeckung',
    coverage50k: '50.000 €',
    coverage150k: '150.000 €',
    coverageCustom: 'Über 150.000 €',
    price50k: '2 €',
    price150k: '6 €',
    priceCustom: 'Individuell',
    continueToInsurance: 'Weiter',
    backToPackages: 'Zurück zu Paketen',
  }
};

export default function Fit4CyberAssessment() {
  const { language } = useLanguage();
  const lang = language as Language;
  const t = translations[lang];
  
  const [currentStep, setCurrentStep] = useState<'intro' | 'assessment' | 'results' | 'contact' | 'pricing' | 'insurance' | 'fasttrack'>('intro');
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'pro' | 'enterprise' | null>(null);
  const [selectedCoverage, setSelectedCoverage] = useState<'50k' | '150k' | 'custom' | null>(null);
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
        if (current.includes(answerId)) {
          return { ...prev, [questionId]: [] };
        } else {
          return { ...prev, [questionId]: [answerId] };
        }
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
    const reportDate = new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : lang === 'fr' ? 'fr-FR' : 'en-US');
    
    // Create PDF document
    const doc = new jsPDF();
    
    // Colors
    const greenColor: [number, number, number] = [0, 176, 80];
    const grayColor: [number, number, number] = [100, 100, 100];
    const darkColor: [number, number, number] = [30, 30, 30];
    
    // Header
    doc.setFillColor(greenColor[0], greenColor[1], greenColor[2]);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('MIXVOIP', 20, 20);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Cyber Assistance', 20, 30);
    
    // Title
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Fit4Cybersecurity Assessment Report', 20, 55);
    
    // Date and Company
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text(`Date: ${reportDate}`, 20, 65);
    doc.text(`Company: ${contactForm.company || 'Not specified'}`, 20, 72);
    
    // Score Box
    const scoreBoxY = 85;
    doc.setFillColor(isEligible ? 230 : 255, isEligible ? 255 : 245, isEligible ? 230 : 230);
    doc.roundedRect(20, scoreBoxY, 170, 35, 3, 3, 'F');
    
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(isEligible ? greenColor[0] : 200, isEligible ? greenColor[1] : 150, isEligible ? greenColor[2] : 0);
    doc.text(`${scorePercentage}%`, 40, scoreBoxY + 22);
    
    doc.setFontSize(12);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(`${score} / ${TOTAL_MAX_POINTS} Points`, 90, scoreBoxY + 15);
    doc.setFontSize(10);
    doc.setTextColor(isEligible ? greenColor[0] : 200, isEligible ? greenColor[1] : 150, isEligible ? greenColor[2] : 0);
    doc.text(isEligible ? 'ELIGIBLE for Cyber Assistance' : 'Below 65% threshold - Improvement needed', 90, scoreBoxY + 25);
    
    // Results Table
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text('Detailed Results by Category', 20, 135);
    
    const tableData = questions.map(question => {
      const answers = selectedAnswers[question.id] || [];
      let earnedPoints = 0;
      answers.forEach(answerId => {
        const answer = question.answers.find(a => a.id === answerId);
        if (answer) earnedPoints += answer.score;
      });
      const percentage = Math.round((earnedPoints / question.maxPoints) * 100);
      return [question.category, `${earnedPoints}/${question.maxPoints}`, `${percentage}%`];
    });
    
    autoTable(doc, {
      startY: 140,
      head: [['Category', 'Points', 'Score']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: greenColor, textColor: [255, 255, 255] },
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 35, halign: 'center' },
        2: { cellWidth: 35, halign: 'center' }
      }
    });
    
    // Gaps and Recommendations (new page if needed)
    if (gaps.length > 0) {
      doc.addPage();
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.text('Identified Gaps & Recommendations', 20, 20);
      
      let yPos = 35;
      
      gaps.forEach((gap, index) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        // Gap header
        doc.setFillColor(255, 245, 230);
        doc.roundedRect(20, yPos - 5, 170, 12, 2, 2, 'F');
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(200, 150, 0);
        doc.text(`${gap.question.category} (${gap.earnedPoints}/${gap.question.maxPoints} points)`, 25, yPos + 3);
        yPos += 15;
        
        // Weakness
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        const weaknessLines = doc.splitTextToSize(`Weakness: ${gap.mapping.weakness[lang]}`, 160);
        doc.text(weaknessLines, 25, yPos);
        yPos += weaknessLines.length * 5 + 5;
        
        // Recommended solutions
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(greenColor[0], greenColor[1], greenColor[2]);
        doc.text('Recommended Solutions:', 25, yPos);
        yPos += 6;
        
        gap.mapping.products.forEach(product => {
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
          doc.text(`• ${product.name}`, 30, yPos);
          doc.setTextColor(0, 0, 255);
          doc.textWithLink(product.url, 30, yPos + 4, { url: product.url });
          yPos += 12;
        });
        
        yPos += 8;
      });
    }
    
    // Footer on last page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      doc.text('Generated by Mixvoip Cyber Assistance | www.mixvoip.com | pberg@mixvoip.com', 105, 290, { align: 'center' });
      doc.text(`Page ${i} of ${pageCount}`, 190, 290);
    }
    
    // Save PDF
    doc.save(`Fit4Cybersecurity_Report_${reportDate.replace(/\//g, '-')}.pdf`);
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
      <section id="assessment" className="section-padding bg-slate-50">
        <div className="container">
          <div id="calculator" className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
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
                onClick={() => setCurrentStep('pricing')}
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
        </div>
      </section>
    );
  }

  // Pricing Screen - Step 1: Package Selection
  if (currentStep === 'pricing') {
    const handlePackageSelect = (pkg: 'basic' | 'pro' | 'enterprise') => {
      setSelectedPackage(pkg);
      if (pkg === 'enterprise') {
        setSelectedCoverage('custom');
        setCurrentStep('fasttrack');
      } else {
        setCurrentStep('insurance');
      }
    };

    return (
      <section id="pricing" className="section-padding bg-slate-50">
        <div className="container">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.pricingTitle}</h2>
              <p className="text-gray-600 mb-4">{t.pricingSubtitle}</p>
              <div className="inline-block bg-[#00B050]/10 text-[#00B050] px-4 py-2 rounded-full text-sm font-medium">
                {t.step1Title}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Basic */}
              <div className={`border rounded-xl p-6 flex flex-col cursor-pointer transition-all hover:shadow-lg ${selectedPackage === 'basic' ? 'border-2 border-[#00B050] bg-[#00B050]/5' : 'border-gray-200'}`}
                   onClick={() => handlePackageSelect('basic')}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.basic}</h3>
                <div className="text-3xl font-bold text-[#00B050] mb-1">{t.free}*</div>
                <p className="text-sm text-gray-500 mb-4">{t.forMixvoipCustomers}</p>
                <div className="space-y-2 text-sm flex-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                    {t.basicFeature1}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                    {t.basicFeature2}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                    {t.basicFeature3}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">{t.basicNote}</p>
                <Button 
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); handlePackageSelect('basic'); }}
                  className="w-full mt-4 border-[#00B050] text-[#00B050] hover:bg-[#00B050]/5"
                >
                  {t.selectPackage}
                </Button>
              </div>

              {/* Pro */}
              <div className={`border rounded-xl p-6 relative flex flex-col cursor-pointer transition-all hover:shadow-lg ${selectedPackage === 'pro' ? 'border-2 border-[#00B050] bg-[#00B050]/5' : 'border-2 border-[#00B050]'}`}
                   onClick={() => handlePackageSelect('pro')}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#00B050] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.pro}</h3>
                <div className="text-3xl font-bold text-[#00B050] mb-1">{t.price50k}</div>
                <p className="text-sm text-gray-500 mb-4">{t.perUserMonth}</p>
                <div className="space-y-2 text-sm flex-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                    {t.proFeature1}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                    {t.proFeature2}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                    {t.proFeature3}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                    {t.proFeature4}
                  </div>
                </div>
                <Button 
                  onClick={(e) => { e.stopPropagation(); handlePackageSelect('pro'); }}
                  className="w-full mt-4 bg-[#00B050] hover:bg-[#00873D] text-white"
                >
                  {t.selectPackage}
                </Button>
              </div>

              {/* Enterprise */}
              <div className={`border rounded-xl p-6 flex flex-col cursor-pointer transition-all hover:shadow-lg ${selectedPackage === 'enterprise' ? 'border-2 border-[#00B050] bg-[#00B050]/5' : 'border-gray-200'}`}
                   onClick={() => handlePackageSelect('enterprise')}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.enterprise}</h3>
                <div className="text-3xl font-bold text-[#00B050] mb-1">{t.custom}</div>
                <p className="text-sm text-gray-500 mb-4">{t.contactSales}</p>
                <div className="space-y-2 text-sm flex-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                    {t.enterpriseFeature1}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                    {t.enterpriseFeature2}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                    {t.enterpriseFeature3}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#00B050] flex-shrink-0" />
                    {t.enterpriseFeature4}
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); handlePackageSelect('enterprise'); }}
                  className="w-full mt-4 border-[#00B050] text-[#00B050] hover:bg-[#00B050]/5"
                >
                  {t.selectPackage}
                </Button>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mb-6">* {t.noDeductible} bei Online-Abschluss</p>

            <div className="flex justify-center">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep('intro')}
              >
                <ChevronLeft className="mr-2 w-4 h-4" />
                {t.backToAssessment}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Insurance Coverage Screen - Step 2
  if (currentStep === 'insurance') {
    const handleCoverageSelect = (coverage: '50k' | '150k' | 'custom') => {
      setSelectedCoverage(coverage);
      setCurrentStep('fasttrack');
    };

    return (
      <section id="insurance" className="section-padding bg-slate-50">
        <div className="container">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.insuranceCoverage}</h2>
              <p className="text-gray-600 mb-4">
                {selectedPackage === 'basic' ? t.basic : t.pro} - {t.step2Title}
              </p>
              <div className="inline-block bg-[#00B050]/10 text-[#00B050] px-4 py-2 rounded-full text-sm font-medium">
                {t.step2Title}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* €50,000 Coverage */}
              <div className={`border rounded-xl p-6 flex flex-col cursor-pointer transition-all hover:shadow-lg ${selectedCoverage === '50k' ? 'border-2 border-[#00B050] bg-[#00B050]/5' : 'border-gray-200'}`}
                   onClick={() => handleCoverageSelect('50k')}>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-[#00B050] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.coverage50k}</h3>
                  <div className="text-3xl font-bold text-[#00B050] mb-1">{t.price50k}</div>
                  <p className="text-sm text-gray-500 mb-4">{t.perUserMonth}</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); handleCoverageSelect('50k'); }}
                  className="w-full mt-auto border-[#00B050] text-[#00B050] hover:bg-[#00B050]/5"
                >
                  {t.selectPackage}
                </Button>
              </div>

              {/* €150,000 Coverage */}
              <div className={`border rounded-xl p-6 flex flex-col cursor-pointer transition-all hover:shadow-lg ${selectedCoverage === '150k' ? 'border-2 border-[#00B050] bg-[#00B050]/5' : 'border-2 border-[#00B050]'}`}
                   onClick={() => handleCoverageSelect('150k')}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#00B050] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-[#00B050] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.coverage150k}</h3>
                  <div className="text-3xl font-bold text-[#00B050] mb-1">{t.price150k}</div>
                  <p className="text-sm text-gray-500 mb-4">{t.perUserMonth}</p>
                </div>
                <Button 
                  onClick={(e) => { e.stopPropagation(); handleCoverageSelect('150k'); }}
                  className="w-full mt-auto bg-[#00B050] hover:bg-[#00873D] text-white"
                >
                  {t.selectPackage}
                </Button>
              </div>

              {/* Custom Coverage */}
              <div className={`border rounded-xl p-6 flex flex-col cursor-pointer transition-all hover:shadow-lg ${selectedCoverage === 'custom' ? 'border-2 border-[#00B050] bg-[#00B050]/5' : 'border-gray-200'}`}
                   onClick={() => handleCoverageSelect('custom')}>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-[#00B050] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.coverageCustom}</h3>
                  <div className="text-3xl font-bold text-[#00B050] mb-1">{t.priceCustom}</div>
                  <p className="text-sm text-gray-500 mb-4">{t.contactSales}</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); handleCoverageSelect('custom'); }}
                  className="w-full mt-auto border-[#00B050] text-[#00B050] hover:bg-[#00B050]/5"
                >
                  {t.selectPackage}
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep('pricing')}
              >
                <ChevronLeft className="mr-2 w-4 h-4" />
                {t.backToPackages}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fast-Track Form
  if (currentStep === 'fasttrack') {
    if (submitSuccess) {
      return (
        <section id="assessment" className="section-padding bg-slate-50">
          <div className="container">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 bg-[#00B050]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#00B050]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.successTitle}</h2>
              <p className="text-gray-600 mb-8">{t.successMessage}</p>
              <Button 
                onClick={() => {
                  setSubmitSuccess(false);
                  setCurrentStep('intro');
                  setContactForm({ name: '', email: '', phone: '', company: '', isMixvoipCustomer: false, message: '' });
                  setUploadedFile(null);
                }}
                className="bg-[#00B050] hover:bg-[#00873D] text-white"
              >
                {t.backToStart}
              </Button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section id="assessment" className="section-padding bg-slate-50">
        <div className="container">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.name} *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.company} *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.email} *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
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

              {/* PDF Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.uploadReport}
                  <span className="text-gray-500 font-normal ml-2">({t.uploadRequired})</span>
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#00B050] transition-colors"
                >
                  {uploadedFile ? (
                    <div className="flex items-center justify-center gap-2 text-[#00B050]">
                      <FileText className="w-5 h-5" />
                      <span>{uploadedFile.name}</span>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <p>Click to upload PDF</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isMixvoipCustomer"
                  checked={contactForm.isMixvoipCustomer}
                  onChange={(e) => setContactForm(prev => ({ ...prev, isMixvoipCustomer: e.target.checked }))}
                  className="w-4 h-4 text-[#00B050] border-gray-300 rounded focus:ring-[#00B050]"
                />
                <label htmlFor="isMixvoipCustomer" className="text-sm text-gray-700">{t.existingCustomer}</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.message}</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
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
        </div>
      </section>
    );
  }

  // Assessment Questions
  if (currentStep === 'assessment') {
    const question = questions[currentQuestion];
    const currentAnswers = selectedAnswers[question.id] || [];

    return (
      <section id="assessment" className="section-padding bg-slate-50">
        <div className="container">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{t.question} {currentQuestion + 1} / {questions.length}</span>
                <span className="text-sm font-medium text-[#00B050]">{question.category}</span>
              </div>
              <Progress value={progressPercentage} className="h-2 mb-6" />
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{question.label[lang]}</h3>
              <p className="text-sm text-gray-500">{t.selectAll}</p>
            </div>

            <div className="space-y-3 mb-8">
              {question.answers.map(answer => {
                const isSelected = currentAnswers.includes(answer.id);
                const isExclusive = answer.exclusive;
                
                return (
                  <button
                    key={answer.id}
                    onClick={() => handleAnswerSelect(question.id, answer.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? 'border-[#00B050] bg-[#00B050]/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#00B050] bg-[#00B050]' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className="flex-1">{answer.label[lang]}</span>
                      {isExclusive && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">{t.exclusive}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : setCurrentStep('intro')}
                className="flex-1"
              >
                <ChevronLeft className="mr-2 w-4 h-4" />
                {t.back}
              </Button>
              <Button
                onClick={() => {
                  if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
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
        </div>
      </section>
    );
  }

  // Results Screen
  if (currentStep === 'results') {
    return (
      <section id="assessment" className="section-padding bg-slate-50">
        <div className="container">
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
        </div>
      </section>
    );
  }

  // Contact Form (after assessment)
  if (currentStep === 'contact') {
    if (submitSuccess) {
      return (
        <section id="assessment" className="section-padding bg-slate-50">
          <div className="container">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 bg-[#00B050]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#00B050]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.successTitle}</h2>
              <p className="text-gray-600 mb-8">{t.successMessage}</p>
              <Button 
                onClick={() => {
                  setSubmitSuccess(false);
                  setCurrentStep('intro');
                  setSelectedAnswers({});
                  setCurrentQuestion(0);
                  setContactForm({ name: '', email: '', phone: '', company: '', isMixvoipCustomer: false, message: '' });
                }}
                className="bg-[#00B050] hover:bg-[#00873D] text-white"
              >
                {t.backToStart}
              </Button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section id="assessment" className="section-padding bg-slate-50">
        <div className="container">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.contactForm}</h2>
              <p className="text-gray-600">{t.requestConsultation}</p>
            </div>

            <form onSubmit={(e) => handleSubmitContact(e, false)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.name} *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.company} *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.email} *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
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

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isMixvoipCustomerContact"
                  checked={contactForm.isMixvoipCustomer}
                  onChange={(e) => setContactForm(prev => ({ ...prev, isMixvoipCustomer: e.target.checked }))}
                  className="w-4 h-4 text-[#00B050] border-gray-300 rounded focus:ring-[#00B050]"
                />
                <label htmlFor="isMixvoipCustomerContact" className="text-sm text-gray-700">{t.existingCustomer}</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.message}</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
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
        </div>
      </section>
    );
  }

  return null;
}
