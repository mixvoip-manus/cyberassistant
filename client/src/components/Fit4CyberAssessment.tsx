import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { CheckCircle2, AlertTriangle, ChevronRight, ChevronLeft, ExternalLink, Send, Building2, Mail, Phone, User } from 'lucide-react';
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

export default function Fit4CyberAssessment() {
  const { language, t } = useLanguage();
  const lang = language as Language;
  
  const [currentStep, setCurrentStep] = useState<'intro' | 'assessment' | 'results' | 'contact'>('intro');
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
      
      // If earned less than 50% of max points, it's a gap
      if (earnedPoints < question.maxPoints * 0.5) {
        const mapping = productMapping.find(m => m.questionId === question.id);
        if (mapping) {
          gapList.push({ question, mapping, earnedPoints });
        }
      }
    });
    
    // Sort by impact (maxPoints - earnedPoints)
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
        // If selecting exclusive answer, clear others
        return { ...prev, [questionId]: [answerId] };
      } else {
        // If selecting non-exclusive, remove any exclusive answers
        const exclusiveAnswerIds = question.answers.filter(a => a.exclusive).map(a => a.id);
        const filteredCurrent = current.filter(id => !exclusiveAnswerIds.includes(id));
        
        if (filteredCurrent.includes(answerId)) {
          // Deselect
          return { ...prev, [questionId]: filteredCurrent.filter(id => id !== answerId) };
        } else {
          // Select
          return { ...prev, [questionId]: [...filteredCurrent, answerId] };
        }
      }
    });
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare email content for mailto link
    const subject = encodeURIComponent(`Cyber Assistance Anfrage - ${contactForm.company}`);
    
    const gapsList = gaps.map(g => `- ${g.question.category}: ${g.earnedPoints}/${g.question.maxPoints} Punkte`).join('%0A');
    const productsList = gaps.flatMap(g => g.mapping.products.map(p => `- ${p.name}`)).join('%0A');
    
    const body = encodeURIComponent(
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
${gaps.map(g => `- ${g.question.category}: ${g.earnedPoints}/${g.question.maxPoints} Punkte`).join('\n')}

Empfohlene Produkte:
${gaps.flatMap(g => g.mapping.products.map(p => `- ${p.name}: ${p.url}`)).join('\n')}

Nachricht:
${contactForm.message || '(Keine zusätzliche Nachricht)'}

========================================
Gesendet von: Mixvoip Cyber Assistance Website`
    );

    // Open mailto link
    const mailtoLink = `mailto:pberg@mixvoip.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Show success after a short delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  // Intro Screen
  if (currentStep === 'intro') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#00B050]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#00B050]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {lang === 'de' ? 'Fit4Cybersecurity Assessment' : lang === 'fr' ? 'Évaluation Fit4Cybersecurity' : 'Fit4Cybersecurity Assessment'}
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            {lang === 'de' 
              ? 'Bewerten Sie die Cybersicherheit Ihres Unternehmens in nur 5 Minuten. Basierend auf dem offiziellen NC3 Luxembourg Standard.'
              : lang === 'fr'
              ? 'Évaluez la cybersécurité de votre entreprise en seulement 5 minutes. Basé sur le standard officiel NC3 Luxembourg.'
              : 'Assess your company\'s cybersecurity in just 5 minutes. Based on the official NC3 Luxembourg standard.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#00B050] mb-2">13</div>
            <div className="text-gray-600">
              {lang === 'de' ? 'Fragen' : lang === 'fr' ? 'Questions' : 'Questions'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#00B050] mb-2">5 min</div>
            <div className="text-gray-600">
              {lang === 'de' ? 'Dauer' : lang === 'fr' ? 'Durée' : 'Duration'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[#00B050] mb-2">65%</div>
            <div className="text-gray-600">
              {lang === 'de' ? 'Mindest-Score' : lang === 'fr' ? 'Score minimum' : 'Minimum Score'}
            </div>
          </div>
        </div>

        <Button 
          onClick={() => setCurrentStep('assessment')}
          className="w-full bg-[#00B050] hover:bg-[#00873D] text-white py-4 text-lg"
        >
          {lang === 'de' ? 'Assessment starten' : lang === 'fr' ? 'Commencer l\'évaluation' : 'Start Assessment'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    );
  }

  // Assessment Questions
  if (currentStep === 'assessment') {
    const question = questions[currentQuestion];
    const currentAnswers = selectedAnswers[question.id] || [];

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{lang === 'de' ? 'Frage' : lang === 'fr' ? 'Question' : 'Question'} {currentQuestion + 1} / {questions.length}</span>
            <span>{question.category}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {question.label[lang]}
          </h3>
          <p className="text-sm text-gray-500">
            {lang === 'de' 
              ? 'Wählen Sie alle zutreffenden Antworten aus'
              : lang === 'fr'
              ? 'Sélectionnez toutes les réponses applicables'
              : 'Select all applicable answers'}
          </p>
        </div>

        {/* Answers */}
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
                  <div>
                    <span className={`${isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                      {answer.label[lang]}
                    </span>
                    {isExclusive && (
                      <span className="ml-2 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        {lang === 'de' ? 'Exklusiv' : lang === 'fr' ? 'Exclusif' : 'Exclusive'}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => currentQuestion > 0 ? setCurrentQuestion(currentQuestion - 1) : setCurrentStep('intro')}
          >
            <ChevronLeft className="mr-2 w-4 h-4" />
            {lang === 'de' ? 'Zurück' : lang === 'fr' ? 'Retour' : 'Back'}
          </Button>
          
          <Button
            onClick={() => {
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
              } else {
                setCurrentStep('results');
              }
            }}
            className="bg-[#00B050] hover:bg-[#00873D]"
            disabled={currentAnswers.length === 0}
          >
            {currentQuestion < questions.length - 1 
              ? (lang === 'de' ? 'Weiter' : lang === 'fr' ? 'Suivant' : 'Next')
              : (lang === 'de' ? 'Ergebnis anzeigen' : lang === 'fr' ? 'Voir les résultats' : 'View Results')}
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Results Screen
  if (currentStep === 'results') {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isEligible ? 'bg-[#00B050]/10' : 'bg-orange-100'
            }`}>
              <div className="text-center">
                <div className={`text-4xl font-bold ${isEligible ? 'text-[#00B050]' : 'text-orange-600'}`}>
                  {scorePercentage}%
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isEligible 
                ? (lang === 'de' ? 'Herzlichen Glückwunsch!' : lang === 'fr' ? 'Félicitations!' : 'Congratulations!')
                : (lang === 'de' ? 'Verbesserungspotenzial erkannt' : lang === 'fr' ? 'Potentiel d\'amélioration identifié' : 'Improvement Potential Identified')}
            </h2>
            
            <p className="text-gray-600 max-w-lg mx-auto">
              {isEligible 
                ? (lang === 'de' 
                    ? 'Ihr Unternehmen erfüllt die Mindestanforderungen für Cyber Assistance. Kontaktieren Sie uns für ein individuelles Angebot.'
                    : lang === 'fr'
                    ? 'Votre entreprise répond aux exigences minimales pour Cyber Assistance. Contactez-nous pour une offre personnalisée.'
                    : 'Your company meets the minimum requirements for Cyber Assistance. Contact us for a personalized offer.')
                : (lang === 'de'
                    ? 'Ihr Score liegt unter 65%. Wir haben Lösungen identifiziert, die Ihnen helfen können, Ihre Cybersicherheit zu verbessern.'
                    : lang === 'fr'
                    ? 'Votre score est inférieur à 65%. Nous avons identifié des solutions qui peuvent vous aider à améliorer votre cybersécurité.'
                    : 'Your score is below 65%. We have identified solutions that can help you improve your cybersecurity.')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{score}</div>
              <div className="text-sm text-gray-600">
                {lang === 'de' ? 'Erreichte Punkte' : lang === 'fr' ? 'Points obtenus' : 'Points Earned'}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{TOTAL_MAX_POINTS}</div>
              <div className="text-sm text-gray-600">
                {lang === 'de' ? 'Maximale Punkte' : lang === 'fr' ? 'Points maximum' : 'Maximum Points'}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{gaps.length}</div>
              <div className="text-sm text-gray-600">
                {lang === 'de' ? 'Identifizierte Lücken' : lang === 'fr' ? 'Lacunes identifiées' : 'Gaps Identified'}
              </div>
            </div>
          </div>
        </div>

        {/* Gaps & Recommendations */}
        {gaps.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              {lang === 'de' ? 'Identifizierte Lücken & Empfohlene Lösungen' : lang === 'fr' ? 'Lacunes identifiées & Solutions recommandées' : 'Identified Gaps & Recommended Solutions'}
            </h3>

            <div className="space-y-6">
              {gaps.map((gap, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{gap.question.category}</h4>
                      <p className="text-sm text-gray-600">{gap.mapping.weakness[lang]}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">
                        {gap.earnedPoints}/{gap.question.maxPoints}
                      </div>
                      <div className="text-xs text-gray-500">
                        {lang === 'de' ? 'Punkte' : lang === 'fr' ? 'Points' : 'Points'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {gap.mapping.products.map((product, pIndex) => (
                      <a
                        key={pIndex}
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-[#00B050]/5 rounded-lg hover:bg-[#00B050]/10 transition-colors group"
                      >
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-[#00B050]">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {product.description[lang]}
                          </div>
                        </div>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#00B050]" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#00B050] to-[#00873D] rounded-2xl shadow-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            {lang === 'de' 
              ? 'Bereit für den nächsten Schritt?'
              : lang === 'fr'
              ? 'Prêt pour la prochaine étape?'
              : 'Ready for the next step?'}
          </h3>
          <p className="mb-6 opacity-90">
            {lang === 'de'
              ? 'Lassen Sie sich von unseren Experten beraten und erhalten Sie ein individuelles Angebot.'
              : lang === 'fr'
              ? 'Laissez nos experts vous conseiller et recevez une offre personnalisée.'
              : 'Let our experts advise you and receive a personalized offer.'}
          </p>
          <Button 
            onClick={() => setCurrentStep('contact')}
            className="bg-white text-[#00B050] hover:bg-gray-100 px-8 py-3 text-lg"
          >
            {lang === 'de' ? 'Beratung anfordern' : lang === 'fr' ? 'Demander un conseil' : 'Request Consultation'}
            <Send className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  // Contact Form
  if (currentStep === 'contact') {
    if (submitSuccess) {
      return (
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-[#00B050]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#00B050]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {lang === 'de' ? 'Anfrage erfolgreich gesendet!' : lang === 'fr' ? 'Demande envoyée avec succès!' : 'Request sent successfully!'}
          </h2>
          <p className="text-gray-600 mb-8">
            {lang === 'de'
              ? 'Unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden.'
              : lang === 'fr'
              ? 'Notre équipe vous contactera dans les 24 heures.'
              : 'Our team will contact you within 24 hours.'}
          </p>
          <Button onClick={() => window.location.reload()} variant="outline">
            {lang === 'de' ? 'Neues Assessment starten' : lang === 'fr' ? 'Commencer une nouvelle évaluation' : 'Start New Assessment'}
          </Button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {lang === 'de' ? 'Beratung anfordern' : lang === 'fr' ? 'Demander un conseil' : 'Request Consultation'}
          </h2>
          <p className="text-gray-600">
            {lang === 'de'
              ? 'Füllen Sie das Formular aus und unser Team wird sich bei Ihnen melden.'
              : lang === 'fr'
              ? 'Remplissez le formulaire et notre équipe vous contactera.'
              : 'Fill out the form and our team will contact you.'}
          </p>
        </div>

        <form onSubmit={handleSubmitContact} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                {lang === 'de' ? 'Name' : lang === 'fr' ? 'Nom' : 'Name'} *
              </label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4 inline mr-1" />
                {lang === 'de' ? 'Firma' : lang === 'fr' ? 'Entreprise' : 'Company'} *
              </label>
              <input
                type="text"
                required
                value={contactForm.company}
                onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                {lang === 'de' ? 'E-Mail' : lang === 'fr' ? 'E-mail' : 'Email'} *
              </label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                {lang === 'de' ? 'Telefon' : lang === 'fr' ? 'Téléphone' : 'Phone'}
              </label>
              <input
                type="tel"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="mixvoipCustomer"
              checked={contactForm.isMixvoipCustomer}
              onChange={(e) => setContactForm({ ...contactForm, isMixvoipCustomer: e.target.checked })}
              className="w-5 h-5 text-[#00B050] border-gray-300 rounded focus:ring-[#00B050]"
            />
            <label htmlFor="mixvoipCustomer" className="text-gray-700">
              {lang === 'de' ? 'Ich bin bereits Mixvoip-Kunde' : lang === 'fr' ? 'Je suis déjà client Mixvoip' : 'I am already a Mixvoip customer'}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'de' ? 'Nachricht (optional)' : lang === 'fr' ? 'Message (optionnel)' : 'Message (optional)'}
            </label>
            <textarea
              rows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B050] focus:border-transparent"
            />
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">
              {lang === 'de' ? 'Zusammenfassung Ihres Assessments' : lang === 'fr' ? 'Résumé de votre évaluation' : 'Your Assessment Summary'}
            </h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Score: <span className="font-semibold">{scorePercentage}%</span></p>
              <p>{lang === 'de' ? 'Identifizierte Lücken' : lang === 'fr' ? 'Lacunes identifiées' : 'Identified Gaps'}: <span className="font-semibold">{gaps.length}</span></p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep('results')}
              className="flex-1"
            >
              <ChevronLeft className="mr-2 w-4 h-4" />
              {lang === 'de' ? 'Zurück' : lang === 'fr' ? 'Retour' : 'Back'}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#00B050] hover:bg-[#00873D]"
            >
              {isSubmitting 
                ? (lang === 'de' ? 'Wird gesendet...' : lang === 'fr' ? 'Envoi en cours...' : 'Sending...')
                : (lang === 'de' ? 'Anfrage senden' : lang === 'fr' ? 'Envoyer la demande' : 'Send Request')}
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return null;
}
