const CACHE_NAME = 'prudencio-safety-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './assets/mascote.jpg',
  './assets/forklift.png'
];

// Instalação do Service Worker - Salvando cache inicial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Pré-salvando arquivos no cache...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker - Limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estratégia de Fetch: Network-First (Tenta a rede, se falhar ou estiver offline, usa o cache)
// Isso garante atualizações rápidas quando houver rede e funcionamento garantido offline.
self.addEventListener('fetch', (event) => {
  // Ignora requisições de CDNs externas ou APIs se desejar, mas vamos tratar requisições HTTP básicas
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.includes('unpkg.com') && 
      !event.request.url.includes('cdnjs.cloudflare.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se a resposta for válida, salva uma cópia atualizada no cache
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Se estiver offline ou a rede falhar, busca no cache local
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Caso navegue para uma rota inexistente offline, serve a tela inicial
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
