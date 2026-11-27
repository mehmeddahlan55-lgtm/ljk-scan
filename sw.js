const BUILD = "20261127-043217";
const CACHE = "koreksi-ljk-" + BUILD;
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./lembar/lembar-jawab-A4.pdf", "./lembar/lembar-jawab-F4.pdf"];
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(n => n.startsWith("koreksi-ljk-") && n !== CACHE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const liveAsset = req.mode === "navigate" || /\.(?:html|js|css)$/i.test(url.pathname);
  if (liveAsset) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const fresh = await fetch(req, {cache: "no-store"});
        if (fresh && fresh.ok) cache.put(req, fresh.clone());
        return fresh;
      } catch (err) {
        const saved = await cache.match(req) || await cache.match("./index.html");
        if (saved) return saved;
        throw err;
      }
    })());
  } else {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const saved = await cache.match(req);
      if (saved) {
        fetch(req).then(r => { if (r.ok) cache.put(req, r); }).catch(() => {});
        return saved;
      }
      try { const r = await fetch(req); if (r.ok) cache.put(req, r.clone()); return r; }
      catch (err) { return new Response("Tidak tersedia saat offline", {status:503,headers:{"Content-Type":"text/plain; charset=utf-8"}}); }
    })());
  }
});
