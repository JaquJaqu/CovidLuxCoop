
/*
__!!_____Was getan wurde: 
-) Check internet Connection
-) Datum in Lokal FIle Speicher
-) Last Modified Header vom Browser Bekommen 
-) zu LokalStorage Daten Speicherdatum dazu speichern
-) Last Modified und Daten im Local File Speicher vergleichen --> Passt aber komisch BUG FIX
-) Mit lokalen Daten (und online) daten arbeiten 
-) Daten lieber immer vom LokalStorage nehmen!: Spart Bandbreite und code:
-) Speichere LokationLokal
-) Lokaldaten updaten
-) mit lokaldaten offline arbeiten

__!!_____TO DO:  
--> Checken Lokationsdaten immer offline genommen werden
--> beim einschalten der App wird keine Farbe angezeigt wenn Standort = offline
--> Speichern der Lokationsdaten wenn sie noch nie vorher im local storage gespeichert wurden checken/schaun obs wirklich geht! 
--> Zusatz zum Regelmäßig nach Updates prüfen:
   derzeit alle paar sekunden gibt es einen trigger der zurück gibt ob Internet aktiviert wurde? 
-) Wenn man online war und dann offline geht ist der Standort immer noch als Markiert getoggled --> Stimmt ja dann nicht weil kein Internet?? Wie lösen? 


PROBLEME:
-) Problem1: 
    Drop down muss noch statisch gelöst weren!!! sonst funktioniert das drop down erst wenn manden Standort einmal aktiviert hat! 
    Derzeit wirds noch in getAmpel() aufgerufen!

Probleme die durch das implementieren der lokalen JSOn Datei für die Berzirke behoben werden sollten:
-) Problem2: 
    Beim Switchen von Online/Zu Offline und umgekehrt Spackt das Dropdown --> muss noch mit lokaler JSON Gemached werden, wird derzeit noch automatisch generiert
-) Problem3: 
    Fehlermedlung wenn connection is off: "standort.js:485 Uncaught (in promise) TypeError: Cannot read property 'Region' of undefined"
    sollt aber ned zu tragisch sein

Anderes Problem:
-) Problem3: Datumsvergleich vom lokalstorage unlogisch: überlegen warum
*/

let bezirk;
let bundesland;
let ampelStufe;
let lokalstorageBezirk;
let lokalstorageBundesland;

let checkBool; //checkt Standort wenn false = Standort AN
let connBool; //checkt Internet wenn true= Internet AN
let accessBool = true; //checkt of ampelfile online geladen werden soll, wenn true = AN
let pathbool; //Checkt ob Ampfelfile online angefragt werden kann wenn true = MÖGLICH
//downloadAmpelFile(); //wenn noch nie vorher gedownloaded wurde und es wegen irgend inem grund ned automatisch geht.. 


var arrLänge = 0;
let path2 = corsFix + url;


farbkreisPH = document.getElementById("farbkreisPH");
farbkreis = document.createElement("div");
farbkreis.setAttribute("id", "farbkreis");
farbkreisPH.appendChild(farbkreis);
read_from_local_storage();
//createDropdown(); --> standort.js:527 Uncaught TypeError: Failed to execute 'getCurrentPosition' on 'Geolocation': parameter 1 is not of type 'Function'.

//Drop down muss noch statisch gelöst weren!!! sonst funktioniert das drop down erst wenn manden Standort einmal aktiviert hat! 
//Derzeit wirds noch in getAmpel() aufgerufen!



const checkOnlineStatus = async () => {
  try {
    const online = await fetch('https://ipv4.icanhazip.com/'); //schau ob ich auf die Ressource zugreifen kann
    //pathbool == true;
    return online.status >= 200 && online.status < 300; // either true or false
    /*HTTP response codes between 200 and 299 indicate success, and we’ll return the result of the status code comparison. This will be true if the response status is from 200 to 299 and false otherwise.*/
} catch (err) {
    return false; // definitely offline
  }
};


//Intervall das Connection Prüft, setzt connBool
setInterval(async () => {
  
  const connectionBool = await checkOnlineStatus();
  const statusDisplay = document.getElementById("status");
  console.log("Connection Bool:", connectionBool, "du hast kein Internet");
  console.log("Path Bool:", pathbool, "online zugriff auf Ampeldaten verweigert");
  statusDisplay.textContent = connectionBool ? "Online" : "OFFline";
  //bin ich Online und brauchts ein Update der Daten?
  if (connectionBool == true) {
    connBool = true;
    checkForUpdate(); //Brauchen die lokalen Daten ein Update?
    console.log("bist eh online");
  } else if (connectionBool == false) {
    connBool = false;
    console.log("boi du bist sowieso offline, kein update für dich..");
  }
}, 15000); // probably too often, try 30000 for every 30 seconds


