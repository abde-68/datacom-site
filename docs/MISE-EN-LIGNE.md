# Publier DATACOM et recevoir les demandes par e-mail

## 1. Ce qui est prêt et ce qui manque

- Le site est statique : GitHub Pages héberge les pages, pas un serveur d’envoi d’e-mails.
- Le formulaire peut transmettre les demandes à un service externe HTTPS, puis ce service notifie l’adresse professionnelle choisie.
- La solution proposée ici est Formspree. Aucun compte ni abonnement n’a été créé pour vous et aucun envoi réel n’a été effectué.
- Il faut encore configurer un vrai formulaire chez le prestataire, vérifier l’adresse destinataire et renseigner ses réglages. Une adresse e-mail seule dans le code ne suffit pas.
- Compléter aussi `src/data/site.ts`, les mentions légales et la politique de confidentialité avant publication. L’adresse affichée sur le site et l’adresse destinataire chez Formspree sont deux réglages distincts.

## 2. Récupérer les modifications

Ce patch contient TOUTE la refonte, y compris les dernières corrections. Il est basé sur le commit `f6b9c99190fc52b395a1377a4aeb5408dc16c84d` de `feat/site-datacom`.

Ne pas cumuler les anciens patchs avec celui-ci. Si une livraison précédente est déjà appliquée, ne pas réappliquer le patch complet : demander un patch différentiel ou comparer l’archive avec le dépôt. Ne jamais écraser des modifications locales non sauvegardées.

Dans un clone propre du dépôt :

```bash
git switch feat/site-datacom
git status
git apply --check /chemin/vers/datacom-refonte-final.patch
git apply /chemin/vers/datacom-refonte-final.patch
npm ci
npm run check
npm run lint
npm test
npm run build
npm run dev
```

Remplacer `/chemin/vers/` par le dossier du téléchargement. Si `git apply --check` échoue, s’arrêter : ne pas forcer. En local, ouvrir `http://localhost:4321/datacom/`.

L’archive ZIP est une alternative pour examiner les fichiers complets. Elle ne contient pas de dossier `.git` ; ce n’est pas un clone prêt à pousser. Ne pas utiliser `dist/` ou `node_modules/` comme fichiers source à committer.

## 3. Créer la réception des demandes dans Formspree

1. Ouvrir https://formspree.io/ et créer un compte, ou se connecter.
2. Créer un nouveau formulaire, par exemple « Devis DATACOM ».
3. Dans ses réglages de notification, choisir l’adresse e-mail professionnelle qui doit recevoir les demandes. Effectuer la vérification de l’adresse si le service la demande.
4. Copier l’URL publique du formulaire affichée par Formspree, au format `https://formspree.io/f/IDENTIFIANT_REEL`. Ne pas utiliser littéralement cet exemple.
5. Activer/configurer les protections anti-spam côté Formspree. Le champ piège `_gotcha` du site est prévu pour ce service ; le contrôle navigateur seul n’est pas une protection suffisante.
6. Vérifier les quotas du forfait et les paramètres de notification. Les demandes acceptées peuvent être consultées dans la boîte de réception Formspree ; les notifications sont envoyées à l’adresse configurée.

Aucun mot de passe de messagerie et aucune clé SMTP ne doivent être ajoutés au site, à GitHub ou au formulaire. Le visiteur n’a pas besoin d’ouvrir son logiciel de messagerie.

### Photos facultatives

Les photos sont masquées par défaut pour éviter de proposer une fonction non prise en charge par votre forfait. Les fichiers sont disponibles sur les forfaits compatibles de Formspree, à vérifier avant activation. Les notifications contiennent des liens vers les fichiers stockés chez le prestataire, pas nécessairement des pièces jointes attachées à l’e-mail.

Activer l’option seulement après vérification du forfait, des limites, de la conservation et des droits d’accès aux fichiers. Ne pas demander de documents sensibles dans ce formulaire.

## 4. Configurer le site en local

Copier `.env.example` en `.env`, puis renseigner :

```dotenv
PUBLIC_DEVIS_ENDPOINT=https://formspree.io/f/IDENTIFIANT_REEL
PUBLIC_DEVIS_PHOTOS_ENABLED=false
```

