// Configurazione API (sostituisci con il tuo dominio Cloudflare)
const API_BASE_URL = 'https://uni-agenda-api.andrea-vinduska.workers.dev/api';
let authToken = null;

// DOM Elements
const loginBtn = document.getElementById('login-btn');


// Registra il Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => console.log('Service Worker registrato:', registration))
      .catch(err => console.log('Errore registrazione ServiceWorker:', err));
  });
}

// Gestione autenticazione
loginBtn.addEventListener('click', () => {
  
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



