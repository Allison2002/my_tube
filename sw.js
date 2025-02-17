const CACHE_NAME = "sports-tube-cache-v5"; 
const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/styles-backup.css",
    "/script.js",
    "/nav.html",
    "/footer.html",
    "/manifest.json",
    "/sw.js",

    // ✅ Local Assets (Images, Fonts)
    "/assets/fonts/Bebas_Neue/BebasNeue-Regular.woff2",
    "/assets/fonts/Roboto/static/Roboto-Regular.woff2",
    "/assets/img/sports_tube_logo.png",
    "/assets/img/football.jpg",
    "/assets/img/nba.jpg",
    "/assets/img/mlb.jpg",
    "/assets/img/hockey.webp",
    "/assets/img/soccer.jpg",
    "/assets/img/mma_fighters.jpg",

    // ✅ Essential Pages (Ensure They Work Offline)
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
    "/pages/privacy.html",

    // ✅ Video Pages
    "/videos/baseball-vd1.html",
    "/videos/baseball-vd2.html",
    "/videos/baseball-vd3.html",
    "/videos/baseball-vd4.html",
    "/videos/baseball-vd5.html",
    "/videos/baseball-vd6.html",
    "/videos/basketball-vd1.html",
    "/videos/basketball-vd2.html",
    "/videos/basketball-vd3.html",
    "/videos/basketball-vd4.html",
    "/videos/basketball-vd5.html",
    "/videos/basketball-vd6.html",
    "/videos/football-vd1.html",
    "/videos/football-vd2.html",
    "/videos/football-vd3.html",
    "/videos/football-vd4.html",
    "/videos/football-vd5.html",
    "/videos/football-vd6.html"
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
            return self.clients.claim(); // Ensures all pages are controlled immediately
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
    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request) || caches.match("/index.html"))
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            }).catch(() => {
                console.warn("⚠️ Network request failed, and no cache found.");
            })
        );
    }
});
