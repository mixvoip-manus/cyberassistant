import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator, Shield, Eye, Scale, BookOpen, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

type SOCChoice = 'none' | 'tranquility' | 'rsoc';
type AssistanceChoice = 'basic' | 'essentiel' | 'etendu' | 'pro';
type AssuranceChoice = 'none' | 'essentiel' | 'etendu' | 'pro';
type AdvisoryChoice = 'none' | 'essentiel' | 'etendu' | 'pro';

const translations = {
  en: {
    title: 'Cyber Suite Calculator',
    subtitle: 'Calculate your annual cybersecurity investment and see exactly what you get.',
    usersLabel: 'Number of Users',
    usersPlaceholder: 'e.g. 50',
    assetsLabel: 'Number of Assets (Devices)',
    assetsPlaceholder: 'e.g. 30',
    assetsHint: 'Servers, firewalls, endpoints monitored by SOC',
    socLabel: 'SOC as a Service',
    socDesc: '24/7 Monitoring from Luxembourg',
    assistanceLabel: 'Mixvoip CyberAssistance',
    assistanceDesc: '24/7 Emergency Response',
    assuranceLabel: 'Mixvoip CyberAssurance',
    assuranceDesc: 'Insurance Coverage by Le Foyer',
    advisoryLabel: 'Mixvoip CyberAdvisory',
    advisoryDesc: 'Compliance & Consulting by Luxgap',
    none: 'None',
    totalYear: 'Total per Year',
    onRequest: 'On request',
    contactUs: 'Contact us for a custom quote',
    perMonth: '/ month',
    perYear: '/ year',
    yourSelection: 'Your Selected Services',
    incidentFlow: 'What Happens During a Cyberattack?',
    step: 'Step',
    action: 'Action',
    responsible: 'Responsible',
    recommendation: 'Recommendation',
    noAssuranceWarning: 'Without CyberAssurance, you pay the deployment costs yourself (800€/day).',
    assuranceRecommendation: 'We recommend adding CyberAssurance to cover your emergency deployment costs.',
    // SOC options
    socNone: 'No monitoring',
    socTranquility: 'R-SOC Tranquility',
    socTranquilityDesc: 'Ideal for SMEs without IT team',
    socTranquilityPrice: '7.20€ / user / month',
    socRsoc: 'R-SOC',
    socRsocDesc: 'For businesses with IT infrastructure',
    socRsocPrice: '10€ / user / month (packs of 5)',
    // Assistance options
    assistBasic: 'Basic (Included)',
    assistBasicDesc: 'Business hours, best effort, up to 25 users',
    assistEssentiel: 'Essentiel – 2€/user/month',
    assistEssentielDesc: '24/7, 1h response, forensics, remediation',
    assistEtendu: 'Étendu – 5€/user/month',
    assistEtenduDesc: '24/7 priority, 30 min response, on-site support',
    assistPro: 'Pro – On request',
    assistProDesc: 'Dedicated team, custom SLA',
    // Assurance options
    assurNone: 'No insurance',
    assurEssentiel: 'Essentiel – 120€/year',
    assurEssentielDesc: 'Le Foyer covers 2 days emergency deployment',
    assurEtendu: 'Étendu – 200€/year',
    assurEtenduDesc: 'Le Foyer covers 4 days emergency deployment',
    assurPro: 'Pro – On request',
    assurProDesc: 'Le Foyer Cyber Pro full contract',
    // Advisory options
    advisNone: 'No advisory',
    advisEssentiel: 'Essentiel – 500€/year',
    advisEssentielDesc: '2h consulting/year, CNPD/GDPR support',
    advisEtendu: 'Étendu – 2,000€/year',
    advisEtenduDesc: '8h consulting/year, NIS2, security policies',
    advisPro: 'Pro – On request',
    advisProDesc: '24h consulting + on-site audit',
    // Incident flow
    incident1: 'Attack detected',
    incident1resp: 'SOC (RCarre) or customer',
    incident2: 'Report to Mixvoip Helpdesk',
    incident2resp: 'Mixvoip',
    incident3: 'Triage & first response',
    incident3resp: 'Mixvoip (CyberAssistance)',
    incident4: 'Forensics & remediation',
    incident4resp: 'Mixvoip (CyberAssistance)',
    incident5: 'Who pays the bill?',
    incident5resp_assur: 'Le Foyer (CyberAssurance)',
    incident5resp_no: 'Customer (no CyberAssurance)',
    incident6: 'CNPD notification',
    incident6resp_advis: 'Luxgap (CyberAdvisory)',
    incident6resp_assurpro: 'Le Foyer lawyer (CyberAssurance Pro)',
    incident6resp_no: 'Customer (self)',
    incident7: 'Compliance follow-up',
    incident7resp_advis: 'Luxgap (CyberAdvisory)',
    incident7resp_no: 'Customer (self)',
    // Service descriptions
    socServiceTitle: 'SOC as a Service (RCarre)',
    socServiceDesc: '24/7 monitoring of your IT infrastructure from Luxembourg. Threat detection, alerting, and first-level analysis.',
    assistServiceTitle: 'CyberAssistance (Mixvoip)',
    assurServiceTitle: 'CyberAssurance (Le Foyer)',
    advisServiceTitle: 'CyberAdvisory (Luxgap)',
    basicServiceDesc: 'Business hours support (Mon-Fri, 8-18h). Best effort response. Triage, core user recovery, CNPD preparation. Up to 25 users.',
    essentielServiceDesc: '24/7 support with 1 hour guaranteed response time. Full forensics, remediation, CNPD preparation. Unlimited users.',
    etenduServiceDesc: '24/7 priority line with 30 min guaranteed response. On-site support, crisis PR, VoIP fraud protection. Unlimited users.',
    proServiceDesc: 'Dedicated team with custom SLA. All services individually tailored to your needs.',
    assurEssentielServiceDesc: 'Le Foyer covers the costs of 2 days Mixvoip emergency deployment (value: 1,600€).',
    assurEtenduServiceDesc: 'Le Foyer covers the costs of 4 days Mixvoip emergency deployment (value: 3,200€).',
    assurProServiceDesc: 'Le Foyer Cyber Pro full insurance contract. Comprehensive cyber coverage including financial losses, business interruption, data recovery, and legal costs.',
    advisEssentielServiceDesc: '2h consulting per year. CNPD/CSSF notification support, GDPR compliance assistance, legal advisory services, NIS2 assessment.',
    advisEtenduServiceDesc: '8h consulting per year. Security policy development, employee awareness training, incident response planning, annual security review.',
    advisProServiceDesc: '24h consulting per year + on-site audit. Dedicated advisor, unlimited support.',
    noSocWarning: 'Without SOC monitoring, attacks may go undetected for days or weeks.',
    noAdvisWarning: 'Without CyberAdvisory, you have no compliance support or legal guidance.',
  },
  fr: {
    title: 'Calculateur Cyber Suite',
    subtitle: 'Calculez votre investissement annuel en cybersécurité et voyez exactement ce que vous obtenez.',
    usersLabel: 'Nombre d\'utilisateurs',
    usersPlaceholder: 'ex. 50',
    assetsLabel: 'Nombre d\'assets (appareils)',
    assetsPlaceholder: 'ex. 30',
    assetsHint: 'Serveurs, firewalls, endpoints surveillés par le SOC',
    socLabel: 'SOC as a Service',
    socDesc: 'Surveillance 24/7 depuis le Luxembourg',
    assistanceLabel: 'Mixvoip CyberAssistance',
    assistanceDesc: 'Réponse d\'urgence 24/7',
    assuranceLabel: 'Mixvoip CyberAssurance',
    assuranceDesc: 'Couverture d\'assurance par Le Foyer',
    advisoryLabel: 'Mixvoip CyberAdvisory',
    advisoryDesc: 'Conformité & Conseil par Luxgap',
    none: 'Aucun',
    totalYear: 'Total par an',
    onRequest: 'Sur demande',
    contactUs: 'Contactez-nous pour un devis personnalisé',
    perMonth: '/ mois',
    perYear: '/ an',
    yourSelection: 'Vos services sélectionnés',
    incidentFlow: 'Que se passe-t-il lors d\'une cyberattaque ?',
    step: 'Étape',
    action: 'Action',
    responsible: 'Responsable',
    recommendation: 'Recommandation',
    noAssuranceWarning: 'Sans CyberAssurance, vous payez les coûts de déploiement vous-même (800€/jour).',
    assuranceRecommendation: 'Nous recommandons d\'ajouter CyberAssurance pour couvrir vos coûts de déploiement d\'urgence.',
    socNone: 'Pas de surveillance',
    socTranquility: 'R-SOC Tranquility',
    socTranquilityDesc: 'Idéal pour PME sans équipe IT',
    socTranquilityPrice: '7,20€ / utilisateur / mois',
    socRsoc: 'R-SOC',
    socRsocDesc: 'Pour entreprises avec infrastructure IT',
    socRsocPrice: '10€ / utilisateur / mois (packs de 5)',
    assistBasic: 'Basic (Inclus)',
    assistBasicDesc: 'Heures de bureau, best effort, jusqu\'à 25 utilisateurs',
    assistEssentiel: 'Essentiel – 2€/utilisateur/mois',
    assistEssentielDesc: '24/7, réponse 1h, forensique, remédiation',
    assistEtendu: 'Étendu – 5€/utilisateur/mois',
    assistEtenduDesc: '24/7 prioritaire, réponse 30 min, support sur site',
    assistPro: 'Pro – Sur demande',
    assistProDesc: 'Équipe dédiée, SLA personnalisé',
    assurNone: 'Pas d\'assurance',
    assurEssentiel: 'Essentiel – 120€/an',
    assurEssentielDesc: 'Le Foyer couvre 2 jours de déploiement d\'urgence',
    assurEtendu: 'Étendu – 200€/an',
    assurEtenduDesc: 'Le Foyer couvre 4 jours de déploiement d\'urgence',
    assurPro: 'Pro – Sur demande',
    assurProDesc: 'Contrat complet Le Foyer Cyber Pro',
    advisNone: 'Pas de conseil',
    advisEssentiel: 'Essentiel – 500€/an',
    advisEssentielDesc: '2h conseil/an, support CNPD/RGPD',
    advisEtendu: 'Étendu – 2 000€/an',
    advisEtenduDesc: '8h conseil/an, NIS2, politiques de sécurité',
    advisPro: 'Pro – Sur demande',
    advisProDesc: '24h conseil + audit sur site',
    incident1: 'Attaque détectée',
    incident1resp: 'SOC (RCarre) ou client',
    incident2: 'Signalement au Helpdesk Mixvoip',
    incident2resp: 'Mixvoip',
    incident3: 'Triage & première réponse',
    incident3resp: 'Mixvoip (CyberAssistance)',
    incident4: 'Forensique & remédiation',
    incident4resp: 'Mixvoip (CyberAssistance)',
    incident5: 'Qui paie la facture ?',
    incident5resp_assur: 'Le Foyer (CyberAssurance)',
    incident5resp_no: 'Client (pas de CyberAssurance)',
    incident6: 'Notification CNPD',
    incident6resp_advis: 'Luxgap (CyberAdvisory)',
    incident6resp_assurpro: 'Avocat Le Foyer (CyberAssurance Pro)',
    incident6resp_no: 'Client (lui-même)',
    incident7: 'Suivi conformité',
    incident7resp_advis: 'Luxgap (CyberAdvisory)',
    incident7resp_no: 'Client (lui-même)',
    socServiceTitle: 'SOC as a Service (RCarre)',
    socServiceDesc: 'Surveillance 24/7 de votre infrastructure IT depuis le Luxembourg. Détection des menaces, alertes et analyse de premier niveau.',
    assistServiceTitle: 'CyberAssistance (Mixvoip)',
    assurServiceTitle: 'CyberAssurance (Le Foyer)',
    advisServiceTitle: 'CyberAdvisory (Luxgap)',
    basicServiceDesc: 'Support heures de bureau (Lun-Ven, 8-18h). Réponse best effort. Triage, récupération utilisateurs principaux, préparation CNPD. Jusqu\'à 25 utilisateurs.',
    essentielServiceDesc: 'Support 24/7 avec temps de réponse garanti 1 heure. Forensique complète, remédiation, préparation CNPD. Utilisateurs illimités.',
    etenduServiceDesc: 'Ligne prioritaire 24/7 avec réponse garantie 30 min. Support sur site, PR de crise, protection fraude VoIP. Utilisateurs illimités.',
    proServiceDesc: 'Équipe dédiée avec SLA personnalisé. Tous les services adaptés individuellement à vos besoins.',
    assurEssentielServiceDesc: 'Le Foyer couvre les coûts de 2 jours de déploiement d\'urgence Mixvoip (valeur : 1 600€).',
    assurEtenduServiceDesc: 'Le Foyer couvre les coûts de 4 jours de déploiement d\'urgence Mixvoip (valeur : 3 200€).',
    assurProServiceDesc: 'Contrat complet Le Foyer Cyber Pro. Couverture cyber complète incluant pertes financières, interruption d\'activité, récupération de données et frais juridiques.',
    advisEssentielServiceDesc: '2h de conseil par an. Support notification CNPD/CSSF, assistance conformité RGPD, services de conseil juridique, évaluation NIS2.',
    advisEtenduServiceDesc: '8h de conseil par an. Développement de politiques de sécurité, formation sensibilisation employés, planification réponse incidents, revue sécurité annuelle.',
    advisProServiceDesc: '24h de conseil par an + audit sur site. Conseiller dédié, support illimité.',
    noSocWarning: 'Sans surveillance SOC, les attaques peuvent passer inaperçues pendant des jours ou des semaines.',
    noAdvisWarning: 'Sans CyberAdvisory, vous n\'avez pas de support conformité ni de conseil juridique.',
  },
  de: {
    title: 'Cyber Suite Rechner',
    subtitle: 'Berechnen Sie Ihre jährliche Cybersecurity-Investition und sehen Sie genau, was Sie bekommen.',
    usersLabel: 'Anzahl Benutzer',
    usersPlaceholder: 'z.B. 50',
    assetsLabel: 'Anzahl Assets (Geräte)',
    assetsPlaceholder: 'z.B. 30',
    assetsHint: 'Server, Firewalls, Endpoints die vom SOC überwacht werden',
    socLabel: 'SOC as a Service',
    socDesc: '24/7 Überwachung aus Luxemburg',
    assistanceLabel: 'Mixvoip CyberAssistance',
    assistanceDesc: '24/7 Notfall-Einsatz',
    assuranceLabel: 'Mixvoip CyberAssurance',
    assuranceDesc: 'Versicherungsschutz durch Le Foyer',
    advisoryLabel: 'Mixvoip CyberAdvisory',
    advisoryDesc: 'Compliance & Beratung durch Luxgap',
    none: 'Keine',
    totalYear: 'Gesamt pro Jahr',
    onRequest: 'Auf Anfrage',
    contactUs: 'Kontaktieren Sie uns für ein individuelles Angebot',
    perMonth: '/ Monat',
    perYear: '/ Jahr',
    yourSelection: 'Ihre gewählten Leistungen',
    incidentFlow: 'Was passiert bei einem Cyberangriff?',
    step: 'Schritt',
    action: 'Aktion',
    responsible: 'Verantwortlich',
    recommendation: 'Empfehlung',
    noAssuranceWarning: 'Ohne CyberAssurance zahlen Sie die Einsatzkosten selbst (800€/Tag).',
    assuranceRecommendation: 'Wir empfehlen CyberAssurance hinzuzufügen, um Ihre Notfalleinsatzkosten abzudecken.',
    socNone: 'Keine Überwachung',
    socTranquility: 'R-SOC Tranquility',
    socTranquilityDesc: 'Ideal für KMU ohne IT-Team',
    socTranquilityPrice: '7,20€ / Benutzer / Monat',
    socRsoc: 'R-SOC',
    socRsocDesc: 'Für Unternehmen mit IT-Infrastruktur',
    socRsocPrice: '10€ / Benutzer / Monat (5er-Pakete)',
    assistBasic: 'Basic (Inklusive)',
    assistBasicDesc: 'Geschäftszeiten, Best Effort, bis 25 Benutzer',
    assistEssentiel: 'Essentiel – 2€/Benutzer/Monat',
    assistEssentielDesc: '24/7, 1h Reaktion, Forensik, Remediation',
    assistEtendu: 'Étendu – 5€/Benutzer/Monat',
    assistEtenduDesc: '24/7 Priority, 30 Min Reaktion, Vor-Ort-Support',
    assistPro: 'Pro – Auf Anfrage',
    assistProDesc: 'Dediziertes Team, individuelles SLA',
    assurNone: 'Keine Versicherung',
    assurEssentiel: 'Essentiel – 120€/Jahr',
    assurEssentielDesc: 'Le Foyer übernimmt 2 Tage Notfalleinsatz',
    assurEtendu: 'Étendu – 200€/Jahr',
    assurEtenduDesc: 'Le Foyer übernimmt 4 Tage Notfalleinsatz',
    assurPro: 'Pro – Auf Anfrage',
    assurProDesc: 'Le Foyer Cyber Pro Vollvertrag',
    advisNone: 'Keine Beratung',
    advisEssentiel: 'Essentiel – 500€/Jahr',
    advisEssentielDesc: '2h Beratung/Jahr, CNPD/DSGVO-Support',
    advisEtendu: 'Étendu – 2.000€/Jahr',
    advisEtenduDesc: '8h Beratung/Jahr, NIS2, Security Policies',
    advisPro: 'Pro – Auf Anfrage',
    advisProDesc: '24h Beratung + Vor-Ort-Audit',
    incident1: 'Angriff erkannt',
    incident1resp: 'SOC (RCarre) oder Kunde',
    incident2: 'Meldung an Mixvoip Helpdesk',
    incident2resp: 'Mixvoip',
    incident3: 'Triage & Erste Reaktion',
    incident3resp: 'Mixvoip (CyberAssistance)',
    incident4: 'Forensik & Remediation',
    incident4resp: 'Mixvoip (CyberAssistance)',
    incident5: 'Wer zahlt die Rechnung?',
    incident5resp_assur: 'Le Foyer (CyberAssurance)',
    incident5resp_no: 'Kunde (keine CyberAssurance)',
    incident6: 'CNPD-Meldung',
    incident6resp_advis: 'Luxgap (CyberAdvisory)',
    incident6resp_assurpro: 'Le Foyer Anwalt (CyberAssurance Pro)',
    incident6resp_no: 'Kunde (selbst)',
    incident7: 'Compliance-Nachbereitung',
    incident7resp_advis: 'Luxgap (CyberAdvisory)',
    incident7resp_no: 'Kunde (selbst)',
    socServiceTitle: 'SOC as a Service (RCarre)',
    socServiceDesc: '24/7 Überwachung Ihrer IT-Infrastruktur aus Luxemburg. Bedrohungserkennung, Alarmierung und Erstanalyse.',
    assistServiceTitle: 'CyberAssistance (Mixvoip)',
    assurServiceTitle: 'CyberAssurance (Le Foyer)',
    advisServiceTitle: 'CyberAdvisory (Luxgap)',
    basicServiceDesc: 'Geschäftszeiten-Support (Mo-Fr, 8-18h). Best-Effort-Reaktion. Triage, Core-User-Recovery, CNPD-Vorbereitung. Bis zu 25 Benutzer.',
    essentielServiceDesc: '24/7 Support mit 1 Stunde garantierter Reaktionszeit. Vollständige Forensik, Remediation, CNPD-Vorbereitung. Unbegrenzte Benutzer.',
    etenduServiceDesc: '24/7 Priority-Line mit 30 Min garantierter Reaktion. Vor-Ort-Support, Krisen-PR, VoIP-Betrugsschutz. Unbegrenzte Benutzer.',
    proServiceDesc: 'Dediziertes Team mit individuellem SLA. Alle Leistungen individuell auf Ihre Bedürfnisse zugeschnitten.',
    assurEssentielServiceDesc: 'Le Foyer übernimmt die Kosten für 2 Tage Mixvoip-Notfalleinsatz (Wert: 1.600€).',
    assurEtenduServiceDesc: 'Le Foyer übernimmt die Kosten für 4 Tage Mixvoip-Notfalleinsatz (Wert: 3.200€).',
    assurProServiceDesc: 'Le Foyer Cyber Pro Vollvertrag. Umfassender Cyber-Versicherungsschutz inkl. finanzielle Verluste, Betriebsunterbrechung, Datenwiederherstellung und Rechtskosten.',
    advisEssentielServiceDesc: '2h Beratung pro Jahr. CNPD/CSSF-Meldungsunterstützung, DSGVO-Compliance, Rechtsberatung, NIS2-Bewertung.',
    advisEtenduServiceDesc: '8h Beratung pro Jahr. Security Policies, Mitarbeiterschulung, Incident Response Planning, jährliche Sicherheitsüberprüfung.',
    advisProServiceDesc: '24h Beratung pro Jahr + Vor-Ort-Audit. Dedizierter Berater, unbegrenzter Support.',
    noSocWarning: 'Ohne SOC-Überwachung können Angriffe tage- oder wochenlang unentdeckt bleiben.',
    noAdvisWarning: 'Ohne CyberAdvisory haben Sie keinen Compliance-Support oder rechtliche Beratung.',
  },
};