Mettre `true` uniquement si l’envoi de photos est pris en charge. Ne jamais committer `.env`. `PUBLIC_DEVIS_ENDPOINT` est une URL publique, pas une clé secrète. Les variables `CONTACT_EMAIL` et `RESEND_API_KEY` présentes comme anciens exemples ne sont pas utilisées : il n’y a pas de backend Resend dans ce projet.

Relancer le serveur de développement après modification de `.env`. Pour un aperçu de production, reconstruire le site avec `npm run build`, puis `npm run preview`.

## 5. Configurer GitHub Pages

Dans le dépôt `abde-68/datacom` sur GitHub :

1. **Settings → Pages → Build and deployment → Source : GitHub Actions.**
2. **Settings → Secrets and variables → Actions → Variables → New repository variable.** Créer `PUBLIC_DEVIS_ENDPOINT` et y coller l’URL Formspree réelle.
3. Créer également `PUBLIC_DEVIS_PHOTOS_ENABLED`, avec la valeur `false` (ou `true` si les photos sont bien prises en charge).
4. Si l’environnement `github-pages` restreint les branches autorisées, autoriser `feat/site-datacom` ou adapter votre politique de déploiement.

Le workflow `.github/workflows/deploy.yml` transmet ces variables au build Astro. Le fichier `.env` local n’est pas envoyé à GitHub : le remplir localement ne configure pas la production.

La configuration actuelle est :

- `site: 'https://abde-68.github.io/'`
- `base: '/datacom'`
- URL attendue après déploiement réussi : `https://abde-68.github.io/datacom/`

Dans `public/robots.txt`, l’URL de sitemap a été réglée sur `https://abde-68.github.io/datacom/sitemap-index.xml` pour cette adresse. Si vous choisissez un domaine personnalisé, adapter `site`, `base`, le sitemap et les réglages DNS avant publication.

## 6. Committer et publier

**Attention : le push sur `feat/site-datacom` déclenche le déploiement prévu par le workflow.** Vérifier auparavant les informations légales, les coordonnées et les réglages du formulaire.

```bash
git status
git diff --stat
git add -A
git diff --cached --stat
git commit -m "Refonte DATACOM, histoire des associés et formulaire de devis"
git push -u origin feat/site-datacom
```

Contrôler la liste des fichiers avant le commit ; aucun `.env`, secret ou fichier personnel ne doit apparaître. Le push nécessite votre propre accès GitHub en écriture.

Dans l’onglet **Actions**, ouvrir « Deploy Astro to GitHub Pages » et attendre la réussite des étapes de compilation et de publication. L’adresse publiée apparaît aussi dans **Settings → Pages**.

Changer ensuite une variable ne modifie pas les pages déjà compilées. Relancer le workflow depuis **Actions → Deploy Astro to GitHub Pages → Run workflow**, en sélectionnant la bonne branche.

## 7. Tester la réception réelle

1. Ouvrir la page Contact sur l’adresse publique, pas seulement en local.
2. Vérifier que le bouton d’envoi est actif. S’il reste désactivé, vérifier la variable `PUBLIC_DEVIS_ENDPOINT` et relancer le déploiement.
3. Envoyer une demande de test clairement identifiée avec votre propre adresse et des données fictives non sensibles.
4. Vérifier la demande dans Formspree, puis dans la boîte e-mail professionnelle, y compris les indésirables.
5. Vérifier que les coordonnées et le message sont complets et qu’il est possible de répondre au bon client. Si les photos sont activées, tester aussi leur accès.
6. Si le message est présent chez Formspree mais absent de la messagerie, vérifier la notification destinataire, la vérification de l’adresse et les filtres de la messagerie. S’il n’est pas présent chez Formspree, vérifier l’URL, l’erreur de soumission et les quotas.

Une confirmation du site signifie que le service a accepté la demande ; elle ne garantit pas à elle seule la livraison dans la boîte e-mail. Les tests automatisés livrés utilisent des réponses simulées et ne prouvent pas la réception réelle.

## 8. Confidentialité avant activation

Renseigner le prestataire effectivement choisi, la durée de conservation, les personnes habilitées, le contact pour les droits RGPD et les éventuels transferts hors de l’Union européenne. Vérifier les conditions contractuelles et de protection des données du prestataire avant activation.

## Documentation de référence

- Astro / GitHub Pages : https://docs.astro.build/en/guides/deploy/github/
- Formspree : https://formspree.io/
- Fichiers : https://help.formspree.io/articles/building-your-form/file-uploads
- Forfaits : https://formspree.io/plans
