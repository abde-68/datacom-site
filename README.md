# DATACOM — Refonte du site vitrine

Site **Astro + TypeScript + Tailwind CSS** de DATACOM SASU : électricité, fibre optique et plomberie.

Refonte préparée à partir de la branche `feat/site-datacom`, commit de départ `f6b9c99190fc52b395a1377a4aeb5408dc16c84d`.

## Démarrer

Prérequis : Node.js 20 ou version ultérieure et npm.

```bash
npm ci
npm run dev
```

Le projet conserve sa configuration GitHub Pages : ouvrir **http://localhost:4321/datacom/**.
Les liens et les médias utilisent `withBase()` pour respecter ce sous-répertoire. Pour un domaine sans sous-répertoire, remplacer `base: '/datacom'` par `base: '/'` dans `astro.config.mjs`, puis reconstruire le site.

## Vérifications

```bash
npm run check
npm run lint
npm run build
npm test
npm exec playwright install chromium
npm run test:e2e
```

Si Chromium est déjà installé, définir `CHROMIUM_PATH` avec le chemin de son exécutable. Les tests navigateur démarrent l’aperçu Astro si nécessaire. Ils couvrent les 11 routes sur ordinateur (1 440 px) et sur mobile (390 px), les ressources, les liens internes, les contrôles d’accessibilité axe, la navigation au clavier, la FAQ, les préférences de mouvement, le fonctionnement sans JavaScript et les réponses du formulaire **simulées localement**.

## Structure

- `src/components/` : en-tête, pied de page, hero, cartes, page de service, appel à l’action et script de transitions réutilisable.
- `src/data/site.ts` : identité, coordonnées et navigation.
- `src/data/services.ts` : expertises, prestations, engagements et méthode.
- `src/utils/paths.ts` : chemins compatibles avec le sous-répertoire de déploiement.
- `src/pages/` : accueil, à propos, services, électricité, fibre optique, plomberie, FAQ, contact, mentions légales, confidentialité et page 404.
- `public/images/` : cinq photographies générées par IA, converties en WebP (environ 460 Ko au total).
- `public/fonts/` : Open Sans auto-hébergée et licence SIL Open Font License.
- `tests/` : tests unitaires et tests navigateur.

L’ancienne page de galerie et le composant d’images provisoires ont été supprimés. Aucun lien de navigation ne pointe vers cette ancienne page.

## Direction artistique

Mise en page inspirée de TR Ingénierie : header blanc, typographie Open Sans, hero photographique éclairci, lecture progressive, grandes respirations, cartes à photographie, boutons bleu marine et footer sombre. Palette DATACOM : bleu `#0A4FFF`, bleu marine `#0B1F3A`, jaune `#FFD100`.

Le logo **DC GROUP** retenu pour cet essai reprend le monogramme angulaire bleu marine et bleu électrique, avec GROUP en petit dessous. Les fichiers PNG détourés sont `public/logo-dc-group.png` et `public/logo-dc-group-light.png` (variante claire pour le pied de page). Il s’agit d’images matricielles, non de fichiers vectoriels ; prévoir une version vectorielle validée pour les usages imprimés.

Les photos générées sont des illustrations : elles ne prouvent ni l’identité d’un salarié ni une intervention réalisée par DATACOM. Cette précision est également présente dans la page de confidentialité. Aucun texte ni visuel du site de référence n’a été copié dans le projet ; les visuels ont été générés et les textes rédigés pour DATACOM.

## Transitions et accessibilité

Le composant `Motion.astro` gère les apparitions au défilement avec `IntersectionObserver`, le décalage des cartes, l’entrée progressive du hero, la parallaxe légère et l’en-tête compact. Aucun framework JavaScript d’animation n’est ajouté.

`prefers-reduced-motion` désactive toutes les animations, les transitions, le zoom, la parallaxe et le défilement animé. Sans JavaScript, le contenu reste visible et une navigation mobile de remplacement est disponible.

## À renseigner avant publication

Dans `src/data/site.ts` :

- téléphone et `telephoneLien` au format international ;
- e-mail, adresse, horaires et zone d’intervention réelle ;
- SIRET, responsable de la publication et hébergeur ;
- liens vers les réseaux sociaux si nécessaire.

Les coordonnées absentes sont masquées dans le footer. Le bouton « Appeler maintenant » renvoie vers les informations de contact tant que le numéro n’a pas été renseigné ; aucun numéro fictif n’est utilisé.

Faire valider le récit de création, les prestations, les engagements éditoriaux, le logo, les mentions légales et la politique de confidentialité par l’entreprise. Aucun avis, chiffre d’ancienneté, label, certification ou ville n’a été inventé.

## Formulaire de devis : état réel

**Le dépôt d’origine ne disposait pas d’un service d’envoi opérationnel.** Le formulaire n’affiche plus de faux succès et n’efface plus les données sans réponse du serveur.

Pour activer l’envoi :

1. Configurer un service HTTPS de réception des demandes.
2. Copier `.env.example` vers `.env` et renseigner `PUBLIC_DEVIS_ENDPOINT` avec son URL publique.
3. Le service doit accepter un `POST` multipart (`FormData`), les photos éventuelles et les requêtes du domaine du site ; il doit renvoyer un statut HTTP 2xx uniquement si la demande est acceptée. Configurer CORS et une protection anti-spam côté serveur.
4. Renseigner les coordonnées de contact et compléter la politique de confidentialité (prestataire, conservation et éventuels transferts).
5. Reconstruire le site, puis effectuer un test réel avec les données de l’entreprise.

Sans cette configuration, l’envoi est explicitement désactivé. Les tests d’envoi utilisent exclusivement des réponses simulées, sans transmission à un tiers. Le formulaire conserve ses données en cas d’échec ; la confirmation ne s’affiche qu’après une réponse HTTP positive.

`PUBLIC_DEVIS_ENDPOINT` est public. **Ne jamais y placer une clé secrète.** Les anciennes variables d’exemple pour un service serveur restent disponibles dans `.env.example` ; elles ne constituent pas un serveur d’envoi implémenté.

## Déploiement

La configuration existante de déploiement est conservée. Vérifier le domaine, le sous-répertoire, le fichier `public/robots.txt`, les coordonnées et les informations légales avant toute publication. Cette livraison ne déclenche aucune mise en production.

## Guide pas à pas : publication et e-mail professionnel

Voir `docs/MISE-EN-LIGNE.md` pour les commandes Git, les réglages GitHub Pages et la configuration de Formspree. Le workflow lit les variables de dépôt `PUBLIC_DEVIS_ENDPOINT` et `PUBLIC_DEVIS_PHOTOS_ENABLED`. Les photos ne sont proposées que si cette dernière vaut `true`. Les variables serveur `CONTACT_EMAIL` et `RESEND_API_KEY` ne sont pas utilisées par le site statique : les renseigner seules ne déclenche aucun envoi.
