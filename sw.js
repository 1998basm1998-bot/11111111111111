const CACHE_NAME = 'admin-debt-v10';
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './config.js',
    './pwa.js',
    './manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
});

self.addEventListener('fetch', (e) => {
    // عدم كاش لطلبات فيربس لضمان المزامنة عند توفر النت
    if (e.request.url.includes('firestore.googleapis.com')) {
        return fetch(e.request);
    }
    e.respondWith(
        caches.match(e.request).then((res) => res || fetch(e.request))
    );
});
