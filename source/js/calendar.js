export async function initCalendar(){
    const today = new Date();
    drawCalendar(today);
}

function drawCalendar(date){

    const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

    try{
        const day = date.getDate();
        const month = date.getMonth();
        const fullMonth = months[month];
        const year = date.getFullYear();

        /*ELEMENTI DOM*/
        const calContainer = document.querySelector("#calendar-body");
        const dateText = document.querySelector("#calendar-title-text");

        //mese e anno
        const text = `${fullMonth} ${year}`;
        dateText.innerHTML = text;

        //griglia
        const firstOfMonth = new Date(date.setDate(1));
        const firstDay = (firstOfMonth.getDay()+6)%7; //lunedi = 0
        const firstDrawDate = new Date(firstOfMonth.setDate(-1*firstDay));


    }
    catch(ex){
        console.error("-- Errore creazione calendario -- " + ex);
    }
}