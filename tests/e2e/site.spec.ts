import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = ['', 'a-propos', 'nos-services', 'electricite-generale', 'fibre-optique', 'plomberie', 'faq', 'contact', 'mentions-legales', 'politique-de-confidentialite', '404'];
for (const route of routes) {
  test(`${route || 'accueil'} : rendu, ressources, liens et accessibilité`, async ({ page, request }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.status() >= 400 && response.url().includes('/datacom-site/') && !response.url().includes('/404')) errors.push(`${response.status()} ${response.url()}`); });
    const response = await page.goto(`/datacom-site/${route}`);
    expect([200,404]).toContain(response?.status());
    await page.evaluate(async () => { document.querySelectorAll('img').forEach(i => i.loading = 'eager'); await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); });
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.locator('html').getAttribute('lang')).toBe('fr');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator('img').evaluateAll(images => images.every(i => i instanceof HTMLImageElement && i.complete && i.naturalWidth > 0 && !!i.alt))).toBe(true);
    const links = await page.locator('a[href]').evaluateAll(anchors => anchors.map(a => a.getAttribute('href')!));
    expect(links.every(href => !href.includes('/realisations'))).toBe(true);
    for (const href of new Set(links.filter(href => href.startsWith('/')))) {
      expect(href.startsWith('/datacom-site/')).toBe(true);
      const result = await request.get(href.split('#')[0]);
      expect(result.ok(), href).toBe(true);
    }
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(accessibility.violations.map(v => ({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
    expect(errors).toEqual([]);
  });
}
test('menu clavier, services et navigation mobile', async ({ page }, testInfo) => {
  await page.goto('/datacom-site/');
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', {name:'Ouvrir le menu'}).click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await expect(page.locator('#mobile-menu nav > a, #mobile-menu nav > div > a')).toHaveText(['Accueil','À propos','Nos services','FAQ','Contact','Demander un devis']);
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).toBeHidden();
    await page.getByRole('button', {name:'Ouvrir le menu'}).click();
    await page.locator('#mobile-menu').getByRole('link',{name:'Plomberie',exact:true}).click();
    await expect(page).toHaveURL(/\/plomberie/);
  } else {
    await page.getByRole('button',{name:'Afficher les services'}).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#services-menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button',{name:'Afficher les services'})).toHaveAttribute('aria-expanded','false');
    await expect(page.locator('#services-menu')).toBeHidden();
  }
});
test('FAQ : ouverture d’une réponse', async ({page}) => { await page.goto('/datacom-site/faq'); const question=page.getByText('Le devis est-il gratuit ?', {exact:true}); await question.click(); await expect(page.locator('details[open]')).toContainText('sans engagement'); });
test('préférences de mouvement et header compact', async ({page}) => {
  await page.goto('/datacom-site/');
  expect(await page.locator('.hero-brand').evaluate(e=>getComputedStyle(e).animationName)).toBe('none');
  await page.evaluate(()=>window.scrollTo(0,800));
  await expect(page.locator('[data-header]')).toHaveClass(/is-compact/);
  expect(await page.locator('[data-parallax]').evaluate(e=>getComputedStyle(e).transform)).toBe('none');
});
test('sans JavaScript : contenu et cartes visibles', async ({browser}) => {
  const context=await browser.newContext({javaScriptEnabled:false, viewport:{width:390,height:844}});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4321/datacom-site/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.expertise-card')).toHaveCount(3);
  expect(await page.locator('.expertise-card').first().evaluate(e=>getComputedStyle(e).opacity)).toBe('1');
  await context.close();
});
test('formulaire : pas de faux succès, gestion d’un échec et d’un succès simulés', async ({page}) => {
  await page.goto('/datacom-site/contact');
  await expect(page.getByRole('button',{name:'Envoyer ma demande'})).toBeDisabled();
  await expect(page.getByText('L’envoi du formulaire n’est pas encore activé.',{exact:false})).toBeVisible();
  // Simulation locale uniquement : aucune donnée n’est envoyée à un tiers.
  await page.evaluate(()=> { const f=document.querySelector<HTMLFormElement>('#devis-form')!; f.dataset.configured='true'; f.action='http://127.0.0.1:4321/mock-devis'; f.querySelector<HTMLButtonElement>('button[type=submit]')!.disabled=false; });
  await page.getByLabel('Nom *',{exact:true}).fill('Test');
  await page.getByLabel('Prénom *',{exact:true}).fill('Essai');
  await page.getByLabel('E-mail *',{exact:true}).fill('test@example.com');
  await page.getByLabel('Téléphone *',{exact:true}).fill('0600000000');
  await page.locator('select[name=service]').selectOption('plomberie');
  await page.getByLabel('Votre besoin *',{exact:true}).fill('Données fictives utilisées uniquement pour un test local.');
  await page.locator('input[name=rgpd]').check();
  await page.route('**/mock-devis',route=>route.fulfill({status:500,body:'Erreur simulée'}));
  await page.getByRole('button',{name:'Envoyer ma demande'}).click();
  await expect(page.locator('#form-message')).toContainText('n’a pas pu être envoyée');
  await expect(page.locator('input[name=nom]')).toHaveValue('Test');
  await page.unroute('**/mock-devis');
  await page.route('**/mock-devis',route=>route.fulfill({status:200,body:'{"ok":true}',contentType:'application/json'}));
  await page.getByRole('button',{name:'Envoyer ma demande'}).click();
  await expect(page.locator('#form-message')).toContainText('a bien été transmise');
  await expect(page.locator('input[name=nom]')).toHaveValue('');
});
test('animations normales : affichage unique et changement de préférence', async ({page}) => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/datacom-site/');
  await expect(page.locator('html')).toHaveClass(/motion-ready/);
  const card=page.locator('.expertise-card').first();
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveClass(/is-visible/);
  await page.evaluate(()=>window.scrollTo(0,0));
  await expect(card).toHaveClass(/is-visible/);
  await page.emulateMedia({reducedMotion:'reduce'});
  expect(await card.evaluate(e=>getComputedStyle(e).opacity)).toBe('1');
});
