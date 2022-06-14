import d from "../js/NTechDOM.js";
import { login } from "../../modules/login.js";
console.log("version", d.version);
login._history = window.history.length;
//window.location = "#/login";
d.render("root", login);

window.closeDiv = (q) => {
  document.querySelector(q).style.display = "none";
};

// check if the browser supports serviceWorker at all
if ("serviceWorker" in navigator) {
  // wait for the page to load
  window.addEventListener("load", async () => {
    // register the service worker from the file specified
    const registration = await navigator.serviceWorker.register("/sw.js");

    registration.addEventListener("updatefound", () => {
      if (registration.installing) {
        // wait until the new Service worker is actually installed (ready to take over)
        registration.installing.addEventListener("statechange", () => {
          if (registration.waiting) {
            // if there's an existing controller (previous Service Worker), show the prompt
            if (navigator.serviceWorker.controller) {
              console.log("Service Worker Updata found");
            } else {
              console.log("Service Worker initialized for the first time");
            }
          }
        });
      }
    });

    let refreshing = false;

    // detect controller change and refresh the page
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        window.location.reload();
        refreshing = true;
      }
    });
  });
}
