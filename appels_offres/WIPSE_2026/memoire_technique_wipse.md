# Mémoire Technique
**Fourniture d'une solution Internet et téléphonie hébergée sur IP pour les quatre pépinières d'entreprises de la SPL WIPSE**

**Version :** 1.0
**Date de mise à jour :** 02 Juin 2026
**Soumissionnaire :** Mixvoip S.A.

---

## Table des matières
1. Présentation de Mixvoip
2. Architecture à mettre en œuvre
3. Exigences relatives aux accès Internet
4. Prestations de téléphonie attendues
5. Services opérateur
6. Administration, supervision et statistiques
7. Mise en œuvre et plan de migration
8. Support, exploitation et maintenance
9. Continuité de service et Garantie de Temps de Rétablissement (GTR)
10. Évolutivité
11. Références clients

---

## 1. Présentation de Mixvoip

Mixvoip S.A. est un opérateur télécom fondé en 2008, régulé par l'ARCEP en France, l'IBPT en Belgique et l'ILR au Luxembourg. L'entreprise est présente dans plusieurs pays européens et dispose d'une expertise reconnue dans la fourniture de services de téléphonie hébergée et d'accès Internet professionnels.

Mixvoip est à la fois opérateur télécom, fournisseur d'accès Internet pour professionnels et intégrateur de solutions de téléphonie. L'entreprise conçoit, développe et héberge sa propre solution de central téléphonique cloud : **Voxbi**.

| Chiffres clés de Mixvoip | Détails |
|---|---|
| **Collaborateurs** | Plus de 86 collaborateurs dont 36 ingénieurs |
| **Clients** | Plus de 5 000 clients professionnels en Europe |
| **Extensions actives** | Plus de 20 000 extensions actives |
| **Chiffre d'affaires 2024 (Groupe)** | 11 M€ |

Mixvoip dispose d'une forte présence dans les administrations publiques, les collectivités territoriales, les pépinières d'entreprises et les structures multi-sites. Notre indépendance décisionnelle et la stabilité de notre actionnariat garantissent une continuité de service à long terme.

## 2. Architecture à mettre en œuvre

La solution proposée pour la SPL WIPSE repose sur notre offre **Voxbi Cloud PBX**, un système téléphonique professionnel 100% cloud, interconnecté avec notre réseau Internet professionnel haute disponibilité.

### Architecture Globale

L'architecture s'appuie sur un modèle cloud centralisé, éliminant le besoin de matériel de central sur les quatre sites de WIPSE (Villebon-sur-Yvette, Gif-sur-Yvette, Orsay et Palaiseau). Les quatre pépinières sont connectées à la même plateforme cloud, assurant une interconnexion totale, une redondance native et une gestion centralisée.

**Composants clés de l'architecture :**
- **Cloud PBX Voxbi :** Hébergé sur notre infrastructure multi-datacenter en Europe (SLA 99,9%). Le serveur d'appels est dimensionné pour supporter sans limite le parc actuel (plus de 200 postes) et les évolutions futures.
- **Accès Internet :** 4 accès FTTO dédiés et 4 liens de secours 5G (détails en section 3).
- **Réseau voix :** Sécurisé via SIP TLS (signalisation) et SRTP (audio). La Qualité de Service (QoS) est garantie par nos routeurs managés qui priorisent les flux téléphoniques.
- **Postes IP :** La solution est totalement compatible avec les postes existants (Polycom VVX301/VVX411 et Yealink T42S/T46S). Les postes s'appuieront sur le câblage réseau existant (Cat 5 et 6).

### Compatibilité avec l'existant

La solution Voxbi est parfaitement compatible avec les infrastructures réseau existantes de WIPSE, notamment les commutateurs Cisco managés via Meraki, PoE et cloud-manageables. Aucun remplacement de matériel réseau n'est nécessaire pour le fonctionnement de notre solution.

## 3. Exigences relatives aux accès Internet

Afin de garantir une qualité de service optimale pour la téléphonie, les postes informatiques et le Wi-Fi, Mixvoip propose des accès Internet professionnels très haut débit avec redondance pour chaque site.

### Accès Fibre Optique Professionnelle (FTTO)

Nous fournissons des liaisons Fibre To The Office (FTTO) à débit garanti et symétrique :

