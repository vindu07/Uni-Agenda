export function initMenu(){
    
    const themeBtn = document.getElementById('theme-btn');
    const freshBtn = themeBtn.cloneNode(true);
    themeBtn.replaceWith(freshBtn); // Evita problemi con ricariche

    // Toggle tema chiaro/scuro
    freshBtn.addEventListener('click', () => {
      
      document.body.classList.toggle("theme-dark");
    });

}