//Zugriff auf API
function getLocation(latitude, longitude) {
  var apiString =
    "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
    latitude +
    "&longitude=" +
    longitude +
    "&localityLanguage=de";

  //Bekomme Standort von API
  loadJSON(
    apiString,
    function (data) {
      for (i = 0; i < data.localityInfo.administrative.length; i++) {
        //Wien kein Bezirk daher sondern
        if (data.city == "Wien") {
          if (data.localityInfo.administrative[i].adminLevel == "4") {
            bezirk = data.localityInfo.administrative[i].name;
            document.getElementById("bezirk").innerHTML = bezirk;
            //console.log(bezirk);
          }

          //Für alle anderen Bezirke
        } else if (data.localityInfo.administrative[i].adminLevel == "6") {
          bezirk = data.localityInfo.administrative[i].name;

          //Syntax anpassen
          bezirk = bezirk.replace("St.", "Sankt");

          if (bezirk.includes("Bezirk")) {
            bezirk = bezirk.slice(7);
          }

          //Spezialfälle
          if (bezirk == "Krems") {
            bezirk = "Krems(Land)";
          }
          if (bezirk == "Krems an der Donau") {
            bezirk = "Krems an der Donau(Stadt)";
          }
          if (bezirk == "Kirchdorf") {
            bezirk = "Kirchdorf an der Krems";
          }
          if (bezirk == "Eisenstadt") {
            bezirk = "Eisenstadt(Stadt)";
          }
          if (bezirk == "Graz") {
            bezirk = "Graz(Stadt)";
          }
          if (bezirk == "Innsbruck") {
            bezirk = "Innsbruck-Stadt";
          }
          if (bezirk == "Klagenfurt am Wörthersee") {
            bezirk = "Klagenfurt Stadt";
          }
          if (bezirk == "Klagenfurt-Land") {
            bezirk = "Klagenfurt Land";
          }
          if (bezirk == "Linz") {
            bezirk = "Linz(Stadt)";
          }
          if (bezirk == "Salzburg") {
            bezirk = "Salzburg(Stadt)";
          }
          if (bezirk == "Sankt Pölten") {
            bezirk = "Sankt Pölten(Stadt)";
          }
          if (bezirk == "Sankt Pölten-Land") {
            bezirk = "Sankt Pölten(Land)";
          }
          if (bezirk == "Steyr") {
            bezirk = "Steyr(Stadt)";
          }
          if (bezirk == "Villach-Land") {
            bezirk = "Villach Land";
          }
          if (bezirk == "Villach") {
            bezirk = "Villach Stadt";
          }
          if (bezirk == "Wiener Neustadt-Land") {
            bezirk = "Wiener Neustadt (Land)";
          }
          if (bezirk == "Wiener Neustadt") {
            bezirk = "Wiener Neustadt(Stadt)";
          }
          if (bezirk == "Rust") {
            bezirk = "Rust(Stadt)";
          }
          if (bezirk == "Waidhofen an der Ybbs") {
            bezirk = "Waidhofen an der Ybbs(Stadt)";
          }
          if (bezirk == "Wels") {
            bezirk = "Wels(Stadt)";
          }

          lokalstorageBezirk = bezirk;
          

          //Output
          document.getElementById("bezirk").innerHTML = bezirk;



          sessionStorage.setItem("storeBezirk", bezirk);
          //console.log('Du befindest dich im Bezirk: ', bezirk)
          getAmpel(dataOffline);
        }
        lokalstorageBundesland = bundesland;

        //Bundesland
        document.getElementById("bundesland").innerHTML = data.principalSubdivision;
        bundesland = data.principalSubdivision;
        sessionStorage.setItem("storeBundesland", bundesland);
        //console.log(sessionStorage.getItem("storeBundesland"));
      }

      //console.log(data);
    },
    function (xhr) {
      console.error(xhr);
    }
  );
}


function getAmpelinside(data) {
    
   }



