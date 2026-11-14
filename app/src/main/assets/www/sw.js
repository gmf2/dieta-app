/* NutriSport SW v12: shell precargado minimo + fotos en cache persistente bajo demanda.
   Antes: precache de TODAS las fotos (~24 MB) en la primera visita y en cada version.
   Ahora: primera visita ~0,4 MB; cada foto se descarga solo cuando se ve y queda
   guardada entre versiones (IMG_CACHE no se borra al actualizar). */
const SHELL_CACHE = "nutrisport-shell-v12-20261114";
const IMG_CACHE = "nutrisport-img-v1";
const SHELL = ["./", "./index.html", "./styles.css", "./app.js", "./data.js", "./dayplan.js", "./manifest.webmanifest", "./icon-192.png", "./icon-180.png", "./icon-512.png", "./assets/hero.webp", "./assets/credits.json"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL_CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k.startsWith("nutrisport-") && k !== SHELL_CACHE && k !== IMG_CACHE).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  if (new URL(e.request.url).pathname.includes("/assets/")) {
    e.respondWith(caches.open(IMG_CACHE).then(c => c.match(e.request).then(hit =>
      hit || fetch(e.request).then(res => { if (res.ok) c.put(e.request, res.clone()); return res; })
    )));
    return;
  }
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
});
