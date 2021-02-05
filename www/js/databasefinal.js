const urlBezirke3 = 'https://covid19-dashboard.ages.at/data/CovidFaelle_Timeline_GKZ.csv';
const corsFixBezirke3 = 'https://evening-reaches-25236.herokuapp.com/'; //eigener Proxy

          
          
let pathBezirke3 = corsFixBezirke3 + urlBezirke3;
let alleBezirksDaten2 = []; 
var allItems;  
let eTagResponseBezirke3;
let eTagLocalBezirkdaten;
let items_jsonBezirke3;
var ETagBezirksdataDatabaseLS;

var db;
let testbool = true; // "Internet connection"


const BezirksDaten = alleBezirksDaten2;
let AktiveFaelleMeinBez;

var meineDatenAAF = []; //Alle Aktive Fälle jedes Datums des Gewählten Bezirks
var meineDatenAEW = [];
var meineDatenAF = [];
var meineDatenAFSiebenT = [];
var meineDatenAFS = [];
var meineDatenAGS = [];
var meineDatenAGT = [];
var meineDatenATS = [];
var meineDatenATT = [];
var meineDatenSTI = [];
var meineDatenDatum = [];
let eTagBezirke;



let AnzahlAktiveFaelle;
let getAktiveFaelle; //Anzahl der derzeit Aktiven Fälle des gewählten Bezirks


let dataBez;
let updatebool = false;
let databasebool;
 
let farbkreisValue;

//___START INITIALISATION______
yourMainCode3(items_jsonBezirke3);


//___________MAIN CODE___________________________________________________
function yourMainCode3(items_jsonBezirke3) {
 
//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || 
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
window.msIDBKeyRange


if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}


   var db; 
   var request = window.indexedDB.open("alleBezirksDaten",1);          
  
 var upgradebool = false;
   
//ON SUCCESS
  request.onsuccess = function(event) { 
    var db = event.target.result;
       //Wenn es das OS "bezirksdaten" gibt dann schau mir ob es Daten hat
       var transaction = db.transaction(['bezirksdaten'], 'readwrite');
       var objectStore = transaction.objectStore('bezirksdaten');
       var countRequest = objectStore.count();
 
        db = event.target.result;
    
  
  //Add --> Daten zu objectStore"bezirksdaten" hinzugügen
  if (!db.objectStoreNames.contains('bezirksdaten') || db.objectStoreNames.contains('bezirksdaten') == null || db.objectStoreNames.contains('bezirksdaten') == undefined) {
          add();
          
  //Update
  }else if(db.objectStoreNames.contains('bezirksdaten') && ETagBezirksdataDatabaseLS != eTagResponseBezirke3 || ETagBezirksdataDatabaseLS != eTagResponseBezirke3 || upgradebool == true){
      clearOS();    
      updateDB();
    } 
  }
  
  
//ON ERROR
     request.onerror = function(event) {   
        };


     
     request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("bezirksdaten", {autoIncrement : true });
        //check Aktualität der Daten
        checkETagBezirksDatabase(pathBezirke3);
         upgradebool = true;
        //ETAg nur da checken,danach kennt ers im onsucces, onsuccess kommt später!
  };






      
    
    


//______INDEXEDDB_SPECIFIC_FUNCTIONS___________
function add(){
  var db = event.target.result;
  var transaction = db.transaction(["bezirksdaten"], "readwrite");
  var objectStore = db.objectStore("bezirksdaten");

  transaction.oncomplete = function(event) {
 
  };
  
  transaction.onerror = function(event) {

  };
  
  //Daten hinzufügen  
 var request = BezirksDaten.forEach(function(bezirksdaten) {
     transaction.db.objectStore("bezirksdaten").put(bezirksdaten);
      request.onsuccess = function(event) {
    };
  });
}

//Daten ersetzen/erneuern
function updateDB(){
	var db = event.target.result;
	var transaction = db.transaction(["bezirksdaten"], "readwrite");
  transaction.oncomplete = function(event) {

	};

	transaction.onerror = function(event) {

	};
	
	var objectStore = transaction.objectStore("bezirksdaten");
	BezirksDaten.forEach(function(bezirksdaten) {
	  var request = objectStore.put(bezirksdaten);
	  request.onsuccess = function(event) {
	  };
	});
  }



