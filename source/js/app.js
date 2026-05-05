import * as menu from "./menu.js";


// Configurazione API (sostituisci con il tuo dominio Cloudflare)
const API_BASE_URL = 'https://uni-agenda-api.andrea-vinduska.workers.dev/api';
let authToken = null;

// DOM Elements
const profileBtn = document.getElementById('profile-btn');
const menuBtn = document.getElementById('menu-btn');


// Registra il Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => console.log('Service Worker registrato:', registration))
      .catch(err => console.log('Errore registrazione ServiceWorker:', err));
  });
}

// carica HTML
await loadHTML('./source/html/menu.html');


// Gestione autenticazione
profileBtn.addEventListener('click', () => {
  
  fetchEvents();
});

// Funzione per ottenere gli eventi dal backend
async function fetchEvents() {
 fetch("https://uni-agenda-api.andrea-vinduska.workers.dev/api/tasks", {
  credentials: "include", // Importante per inviare i cookie
})
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
}

// Pagina menu
menuBtn.addEventListener('click', () => {

  const menuDiv = document.getElementById('menu-container');
  menuDiv.classList.toggle('visible');

  loadPage("menu");
});



async function loadPage(page){

  if(typeof page != "string") return;

  switch(page){
    case "menu": menu.initMenu;
    break;
  }

  console.log("Pagina caricata: " + page);

}

async function loadHTML(path){

  const main = document.getElementById("MAIN");
  main.innerHTML = ""; // pulizia

  try{

    fetch(path)
      .then(response => response.text())
        .then(html => main.innerHTML = html);

  }
  catch(ex){
    console.error("Errore fetch html: " + path + ", ", ex);
  }

}

