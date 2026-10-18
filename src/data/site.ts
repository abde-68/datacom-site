// Informations légales et coordonnées réelles à renseigner avant publication.
// Ne pas inventer de ville, de certification, d'avis ni d'ancienneté.
export const site = {
  nomCommercial: 'DATACOM',
  nomLegal: 'DATACOM SASU',
  marqueLogo: 'DC GROUP',
  slogan: 'L’énergie de vos projets !',
  telephone: '',
  telephoneLien: '', // Format international, par exemple +33…
  email: '',
  adresse: '',
  horaires: '',
  siret: '',
  responsablePublication: '',
  hebergeur: '',
  villes: [] as string[],
  zoneTexte: '',
  googleBusinessUrl: '',
  googleAvisUrl: '',
  reseaux: { facebook: '', instagram: '', linkedin: '' },
};

export const nav = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  {
    label: 'Nos services', href: '/nos-services',
    children: [
      { label: 'Électricité', href: '/electricite-generale' },
      { label: 'Fibre optique', href: '/fibre-optique' },
      { label: 'Plomberie', href: '/plomberie' },
    ],
  },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];
