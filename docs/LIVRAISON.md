# Livraison de la refonte DATACOM

## État

Refonte réalisée localement à partir du commit `f6b9c99190fc52b395a1377a4aeb5408dc16c84d` de `feat/site-datacom`. **Aucun push et aucun déploiement effectués** : l’environnement ne dispose pas d’une authentification GitHub autorisant l’écriture.

## Modifications

- Navigation : Accueil, À propos, Nos services, FAQ, Contact ; suppression de la page de galerie et de ses liens.
- Accueil : présentation de l’entreprise, aperçu de l’histoire, trois cartes d’expertise, engagements, demande de devis.
- Histoire complétée : rencontre de l’ingénieur avec ses futurs associés et décision commune de créer DATACOM ; résumé cohérent sur l’accueil.
- Pages de services harmonisées et ajout de la plomberie.
- Footer avec domaines d’intervention, liens utiles, contact et informations légales.
- Cinq images générées et optimisées en WebP, textes alternatifs français.
- Nouveau logo DC GROUP : grand monogramme angulaire, GROUP discret en dessous ; PNG transparent et variante claire, logo du menu réduit à logo agrandi avec GROUP lisible de haut, proche de la hauteur des liens ; pied de page inchangé.
- Transitions vanilla JavaScript réutilisables ; prise en compte des préférences de mouvement et du fonctionnement sans JavaScript.
- Liens, images et polices compatibles avec le sous-répertoire `/datacom`.
- Formulaire sans faux succès, état non configuré explicite, gestion des erreurs et fichiers joints.

## Validation réalisée

- `npm run check` : aucune erreur, aucun avertissement.
- `npm run lint` : réussi.
- `npm run build` : 11 pages générées.
- `npm test` : 8 tests unitaires réussis.
- `npm run test:e2e` avec Chromium : 34 tests réussis, répartis entre ordinateur et mobile.
- Contrôles axe WCAG 2 A/AA et 2.1 AA sur les 11 routes aux deux largeurs de test : aucune violation détectée par ces contrôles automatisés. Cela ne constitue pas une certification d’accessibilité.
- Revue visuelle des pages en 1 440 px et en 390 px, ainsi que du menu mobile et de la FAQ ouverte.
- Relecture des textes et recherche des anciennes formes non accentuées : aucune occurrence détectée dans les 11 pages compilées. La vérification automatisée complète la relecture, elle ne remplace pas la validation éditoriale de l’entreprise.

Les tests d’envoi du formulaire utilisent des réponses HTTP simulées localement : aucun envoi réel à l’entreprise n’a été effectué.

## Appliquer le patch à un dépôt existant

Ce patch complet remplace la livraison précédente. Ne pas appliquer les deux patchs. Si la première livraison est déjà appliquée, utiliser les fichiers de l’archive pour mettre à jour les différences, sans réappliquer le patch complet.

Depuis un clone avec un répertoire de travail propre, sur la branche correspondante :

```bash
git switch feat/site-datacom
git status
git apply --check /chemin/vers/datacom-refonte-final.patch
git apply /chemin/vers/datacom-refonte-final.patch
npm ci
npm run check
npm run lint
npm run build
git diff --stat
git add -A
git commit -m "Refonte du site DATACOM et nouveau logo DC GROUP"
git push -u origin feat/site-datacom
```

Si la branche a évolué depuis le commit de départ, examiner les différences avant d’appliquer le patch. Ne pas écraser de modifications locales. Le commit et le push restent à effectuer par une personne ayant les droits nécessaires.

## Avant mise en ligne

Renseigner les coordonnées et les informations légales, valider le logo DC GROUP et prévoir sa version vectorielle pour l’impression, valider l’histoire et les prestations, puis configurer et tester le service de réception des devis. Les instructions figurent dans le README. En l’absence de service d’envoi, le formulaire reste désactivé et le lien d’appel renvoie à la page Contact faute de numéro réel.

## Mise en ligne et réception des devis

Consulter `docs/MISE-EN-LIGNE.md`. Le workflow transmet les variables publiques du formulaire à la compilation. Sans URL de réception réelle, le formulaire reste désactivé. Les photos sont masquées par défaut tant qu’un service compatible n’a pas été configuré.

- Derniers ajustements : logo 132 px de large sur ordinateur / 106 px sur mobile, GROUP agrandi ; navigation centrée et plus grande ; paragraphe d’accueil raccourci.
- Guide de modification des textes : `docs/MODIFIER-LES-TEXTES.md`.

- Menu principal porté à 22 px (19 px sur petit ordinateur) et bouton de devis à 18 px (16 px sur petit ordinateur). Paragraphe initial « entreprise à taille humaine » rétabli. Histoire reformulée : volonté initiale de l’ingénieur, rencontre des associés partageant cette volonté, puis création commune.

- Ajustement final : taille moyenne du menu (18 px, 17 px sur petit ordinateur), bouton de devis 16 px (15 px sur petit ordinateur). Logo et textes conservés.
