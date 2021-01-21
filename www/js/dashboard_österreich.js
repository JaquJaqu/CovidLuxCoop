getAkkordeon_dash();

let i = dataOffline.length - 1;

let AF_O = 'tbc';
let Neuerk_O = dataOffline[i].AnzahlFaelle;
let TT_O = dataOffline[i].AnzahlTotTaeglich;


function setPreviewO() {
    document.getElementById("hfO_Neuerk").innerHTML = "<div id='wrapperAF'></div>";
    document.getElementById("hfO_TT").innerHTML = "<div id='wrapperT'></div";

    let data = dataOffline.filter(d => d.Bundesland == "Oesterreich");
    let hfAF = data[data.length - 1].AnzahlFaelle;
    let hfT = data[data.length - 1].AnzahlTotTaeglich;

<<<<<<< Updated upstream
    drawAreaChart('#wrapperAF', data, d => dateParser(d.datum), d => d.AnzahlFaelle, 9500, hfAF);
    drawAreaChart('#wrapperT', data, d => dateParser(d.datum), d => d.AnzahlTotTaeglich, 500, hfT);
=======
<<<<<<< HEAD
    drawPreview('#hfO_Neuerk', data, d => dateParser(d.datum), d => d.AnzahlFaelle, 9500, hfAF, widthRes);
    drawPreview('#hfO_TT', data, d => dateParser(d.datum), d => d.AnzahlTotTaeglich, 150, hfT, widthRes);
}

function getAreacharts(){
  
    
    drawAreaChart('#AC_Neuerk', data, d => dateParser(d.datum), d => d.AnzahlFaelle, 9500); 
    drawAreaChart('#AC_TT', data, d => dateParser(d.datum), d => d.AnzahlTotTaeglich, 150); 
    // drawAuslastung(1);
    // drawAuslastungHF(1);
=======
    drawAreaChart('#wrapperAF', data, d => dateParser(d.datum), d => d.AnzahlFaelle, 9500, hfAF);
    drawAreaChart('#wrapperT', data, d => dateParser(d.datum), d => d.AnzahlTotTaeglich, 500, hfT);
>>>>>>> 14890a18dc1fb7129c22ecd5b30de6348c6441a6
>>>>>>> Stashed changes

}

setPreviewO();

