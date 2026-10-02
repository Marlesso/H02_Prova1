// Service worker: cache do app para uso offline.
// Ao alterar qualquer arquivo, incremente a versão para forçar a atualização.
const VERSION = 'economia-h02-v1';
const ARQUIVOS = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png',
  './icons/maskable-512.png', './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Fontes do Google: stale-while-revalidate (se falhar offline, o CSS cai na fonte do sistema)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(VERSION).then(async c => {
        const hit = await c.match(req);
        const rede = fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => hit);
        return hit || rede;
      })
    );
    return;
  }

  if (url.origin !== location.origin) return;

  // Navegação: rede primeiro (pega conteúdo novo), cache como reserva offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => {
        const copia = r.clone();
        caches.open(VERSION).then(c => c.put('./index.html', copia));
        return r;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Demais arquivos: cache primeiro
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
