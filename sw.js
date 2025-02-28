const CACHE_NAME = "sports-tube-cache-v6"; // Increment version when making changes
const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
    "/nav.html",
    "/footer.html",
    "/manifest.json",
    "/sw.js",

    // ✅ Local Fonts
    "/assets/fonts/Bebas_Neue/BebasNeue-Regular.woff2",
    "/assets/fonts/Roboto/static/Roboto-Regular.woff2",

    // ✅ Local Images (Netlify-hosted)
    "/assets/img/sports_tube_logo.png",
    "/assets/img/football.jpg",
    "/assets/img/nba.jpg",
    "/assets/img/mlb.jpg",
    "/assets/img/hockey.webp",
    "/assets/img/soccer.jpg",
    "/assets/img/mma_fighters.jpg",

    // ✅ Essential Pages
    "/pages/all_videos/all-videos.html",
    "/pages/all_videos/sports_hub.html",
    "/pages/baseball/baseball.html",
    "/pages/basketball/basketball.html",
    "/pages/football/football.html",
    "/pages/learn_more/learn_more.html",
    "/pages/upload/upload.html",
    "/pages/account.html",
    "/pages/coming-soon.html",
    "/pages/guidelines.html",
    "/pages/log_in.html",
    "/pages/policy.html",
    "/pages/privacy.html"
];

// ✅ Clear old caches on activation
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        }).then(() => {
            console.log("✅ Old caches cleared, applying new cache...");
            return self.clients.claim();
        })
    );
});

// ✅ Install event - Cache essential assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("⏳ Caching assets...");
            return cache.addAll(ASSETS_TO_CACHE);
        }).catch(error => {
            console.error("❌ Failed to cache resources:", error);
        })
    );
});

// ✅ Handle navigation requests for Multi-Page Application (MPA)
self.addEventListener("fetch", (event) => {
    const { request } = event;

    // **Force fetch for Cloudinary images instead of caching**
    if (request.url.includes("res.cloudinary.com")) {
        event.respondWith(fetch(request));
        return;
    }

    // **Fetch HTML pages from network first (stale-while-revalidate)**
    if (request.destination === "document") {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Only return from cache if it exists, avoid defaulting to index.html
                    return caches.match(request);
                })
        );
        return;
    }

    // **Cache everything else normally**
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            return cachedResponse || fetch(request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});
