var currDay = 0; //giorno selezionato

export async function initCalendar(){
    const now = new Date();
    currDay = now;
    currDay.setHours(0,0,0,0);

    //inizializza a mese e giorno corrente
    drawCalendar(now);

    // elem. DOM
    const prevBtn = document.querySelector('#calendar-prev-month');
    const nextBtn = document.querySelector('#calendar-next-month');

    // evito sovrapposizione ev. listener
    const newPrevBtn = prevBtn.cloneNode(true);
    prevBtn.replaceWith(newPrevBtn);
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.replaceWith(newNextBtn);

    // event listener scorrimento mesi
    newPrevBtn.addEventListener('click', () => {
        currDay.setMonth(currDay.getMonth() - 1);
        drawCalendar(currDay);
    });
    newNextBtn.addEventListener('click', () => {
        currDay.setMonth(currDay.getMonth() + 1);
        drawCalendar(currDay);
    });
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

        /* TITOLO MESE E ANNO */
        const text = `${fullMonth} ${year}`;
        dateText.innerHTML = text;

        /* CREAZIONE GRIGLIA */
        const firstOfMonth = new Date(date.setDate(1));
        const firstDay = (firstOfMonth.getDay()+6)%7; //lunedi = 0
        const lastDay = new Date(year, month+1, 0).getDate(); //numero ultimo del mese

        const today = new Date(); //per confronto
        today.setHours(0,0,0,0);

        //crea calendario
        calContainer.innerHTML = ""; // svuoto

        for(let i= -1*firstDay + 1; i <= lastDay; i++){

            const thisDay = new Date(year, month, i, 0, 0, 0, 0);

            const dayDiv = document.createElement("button");
            dayDiv.classList.add('calendar-days');

            dayDiv.id = i;

            // classe per colori / evidenziazioni
            if(thisDay < today){
                dayDiv.classList.add('before-today');
            }
            else if( (thisDay - today) < 3600000){/*evito errori con millisecondi*/
                dayDiv.classList.add('today');
            }

            if(thisDay.getDay() == 0){
                dayDiv.classList.add('sunday');
            }

            // giorno selezionato
            if( i>0 && i==day ){
                dayDiv.classList.add('current');
            }


            // testo
            const h5 = document.createElement("h5");
            if(i > 0){
                h5.innerText = i.toString();
            }

            // aggiungo gli elementi
            dayDiv.appendChild(h5);
            calContainer.appendChild(dayDiv);

            // aggiungo event listener per selezione data
            if(i > 0){
                dayDiv.addEventListener('click', () => {
                    currDay.setDate(dayDiv.id);
                    //console.log('--- calendar --- currDay = ', currDay.getDate());
                    drawCalendar(currDay);
                });
            }
        }

    }
    catch(ex){
        console.error("-- Errore creazione calendario -- " + ex);
    }
}