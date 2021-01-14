getAkkordeon_dash();



let i = dataOffline.length - 1; 

let AF_O = 'tbc'; 
let Neuerk_O = dataOffline[i].AnzahlFaelle;
let TT_O = dataOffline[i].AnzahlTotTaeglich;






function setHardfactsO() {
    //HARDFACTS
    //document.getElementById("hfO_AF").innerHTML = "<div class = 'hardfacts'>" + AF_O + "</div";
    document.getElementById("hfO_Neuerk").innerHTML = "<div class = 'hardfacts'>" + Neuerk_O + "</div";
    document.getElementById("hfO_TT").innerHTML = "<div class = 'hardfacts'>" + TT_O + "</div";

    

}

setHardfactsO(); 