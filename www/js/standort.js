//TO DO: Check internet Connection --PAsst fast gehört noch ausgebessert
// Last Modified Header Bekommen --- PASST
//Datum in Lokal FIle Speicher --- PASST

//LAst Modified undDaten im Local File Speicher vergleichen --> Passt aber komisch BUG FIX
//MAch es möglich mit Lokalen Daten zu arbeiten-- PASST

//Speichere LokationLokal
//Mach es möglich mit Lokalen Daten zu arbeiten-- PASST

//Speichere LokationLokal
//Lokaldaten updaten
//Lokaldaten mit lokaldaten offline arbeiten

let bezirk;
let bundesland;
let ampelStufe;
var arrLänge = 0;
let path2 = corsFix + url;
//let path2;
let pathbool = true; //true --> JSON ausm Internet wird verwenden, False sollte lokale Json verwenden, geht noch nicht!

//__NEU--> DEFAULT FARBKREIS
farbkreisPH = document.getElementById("farbkreisPH");
farbkreis = document.createElement("div");
farbkreis.setAttribute("id", "farbkreis");
farbkreisPH.appendChild(farbkreis);


//___Checkif Onlone
read_from_local_json();
const checkOnlineStatus = async () => {
  try {
    const online = await fetch(path2); //schau ob ich auf die Ressource zugreifen kann
    return online.status >= 200 && online.status < 300; // either true or false
    /*HTTP response codes between 200 and 299 indicate success, and we’ll return the result of the status code comparison. This will be true if the response status is from 200 to 299 and false otherwise.*/
  } catch (err) {
    return false; // definitely offline
  }
};
setInterval(async () => {
  const connectionBool = await checkOnlineStatus();
  const statusDisplay = document.getElementById("status");
  console.log("Connection Bool:", connectionBool);
  statusDisplay.textContent = connectionBool ? "Online" : "OFFline";

  //bin ich Online und brauchts ein Update der Daten?
  if (connectionBool == true) {
    checkIfJsonNeedsUPDATE();
    console.log("bist eh online");
  } else if (connectionBool == false) {
    console.log("boi du bist sowieso offline, kein update für dich..");
  }
}, 3000); // probably too often, try 30000 for every 30 seconds

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

          //Output
          document.getElementById("bezirk").innerHTML = bezirk;
          sessionStorage.setItem("storeBezirk", bezirk);
          //console.log('Du befindest dich im Bezirk: ', bezirk)
          getAmpel();
        }
        //Bundesland
        document.getElementById("bundesland").innerHTML =
          data.principalSubdivision;
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
  if (pathbool == true) {
    for (i = 0; i < data[3].Warnstufen.length; i++) {
      if (data[3].Warnstufen[i].Region == "Bezirk") {
        if (data[3].Warnstufen[i].Name == bezirk) {
          console.log(bezirk);
          //console.log("Ampelstufe: "+data[3].Warnstufen[i].Warnstufe);
          ampelStufe = data[3].Warnstufen[i].Warnstufe;

          drawIllustration(ampelStufe);
        }
      }
    }
  } else if (pathbool == false) {
    console.log("Test", data.Warnstufen.length); //HIER WEITER MACHEN

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
   }
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


//Bekomme Ampelwarnstufe von jsonFile
function getAmpel() {
  if (pathbool == true) {
    path2 = corsFix + url;
    console.log("pathonline", path2);
    loadJSON(path2,function (data) {
        getAmpelinside(data);
      },
      function (xhr) {
        console.error(xhr);
      }
    );
  } else if (pathbool == false) {
    read_from_local_json();
    path2 = dataOffline;
    data = dataOffline;
    console.log("Offline Data", dataOffline);
    console.log("pathoffline", dataOffline);
    getAmpelinside(dataOffline);
  }
}

//______downloadTextFile()
function downloadTextFile() {//Speichern der Daten im LocalStorage + Hinzufügen derderzeitigen Zeit
  loadJSON(path2, function (data) {
    let items_json = data[0];
    //console.log(items_json);

    var date = new Date();//var updateDate = date.toISOString(); //"2011-12-19T15:28:46.493Z"
    
    var updateDate = date.toGMTString(); // Tue, 17 Nov 2020 14:16:29 GMT --> Gibt mir die jetzige Uhrzeit im Format das lastModiefied Header Req auch hat
    var ampelDatatrue = { updateDate: updateDate, items_json };
    //console.log('Einmal die Uhrzeit bitte', updateDate); //Derzeitige Uhrzeit in GMT
    localStorage.setItem("Ampeldaten2", JSON.stringify(ampelDatatrue));
  });
}


function read_from_local_json() {
  var items_json = localStorage.getItem("Ampeldaten2");
  items = JSON.parse(items_json);
  items2 = JSON.stringify(items_json);
  // console.log('alle Daten außer Zeitstempel',items.length);//JSON object
  // console.log('alle Daten außer Zeitstempel',items_json[0]);//string
  console.log("alle Daten außer Zeitstempel2", items.items_json.Warnstufen.length); //string

  dataOffline = items.items_json;
  //dataOffline = items.items_json.Warnstufen.length;

  var savedDate = localStorage.getItem("Ampeldaten2");
  savedDateValue = JSON.parse(savedDate);
  getSavedDate = savedDateValue.updateDate;

  //console.log('Zuletzt im localStorage gespeichert am:',getSavedDate);
  if (!items) {
    items = [];
  }
}

//_____CHECK IF UPDATE IS NEEDED --> LAST MODIFIED-

function checkIfJsonNeedsUPDATE() {
  read_from_local_json(); //Les mir das Objekt im Lokalstorage aus (brauche das Speicherdatum "updateDate" )
  var client = new XMLHttpRequest(); //mach eine Verbindung zur Resource
  client.open("GET", path2, true);
  client.send();

  client.onreadystatechange = function () {
    if (this.readyState == this.HEADERS_RECEIVED) {
      //gibt mir alle HEaders von alles Requests aus
      var lastModifiedResponse = client.getResponseHeader("Last-Modified");
      var contentTypeResponse = client.getResponseHeader("Content-Type");
      if (contentTypeResponse != "application/json") {
        client.abort();
      } else {
        //Wenn es sich um eine JSOn Datei handelt dann gib mir den Last-Modified Header derWeb Resource
        console.log(
          "Zuletzt am Server gspeichert am (Last-Modified):",
          lastModifiedResponse
        );

        if (lastModifiedResponse < getSavedDate) {
          //Wenn der das Speicherdatum der Datei(Lastmodified) älter ist als das letzte Speicherdatum im lokal Storage dann ist es am neusten Stand
          //console.log('your Data is up-to-date');
          /*FRAGE: 
             Datum im Lokal Storage ist doch größer, als Speicherdatum der JSOn Datei. Warum ist es nicht "up - to - date"???
             */
        } else {
          console.log(
            "your Data is not up-to-date, it gets now downloaded from the resource and saved in your local storage"
          );
          downloadTextFile(path2);
        }
      }
    }
  };
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

//NEU__FUNKTION ZUM STANDORT LESEN
function readUserLocation() {
  navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, {
    enableHighAccuracy: true,
  });
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

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
//Auswählen des Bezirks im Drop Down - Text
function changeText(elm) {
  bezirk = elm.getAttribute("value");
  myFunction();
  document.getElementById("bezirk").innerHTML = bezirk;
  getAmpel();

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
    //getAmpel();
  }
  if (toggleStorageTrue != null) {
    document.getElementById("switchValue").checked = true;
  }
  if (toggleStorageFalse != null) {
    document.getElementById("switchValue").checked = false;
  }
}
