import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator, Shield, Eye, Scale, BookOpen, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Info, XCircle, ShieldAlert, ShieldCheck } from 'lucide-react';

type SOCChoice = 'none' | 'tranquility' | 'rsoc';
type AssistanceChoice = 'basic' | 'essentiel' | 'advanced' | 'pro';
type AssuranceChoice = 'none' | 'essentiel' | 'advanced' | 'pro';
type AdvisoryChoice = 'none' | 'starter' | 'business' | 'expert';

const translations = {
  en: {
    title: 'Cyber Suite Calculator',
    subtitle: 'Calculate your annual cybersecurity investment and see exactly what you get.',
    usersLabel: 'Number of Users',
    usersPlaceholder: 'e.g. 50',
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
    assistAdvanced: 'Advanced – 5€/user/month',
    assistAdvancedDesc: '24/7 priority, 30 min response, on-site support',
    assistPro: 'Pro – On request',
    assistProDesc: 'Dedicated team, custom SLA',
    // Assurance options
    assurNone: 'No insurance',
    assurEssentiel: 'Essentiel – 120€/year',
    assurEssentielDesc: 'Le Foyer covers 2 days emergency deployment',
    assurAdvanced: 'Advanced – 200€/year',
    assurAdvancedDesc: 'Le Foyer covers 4 days emergency deployment',
    assurPro: 'Pro – On request',
    assurProDesc: 'Le Foyer Cyber Pro full contract',
    // Advisory options
    advisNone: 'No advisory',
    advisStarter: 'Starter – 450€/month',
    advisStarterDesc: 'External DPO, GDPR compliance, <10 employees',
    advisBusiness: 'Business – 828€/month',
    advisBusinessDesc: 'DPO + CISO, audits, pentests, 10-50 employees',
    advisExpert: 'Expert – 1,656€/month',
    advisExpertDesc: 'DPO + CISO full coverage, 50-100 employees',
    // Incident flow
    incident1: 'Attack detected',
    incident1resp_soc: 'SOC (RCarre) – automatic 24/7 detection',
    incident1resp_no: 'You – you must detect the attack yourself',
    incident1hint_no: 'Average time to detect without SOC: 197 days',
    incident2: 'Report to Mixvoip Helpdesk',
    incident2resp: 'You call Mixvoip – describe the problem',
    incident2hint: 'Available during business hours (Basic) or 24/7 (Essentiel/Advanced)',
    incident3: 'Triage & first response',
    incident3resp: 'Mixvoip (CyberAssistance)',
    incident3hint_basic: 'Best effort, business hours only – no guaranteed response time',
    incident3hint_essentiel: '1 hour guaranteed response, 24/7',
    incident3hint_advanced: '30 min guaranteed response, 24/7 priority line',
    incident4: 'Forensics & remediation',
    incident4resp: 'Mixvoip (CyberAssistance)',
    incident4hint_basic: 'Limited scope – core user recovery only',
    incident4hint_essentiel: 'Full forensics, remediation, CNPD preparation',
    incident4hint_advanced: 'Full forensics + on-site support + crisis PR',
    incident5: 'Who pays the bill?',
    incident5resp_assur: 'Le Foyer (CyberAssurance)',
    incident5resp_no: 'You – deployment costs at 800€/day',
    incident5hint_no: 'A typical incident takes 2-5 days = 1,600€ – 4,000€',
    incident5hint_essentiel: 'Le Foyer covers up to 2 days (1,600€)',
    incident5hint_advanced: 'Le Foyer covers up to 4 days (3,200€)',
    incident6: 'CNPD notification (72h deadline)',
    incident6resp_advis: 'Luxgap (CyberAdvisory)',
    incident6resp_assurpro: 'Le Foyer lawyer (CyberAssurance Pro)',
    incident6resp_no: 'You – must handle CNPD notification yourself',
    incident6hint_no: 'Late or incorrect notification can lead to GDPR fines up to 4% of revenue',
    incident7: 'Compliance follow-up',
    incident7resp_advis: 'Luxgap (CyberAdvisory)',
    incident7resp_no: 'You – must manage compliance yourself',
    incident7hint_no: 'NIS2, GDPR documentation, lessons learned – all on you',
    // Coverage score
    coverageLabel: 'Your Protection Level',
    coverageMinimal: 'Minimal Protection',
    coverageBasic: 'Basic Protection',
    coverageGood: 'Good Protection',
    coverageStrong: 'Strong Protection',
    coverageComplete: 'Comprehensive Protection',
    coverageMinimalDesc: 'You are largely on your own in case of a cyberattack.',
    coverageBasicDesc: 'Basic response covered, but significant gaps remain.',
    coverageGoodDesc: 'Good coverage – consider adding remaining services.',
    coverageStrongDesc: 'Strong protection – most scenarios are covered.',
    coverageCompleteDesc: 'Comprehensive protection across all phases of a cyber incident.',
    // Service descriptions
    socServiceTitle: 'SOC as a Service (RCarre)',
    socServiceDesc: '24/7 monitoring of your IT infrastructure from Luxembourg. Threat detection, alerting, and first-level analysis.',
    assistServiceTitle: 'CyberAssistance (Mixvoip)',
    assurServiceTitle: 'CyberAssurance (Le Foyer)',
    advisServiceTitle: 'CyberAdvisory (Luxgap)',
    basicServiceDesc: 'Business hours support (Mon-Fri, 8-18h). Best effort response. Triage, core user recovery, CNPD preparation. Up to 25 users.',
    essentielServiceDesc: '24/7 support with 1 hour guaranteed response time. Full forensics, remediation, CNPD preparation. Unlimited users.',
    advancedServiceDesc: '24/7 priority line with 30 min guaranteed response. On-site support, crisis PR, VoIP fraud protection. Unlimited users.',
    proServiceDesc: 'Dedicated team with custom SLA. All services individually tailored to your needs.',
    assurEssentielServiceDesc: 'Le Foyer covers the costs of 2 days Mixvoip emergency deployment (value: 1,600€).',
    assurAdvancedServiceDesc: 'Le Foyer covers the costs of 4 days Mixvoip emergency deployment (value: 3,200€).',
    assurProServiceDesc: 'Le Foyer Cyber Pro full insurance contract. Comprehensive cyber coverage including financial losses, business interruption, data recovery, and legal costs.',
    advisStarterServiceDesc: 'External DPO: GDPR compliance, data processing register, annual M365 review, 1 pentest/year, phishing campaign, online training portal.',
    advisBusinessServiceDesc: 'DPO + CISO: full data breach management, CNPD notification, weekly pentests, dark web monitoring, regulatory audits included.',
    advisExpertServiceDesc: 'DPO + CISO full coverage: all assets, IT team coaching, risk management, ISO 27001/EUROPRIVACY certification possible.',
    noSocWarning: 'Without SOC monitoring, attacks may go undetected for days or weeks.',
    noAssuranceWarning: 'Without CyberAssurance, you pay the deployment costs yourself (800€/day).',
    assuranceRecommendation: 'We recommend adding CyberAssurance to cover your emergency deployment costs.',
    noAdvisWarning: 'Without CyberAdvisory, you have no compliance support or legal guidance.',
  },
  fr: {
    title: 'Calculateur Cyber Suite',
    subtitle: 'Calculez votre investissement annuel en cybersécurité et voyez exactement ce que vous obtenez.',
    usersLabel: 'Nombre d\'utilisateurs',
    usersPlaceholder: 'ex. 50',
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
    assistAdvanced: 'Advanced – 5€/utilisateur/mois',
    assistAdvancedDesc: '24/7 prioritaire, réponse 30 min, support sur site',
    assistPro: 'Pro – Sur demande',
    assistProDesc: 'Équipe dédiée, SLA personnalisé',
    assurNone: 'Pas d\'assurance',
    assurEssentiel: 'Essentiel – 120€/an',
    assurEssentielDesc: 'Le Foyer couvre 2 jours de déploiement d\'urgence',
    assurAdvanced: 'Advanced – 200€/an',
    assurAdvancedDesc: 'Le Foyer couvre 4 jours de déploiement d\'urgence',
    assurPro: 'Pro – Sur demande',
    assurProDesc: 'Contrat complet Le Foyer Cyber Pro',
    advisNone: 'Pas de conseil',
    advisStarter: 'Starter – 450€/mois',
    advisStarterDesc: 'DPO externe, conformité RGPD, <10 employés',
    advisBusiness: 'Business – 828€/mois',
    advisBusinessDesc: 'DPO + CISO, audits, pentests, 10-50 employés',
    advisExpert: 'Expert – 1 656€/mois',
    advisExpertDesc: 'DPO + CISO couverture complète, 50-100 employés',
    incident1: 'Attaque détectée',
    incident1resp_soc: 'SOC (RCarre) – détection automatique 24/7',
    incident1resp_no: 'Vous – vous devez détecter l\'attaque vous-même',
    incident1hint_no: 'Délai moyen de détection sans SOC : 197 jours',
    incident2: 'Signalement au Helpdesk Mixvoip',
    incident2resp: 'Vous appelez Mixvoip – décrivez le problème',
    incident2hint: 'Disponible en heures de bureau (Basic) ou 24/7 (Essentiel/Advanced)',
    incident3: 'Triage & première réponse',
    incident3resp: 'Mixvoip (CyberAssistance)',
    incident3hint_basic: 'Best effort, heures de bureau uniquement – pas de temps de réponse garanti',
    incident3hint_essentiel: 'Réponse garantie 1 heure, 24/7',
    incident3hint_advanced: 'Réponse garantie 30 min, ligne prioritaire 24/7',
    incident4: 'Forensique & remédiation',
    incident4resp: 'Mixvoip (CyberAssistance)',
    incident4hint_basic: 'Périmètre limité – récupération utilisateurs principaux uniquement',
    incident4hint_essentiel: 'Forensique complète, remédiation, préparation CNPD',
    incident4hint_advanced: 'Forensique complète + support sur site + PR de crise',
    incident5: 'Qui paie la facture ?',
    incident5resp_assur: 'Le Foyer (CyberAssurance)',
    incident5resp_no: 'Vous – coûts de déploiement à 800€/jour',
    incident5hint_no: 'Un incident typique dure 2-5 jours = 1 600€ – 4 000€',
    incident5hint_essentiel: 'Le Foyer couvre jusqu\'à 2 jours (1 600€)',
    incident5hint_advanced: 'Le Foyer couvre jusqu\'à 4 jours (3 200€)',
    incident6: 'Notification CNPD (délai 72h)',
    incident6resp_advis: 'Luxgap (CyberAdvisory)',
    incident6resp_assurpro: 'Avocat Le Foyer (CyberAssurance Pro)',
    incident6resp_no: 'Vous – devez gérer la notification CNPD vous-même',
    incident6hint_no: 'Une notification tardive ou incorrecte peut entraîner des amendes RGPD jusqu\'à 4% du CA',
    incident7: 'Suivi conformité',
    incident7resp_advis: 'Luxgap (CyberAdvisory)',
    incident7resp_no: 'Vous – devez gérer la conformité vous-même',
    incident7hint_no: 'NIS2, documentation RGPD, retour d\'expérience – tout repose sur vous',
    coverageLabel: 'Votre niveau de protection',
    coverageMinimal: 'Protection minimale',
    coverageBasic: 'Protection de base',
    coverageGood: 'Bonne protection',
    coverageStrong: 'Protection solide',
    coverageComplete: 'Protection complète',
    coverageMinimalDesc: 'Vous êtes largement seul en cas de cyberattaque.',
    coverageBasicDesc: 'Réponse de base couverte, mais des lacunes importantes subsistent.',
    coverageGoodDesc: 'Bonne couverture – envisagez d\'ajouter les services restants.',
    coverageStrongDesc: 'Protection solide – la plupart des scénarios sont couverts.',
    coverageCompleteDesc: 'Protection complète à toutes les phases d\'un incident cyber.',
    socServiceTitle: 'SOC as a Service (RCarre)',
    socServiceDesc: 'Surveillance 24/7 de votre infrastructure IT depuis le Luxembourg. Détection des menaces, alertes et analyse de premier niveau.',
    assistServiceTitle: 'CyberAssistance (Mixvoip)',
    assurServiceTitle: 'CyberAssurance (Le Foyer)',
    advisServiceTitle: 'CyberAdvisory (Luxgap)',
    basicServiceDesc: 'Support heures de bureau (Lun-Ven, 8-18h). Réponse best effort. Triage, récupération utilisateurs principaux, préparation CNPD. Jusqu\'à 25 utilisateurs.',
    essentielServiceDesc: 'Support 24/7 avec temps de réponse garanti 1 heure. Forensique complète, remédiation, préparation CNPD. Utilisateurs illimités.',
    advancedServiceDesc: 'Ligne prioritaire 24/7 avec réponse garantie 30 min. Support sur site, PR de crise, protection fraude VoIP. Utilisateurs illimités.',
    proServiceDesc: 'Équipe dédiée avec SLA personnalisé. Tous les services adaptés individuellement à vos besoins.',
    assurEssentielServiceDesc: 'Le Foyer couvre les coûts de 2 jours de déploiement d\'urgence Mixvoip (valeur : 1 600€).',
    assurAdvancedServiceDesc: 'Le Foyer couvre les coûts de 4 jours de déploiement d\'urgence Mixvoip (valeur : 3 200€).',
    assurProServiceDesc: 'Contrat complet Le Foyer Cyber Pro. Couverture cyber complète incluant pertes financières, interruption d\'activité, récupération de données et frais juridiques.',
    advisStarterServiceDesc: 'DPO externe : conformité RGPD, registre des traitements, revue M365 annuelle, 1 pentest/an, campagne phishing, portail formation en ligne.',
    advisBusinessServiceDesc: 'DPO + CISO : gestion complète des violations de données, notification CNPD, pentests hebdomadaires, surveillance dark web, audits régulateurs inclus.',
    advisExpertServiceDesc: 'DPO + CISO couverture totale : tous les actifs, accompagnement équipe IT, gestion des risques, certification ISO 27001/EUROPRIVACY possible.',
    noSocWarning: 'Sans surveillance SOC, les attaques peuvent passer inaperçues pendant des jours ou des semaines.',
    noAssuranceWarning: 'Sans CyberAssurance, vous payez les coûts de déploiement vous-même (800€/jour).',
    assuranceRecommendation: 'Nous recommandons d\'ajouter CyberAssurance pour couvrir vos coûts de déploiement d\'urgence.',
    noAdvisWarning: 'Sans CyberAdvisory, vous n\'avez pas de support conformité ni de conseil juridique.',
  },
  de: {
    title: 'Cyber Suite Rechner',
    subtitle: 'Berechnen Sie Ihre jährliche Cybersecurity-Investition und sehen Sie genau, was Sie bekommen.',
    usersLabel: 'Anzahl Benutzer',
    usersPlaceholder: 'z.B. 50',
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
    assistAdvanced: 'Advanced – 5€/Benutzer/Monat',
    assistAdvancedDesc: '24/7 Priority, 30 Min Reaktion, Vor-Ort-Support',
    assistPro: 'Pro – Auf Anfrage',
    assistProDesc: 'Dediziertes Team, individuelles SLA',
    assurNone: 'Keine Versicherung',
    assurEssentiel: 'Essentiel – 120€/Jahr',
    assurEssentielDesc: 'Le Foyer übernimmt 2 Tage Notfalleinsatz',
    assurAdvanced: 'Advanced – 200€/Jahr',
    assurAdvancedDesc: 'Le Foyer übernimmt 4 Tage Notfalleinsatz',
    assurPro: 'Pro – Auf Anfrage',
    assurProDesc: 'Le Foyer Cyber Pro Vollvertrag',
    advisNone: 'Keine Beratung',
    advisStarter: 'Starter – 450€/Monat',
    advisStarterDesc: 'Externer DPO, DSGVO-Konformität, <10 Mitarbeiter',
    advisBusiness: 'Business – 828€/Monat',
    advisBusinessDesc: 'DPO + CISO, Audits, Pentests, 10-50 Mitarbeiter',
    advisExpert: 'Expert – 1.656€/Monat',
    advisExpertDesc: 'DPO + CISO Vollabdeckung, 50-100 Mitarbeiter',
    incident1: 'Angriff erkannt',
    incident1resp_soc: 'SOC (RCarre) – automatische 24/7 Erkennung',
    incident1resp_no: 'Sie – Sie müssen den Angriff selbst erkennen',
    incident1hint_no: 'Durchschnittliche Erkennungszeit ohne SOC: 197 Tage',
    incident2: 'Meldung an Mixvoip Helpdesk',
    incident2resp: 'Sie rufen Mixvoip an – beschreiben das Problem',
    incident2hint: 'Verfügbar während Geschäftszeiten (Basic) oder 24/7 (Essentiel/Advanced)',
    incident3: 'Triage & Erste Reaktion',
    incident3resp: 'Mixvoip (CyberAssistance)',
    incident3hint_basic: 'Best Effort, nur Geschäftszeiten – keine garantierte Reaktionszeit',
    incident3hint_essentiel: '1 Stunde garantierte Reaktion, 24/7',
    incident3hint_advanced: '30 Min garantierte Reaktion, 24/7 Priority-Line',
    incident4: 'Forensik & Remediation',
    incident4resp: 'Mixvoip (CyberAssistance)',
    incident4hint_basic: 'Begrenzter Umfang – nur Core-User-Recovery',
    incident4hint_essentiel: 'Vollständige Forensik, Remediation, CNPD-Vorbereitung',
    incident4hint_advanced: 'Vollständige Forensik + Vor-Ort-Support + Krisen-PR',
    incident5: 'Wer zahlt die Rechnung?',
    incident5resp_assur: 'Le Foyer (CyberAssurance)',
    incident5resp_no: 'Sie – Einsatzkosten von 800€/Tag',
    incident5hint_no: 'Ein typischer Vorfall dauert 2-5 Tage = 1.600€ – 4.000€',
    incident5hint_essentiel: 'Le Foyer übernimmt bis zu 2 Tage (1.600€)',
    incident5hint_advanced: 'Le Foyer übernimmt bis zu 4 Tage (3.200€)',
    incident6: 'CNPD-Meldung (72h Frist)',
    incident6resp_advis: 'Luxgap (CyberAdvisory)',
    incident6resp_assurpro: 'Le Foyer Anwalt (CyberAssurance Pro)',
    incident6resp_no: 'Sie – müssen die CNPD-Meldung selbst erledigen',
    incident6hint_no: 'Verspätete oder fehlerhafte Meldung kann zu DSGVO-Bußgeldern bis 4% des Umsatzes führen',
    incident7: 'Compliance-Nachbereitung',
    incident7resp_advis: 'Luxgap (CyberAdvisory)',
    incident7resp_no: 'Sie – müssen Compliance selbst managen',
    incident7hint_no: 'NIS2, DSGVO-Dokumentation, Lessons Learned – alles bei Ihnen',
    coverageLabel: 'Ihr Schutzlevel',
    coverageMinimal: 'Minimaler Schutz',
    coverageBasic: 'Basis-Schutz',
    coverageGood: 'Guter Schutz',
    coverageStrong: 'Starker Schutz',
    coverageComplete: 'Umfassender Schutz',
    coverageMinimalDesc: 'Sie stehen bei einem Cyberangriff weitgehend alleine da.',
    coverageBasicDesc: 'Grundlegende Reaktion abgedeckt, aber erhebliche Lücken bleiben.',
    coverageGoodDesc: 'Gute Abdeckung – erwägen Sie die verbleibenden Services hinzuzufügen.',
    coverageStrongDesc: 'Starker Schutz – die meisten Szenarien sind abgedeckt.',
    coverageCompleteDesc: 'Umfassender Schutz über alle Phasen eines Cyber-Vorfalls.',
    socServiceTitle: 'SOC as a Service (RCarre)',
    socServiceDesc: '24/7 Überwachung Ihrer IT-Infrastruktur aus Luxemburg. Bedrohungserkennung, Alarmierung und Erstanalyse.',
    assistServiceTitle: 'CyberAssistance (Mixvoip)',
    assurServiceTitle: 'CyberAssurance (Le Foyer)',
    advisServiceTitle: 'CyberAdvisory (Luxgap)',
    basicServiceDesc: 'Geschäftszeiten-Support (Mo-Fr, 8-18h). Best-Effort-Reaktion. Triage, Core-User-Recovery, CNPD-Vorbereitung. Bis zu 25 Benutzer.',
    essentielServiceDesc: '24/7 Support mit 1 Stunde garantierter Reaktionszeit. Vollständige Forensik, Remediation, CNPD-Vorbereitung. Unbegrenzte Benutzer.',
    advancedServiceDesc: '24/7 Priority-Line mit 30 Min garantierter Reaktion. Vor-Ort-Support, Krisen-PR, VoIP-Betrugsschutz. Unbegrenzte Benutzer.',
    proServiceDesc: 'Dediziertes Team mit individuellem SLA. Alle Leistungen individuell auf Ihre Bedürfnisse zugeschnitten.',
    assurEssentielServiceDesc: 'Le Foyer übernimmt die Kosten für 2 Tage Mixvoip-Notfalleinsatz (Wert: 1.600€).',
    assurAdvancedServiceDesc: 'Le Foyer übernimmt die Kosten für 4 Tage Mixvoip-Notfalleinsatz (Wert: 3.200€).',
    assurProServiceDesc: 'Le Foyer Cyber Pro Vollvertrag. Umfassender Cyber-Versicherungsschutz inkl. finanzielle Verluste, Betriebsunterbrechung, Datenwiederherstellung und Rechtskosten.',
    advisStarterServiceDesc: 'Externer DPO: DSGVO-Konformität, Verarbeitungsregister, jährliche M365-Prüfung, 1 Pentest/Jahr, Phishing-Kampagne, Online-Schulungsportal.',
    advisBusinessServiceDesc: 'DPO + CISO: vollständiges Datenschutzverletzungsmanagement, CNPD-Meldung, wöchentliche Pentests, Dark-Web-Überwachung, regulatorische Audits inklusive.',
    advisExpertServiceDesc: 'DPO + CISO Vollabdeckung: alle Assets, IT-Team-Coaching, Risikomanagement, ISO 27001/EUROPRIVACY-Zertifizierung möglich.',
    noSocWarning: 'Ohne SOC-Überwachung können Angriffe tage- oder wochenlang unentdeckt bleiben.',
    noAssuranceWarning: 'Ohne CyberAssurance zahlen Sie die Einsatzkosten selbst (800€/Tag).',
    assuranceRecommendation: 'Wir empfehlen CyberAssurance hinzuzufügen, um Ihre Notfalleinsatzkosten abzudecken.',
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
  const [showIncident, setShowIncident] = useState(true);

  const hasOnRequest = assistance === 'pro' || assurance === 'pro';

  // Coverage score: 0-4 based on how many service areas are actively covered
  const coverageScore = useMemo(() => {
    let score = 0;
    if (soc !== 'none') score++;
    if (assistance !== 'basic') score++;
    if (assurance !== 'none') score++;
    if (advisory !== 'none') score++;
    return score;
  }, [soc, assistance, assurance, advisory]);

  const coverageInfo = useMemo(() => {
    if (coverageScore === 0) return { label: t.coverageMinimal, desc: t.coverageMinimalDesc, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', barColor: 'bg-red-500', icon: ShieldAlert };
    if (coverageScore === 1) return { label: t.coverageBasic, desc: t.coverageBasicDesc, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', barColor: 'bg-orange-500', icon: ShieldAlert };
    if (coverageScore === 2) return { label: t.coverageGood, desc: t.coverageGoodDesc, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', barColor: 'bg-amber-500', icon: Shield };
    if (coverageScore === 3) return { label: t.coverageStrong, desc: t.coverageStrongDesc, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', barColor: 'bg-emerald-500', icon: ShieldCheck };
    return { label: t.coverageComplete, desc: t.coverageCompleteDesc, color: 'text-[#50B848]', bg: 'bg-green-50', border: 'border-green-200', barColor: 'bg-[#50B848]', icon: ShieldCheck };
  }, [coverageScore, t]);

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
    } else if (assistance === 'advanced') {
      assistCost = users * 60;
    }

    // Assurance: flat per year
    if (assurance === 'essentiel') {
      assurCost = 120;
    } else if (assurance === 'advanced') {
      assurCost = 200;
    }

    // Advisory: monthly price × 12
    if (advisory === 'starter') {
      advisCost = 450 * 12;
    } else if (advisory === 'business') {
      advisCost = 828 * 12;
    } else if (advisory === 'expert') {
      advisCost = 1656 * 12;
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
    type StepType = {
      action: string;
      responsible: string;
      hint?: string;
      isCovered: boolean;
      isPartial?: boolean;
    };

    const steps: StepType[] = [
      // Step 1: Attack detected
      {
        action: t.incident1,
        responsible: soc !== 'none' ? t.incident1resp_soc : t.incident1resp_no,
        hint: soc === 'none' ? t.incident1hint_no : undefined,
        isCovered: soc !== 'none',
      },
      // Step 2: Report to Mixvoip
      {
        action: t.incident2,
        responsible: t.incident2resp,
        hint: t.incident2hint,
        isCovered: true,
        isPartial: assistance === 'basic',
      },
      // Step 3: Triage & first response
      {
        action: t.incident3,
        responsible: t.incident3resp,
        hint: assistance === 'basic' ? t.incident3hint_basic : assistance === 'essentiel' ? t.incident3hint_essentiel : assistance === 'advanced' || assistance === 'pro' ? t.incident3hint_advanced : t.incident3hint_basic,
        isCovered: true,
        isPartial: assistance === 'basic',
      },
      // Step 4: Forensics & remediation
      {
        action: t.incident4,
        responsible: t.incident4resp,
        hint: assistance === 'basic' ? t.incident4hint_basic : assistance === 'essentiel' ? t.incident4hint_essentiel : t.incident4hint_advanced,
        isCovered: true,
        isPartial: assistance === 'basic',
      },
      // Step 5: Who pays?
      {
        action: t.incident5,
        responsible: assurance !== 'none' ? t.incident5resp_assur : t.incident5resp_no,
        hint: assurance === 'none' ? t.incident5hint_no : assurance === 'essentiel' ? t.incident5hint_essentiel : t.incident5hint_advanced,
        isCovered: assurance !== 'none',
      },
      // Step 6: CNPD notification
      {
        action: t.incident6,
        responsible: advisory !== 'none' ? t.incident6resp_advis : assurance === 'pro' ? t.incident6resp_assurpro : t.incident6resp_no,
        hint: advisory === 'none' && assurance !== 'pro' ? t.incident6hint_no : undefined,
        isCovered: advisory !== 'none' || assurance === 'pro',
      },
      // Step 7: Compliance follow-up
      {
        action: t.incident7,
        responsible: advisory !== 'none' ? t.incident7resp_advis : t.incident7resp_no,
        hint: advisory === 'none' ? t.incident7hint_no : undefined,
        isCovered: advisory !== 'none',
      },
    ];
    return steps;
  };

  const totalColor = coverageScore === 0 ? 'text-red-600' : coverageScore <= 1 ? 'text-orange-600' : coverageScore <= 2 ? 'text-amber-600' : 'text-[#50B848]';
  const borderColor = coverageScore === 0 ? 'border-red-300' : coverageScore <= 1 ? 'border-orange-300' : coverageScore <= 2 ? 'border-amber-300' : 'border-[#50B848]';

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
                {([['basic', t.assistBasic, t.assistBasicDesc], ['essentiel', t.assistEssentiel, t.assistEssentielDesc], ['advanced', t.assistAdvanced, t.assistAdvancedDesc], ['pro', t.assistPro, t.assistProDesc]] as const).map(([val, label, desc]) => (
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
                {([['none', t.assurNone, ''], ['essentiel', t.assurEssentiel, t.assurEssentielDesc], ['advanced', t.assurAdvanced, t.assurAdvancedDesc], ['pro', t.assurPro, t.assurProDesc]] as const).map(([val, label, desc]) => (
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
                {([['none', t.advisNone, ''], ['starter', t.advisStarter, t.advisStarterDesc], ['business', t.advisBusiness, t.advisBusinessDesc], ['expert', t.advisExpert, t.advisExpertDesc]] as const).map(([val, label, desc]) => (
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
              {/* Coverage Score */}
              <div className={`rounded-xl border-2 ${coverageInfo.border} ${coverageInfo.bg} p-5`}>
                <div className="flex items-center gap-2 mb-2">
                  <coverageInfo.icon className={`h-5 w-5 ${coverageInfo.color}`} />
                  <span className={`font-bold text-sm ${coverageInfo.color}`}>{t.coverageLabel}</span>
                </div>
                <div className={`text-lg font-bold ${coverageInfo.color} mb-1`}>{coverageInfo.label}</div>
                <p className="text-xs text-slate-600 mb-3">{coverageInfo.desc}</p>
                {/* Coverage bar */}
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full transition-all duration-500 ${coverageInfo.barColor}`} style={{ width: `${(coverageScore / 4) * 100}%` }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-slate-400">0/4</span>
                  <span className={`text-[10px] font-medium ${coverageInfo.color}`}>{coverageScore}/4</span>
                </div>
              </div>

              {/* Price Card */}
              <div className={`bg-white rounded-xl shadow-lg border-2 ${borderColor} p-6`}>
                <h3 className="font-bold text-lg text-slate-900 mb-4">{t.totalYear}</h3>
                
                {/* Line items */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5 text-[#FF8C00]" /> SOCaaS
                    </span>
                    <span className={`font-medium ${soc === 'none' ? 'text-slate-400' : ''}`}>
                      {soc === 'none' ? '—' : `${formatPrice(calculation.soc)}€`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-[#E63946]" /> CyberAssistance
                    </span>
                    <span className={`font-medium ${assistance === 'basic' ? 'text-slate-400' : ''}`}>
                      {assistance === 'basic' ? '0€ (Basic)' : assistance === 'pro' ? t.onRequest : `${formatPrice(calculation.assistance)}€`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Scale className="h-3.5 w-3.5 text-[#2563EB]" /> CyberAssurance
                    </span>
                    <span className={`font-medium ${assurance === 'none' ? 'text-slate-400' : ''}`}>
                      {assurance === 'none' ? '—' : assurance === 'pro' ? t.onRequest : `${formatPrice(calculation.assurance)}€`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-[#7C3AED]" /> CyberAdvisory
                    </span>
                    <span className={`font-medium ${advisory === 'none' ? 'text-slate-400' : ''}`}>
                      {advisory === 'none' ? '—' : `${formatPrice(calculation.advisory)}€`}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  {hasOnRequest ? (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{t.onRequest}</div>
                      <a href="https://voxbi.me/mixvoip" target="_blank" rel="noopener noreferrer" className="text-xs text-[#00B050] hover:underline mt-1 inline-block">{t.contactUs}</a>
                      {calculation.total > 0 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          + {formatPrice(calculation.total)}€ {t.perYear}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${totalColor}`}>{formatPrice(calculation.total)}€</div>
                      <div className="text-sm text-muted-foreground">{t.perYear}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ≈ {formatPrice(Math.round(calculation.total / 12))}€ {t.perMonth}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Incident Flow – always visible by default */}
              <button
                onClick={() => setShowIncident(!showIncident)}
                className="w-full bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between hover:bg-slate-800 transition-colors"
              >
                <span className="font-semibold text-sm">{t.incidentFlow}</span>
                {showIncident ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>

              {showIncident && (
                <div className="bg-white rounded-xl shadow-sm border p-5">
                  <div className="space-y-1">
                    {getIncidentSteps().map((step, i) => (
                      <div key={i} className={`flex items-start gap-3 p-2.5 rounded-lg ${!step.isCovered ? 'bg-red-50' : step.isPartial ? 'bg-amber-50' : 'bg-green-50'}`}>
                        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          !step.isCovered ? 'bg-red-600 text-white' : step.isPartial ? 'bg-amber-500 text-white' : 'bg-[#50B848] text-white'
                        }`}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-slate-900">{step.action}</div>
                          <div className={`text-xs mt-0.5 font-medium ${
                            !step.isCovered ? 'text-red-700' : step.isPartial ? 'text-amber-700' : 'text-[#50B848]'
                          }`}>
                            {!step.isCovered ? <span className="inline-flex items-center gap-1"><XCircle className="h-3 w-3" /> {step.responsible}</span> :
                             step.isPartial ? <span className="inline-flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {step.responsible}</span> :
                             <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {step.responsible}</span>}
                          </div>
                          {step.hint && (
                            <div className={`text-[11px] mt-1 italic ${!step.isCovered ? 'text-red-600' : step.isPartial ? 'text-amber-600' : 'text-slate-500'}`}>
                              {step.hint}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
                      <div className="font-semibold text-slate-700">{t.assistServiceTitle} – {assistance === 'basic' ? 'Basic' : assistance === 'essentiel' ? 'Essentiel' : assistance === 'advanced' ? 'Advanced' : 'Pro'}</div>
                      <div className="text-muted-foreground">
                        {assistance === 'basic' ? t.basicServiceDesc : assistance === 'essentiel' ? t.essentielServiceDesc : assistance === 'advanced' ? t.advancedServiceDesc : t.proServiceDesc}
                      </div>
                    </div>
                  </div>
                  {assurance !== 'none' && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-700">{t.assurServiceTitle} – {assurance === 'essentiel' ? 'Essentiel' : assurance === 'advanced' ? 'Advanced' : 'Pro'}</div>
                        <div className="text-muted-foreground">
                          {assurance === 'essentiel' ? t.assurEssentielServiceDesc : assurance === 'advanced' ? t.assurAdvancedServiceDesc : t.assurProServiceDesc}
                        </div>
                      </div>
                    </div>
                  )}
                  {advisory !== 'none' && (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#7C3AED] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-700">{t.advisServiceTitle} – {advisory === 'starter' ? 'Starter' : advisory === 'business' ? 'Business' : 'Expert'}</div>
                        <div className="text-muted-foreground">
                          {advisory === 'starter' ? t.advisStarterServiceDesc : advisory === 'business' ? t.advisBusinessServiceDesc : t.advisExpertServiceDesc}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