function drawIllustration(ampelStufe){

    if (ampelStufe == 1) {
        document.getElementById("farbkreis").style.backgroundColor =
          "#60B564";
        document.getElementById("WarnstufeGeschrieben").innerHTML =
          "GRÜN <br/> geringes Risiko";
        document.getElementById("farbkreisAktiv").style.border =
          "1px solid #60B564";
        document.getElementById("ringerlYeOr").style.display = "none";
        document.getElementById("ringerlReGr").style.display = "block";
        document.getElementById("ringerlReGr").style.marginLeft = "-3.5vw";
        document.getElementById("ringerlReGr").style.marginTop = "-0.2vh";
      } else if (ampelStufe == 2) {
        document.getElementById("farbkreis").style.backgroundColor =
          "#FED500";
        document.getElementById("WarnstufeGeschrieben").innerHTML =
          "GELB <br/> mittleres Risiko";
        document.getElementById("farbkreisAktiv").style.border =
          "1px solid #FED500";
        document.getElementById("ringerlReGr").style.display = "none";
        document.getElementById("ringerlYeOr").style.display = "block";
        document.getElementById("ringerlYeOr").style.marginLeft = "3vw";
        document.getElementById("ringerlYeOr").style.marginTop = "-0.2vh";
      } else if (ampelStufe == 3) {
        document.getElementById("farbkreis").style.backgroundColor =
          "#F59C00";
        document.getElementById("WarnstufeGeschrieben").innerHTML =
          "ORANGE <br/> hohes Risiko";
        document.getElementById("farbkreisAktiv").style.border =
          "1px solid #F59C00";
        document.getElementById("ringerlReGr").style.display = "none";
        document.getElementById("ringerlYeOr").style.display = "block";
        document.getElementById("ringerlYeOr").style.marginLeft = "11vw";
        document.getElementById("ringerlYeOr").style.marginTop = "-0.2vh";
      } else if (ampelStufe == 4) {
        document.getElementById("farbkreis").style.backgroundColor =
          "#CB0538";
        document.getElementById("WarnstufeGeschrieben").innerHTML =
          "ROT <br/> sehr hohes Risiko";
        document.getElementById("farbkreisAktiv").style.border =
          "1px solid #CB0538";
        document.getElementById("ringerlYeOr").style.display = "none";
        document.getElementById("ringerlReGr").style.display = "block";
        document.getElementById("ringerlReGr").style.marginLeft = "18vw";
        document.getElementById("ringerlReGr").style.marginTop = "-0.2vh";
      }
}




function getAmpel(data) {
    path2 = dataOffline;
    data = dataOffline;
    console.log("Offline Data", dataOffline);
    for (i = 0; i < dataOffline.Warnstufen.length; i++) {
      if (dataOffline.Warnstufen[i].Region == "Bezirk") {
        if (dataOffline.Warnstufen[i].Name == bezirk) {
          //console.log(bezirk);
          //console.log("Ampelstufe: "+dataOffline.Warnstufen[i].Warnstufe);
          ampelStufe = dataOffline.Warnstufen[i].Warnstufe;
          drawIllustration(ampelStufe);
        }
       }
     }
    createDropdown();
}

//Speichern der AMPELDaten im LocalStorage + Hinzufügen der Zeit und Datum des Downloads
function downloadAmpelFile(path2) {
  if(pathbool==true && connBool ==true){ //wenn ich internet hab und auf die Ampedaten zugreifen darf dann..
  loadJSON(path2, function (data) {
    let items_json = data[0];
    //console.log(items_json);
    var date = new Date();//var updateDate = date.toISOString(); //"2011-12-19T15:28:46.493Z"
        var updateDate = date.toGMTString(); // Tue, 17 Nov 2020 14:16:29 GMT --> Gibt mir die jetzige Uhrzeit im Format das lastModiefied Header Request auch hat
    var ampelDatatrue = { updateDate: updateDate, items_json };
    //console.log('Einmal die Uhrzeit bitte', updateDate); //Derzeitige Uhrzeit in GMT
    localStorage.setItem("Ampeldaten3", JSON.stringify(ampelDatatrue));
  });
}else{ 
  pathbool=false; //verweiere zugriff auf ampeldaten online auch wenn ich internet hab
}
}

//Speichern der LOKATION Daten im LocalStorage + Hinzufügen der Zeit und Datum des Downloads
function downloadLokation() {
   console.log('DEIN BEZIRK:', lokalstorageBezirk );
    var lokationobjecttrue = {bezirksObject:lokalstorageBezirk, bundeslandObject:lokalstorageBundesland};
    localStorage.setItem("Lokationsdaten", JSON.stringify(lokationobjecttrue));
}





