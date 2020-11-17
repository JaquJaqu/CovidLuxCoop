
let bezirk;
let bundesland;
let ampelStufe;
var arrLänge = 0;
const url = 'https://corona-ampel.gv.at/sites/corona-ampel.gv.at/files/assets/Warnstufen_Corona_Ampel_aktuell.json';
const corsFix = 'https://cors-anywhere.herokuapp.com/';

sessionStorage.setItem("store", false);

//__NEU--> DEFAULT FARBKREIS
farbkreisPH = document.getElementById("farbkreisPH");
            farbkreis = document.createElement("div");
            farbkreis.setAttribute("id","farbkreis");
            
            farbkreisPH.appendChild(farbkreis);
            


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
            sessionStorage.setItem("storeBezirk",bezirk);
            getBezirk();
            getAmpel();
             //console.log(bezirk);
             }
             //Bundesland
             document.getElementById('bundesland').innerHTML = data.principalSubdivision;
             bundesland = data.principalSubdivision;
             sessionStorage.setItem("storeBundesland",bundesland);
             console.log(sessionStorage.getItem("storeBundesland"));
             //console.log(bundesland);
            }
        
             console.log(data); },
         function(xhr) { console.error(xhr); }
);
}





//Bekomme Ampelwarnstufe von jsonFile
function getAmpel(){
loadJSON(corsFix+url, function(data){for(i=0; i<data[3].Warnstufen.length; i++){ 
    if(data[3].Warnstufen[i].Region == 'Bezirk'){
       
        if(data[3].Warnstufen[i].Name == bezirk){
            console.log(bezirk);
            console.log("Ampelstufe: "+data[3].Warnstufen[i].Warnstufe);
            ampelStufe = data[3].Warnstufen[i].Warnstufe;


            //document.getElementById("farbkreis").style.backgroundColor = "rgb(168, 168, 168)";
            if(ampelStufe == 1){
                document.getElementById("farbkreis").style.backgroundColor = "#60B564";
                document.getElementById("WarnstufeGeschrieben").innerHTML = "GRÜN <br/> geringes Risiko";
                document.getElementById("farbkreisAktiv").style.border = "1px solid #60B564";
                document.getElementById("ringerlYeOr").style.display = "none";
                document.getElementById("ringerlReGr").style.display = "block";
                document.getElementById("ringerlReGr").style.marginLeft = "-3.5vw";
                document.getElementById("ringerlReGr").style.marginTop = "-0.2vh";
                }else if(ampelStufe == 2){
                    document.getElementById("farbkreis").style.backgroundColor = "#FED500";
                    document.getElementById("WarnstufeGeschrieben").innerHTML = "GELB <br/> mittleres Risiko";
                    document.getElementById("farbkreisAktiv").style.border = "1px solid #FED500";
                    document.getElementById("ringerlReGr").style.display = "none";
                    document.getElementById("ringerlYeOr").style.display = "block";
                    document.getElementById("ringerlYeOr").style.marginLeft = "3vw";
                    document.getElementById("ringerlYeOr").style.marginTop = "-0.2vh";
                }else if(ampelStufe == 3){
                    document.getElementById("farbkreis").style.backgroundColor = "#F59C00";
                    document.getElementById("WarnstufeGeschrieben").innerHTML = "ORANGE <br/> hohes Risiko";
                    document.getElementById("farbkreisAktiv").style.border = "1px solid #F59C00";
                    document.getElementById("ringerlReGr").style.display = "none";
                    document.getElementById("ringerlYeOr").style.display = "block";
                    document.getElementById("ringerlYeOr").style.marginLeft = "11vw";
                    document.getElementById("ringerlYeOr").style.marginTop = "-0.2vh";
                }else if(ampelStufe == 4){
                    document.getElementById("farbkreis").style.backgroundColor = "#CB0538";
                    document.getElementById("WarnstufeGeschrieben").innerHTML = "ROT <br/> sehr hohes Risiko";
                    document.getElementById("farbkreisAktiv").style.border = "1px solid #CB0538";
                    document.getElementById("ringerlYeOr").style.display = "none";
                    document.getElementById("ringerlReGr").style.display = "block";
                    document.getElementById("ringerlReGr").style.marginLeft = "18vw";
                    document.getElementById("ringerlReGr").style.marginTop = "-0.2vh";
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


//NEU__FUNKTION ZUM STANDORT LESEN
function readUserLocation(){
navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, { enableHighAccuracy: true });
}

// METHOD 2
d3.json(corsFix + url).then(res => {


//Gib mir alle Bezirknamen
    for(i=0; i<res[0].Warnstufen.length; i++){
        if(res[0].Warnstufen[i].Region =="Bezirk"){
        bezirkname = res[0].Warnstufen[i].Name;
        ampelwarnstufe = res[0].Warnstufen[i].Warnstufe;
        arrLänge= arrLänge + 1;
        //console.log("arrlänge:",arrLänge);
    }
   }




//DROP DOWN__
//Alle Berzirknamen im Json File vom letzten Datum 

for(i=0; i<arrLänge;i++){
    if(res[0].Warnstufen[i].Region =="Bezirk"){
    allebezirknamen = res[0].Warnstufen[i];
    }


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

for(i=0; i<arrLänge;i++){
    if(res[0].Warnstufen[i].Region =="Bezirk"){
    allebezirknamenstatistik = res[0].Warnstufen[i];
    }


    variable = allebezirknamenstatistik;
    dropdownContentbezirk = document.getElementById('myDropdown_bezirk');
    htmlToAppendbezirk = document.createElement('LI');
    
    htmlToAppendbezirk.setAttribute('onclick', 'changeText(this)');
    textnodebezirk = document.createTextNode(variable.Name);
    htmlToAppendbezirk.appendChild(textnodebezirk);
    htmlToAppendbezirk.setAttribute('value', variable.Name);
    dropdownContentbezirk.appendChild(htmlToAppendbezirk); 
  
}

for(i=0; i<9;i++){
    if(res[0].Warnstufen[i].Region =="Bundesland"){
    allebundeslandnamen = res[0].Warnstufen[i];
    }


    object = allebundeslandnamen;
    dropdownContentbundesland = document.getElementById('myDropdown_bundesland');
    htmlToAppendbundesland = document.createElement('LI');
    
    htmlToAppendbundesland.setAttribute('onclick', 'changeText(this)');
    textnodebundesland= document.createTextNode(object.Name);
    htmlToAppendbundesland.appendChild(textnodebundesland);
    htmlToAppendbundesland.setAttribute('value', object.Name);
    dropdownContentbundesland.appendChild(htmlToAppendbundesland); 
  
}

});



/*sessionStorage.setItem("storeToggle", false);*/
//__TOGGLE FUNKTION______
  function myToggle(){
    let isChecked=document.getElementById("switchValue");
    if(isChecked.checked){
        checkBool = true; //true = Standort deaktiviert! ==> DEFAULT
        //console.log('checkbool',checkBool);
    }else{
        checkBool = false; //false = Standort deaktiviert!
        //console.log('checkbool',checkBool);
    }
}

//______STANDORT verwenden mit Toggle________
function myLocation() {
    let isChecked=document.getElementById("switchValue");
    myToggle(isChecked); //Toggle Mechanismus: true = Standort deaktiviert!
     
        //Manuelle Lokation
        if(checkBool == true){
            
            document.getElementById("bezirk").innerHTML = bezirk;
            infoText.setAttribute('display', 'none');

            sessionStorage.setItem("storeToggleTrue", true);
            sessionStorage.removeItem("storeToggleFalse");
            sessionStorage.setItem("storeBezirk",bezirk);

            bezirk=document.getElementById("bezirk").innerHTML;
            document.getElementById("infoText").innerText = "das ist nicht dein aktueller Standort";
           
        //Standortbasierte Lokation
        }else if(checkBool == false){
            readUserLocation(); //Standort abfragen
            
            document.getElementById("bezirk").innerHTML = bezirk;
            let infoText = document.getElementById("infoText");
            infoText.setAttribute('display', 'inline-block');

            sessionStorage.setItem("storeToggleFalse", false);
            sessionStorage.removeItem("storeToggleTrue");
            sessionStorage.setItem("storeBezirk",bezirk);

            document.getElementById("infoText").innerText = "dein derzeitiger Standort wird angezeigt";
            document.getElementById("infoText2").style.display= "none";
            //console.log(bezirk);
        }
}


//Auswählen des Bezirks im Drop Down - Text
function changeText(elm){
    bezirk = elm.getAttribute('value');
    myFunction();
    document.getElementById("bezirk").innerHTML = bezirk;
    getAmpel();

    //NEU: Für Toggle funktionalität
    document.getElementById("infoText").innerText = "Das ist nicht dein Standort, du hast dir selbst einen Bezirk gewählt";
    document.getElementById("infoText2").style.display= "none"; 
    //NEU: Anderer Berzirk ausgewählt, Standort wird deaktiviert
    document.getElementById("switchValue").checked= true;

    sessionStorage.setItem("storeBezirk",bezirk);
    sessionStorage.setItem("storeToggleTrue", true);
    sessionStorage.removeItem("storeToggleFalse");
  }



//____DROP DOWN_____

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

   function myFunctionbezirk(){
    document.getElementById("myDropdown_bezirk").classList.toggle("show");
   }

   function myFunctionbundesland(){
    document.getElementById("myDropdown_bundesland").classList.toggle("show");
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
        if (dir == "asc") {
          if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
           shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        // Each time a switch is done, increase switchcount by 1:
        switchcount ++;
      } else {
       
       if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }


  function onload_index(){
    bezirkStorage = sessionStorage.getItem("storeBezirk");
    toggleStorageTrue = sessionStorage.getItem("storeToggleTrue");
    toggleStorageFalse = sessionStorage.getItem("storeToggleFalse");

    console.log(sessionStorage.getItem("storeToggleTrue"));
    console.log(sessionStorage.getItem("storeToggleFalse"));
  
    if(bezirkStorage != null){
        document.getElementById("bezirk").innerHTML = bezirkStorage;
        bezirk = bezirkStorage;
        document.getElementById("infoText2").style.display = "none";
        getAmpel();
    }
    if(toggleStorageTrue != null){
          document.getElementById("switchValue").checked = true;
        }
    if(toggleStorageFalse != null){
          document.getElementById("switchValue").checked = false;
        }
  }





    