export default function CyberCalculator() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  const [users, setUsers] = useState<number>(25);
  const [soc, setSoc] = useState<SOCChoice>('none');
  const [assistance, setAssistance] = useState<AssistanceChoice>('basic');
  const [assurance, setAssurance] = useState<AssuranceChoice>('none');
  const [advisory, setAdvisory] = useState<AdvisoryChoice>('none');
  const [showIncident, setShowIncident] = useState(false);

  const hasOnRequest = assistance === 'pro' || assurance === 'pro' || advisory === 'pro';

  const calculation = useMemo(() => {
    let socCost = 0;
    let assistCost = 0;
    let assurCost = 0;
    let advisCost = 0;

    // SOC: per user per year (monthly price × 12)
    if (soc === 'tranquility') {
      socCost = users * 7.20 * 12;
    } else if (soc === 'rsoc') {
      const packs = Math.ceil(users / 5) * 5;
      socCost = packs * 10 * 12;
    }

    // Assistance: per user per year
    if (assistance === 'essentiel') {
      assistCost = users * 24;
    } else if (assistance === 'etendu') {
      assistCost = users * 60;
    }

    // Assurance: flat per year
    if (assurance === 'essentiel') {
      assurCost = 120;
    } else if (assurance === 'etendu') {
      assurCost = 200;
    }

    // Advisory: flat per year
    if (advisory === 'essentiel') {
      advisCost = 500;
    } else if (advisory === 'etendu') {
      advisCost = 2000;
    }

    return {
      soc: socCost,
      assistance: assistCost,
      assurance: assurCost,
      advisory: advisCost,
      total: socCost + assistCost + assurCost + advisCost,
    };
  }, [users, soc, assistance, assurance, advisory]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getIncidentSteps = () => {
    const steps = [
      { action: t.incident1, responsible: soc !== 'none' ? t.incident1resp : t.incident1resp.split(' or ')[1] || t.incident1resp },
      { action: t.incident2, responsible: t.incident2resp },
      { action: t.incident3, responsible: t.incident3resp },
      { action: t.incident4, responsible: t.incident4resp },
      { action: t.incident5, responsible: assurance !== 'none' ? t.incident5resp_assur : t.incident5resp_no },
      { action: t.incident6, responsible: advisory !== 'none' ? t.incident6resp_advis : assurance === 'pro' ? t.incident6resp_assurpro : t.incident6resp_no },
      { action: t.incident7, responsible: advisory !== 'none' ? t.incident7resp_advis : t.incident7resp_no },
    ];
    return steps;
  };

  return (
    <section id="calculator" className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container max-w-5xl">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Calculator className="h-8 w-8 text-[#50B848]" />
            <h2 className="text-3xl font-bold text-slate-900">{t.title}</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Configuration */}
          <div className="lg:col-span-3 space-y-6">
            {/* Users Input */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">{t.usersLabel}</label>
              <input
                type="number"
                min="1"
                max="10000"
                value={users}
                onChange={(e) => setUsers(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#50B848] focus:border-transparent"
                placeholder={t.usersPlaceholder}
              />
            </div>

            {/* SOC Selection */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-[#FF8C00]" />
                <div>
                  <div className="font-semibold text-slate-700">{t.socLabel}</div>
                  <div className="text-xs text-muted-foreground">{t.socDesc}</div>
                </div>
              </div>
              <div className="space-y-2">
                {([['none', t.socNone, ''], ['tranquility', t.socTranquility, t.socTranquilityPrice], ['rsoc', t.socRsoc, t.socRsocPrice]] as const).map(([val, label, price]) => (
                  <label key={val} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${soc === val ? 'bg-orange-50 border-2 border-orange-300' : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'}`}>
                    <input type="radio" name="soc" value={val} checked={soc === val} onChange={() => setSoc(val)} className="accent-[#FF8C00]" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{label}</div>
                      {price && <div className="text-xs text-muted-foreground">{price}</div>}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Assistance Selection */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-[#E63946]" />
                <div>
                  <div className="font-semibold text-slate-700">{t.assistanceLabel}</div>
                  <div className="text-xs text-muted-foreground">{t.assistanceDesc}</div>
                </div>
              </div>
              <div className="space-y-2">
                {([['basic', t.assistBasic, t.assistBasicDesc], ['essentiel', t.assistEssentiel, t.assistEssentielDesc], ['etendu', t.assistEtendu, t.assistEtenduDesc], ['pro', t.assistPro, t.assistProDesc]] as const).map(([val, label, desc]) => (
                  <label key={val} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${assistance === val ? 'bg-red-50 border-2 border-red-300' : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'}`}>
                    <input type="radio" name="assistance" value={val} checked={assistance === val} onChange={() => setAssistance(val as AssistanceChoice)} className="accent-[#E63946]" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{label}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Assurance Selection */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="h-5 w-5 text-[#2563EB]" />
                <div>
                  <div className="font-semibold text-slate-700">{t.assuranceLabel}</div>
                  <div className="text-xs text-muted-foreground">{t.assuranceDesc}</div>
                </div>
              </div>
              <div className="space-y-2">
                {([['none', t.assurNone, ''], ['essentiel', t.assurEssentiel, t.assurEssentielDesc], ['etendu', t.assurEtendu, t.assurEtenduDesc], ['pro', t.assurPro, t.assurProDesc]] as const).map(([val, label, desc]) => (
                  <label key={val} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${assurance === val ? 'bg-blue-50 border-2 border-blue-300' : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'}`}>
                    <input type="radio" name="assurance" value={val} checked={assurance === val} onChange={() => setAssurance(val as AssuranceChoice)} className="accent-[#2563EB]" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{label}</div>
                      {desc && <div className="text-xs text-muted-foreground">{desc}</div>}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Advisory Selection */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-[#7C3AED]" />
                <div>
                  <div className="font-semibold text-slate-700">{t.advisoryLabel}</div>
                  <div className="text-xs text-muted-foreground">{t.advisoryDesc}</div>
                </div>
              </div>
              <div className="space-y-2">
                {([['none', t.advisNone, ''], ['essentiel', t.advisEssentiel, t.advisEssentielDesc], ['etendu', t.advisEtendu, t.advisEtenduDesc], ['pro', t.advisPro, t.advisProDesc]] as const).map(([val, label, desc]) => (
                  <label key={val} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${advisory === val ? 'bg-purple-50 border-2 border-purple-300' : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'}`}>
                    <input type="radio" name="advisory" value={val} checked={advisory === val} onChange={() => setAdvisory(val as AdvisoryChoice)} className="accent-[#7C3AED]" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{label}</div>
                      {desc && <div className="text-xs text-muted-foreground">{desc}</div>}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Price Summary (sticky) */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-[#50B848] p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-4">{t.totalYear}</h3>
                
                {/* Line items */}
                <div className="space-y-3 mb-4">
                  {soc !== 'none' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5"><Eye className="h-3.5 w-3.5 text-[#FF8C00]" /> SOCaaS</span>
                      <span className="font-medium">{formatPrice(calculation.soc)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#E63946]" /> CyberAssistance</span>
                    <span className="font-medium">{assistance === 'basic' ? '0€' : assistance === 'pro' ? t.onRequest : `${formatPrice(calculation.assistance)}€`}</span>
                  </div>
                  {assurance !== 'none' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5"><Scale className="h-3.5 w-3.5 text-[#2563EB]" /> CyberAssurance</span>
                      <span className="font-medium">{assurance === 'pro' ? t.onRequest : `${formatPrice(calculation.assurance)}€`}</span>
                    </div>
                  )}
                  {advisory !== 'none' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 text-[#7C3AED]" /> CyberAdvisory</span>
                      <span className="font-medium">{advisory === 'pro' ? t.onRequest : `${formatPrice(calculation.advisory)}€`}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  {hasOnRequest ? (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{t.onRequest}</div>
                      <p className="text-xs text-muted-foreground mt-1">{t.contactUs}</p>
                      {calculation.total > 0 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          + {formatPrice(calculation.total)}€ {t.perYear}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#50B848]">{formatPrice(calculation.total)}€</div>
                      <div className="text-sm text-muted-foreground">{t.perYear}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ≈ {formatPrice(Math.round(calculation.total / 12))}€ {t.perMonth}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Warnings */}
              {assurance === 'none' && assistance !== 'basic' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-amber-800 font-medium">{t.noAssuranceWarning}</p>
                    <p className="text-xs text-amber-700 mt-1">{t.assuranceRecommendation}</p>
                  </div>
                </div>
              )}

              {soc === 'none' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-2">
                  <Info className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-800">{t.noSocWarning}</p>
                </div>
              )}

              {advisory === 'none' && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-start gap-2">
                  <Info className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-purple-800">{t.noAdvisWarning}</p>
                </div>
              )}

              {/* Service Description */}
              <div className="bg-white rounded-xl shadow-sm border p-5">
                <h4 className="font-bold text-sm text-slate-900 mb-3">{t.yourSelection}</h4>
                <div className="space-y-3 text-xs">
                  {soc !== 'none' && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-700">{t.socServiceTitle}</div>
                        <div className="text-muted-foreground">{t.socServiceDesc}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-700">{t.assistServiceTitle} – {assistance === 'basic' ? 'Basic' : assistance === 'essentiel' ? 'Essentiel' : assistance === 'etendu' ? 'Étendu' : 'Pro'}</div>
                      <div className="text-muted-foreground">
                        {assistance === 'basic' ? t.basicServiceDesc : assistance === 'essentiel' ? t.essentielServiceDesc : assistance === 'etendu' ? t.etenduServiceDesc : t.proServiceDesc}
                      </div>
                    </div>
                  </div>
                  {assurance !== 'none' && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-700">{t.assurServiceTitle} – {assurance === 'essentiel' ? 'Essentiel' : assurance === 'etendu' ? 'Étendu' : 'Pro'}</div>
                        <div className="text-muted-foreground">
                          {assurance === 'essentiel' ? t.assurEssentielServiceDesc : assurance === 'etendu' ? t.assurEtenduServiceDesc : t.assurProServiceDesc}
                        </div>
                      </div>
                    </div>
                  )}
                  {advisory !== 'none' && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-700">{t.advisServiceTitle} – {advisory === 'essentiel' ? 'Essentiel' : advisory === 'etendu' ? 'Étendu' : 'Pro'}</div>
                        <div className="text-muted-foreground">
                          {advisory === 'essentiel' ? t.advisEssentielServiceDesc : advisory === 'etendu' ? t.advisEtenduServiceDesc : t.advisProServiceDesc}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Incident Flow Toggle */}
              <button
                onClick={() => setShowIncident(!showIncident)}
                className="w-full bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between hover:bg-slate-800 transition-colors"
              >
                <span className="font-semibold text-sm">{t.incidentFlow}</span>
                {showIncident ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>

              {showIncident && (
                <div className="bg-white rounded-xl shadow-sm border p-5">
                  <div className="space-y-3">
                    {getIncidentSteps().map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-slate-900">{step.action}</div>
                          <div className={`text-xs mt-0.5 ${step.responsible.includes('(no ') || step.responsible.includes('(keine') || step.responsible.includes('(pas ') || step.responsible.includes('(selbst') || step.responsible.includes('(lui-') ? 'text-amber-600 font-medium' : 'text-[#50B848]'}`}>
                            → {step.responsible}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
