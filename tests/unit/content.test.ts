import { describe, expect, it } from 'vitest';
import { nav, site } from '../../src/data/site';
import { expertises, electricite, fibre, plomberie, methode } from '../../src/data/services';
import { withBase } from '../../src/utils/paths';
describe('Structure éditoriale DATACOM', () => {
  it('respecte l’ordre de navigation demandé', () => expect(nav.map(n => n.label)).toEqual(['Accueil', 'À propos', 'Nos services', 'FAQ', 'Contact']));
  it('propose trois expertises et leurs pages', () => expect(expertises.map(e => e.href)).toEqual(['/electricite-generale', '/fibre-optique', '/plomberie']));
  it('ne contient aucun lien vers la galerie supprimée', () => expect(JSON.stringify(nav)).not.toContain('/realisations'));
  it('conserve les cinq étapes du parcours client', () => expect(methode.map(m => m[0])).toEqual(['Écoute','Diagnostic','Devis','Réalisation','Suivi']));
  it('ne publie pas de fausses coordonnées', () => { expect(site.telephone).toBe(''); expect(site.email).toBe(''); expect(site.villes).toEqual([]); });
  it('utilise des textes accentués et des images descriptives', () => { expect(expertises[0].titre).toBe('Électricité'); for (const e of expertises) { expect(e.alt.length).toBeGreaterThan(30); expect(e.image).toBeTruthy(); } });
  it('conserve les prestations existantes et ajoute la plomberie', () => { expect(electricite.length).toBe(12); expect(fibre.length).toBe(11); expect(plomberie.length).toBe(6); });
  it('normalise les chemins de déploiement', () => { expect(withBase('/contact')).toMatch(/\/contact$/); expect(withBase('/')).toMatch(/\/$/); expect(withBase('images/a.webp')).not.toMatch(/\/\/images/); });
});