function clearOS(){
  var db = event.target.result;
  var transaction = db.transaction(["bezirksdaten"], "readwrite");

  transaction.oncomplete = function(event) {

  };
  
  transaction.onerror = function(event) {

  };
  
  var objectStore = transaction.objectStore("bezirksdaten");
  objectStore.clear();
}


}//___________________________________________END MAIN CODE_____________________________________________


//Aktualität checken1
function checkETagBezirksDatabase(pathBezirke3){  
  //wenn es eine Internetverbindung ist und dder online zugriff auf die Ampeldaten gestattet dann
   var client = new XMLHttpRequest(); //mach eine Verbindung zur Resource
   try{
   client.open("GET", pathBezirke3, true);
   client.send();
    client.onreadystatechange = function () {
     if (this.readyState == this.HEADERS_RECEIVED) {//gibt mir alle Headers von allen Requests aus
       eTagResponseBezirke3 = client.getResponseHeader("ETag");
         
  ETagBezirksdataDatabaseLS = localStorage.getItem("ETagBezirksdatenDatabase");

  //Wenn Etag im LS oder verändert dann download und verwende LS Daten für AktiveFaelle
if(ETagBezirksdataDatabaseLS == null || ETagBezirksdataDatabaseLS != eTagResponseBezirke3){
  databasebool = false;
  downloadFile2(pathBezirke3);
localStorage.setItem("ETagBezirksdatenDatabase",eTagResponseBezirke3);
  databasebool = true; //Danach verwende wieder die DB Daten

}else if (ETagBezirksdataDatabaseLS == eTagResponseBezirke3){
  databasebool = true;
}
       }      
    } 
   }catch(error){
     //console.error(error);
     }
   }

   



function downloadFile2(pathBezirke3) {
  Papa.parse(pathBezirke3, {
    download: true,
    header: true,
    complete: function (results, ) {
      //Key umbenennen --> Time zu datum
      items_jsonBezirke3 = results.data;
      for (i = 0; i < results.data.length; i ++){

      const obj = items_jsonBezirke3[i];
      let newKeys = { Time: "datum"}; //wenn geändert wird dann unten auch! 
      const renamedObj = renameKeys(obj, newKeys);
      items_jsonBezirke3[i] = renamedObj;

      var fulldatesofitems = items_jsonBezirke3[i].datum; //auch hier schon "datum"!!!!!
      var dateofitems = fulldatesofitems.split(" ");
      var dateofitem = dateofitems[0]; 
      items_jsonBezirke3[i].datum = dateofitem; //Erstetzen des Datum + Urzeit String durch neuen "date" - String
      allItems = items_jsonBezirke3[i];
                
      //Anzahl Aktive Fälle berechnen
      let AnzahlFaelleSum = allItems.AnzahlFaelleSum;
      let AnzahlGeheiltSum = allItems.AnzahlGeheiltSum;
      let AnzahlTotSum = allItems.AnzahlTotSum;
      

      AnzahlAktiveFaelle = AnzahlFaelleSum - AnzahlGeheiltSum - AnzahlTotSum;

      //Speicherdatum
      var date = new Date();//var updateDate = date.toISOString(); //"2011-12-19T15:28:46.493Z"
      var updateDate = date.toGMTString(); // Tue, 17 Nov 2020 14:16:29 GMT --> Gibt mir die jetzige Uhrzeit im Format das lastModiefied Header Request auch hat
      var Datatrue = {AnzahlAktiveFaelle: AnzahlAktiveFaelle, updateDate: updateDate,  allItems};    
       alleBezirksDaten2.push(Datatrue);
  }
        
         // Here starts your real code with this function
        yourMainCode3(results.data);  
        
        items_jsonBezirke3 = results.data;
        return dataBez; 
  },
  }); 
}



function renameKeys(obj, newKeys) {
  let keyValues = Object.keys(obj).map(key => {
    let newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
 }
