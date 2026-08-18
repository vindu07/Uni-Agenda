export async function initDashboard(){
    
    /* ELEMENTI DOM */
    const dateText = document.querySelector('#dashboard-date');

    // data
    const now = new Date();
    const days = ["LUNEDI'", "MARTEDI'", "MERCOLEDI'", "GIOVEDI'", "VENERDI'", "SABATO", "DOMENICA"];
    const months = ["GENNAIO", "FEBBRAIO", "MARZO", "APRILE", "MAGGIO", "GIUGNO", "LUGLIO", "AGOSTO", "SETTEMBRE", "OTTOBRE", "NOVEMBRE", "DICEMBRE"];

    const date = now.getDate();
    const month = months[now.getMonth()];
    const day = days[(now.getDay()+6)%7];
    const year = now.getFullYear();

    dateText.innerHTML = '';
    dateText.innerText = `${day}, ${date} ${month} ${year}`;
}