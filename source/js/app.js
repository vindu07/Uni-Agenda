import * as menu from "./menu.js";

// carica HTML
await loadPage("dashboard");

// Configurazione API
const API_BASE_URL = 'https://uni-agenda-api.andrea-vinduska.workers.dev/api';
let authToken = null;

// DOM Elements
const loginBtn = document.getElementById('header-login-btn');
const settingsBtn = document.getElementById('header-setting-btn');
const homeBtn = document.getElementById('footer-home-btn');
const calendarBtn = document.getElementById('footer-calendar-btn');
const newTaskBtn = document.getElementById('footer-create-btn');
const notesBtn = document.getElementById('footer-notes-btn');
const moreBtn = document.getElementById('footer-more-btn');

// Event listener pulsanti

loginBtn.addEventListener('click', ()=>{
  console.log('-- login btn clicked --');
});

settingsBtn.addEventListener('click', ()=>{
  console.log('-- settings btn clicked --');
});

function removeActivated(){
  let elements = [homeBtn, calendarBtn, notesBtn, moreBtn];
  elements.forEach((element)=>{element.classList.remove('activated')});
}
homeBtn.addEventListener('click', ()=>{
  removeActivated();
  homeBtn.classList.add('activated');
  loadPage('dashboard');
});
calendarBtn.addEventListener('click', ()=>{
  removeActivated();
  calendarBtn.classList.add('activated');
  loadPage('calendar');
});
notesBtn.addEventListener('click', ()=>{
  removeActivated();
  notesBtn.classList.add('activated');
  loadPage('notes');
});
moreBtn.addEventListener('click', ()=>{
  removeActivated();
  moreBtn.classList.add('activated');
  console.log('-- more btn clicked --');
});

newTaskBtn.addEventListener('click', ()=>{
  removeActivated();
  console.log('-- new task btn clicked --');
});


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




async function loadPage(page){

  if(typeof page != "string"){
    
    console.log("-- invalid argument -- app.loadPage");
    return;
  }

  switch(page){
    case "dashboard": await loadHTML("./source/html/dashboard.html");
    break;
    case "calendar": await loadHTML("./source/html/calendar.html");
    break;
    case "notes": await loadHTML("./source/html/notes.html");
    break;
  }

  console.log("Pagina caricata: " + page);

}

async function loadHTML(path){

  const main = document.querySelector('main');
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


