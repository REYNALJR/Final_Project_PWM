const CACHE_NAME = "warungq-cache-v2"; // 💡 Ubah versi setiap kali update file
const FILES_TO_CACHE = [
  "./",
  "./icon.png",
  "./index.html",
  "./transaksi.html",
  "./riwayat.html",
  "./laporan.html",
  "./login.html",
  "./register.html",
  "./reset.html",
  "./style.css",
  "./manifest.json",
];

// ⬇️ Saat install: cache semua file yang diperlukan
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // langsung aktif tanpa tunggu versi lama selesai
});

// ⬇️ Saat aktif: hapus cache lama jika ada
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Hapus cache lama:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ⬇️ Saat fetch: ambil dari cache dulu, kalau gagal ambil online
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
