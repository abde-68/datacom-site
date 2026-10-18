# Publier DATACOM depuis VS Code

Ce dossier est une nouvelle copie indépendante, sans historique Git.
Configuration prévue : compte abde-68, dépôt public datacom-site, branche main.
Ne pas écraser l’ancien dossier datacom.

1. Ouvrir ce dossier dans VS Code (celui contenant package.json).
2. Terminal : npm install puis npm run dev.
3. Ouvrir le lien local affiché pour vérifier le site.
4. Contrôle de code source > Publier sur GitHub (ou palette : Publish to GitHub).
5. Se connecter à GitHub, choisir datacom-site puis un dépôt PUBLIC.
6. Si main n’est pas le nom de branche utilisé : terminal git branch -M main puis git push -u origin main.
7. Sur GitHub : Settings > Pages > Build and deployment > Source : GitHub Actions.
8. Actions > Deploy Astro to GitHub Pages > Run workflow > main > Run workflow.
9. Attendre la réussite du déploiement. Adresse prévue : https://abde-68.github.io/datacom-site/

La configuration ne convient telle quelle qu’au compte abde-68 et au nom datacom-site.
Pour un autre nom : adapter base dans astro.config.mjs et le sitemap dans public/robots.txt.
Pour un autre compte : adapter aussi site dans astro.config.mjs.

Le nouveau header est inclus. Les coordonnées réelles et les informations légales sont à compléter dans src/data/site.ts.
Le formulaire ne transmet pas de demandes tant que PUBLIC_DEVIS_ENDPOINT n’est pas configuré.
Aucun identifiant, secret, dossier node_modules ou ancien dépôt .git n’est inclus.