| Site | Type de lien principal | Débit garanti | Solution de secours |
|---|---|---|---|
| **Villebon-sur-Yvette** | FTTO | 1 Gbps | Routeur 5G |
| **Gif-sur-Yvette** | FTTO | 1 Gbps | Routeur 5G |
| **Orsay** | FTTO | 1 Gbps | Routeur 5G |
| **Palaiseau** | FTTO | 1 Gbps (Surclassement de l'exigence de 300 Mbps) | Routeur 5G |

### Caractéristiques techniques des accès Internet

- **Routeur managé :** Fourniture et gestion d'un routeur professionnel sur chaque site, assurant la différenciation et la priorisation (QoS) des flux téléphoniques par rapport aux flux de données.
- **IP publique fixe :** Attribution d'une adresse IP publique fixe indépendante du lien, commune au lien optique et au lien de secours LTE (5G). Le maintien de l'adressage IP est garanti en cas de bascule sur le lien de secours.
- **Solution de secours 5G :** Chaque site est équipé d'un routeur 5G. En cas de coupure de la fibre optique, le basculement est automatique et transparent, assurant la continuité des services Internet et téléphoniques.

## 4. Prestations de téléphonie attendues

La solution Voxbi Cloud PBX répond à l'intégralité des exigences fonctionnelles du CCTP et permet l'exploitation de l'ensemble des fonctionnalités offertes par les postes téléphoniques existants (Polycom et Yealink).

### Fonctionnalités de base et avancées

- **Gestion des appels :** Rappel des derniers appelants/appelés, rappel automatique sur non-réponse/occupation, interception d'appels, transfert aveugle et supervisé.
- **Restrictions et renvois :** Restriction des appels sortants selon les profils, gestion des renvois d'appels selon les profils utilisateurs sans surcoût.
- **Messagerie :** Messagerie vocale individuelle et de groupe, messagerie intégrée avec réception des messages vocaux par courriel (Voicemail to Email), fonctions de répondeur/enregistreur.
- **Accueil téléphonique et SVI :** Accueil téléphonique avec message d'attente, gestion de files d'attente multiples, Serveur Vocal Interactif (SVI) multi-niveaux avec annonces personnalisables.
- **Confidentialité :** Confidentialité des accès par code personnel, enregistrement des communications (optionnel, conforme RGPD).

### Interconnexion et Accueil mutualisé

L'interconnexion de tous les téléphones entre tous les sites est native. Les appels internes sont gratuits.
L'accueil téléphonique est mutualisé : les postes opérateurs de chaque site (Polycom et Yealink) fonctionnent comme standard pour l'ensemble des pépinières.
Pour les entreprises en domiciliation disposant uniquement d'un numéro SDA, le nom de la société appelée s'affiche en clair sur l'écran du poste opérateur, permettant un accueil personnalisé dès le décroché.

### Softphone et Application Mobile

Chaque utilisateur peut utiliser un ordinateur comme poste téléphonique via notre softphone (PC/Mac/WebRTC) ou notre application mobile (iOS/Android). Ces applications offrent les mêmes fonctionnalités que le poste fixe.

### Gestion des licences

Le modèle de facturation de Mixvoip est transparent : le coût total des licences est calculé uniquement sur la base du nombre de postes effectivement connectés. Les postes en stock (non raccordés) peuvent être mis en service par WIPSE en toute autonomie, sans frais d'intervention, moyennant uniquement l'activation d'une licence supplémentaire.

### Terminaux complémentaires

En cas de besoin de renouvellement ou d'extension, Mixvoip propose une gamme complète de terminaux compatibles :
- **Fixe filaire et Wi-Fi :** Yealink série T5 (ex: T53W, T54W)
- **Sans fil DECT :** Solutions multicellulaires Yealink ou Gigaset
- **Casques :** Gammes professionnelles Jabra et Plantronics
- **Audioconférence (Pieuvre) :** Yealink CP925 / CP965

## 5. Services opérateur

Mixvoip, en tant qu'opérateur télécom, assure l'acheminement de l'ensemble des communications avec une qualité optimale.

- **Portabilité :** Les numéros de ligne et les numéros SDA existants seront reconduits. Mixvoip prend en charge l'intégralité des formalités administratives et techniques de portabilité.
- **Communications entrantes :** Acheminées sans frais pour WIPSE, quelle que soit l'origine de l'appel.
- **Qualité de service :** Voix numérique 64 Kbps (codec G.711/G.722), absence totale d'écho et de diaphonie, délai d'établissement des communications inférieur à 5 secondes.
- **Appels sortants :** Absence de limitation de durée des communications. Acheminement vers les postes fixes et mobiles nationaux et internationaux selon notre bordereau de prix compétitif.

## 6. Administration, supervision et statistiques

La solution intègre **Cockpit**, une interface web complète et intuitive permettant l'administration centralisée des quatre sites.

### Administration en autonomie

L'interface web permet :
- La configuration homogène des services sur l'ensemble du parc.
- La commande et la résiliation des services.
- L'accès à l'inventaire du parc en temps réel.
- La déclaration et le suivi des incidents.
- L'accès centralisé aux factures.

WIPSE pourra définir des profils types de configuration, verrouillables sur le serveur d'appels. Ces profils seront automatiquement diffusés lors de l'initialisation des postes. L'administrateur conserve la possibilité d'écraser les personnalisations pour revenir à la configuration type.

### Supervision et Statistiques

Le Cockpit intègre des outils de supervision de l'état de bon fonctionnement et de contrôle de la qualité de la voix.
La plateforme offre des fonctionnalités complètes de taxation et de statistiques d'usage, avec export des données sous formats standards (PDF, CSV, XLS) pour intégration dans vos outils d'analyse financière.

## 7. Mise en œuvre et plan de migration

Mixvoip assure une prestation "clés en main" garantissant la continuité de service.

### Initialisation du projet

Une réunion de lancement sera organisée dans la semaine suivant la notification du marché pour définir l'organisation, arrêter l'architecture, préparer les bons de souscription, organiser les étapes de déploiement et établir le planning prévisionnel.

### Chef de projet dédié

Un chef de projet unique sera désigné dans un délai maximal d'une semaine après validation des bons de souscription. Il assurera la planification, le suivi et la coordination du déploiement. Un point téléphonique hebdomadaire sera réalisé avec compte-rendu.

### Plan de migration

1. **Audit et Prérequis :** Visite des sites, validation des prérequis techniques (alimentation électrique, emplacements, brassage LAN) à la charge de WIPSE.
2. **Configuration :** Paramétrage du Cloud PBX, création des profils, configuration des accès Internet et routeurs.
3. **Déploiement Internet :** Installation des accès FTTO et routeurs 5G. Tests de bascule.
4. **Déploiement Téléphonie :** Reprise des postes existants, provisionnement, tests d'appels internes/externes.
5. **Portabilité et Bascule :** Bascule des numéros SDA coordonnée avec l'ancien opérateur pour garantir une interruption de service quasi-nulle.
6. **Procédure de retour en arrière (Rollback) :** En cas d'anomalie critique lors de la bascule, maintien temporaire des anciennes liaisons le temps de la résolution.

Toute intervention sur site sera notifiée 48h à l'avance et réalisée pendant les heures ouvrables (9h-12h, 13h30-17h).

### Formation

À l'issue du déploiement, Mixvoip assurera la formation de 10 agents exploitants (configuration, diagnostic, administration, rapports). Cette formation de 3 demi-journées sera réalisée sur chaque site. Des supports de formation seront fournis pour permettre à l'exploitant de former les utilisateurs finaux.

## 8. Support, exploitation et maintenance

Mixvoip met en place une organisation de support réactive et de proximité.

- **Guichet unique :** Un point de contact unique pour tout incident, assistance ou demande d'information.
- **Support multicanal :** Signalement par téléphone, courriel ou via notre portail client extranet.
- **Disponibilité :** Support accessible du lundi au vendredi de 8h00 à 18h00. Les appels vers le guichet unique sont gratuits ou au prix d'un appel local.
- **Suivi :** La clôture de chaque incident fait l'objet d'une information par courriel.

Deux réunions de suivi annuelles seront organisées sur site pour aborder les incidents, l'exploitation, les évolutions conseillées et les nouveaux services. Un compte-rendu synthétique sera transmis.

## 9. Continuité de service et Garantie de Temps de Rétablissement (GTR)

Mixvoip s'engage sur des délais de rétablissement stricts pour garantir la continuité des activités de WIPSE.

### Téléphonie (SLA 99,9%)

- **Incident bloquant** (impossible d'utiliser la solution ou une fonction essentielle) : GTR de **4 heures ouvrables**.
- **Incident semi-bloquant** : GTR de 8 heures ouvrables.
- **Incident non bloquant** : GTR de 5 jours ouvrables.

### Internet

- **Incident bloquant** (impossible d'utiliser Internet ou une fonction essentielle) : GTR de **4 heures ouvrables**.
- **Incident semi-bloquant** : GTR de 8 heures ouvrables.
- **Incident non bloquant** : GTR de 5 jours ouvrables.

La GTR s'applique dès la première demande au guichet unique. La maintenance inclut la fourniture par échange standard de toutes pièces reconnues défectueuses constitutives de l'installation (routeur, etc.), la main d'œuvre, les déplacements et les matériels de tests.

## 10. Évolutivité

La solution Voxbi est nativement évolutive. WIPSE pourra augmenter ou diminuer le nombre de postes utilisateurs en fonction de ses besoins, sans remise en cause de l'architecture globale. L'ajout de nouvelles pépinières ou de nouveaux services (intégration CRM, fonctionnalités IA) se fait de manière logicielle, avec une souplesse totale.

## 11. Références clients

Mixvoip possède une solide expérience dans le déploiement de solutions télécoms pour les collectivités publiques et les structures multi-sites.

- **Administration communale de Fleurus :** Déploiement de la téléphonie hébergée Voxbi sur de multiples sites communaux.
- **Zone de Police Boraine :** Solution de téléphonie sécurisée et hautement disponible pour 5 communes.
- **CPAS Leuze-en-Hainaut & Quaregnon :** Gestion de la téléphonie cloud avec intégration de solutions de mobilité pour le personnel soignant et administratif.
- **Multiples centres d'affaires et pépinières :** Fourniture de connectivité FTTO redondée et de téléphonie avec facturation distincte pour les locataires.

---
*Fin du document*