function read_from_local_storage() { //gib mir die Datem aus dem localStorage

  //LOKATION
  var savedLokation = localStorage.getItem("Lokationsdaten");
  savedLokationValue = JSON.parse(savedLokation);
  
  getbezirkLocalS = savedLokationValue.bezirksObject;
  getbundeslandLocalS = savedLokationValue.bundeslandObject;

  console.log('Lokal gespeicherter Bezirk: ',getbezirkLocalS);
  console.log('Lokal gespeichertes Bundesland: ',getbundeslandLocalS);


  //AMPELDATEN


  var items_json = localStorage.getItem("Ampeldaten3");

  if(items_json !=null){ //check of es diese Daten im localstorage gibt
    accessBool = false; 
  items = JSON.parse(items_json);
  items2 = JSON.stringify(items_json);
  dataOffline = items.items_json;
  //dataOffline = items.items_json.Warnstufen.length;

  var savedDate = localStorage.getItem("Ampeldaten3");
  savedDateValue = JSON.parse(savedDate);
  getSavedDate = savedDateValue.updateDate;
  //console.log('Zuletzt im localStorage gespeichert am:',getSavedDate);
  if (!items) {
    items = [];
  }
} else{
  accessBool = true; //Wenn es die Daten nicht gibt dann starte den zugriff auf die online-Daten 
  pathbool = true; 
  downloadAmpelFile(path2);
}

}


function checkForUpdate() {
  read_from_local_storage(); //Les mir das Objekte vom Lokalstorage aus (brauche "updateDate", "lokalstorageBezirk" )
  try{
  console.log('Speicherdatum vom local storage:', getSavedDate);
  }catch(error){
  console.log(error);
}  
//schau ob die lokalen Ampel und Lokationsdaten Speicherdaten geupdated gehören
if(checkBool == false){ //Standort ist aktiviert wenn checkBool==false
      //Schau ob die Standortdaten upgedated gehören wenn Internet vorhanden und der Standort aktiviert ist,
      if(getbezirkLocalS != lokalstorageBezirk){
         downloadLokation();
      }else{
        console.log('Standort ist seit letztem check unverändert');
      }
    }
if(connBool == true && accessBool == true){ //wenn es eine Internetverbindung ist und dder online zugriff auf die Ampeldaten gestattet dann
  var client = new XMLHttpRequest(); //mach eine Verbindung zur Resource
  try{
  client.open("GET", path2, true);
  client.send();
   client.onreadystatechange = function () {
    
    if (this.readyState == this.HEADERS_RECEIVED) {//gibt mir alle Headers von allen Requests aus
            var lastModifiedResponse = client.getResponseHeader("Last-Modified");
      var contentTypeResponse = client.getResponseHeader("Content-Type");
      if (contentTypeResponse != "application/json") {
        client.abort();
      } else {
        //Wenn es sich um eine JSOn Datei handelt dann gib mir den Last-Modified Header der Web Resource
        console.log("Zuletzt am Server gspeichert am (Last-Modified):",lastModifiedResponse
        );

        if (lastModifiedResponse < getSavedDate) {
          //Wenn der das Speicherdatum der Datei(Lastmodified) älter ist als das letzte Speicherdatum im lokal Storage dann ist es am neusten Stand
          console.log('your Data is up-to-date');
          pathbool = false;
          /*FRAGE: 
             Datum im Lokal Storage ist doch größer, als Speicherdatum der JSOn Datei. Warum ist es nicht "up - to - date"???
             */
        } else {
          pathbool = true; 
          console.log(
            "your Data is not up-to-date, it gets now downloaded from the resource and saved in your local storage"
         );
         downloadAmpelFile(path2);
        }
      }
    }
  };
  }catch(error){
    console.error(error);
    }
  }
  pathbool = false; 
}


/* INFO: ALTERNATIVE
The Last-Modified response header specifies the last time a change was made in the returned content, in the form of a time stamp. 
ETag values are unique identifiers generated by the server and changed every time the object is modified. Either can be used to determine if cached content is up to date.
ETags: This tag is useful when for when the last modified date is difficult to determine.
*/

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
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
};

// Error callback
function onLocationError(error) {
  console.log(
    "code: " + error.code + "\n" + "message: " + error.message + "\n"
  );
}


function readUserLocation() {
  navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, {
    enableHighAccuracy: true,
  }
  );
}


//__TOGGLE FUNKTION______
function myToggle() {
  let isChecked = document.getElementById("switchValue");
  if (isChecked.checked) {
    checkBool = true; //true = Standort deaktiviert! ==> DEFAULT
  } else {
    checkBool = false; //false = Standort deaktiviert!
  }
}

