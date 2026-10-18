# Modifier les textes du site

Le site utilise Astro. Le HTML éditable se trouve dans les fichiers `.astro`, principalement dans `src/pages/`. La partie entre les délimiteurs `---` en haut du fichier est du code : pour changer simplement des mots, modifiez plutôt les textes dans les balises HTML situées après cette partie.

## Où trouver chaque texte

- Accueil : `src/pages/index.astro` — le premier paragraphe se trouve dans `<Hero ...>`, à l’intérieur de `<p>...</p>`. Le titre est dans l’attribut `title="L’énergie de vos projets !"`.
- Histoire détaillée : `src/pages/a-propos.astro`.
- Contact / formulaire : `src/pages/contact.astro`.
- Autres pages : fichiers correspondants dans `src/pages/`.
- Menu et coordonnées de l’entreprise : `src/data/site.ts`.
- Textes des expertises et engagements : `src/data/services.ts`.
- Structure du menu : `src/components/Header.astro`.
- Pied de page : `src/components/Footer.astro`.
- Taille du logo, typographie, espacements : `src/styles/global.css` (`.brand img`, `.desktop-nav`, `.hero-title`, `.hero-description`).
- Logo : `public/logo-dc-group.png` ; version claire : `public/logo-dc-group-light.png`.

## Exemple du paragraphe d’accueil

```html
<p>Nous sommes une <strong>entreprise à taille humaine</strong> qui accompagne particuliers et professionnels avec des <strong>solutions fiables et durables</strong>, du diagnostic à la mise en service.</p>
```

Les mots dans `<strong>...</strong>` apparaissent en bleu dans ce bloc. Conservez les balises, les guillemets et les accolades du code.

## Voir vos changements

1. Ouvrez le dossier du projet dans VS Code.
2. Lancez `npm ci` une première fois, puis `npm run dev`.
3. Ouvrez l’adresse locale affichée dans le terminal (le site est configuré avec le chemin `/datacom/`).
4. Modifiez et enregistrez un fichier `.astro` : l’aperçu se recharge.
5. Avant publication : `npm run build`.

Après compilation, le HTML généré est dans `dist/` (par exemple `dist/index.html`). Ne modifiez pas directement ce dossier : il est recréé à chaque compilation. Modifiez les fichiers source dans `src/`.

Pour publier et activer les envois du formulaire : voir `docs/MISE-EN-LIGNE.md`. Le formulaire reste désactivé tant qu’aucun service d’envoi HTTPS n’est configuré.
