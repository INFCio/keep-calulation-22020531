self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("com.infc.keep-calculation")
      .then((cache) =>
        cache.addAll([
          "/",
          "/signout.svg",
          "/index.html",
          "/assets/css/main.css",
          "/assets/js/main.js",
          "/assets/js/NTechDOM.js",
          "/modules/addkeep.js",
          "/modules/forget.js",
          "/modules/header.js",
          "/modules/home.js",
          "/modules/keep-calculation.js",
          "/modules/loading.js",
          "/modules/login.js",
          "/modules/pages.js",
          "/modules/signup.js",
        ])
      )
  );
});

self.addEventListener("fetch", (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
