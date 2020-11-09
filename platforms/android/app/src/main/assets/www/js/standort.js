
let bezirk;
let bundesland;
let ampelStufe;
var arrLänge = 0;
const url = 'https://corona-ampel.gv.at/sites/corona-ampel.gv.at/files/assets/Warnstufen_Corona_Ampel_aktuell.json';
const corsFix = 'https://cors-anywhere.herokuapp.com/';

function getLocation(latitude, longitude) {
    var apiString = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' 
    + latitude + '&longitude=' + longitude + '&localityLanguage=de' ;


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

             //Spezialfälle
             if(bezirk == "Krems"){
                 bezirk = "Krems(Land)";
             }
             if(bezirk == "Krems an der Donau"){
                 bezirk = "Krems an der Donau(Stadt)";
             }
             if(bezirk =="Kirchdorf"){
                 bezirk = "Kirchdorf an der Krems";
             }
             if(bezirk == "Eisenstadt"){
                 bezirk = "Eisenstadt(Stadt)";
             }
             if(bezirk == "Graz"){
                 bezirk = "Graz(Stadt)";
             }
             if(bezirk == "Innsbruck"){
                 bezirk = "Innsbruck-Stadt";
             }
             if(bezirk == "Klagenfurt am Wörthersee"){
                bezirk = "Klagenfurt Stadt";
            }
            if(bezirk == "Klagenfurt-Land"){
                bezirk = "Klagenfurt Land";
            }
            if(bezirk == "Linz"){
                bezirk = "Linz(Stadt)";
            }
            if(bezirk == "Salzburg"){
                bezirk = "Salzburg(Stadt)";
            }
            if(bezirk == "Sankt Pölten"){
                bezirk = "Sankt Pölten(Stadt)";
            }
            if(bezirk == "Sankt Pölten-Land"){
                bezirk = "Sankt Pölten(Land)";
            }
            if(bezirk == "Steyr"){
                bezirk = "Steyr(Stadt)";
            }
            if(bezirk == "Villach-Land"){
                bezirk = "Villach Land";
            }
            if(bezirk == "Villach"){
                bezirk = "Villach Stadt";
            }
            if(bezirk == "Wiener Neustadt-Land"){
                bezirk = "Wiener Neustadt (Land)";
            }
            if(bezirk == "Wiener Neustadt"){
                bezirk = "Wiener Neustadt(Stadt)";
            }
            if(bezirk == "Rust"){
                bezirk = "Rust(Stadt)";
            }
            if(bezirk == "Waidhofen an der Ybbs"){
                bezirk = "Waidhofen an der Ybbs(Stadt)";
            }
            if(bezirk == "Wels"){
                bezirk = "Wels(Stadt)";
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
            console.log(bezirk);
            console.log("Ampelstufe: "+data[0].Warnstufen[i].Warnstufe);
            ampelStufe = data[0].Warnstufen[i].Warnstufe;
            if(ampelStufe == 1){
                document.getElementById("farbkreis").style.backgroundColor = "#60B564";
                document.getElementById("WarnstufeGeschrieben").innerHTML = "GRÜN <br/> geringes Risiko";
                }else if(ampelStufe == 2){
                    document.getElementById("farbkreis").style.backgroundColor = "#FED500";
                    document.getElementById("WarnstufeGeschrieben").innerHTML = "GELB <br/> mittleres Risiko";
                }else if(ampelStufe == 3){
                    document.getElementById("farbkreis").style.backgroundColor = "#F59C00";
                    document.getElementById("WarnstufeGeschrieben").innerHTML = "ORANGE <br/> hohes Risiko";
                }else if(ampelStufe == 4){
                    document.getElementById("farbkreis").style.backgroundColor = "#CB0538";
                    document.getElementById("WarnstufeGeschrieben").innerHTML = "ROT <br/> sehr hohes Risiko";
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
        arrLänge= arrLänge + 1;
        //console.log("arrlänge:",arrLänge);
    }
   }



//Versuch die Anzahl der Bezirke automatisch zu bekommen, fnktioniert aber nicht, stattdessen 89 Elemente
// for(i=0; i<res[0].Warnstufen.length; i++){
//     if(res[0].Warnstufen[i].Region =="Bezirk"){

//     }
// }


//DROP DOWN__
//Alle Berzirknamen im Json File vom letzten Datum 

for(i=0; i<arrLänge;i++){
    if(res[0].Warnstufen[i].Region =="Bezirk"){
    allebezirknamen = res[0].Warnstufen[i];
    }

    // element = allebezirknamen;
    // dropdownContent = document.querySelector('#dropdown-content');
    // htmlToAppend = document.createElement('a');
    // htmlToAppend.setAttribute('onclick', 'changeListener()');
    // htmlToAppend.setAttribute('id', element.Name);
    // htmlToAppend.setAttribute('value', element.Name);
    // htmlToAppend.innerHTML = element.Name;
    // dropdownContent.appendChild(htmlToAppend);  

    element = allebezirknamen;
    dropdownContent = document.getElementById('myDropdown');
    htmlToAppend = document.createElement('LI');
    htmlToAppend.setAttribute('onclick', 'changeText(this)');
    textnode = document.createTextNode(element.Name);
    htmlToAppend.appendChild(textnode);
    htmlToAppend.setAttribute('value', element.Name);
    dropdownContent.appendChild(htmlToAppend);  
}
sortListDir();


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
function changeText(elm){
    bezirk = elm.getAttribute('value');
    myFunction();
    document.getElementById("bezirk").innerHTML = bezirk;
    getAmpel();  
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("li");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  function sortListDir() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.getElementById("myDropdown");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("LI");
      // Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Check if the next item should switch place with the current item,
        based on the sorting direction (asc or desc): */
        if (dir == "asc") {
          if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
            /* If next item is alphabetically lower than current item,
            mark as a switch and break the loop: */
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
            /* If next item is alphabetically higher than current item,
            mark as a switch and break the loop: */
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        // Each time a switch is done, increase switchcount by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
}