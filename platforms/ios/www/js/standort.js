
let bezirk;
let bundesland;
let ampelStufe;
const url = 'https://corona-ampel.gv.at/sites/corona-ampel.gv.at/files/assets/Warnstufen_Corona_Ampel_aktuell.json';
const corsFix = 'https://cors-anywhere.herokuapp.com/';

function getLocation(latitude, longitude) {
    var apiString = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' 
    + latitude+ '&longitude=' + longitude + '&localityLanguage=de' ;


//============================================Testdaten===========================================================
// Urfahr längen und Breitengrad
// Urfahr Breitengrad :   48.439299
// Urfahr Längengrad :   14.236832


// Steyr-Land längen und Breitengrad
// Steyr-Land Breitengrad :   47.915987
// Steyr-Land Längengrad :   14.522420


//________Salzburg-Land______________:
// Fuschl längen und Breitengrad
// Breitengrad von Fuschl	47.796566
// Längengrad von Fuschl	13.303364
// Anif längen und Breitengrad --> Eig Salzburg-Umgebung wird aber als Salzburg gekennzeichnet!
// //Breitengrad: 47.7500000
// Längengrad: 13.0666700

// GPS-Koordinaten von Bergheim
// Breitengrad : 47.836
// Längengrad : 13.0426

//Teststring
// var apiString = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' 
// +  47.7500000 + '&longitude=' + 13.0666700 + '&localityLanguage=de' ;
// console.log(apiString);
//=============================================================================================

function getBezirk(){  
    lokationbezirk = bezirk;
    console.log('Du befindest dich im Bezirk: ', lokationbezirk);
}
      
//Bekomme Standort von API
    loadJSON(apiString,
        function(data) {for(i=0; i<data.localityInfo.administrative.length; i++){ 
            
            //Wien kein Bezirk daher sondern
            if(data.city == 'Wien'){
                if(data.localityInfo.administrative[i].adminLevel == '4'){
                    bezirk = data.localityInfo.administrative[i].name
                    document.getElementById('bezirk').innerHTML = bezirk;
                    console.log(bezirk);
            }

            //Für alle anderen Bezirke
         } else if(data.localityInfo.administrative[i].adminLevel == '6'){
             bezirk = data.localityInfo.administrative[i].name;

             //Syntax anpassen
              bezirk = bezirk.replace("St.","Sankt");
             
             if(bezirk.includes("Bezirk")){
                bezirk = bezirk.slice(7);
             }
             document.getElementById('bezirk').innerHTML = bezirk;
            getBezirk();
            getAmpel();
             //console.log(bezirk);
             }
             //Bundesland
             document.getElementById('bundesland').innerHTML = data.principalSubdivision;
             bundesland = data.principalSubdivision;
             //console.log(bundesland);
            }
        
             console.log(data); },
         function(xhr) { console.error(xhr); }
);
}

//Bekomme Ampelwarnstufe von jsonFile
function getAmpel(){
loadJSON(corsFix+url, function(data){for(i=0; i<data[0].Warnstufen.length; i++){ 
    if(data[0].Warnstufen[i].Region == 'Bezirk'){
       
        if(data[0].Warnstufen[i].Name == bezirk){
            console.log("Ampelstufe: "+data[0].Warnstufen[i].Warnstufe);
            ampelStufe = data[0].Warnstufen[i].Warnstufe;
            if(ampelStufe == 1){
                document.getElementById("farbkreis").style.backgroundColor = "#60B564";
                }else if(ampelStufe == 2){
                    document.getElementById("farbkreis").style.backgroundColor = "#FED500";
                }else if(ampelStufe == 3){
                    document.getElementById("farbkreis").style.backgroundColor = "#F59C00";
                }else if(ampelStufe == 4){
                    document.getElementById("farbkreis").style.backgroundColor = "#CB0538";
                }
        }
    }
}
}, function(xhr){console.error(xhr);});
}


function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}


var onLocationSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getLocation(Latitude, Longitude);
}

// Error callback

function onLocationError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition
(onLocationSuccess, onLocationError, { enableHighAccuracy: true });


// METHOD 2
d3.json(corsFix + url).then(res => {
    // console.log('Alle: ', res[0].Warnstufen);
    // console.log('Länge neuster Datensatz: ', res[0].Warnstufen.length);


// //Gib mir alle Bundesländer
// for(i=0; i<res[0].Warnstufen.length; i++){
//     if(res[0].Warnstufen[i].Region =="Bundesland"){
//     bundeslandname = res[0].Warnstufen[i].Name;
//     ampelwarnstufeBL = res[0].Warnstufen[i].Warnstufe;
//     }
// }

//Gib mir alle Bezirknamen
    for(i=0; i<res[0].Warnstufen.length; i++){
        if(res[0].Warnstufen[i].Region =="Bezirk"){
        bezirkname = res[0].Warnstufen[i].Name;
        ampelwarnstufe = res[0].Warnstufen[i].Warnstufe;
    }
   }



//Versuch die Anzahl der Bezirke automatisch zu bekommen, fnktioniert aber nicht, stattdessen 89 Elemente
// for(i=0; i<res[0].Warnstufen.length; i++){
//     if(res[0].Warnstufen[i].Region =="Bezirk"){
//     arrLänge=[i];
//     //console.log("arrlänge:",arrLänge);
//     }
// }


//DROP DOWN__
//Alle Berzirknamen im Json File vom letzten Datum 

for(i=0; i<89; i++){
    if(res[0].Warnstufen[i].Region =="Bezirk"){
    allebezirknamen = res[0].Warnstufen[i];
    }

    element = allebezirknamen;
    dropdownContent = document.querySelector('#dropdown-content');
    htmlToAppend = document.createElement('option');
    htmlToAppend.setAttribute('onclick', 'changeListener()');
    htmlToAppend.setAttribute('id', element.Name);
    htmlToAppend.innerHTML = element.Name;
    dropdownContent.appendChild(htmlToAppend);  
}


// //_________Farbe wechseln
// lokationbezirk = document.getElementById('bezirk').innerHTML;

// function getBezirk(){  
// lokationbezirk = sessionStorage.getItem("bezirk");
// //lokationbezirk = bezirk;
// console.log('Du befindest dich im Bezirk: ', lokationbezirk);

// if(document.getElementById('bezirk').innerHTML == lokationbezirk){
//     console.log("Warnstufe in deinem Bezirk: ", ampelwarnstufe);
//     if(ampelwarnstufe == 1){
//         circlecolor = "green";
//     }else if(ampelwarnstufe == 2){
//         circlecolor = "yellow";
//     }else if(ampelwarnstufe == 3){
//         circlecolor = "orange";
//     }else if(ampelwarnstufe == 4){
//         circlecolor = "red";
//     }
//     document.getElementById("farbkreis").style.backgroundColor = circlecolor;
// }
//   }


});


//Auswählen des Bezirks im Drop Down
document.getElementById("dropdown-content").onchange = changeListener;
  function changeListener(){
  var value = this.value
    bezirk = value;
  document.getElementById("bezirk").innerHTML = bezirk;
  getAmpel();    
}