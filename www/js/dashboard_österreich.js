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

    drawAreaChart('#wrapperAF', data, d => dateParser(d.datum), d => d.AnzahlFaelle, 9500, hfAF);
    drawAreaChart('#wrapperT', data, d => dateParser(d.datum), d => d.AnzahlTotTaeglich, 500, hfT);

}

setPreviewO();

