const CACHE_PREFIX = "science-web-";
const STATIC_CACHE = `${CACHE_PREFIX}static-v1`;
const RUNTIME_CACHE = `${CACHE_PREFIX}runtime-v1`;
const CACHE_NAMES = [STATIC_CACHE, RUNTIME_CACHE];
const SHELL_URLS = [
  "/",
  "/subjects",
  "/manifest.webmanifest",
  "/gyan-logo.png",
  "/icon-192.png",
  "/icon-512.png",
  "/favicon.ico",
  "/apple-touch-icon.png",
];

function isSameOrigin(request) {
  return new URL(request.url).origin === self.location.origin;
}

function isNeverCache(request) {
  const { pathname } = new URL(request.url);
  return pathname === "/api" || pathname.startsWith("/api/") || pathname === "/pdfs" || pathname.startsWith("/pdfs/");
}

function isHashedNextAsset(request) {
  return new URL(request.url).pathname.startsWith("/_next/static/");
}

async function precacheShell() {
  const cache = await caches.open(RUNTIME_CACHE);

  await Promise.all(
    SHELL_URLS.map(async (url) => {
      try {
        const response = await fetch(url, { cache: "no-cache" });
        if (response.ok) {
          await cache.put(url, response.clone());
        }
      } catch {
        // A single unavailable shell asset must not abort service-worker install.
      }
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(Promise.all([precacheShell(), self.skipWaiting()]));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              cacheName.startsWith(CACHE_PREFIX) && !CACHE_NAMES.includes(cacheName),
          )
          .map((cacheName) => caches.delete(cacheName)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET" || !isSameOrigin(request) || isNeverCache(request)) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);

        try {
          const response = await fetch(request);
          if (response.ok) {
            await cache.put(request, response.clone()).catch(() => undefined);
          }
          return response;
        } catch {
          return (await cache.match(request)) ?? (await cache.match("/")) ?? Response.error();
        }
      })(),
    );
    return;
  }

  if (isHashedNextAsset(request)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;

        const response = await fetch(request);
        if (response.ok) {
          await cache.put(request, response.clone()).catch(() => undefined);
        }
        return response;
      })(),
    );
  }
});