//______STANDORT verwenden mit Toggle________
function myLocation() {
  let isChecked = document.getElementById("switchValue");
  
  myToggle(isChecked); //Toggle Mechanismus: true = Standort deaktiviert!
  
  //Manuelle Lokation
  if (checkBool == true) {
    document.getElementById("bezirk").innerHTML = bezirk;
    infoText.setAttribute("display", "none");

    sessionStorage.setItem("storeToggleTrue", true);
    sessionStorage.removeItem("storeToggleFalse");
    sessionStorage.setItem("storeBezirk", bezirk);

    bezirk = document.getElementById("bezirk").innerHTML;
    document.getElementById("infoText").innerText =
      "das ist nicht dein aktueller Standort";

    //Standortbasierte Lokation
  } else if (checkBool == false) {
    readUserLocation(); //Standort abfragen
    downloadLokation();
    document.getElementById("bezirk").innerHTML = bezirk;
    let infoText = document.getElementById("infoText");
    infoText.setAttribute("display", "inline-block");

    sessionStorage.setItem("storeToggleFalse", false);
    sessionStorage.removeItem("storeToggleTrue");
    sessionStorage.setItem("storeBezirk", bezirk);

    document.getElementById("infoText").innerText =
      "dein derzeitiger Standort wird angezeigt";
    document.getElementById("infoText2").style.display = "none";
    //console.log(bezirk);
  }
}


//DROP DOWN 
function createDropdown(){
  console.log('der fehler macht nix weil die Namen lokal als JSOn gepeichert werden, wird noch gemerged');
  //Gib mir alle Bezirknamen
  dropdownData = dataOffline;
for(i=0; i<dropdownData.Warnstufen.length; i++){
  if(dropdownData.Warnstufen[i].Region =="Bezirk"){
  bezirkname = dropdownData.Warnstufen[i].Name;
  ampelwarnstufe = dropdownData.Warnstufen[i].Warnstufe;
  arrLänge= arrLänge + 1;
  //console.log('bezirknamen', bezirknamen);
  //console.log("arrlänge:",arrLänge);
}
}

//DROP DOWN__
//Alle Berzirknamen im Json File vom letzten Datum 
for(i=0; i<arrLänge;i++){
if(dropdownData.Warnstufen[i].Region =="Bezirk"){
allebezirknamen = dropdownData.Warnstufen[i].Name;
//console.log('allebezirknamen', allebezirknamen);
}

element = allebezirknamen;
dropdownContent = document.getElementById('myDropdown');
htmlToAppend = document.createElement('LI');

htmlToAppend.setAttribute('onclick', 'changeText(this)');
textnode = document.createTextNode(element);
htmlToAppend.appendChild(textnode);
htmlToAppend.setAttribute('value', element);
dropdownContent.appendChild(htmlToAppend);  
}
sortListDir();
}


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}


//Auswählen des Bezirks im Drop Down - Text
function changeText(elm) {
  bezirk = elm.getAttribute("value");
  myFunction();
  document.getElementById("bezirk").innerHTML = bezirk;
  getAmpel(dataOffline);
  //getAmpelinside();

  //NEU: Für Toggle funktionalität
  document.getElementById("infoText").innerText =
    "Das ist nicht dein Standort, du hast dir selbst einen Bezirk gewählt";
  document.getElementById("infoText2").style.display = "none";
  //NEU: Anderer Berzirk ausgewählt, Standort wird deaktiviert
  document.getElementById("switchValue").checked = true;

  sessionStorage.setItem("storeBezirk", bezirk);
  sessionStorage.setItem("storeToggleTrue", true);
  sessionStorage.removeItem("storeToggleFalse");
}

function onload_index() {
  bezirkStorage = sessionStorage.getItem("storeBezirk");
  toggleStorageTrue = sessionStorage.getItem("storeToggleTrue");
  toggleStorageFalse = sessionStorage.getItem("storeToggleFalse");

  //console.log(sessionStorage.getItem("storeToggleTrue"));
  //console.log(sessionStorage.getItem("storeToggleFalse"));

  if (bezirkStorage != null) {
    document.getElementById("bezirk").innerHTML = bezirkStorage;
    bezirk = bezirkStorage;
    document.getElementById("infoText2").style.display = "none";
    //getAmpel(dataOffline);
  }
  if (toggleStorageTrue != null) {
    document.getElementById("switchValue").checked = true;
  }
  if (toggleStorageFalse != null) {
    document.getElementById("switchValue").checked = false;
  }
}
