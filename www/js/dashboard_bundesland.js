
const arrBundesland = [];

let bundesland;
getAkkordeon_dash();


function onload_bundesland() {
if(localStorage.getItem("storeBundesland") == null && localStorage.getItem("letzterBezirk") == null){
    document.getElementById("dash_bundesland_name").innerHTML = "Bitte wähle einen Bezirk!";
}

    if (localStorage.getItem("storeBundesland") != null) {
        document.getElementById("dash_bundesland_name").innerHTML = localStorage.getItem("storeBundesland");
    }
    if (localStorage.getItem("letzterBezirk") != null) {
        bezirkTemp = localStorage.getItem("letzterBezirk");
        loadJSON("bundesland_dropdown.json", function (data) {
            for (i = 0; i < data[0].Bezirke.length; i++) {
                if (data[0].Bezirke[i].Bezirk == bezirkTemp) {
                    document.getElementById("dash_bundesland_name").innerHTML = data[0].Bezirke[i].Bundesland;
                }
                
            }
            const dateParser = d3.timeParse('%d.%m.%Y');
            blN = document.getElementById("dash_bundesland_name").innerHTML;
            const dataBL = dataOffline.filter(d => d.Bundesland == blN);  
            let widthRes = document.getElementById('hfBL_Neuerk').clientWidth;
            let heightRes = document.getElementById('hfBL_Neuerk').clientHeight;

            let letzteAkt = dataBL[dataBL.length - 1].datum;
            document.getElementById("letzte_zahlen").innerHTML = "Letzte Aktualisierung: "+letzteAkt;

            function setPreviewBL(){
                
                let hfAFBL = dataBL[dataBL.length - 1].AnzahlFaelle;
                let hfTBL = dataBL[dataBL.length - 1].AnzahlTotTaeglich;

                drawPreview('#hfBL_Neuerk', dataBL, d => dateParser(d.datum), d => d.AnzahlFaelle, 1700, hfAFBL, widthRes, heightRes);
                drawPreview('#hfBL_TT', dataBL, d => dateParser(d.datum), d => d.AnzahlTotTaeglich, 50, hfTBL, widthRes, heightRes);
            }
            function getAreachartsBL(){
                
  
    
                drawAreaChart('#ACBL_Neuerk', dataBL, d => dateParser(d.datum), d => d.AnzahlFaelle, 1700, widthRes ); 
                drawAreaChart('#ACBL_TT', dataBL, d => dateParser(d.datum), d => d.AnzahlTotTaeglich, 50, widthRes); 
            
            }
                setPreviewBL();
                getAreachartsBL(); 

        }, function (xhr) { console.error(xhr); });
       
    }
}

function myFunction_bundesland() {
    document.getElementById("myDropdown_bundesland").classList.toggle("show");
}

loadJSON("bundesland_dropdown.json", function (data) {
    for (i = 0; i < data[0].Bezirke.length; i++) {
        if (!arrBundesland.includes(data[0].Bezirke[i].Bundesland)) {
            arrBundesland.push(data[0].Bezirke[i].Bundesland);
        }
    }
    for (i = 0; i < arrBundesland.length; i++) {

        dropdownContent = document.getElementById('myDropdown_bundesland');
        htmlToAppend = document.createElement('LI');

        htmlToAppend.setAttribute('onclick', 'changeText_bundesland(this)');
        textnode = document.createTextNode(arrBundesland[i]);
        htmlToAppend.appendChild(textnode);
        htmlToAppend.setAttribute('value', arrBundesland[i]);
        dropdownContent.appendChild(htmlToAppend);

    }
}, function (xhr) { console.error(xhr); });

function changeText_bundesland(elm) {
    bundesland = elm.getAttribute('value');
    myFunction_bundesland();
    document.getElementById("dropbtn_bundesland").innerHTML = bundesland;
    localStorage.setItem("letztesBundesland", bundesland);

}
