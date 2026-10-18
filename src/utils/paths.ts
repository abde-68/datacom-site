/** Respecte le sous-répertoire de déploiement Astro (GitHub Pages compris). */
export function withBase(path = ''): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
