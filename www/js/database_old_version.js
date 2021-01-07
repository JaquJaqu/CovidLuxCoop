//TO DO:
// Natalie bitten Code hochzustellenn
// Mit Bezirkswächsel auch Anzahl der Aktiven Faelle Wechseln 
// Online Funktionalität

// gemacht: 
// - indexeddb "geupdated" --> still weird.....
// - AktiveFaelle für ausgewählten Bezirk berechnet und in LS getSpeicherDatum. 







{/* <button onclick = "read()">Read </button>
      <button onclick = "readAll()">Read all </button>
      <button onclick = "add()">Add data </button>
      <button onclick = "remove()">Delete data </button>
          */}



//TO DO :

// UPDATE CHECKEN --> INTERNET VERBNDUNG USW
//Dark Mode Ausschalten --> schrift wird am handy weiß angezeigt 
 
//const urlBezirke2 = 'https://covid19-dashboard.ages.at/data/CovidFaelle_Timeline_GKZ.csv';
//const corsFixBezirke2 = 'https://cors-anywhere.herokuapp.com/';
          
          
// let pathBezirke2 = corsFixBezirke2 + urlBezirke2;
// let alleBezirksDaten = []; 
// var allItems;  
//let eTagResponseBezirke2;
//let eTagLocalBezirkdaten;
//let items_jsonBezirke2;

//let remoteData2;
var db;
// let testbool = true; // "Internet connection"


//const BezirksDaten = alleBezirksDaten;
//let AktiveFaelleMeinBez;

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

//let eTagBezirke;
var DatatruestoreBezirk;


//let AnzahlAktiveFaelle;
//let getAktiveFaelle; //Anzahl der derzeit Aktiven Fälle des gewählten Bezirks
//let getAktiveFaelle;

//let dataBez;

//let storeBezirk;


downloadFile(pathBezirke3);

//CODE  
if(testbool == true) {
  checkInternet(pathBezirke3)
  downloadFile(pathBezirke3);
       
        

        console.log("yes Sir!" ,items_jsonBezirke3);
        testbool = false;
}else{
    
    console.log('kein Datenzugriff');
}


// END CODE















function preprareBezirksData(remoteData3){
        const stringReplace = JSON.stringify(remoteData3);
        const jsonReplace = stringReplace;
        const realData = JSON.parse(jsonReplace);
        items_jsonBezirke3 = realData; 

        for (i = 0; i < items_jsonBezirke3.length; i ++){
          const obj = items_jsonBezirke3[i];
          const newKeys = { Time: "datum"}; //wenn geändert wird dann unten auch! 
          const renamedObj = renameKeys(obj, newKeys);
          items_jsonBezirke3[i] = renamedObj;
    
          document.getElementById("bezirk").innerHTML = storeBezirk;
    
        if(storeBezirk == items_jsonBezirke3[i].Bezirk){
    
            var fulldatesofitems = items_jsonBezirke3[i].datum; 
            var dateofitems = fulldatesofitems.split(" ");
            var dateofitem = dateofitems[0]; 
            items_jsonBezirke3[i].datum = dateofitem; 
            itemsstoreBezirk = items_jsonBezirke3[i];
                      
            //Anzahl Aktive Fälle berechnen
            let AnzahlFaelleSum = itemsstoreBezirk.AnzahlFaelleSum;
            let AnzahlGeheiltSum = itemsstoreBezirk.AnzahlGeheiltSum;
            let AnzahlTotSum = itemsstoreBezirk.AnzahlTotSum;
            AktiveFaellestoreBezirk = AnzahlFaelleSum - AnzahlGeheiltSum - AnzahlTotSum;
    
            //Speicherdatum
            var date = new Date();
            var updateDatestoreBezirk = date.toGMTString(); 
            DatatruestoreBezirk = {AnzahlAktiveFaelle: AktiveFaellestoreBezirk, Standort: storeBezirk, updateDate: updateDatestoreBezirk};    
            //localStorage.setItem("AktiveFaellestoreBezirk", JSON.stringify(DatatruestoreBezirk));
            document.getElementById("farbkreisAktiv").innerHTML = AktiveFaellestoreBezirk;


           


            
        } 
      }

     

      
  if(localStorage.getItem("ETagBezirkdaten") != null){
    var savedETag = localStorage.getItem("ETagBezirkdaten");
    eTagLocalBezirkdaten = savedETag;


    var eTagsplit3 = savedETag.split('"');
    var eTagsplit = eTagsplit3[3].split('zip');
    var firstHalf = eTagsplit[0]; //[0] = Datum| [1] = 00:00:00
    var secondHalf = eTagsplit[0]; //[0] = Datum| [1] = 00:00:00
    eTagBezirke = '"'+secondHalf+'zip"';
    
    
    
    
    


    //console.log('Lokal gespeicherter ETAG',getETagLocalS);
    }
        

}
 
  



function checkInternet(pathBezirke3){  

  testbool = true;
  //wenn es eine Internetverbindung ist und dder online zugriff auf die Ampeldaten gestattet dann
   var client = new XMLHttpRequest(); //mach eine Verbindung zur Resource
   try{
   client.open("GET", pathBezirke3, true);
   client.send();
    client.onreadystatechange = function () {
     
     if (this.readyState == this.HEADERS_RECEIVED) {//gibt mir alle Headers von allen Requests aus
             
       var contentTypeResponse = client.getResponseHeader("Content-Type");
 
       eTagResponseBezirke3 = client.getResponseHeader("ETag");
       
      }
      
    } 
   
   }catch(error){
     console.error(error);
     }
   }
  











function downloadFile(pathBezirke3) {
  Papa.parse(pathBezirke3, {
    download: true,
    header: true,
    complete: function (results, file) {
        console.log('Completed loading the file...');
         // Here starts your real code with this function
         preprareBezirksData(results.data);  

        
  },
  }); 
}



function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
 }


//Umlaute ersetzen
function replaceUmlauts(value){
//value = value.replace(/\u00e4/g, 'ae');
value = value.replace(/\u00f6/g, 'oe');
value = value.replace(/\u00fc/g, 'ue');
value = value.replace(/\u00c4/g, 'Ae');
value = value.replace(/\u00d6/g, 'Oe');
value = value.replace(/\u00dc/g, 'Ue');
value = value.replace(/\u00df/g, 'ss');
return value;
}


function makeUmlauts(value){
//value = value.replace(/\u00e4/g, 'ae');
value = value.replace( /'oe'/g,'\u00f6');
value = value.replace( /'ue'/g,'\u00fc');
value = value.replace( /'Ae'/g,'\u00c4');
value = value.replace( /'Oe'/g,'\u00d6');
value = value.replace( /'Ue'/g,'\u00dc');
value = value.replace( /'ss'/g,'\u00df');
return value;
}

 


//Key umbenennen --> Time zu datum
const stringReplace = JSON.stringify(remoteData3);
        const jsonReplace = stringReplace;
        const realData = JSON.parse(jsonReplace);
        items_jsonBezirke3 = realData; 
        for (i = 0; i < realData.length; i ++){
        const obj = items_jsonBezirke3[i];
        const newKeys = { Time: "datum"}; //wenn geändert wird dann unten auch! 
        const renamedObj = renameKeys(obj, newKeys);
        items_jsonBezirke3[i] = renamedObj;

        var fulldatesofitems = items_jsonBezirke3[i].datum; //auch hier schon "datum"!!!!!
        var dateofitems = fulldatesofitems.split(" ");
        var dateofitem = dateofitems[0]; //[0] = Datum| [1] = 00:00:00
        items_jsonBezirke3[i].datum = dateofitem; //Erstetzen des Datum + Urzeit String durch neuen "date" - String
        
        allItems = items_jsonBezirke3[i];
                  
        //Anzahl Aktive Fälle berechnen
        let AnzahlFaelleSum = allItems.AnzahlFaelleSum;
        let AnzahlGeheiltSum = allItems.AnzahlGeheiltSum;
        let AnzahlTotSum = allItems.AnzahlTotSum;
        

        AnzahlAktiveFaelle = AnzahlFaelleSum - AnzahlGeheiltSum - AnzahlTotSum;

//         //Speicherdatum
        var date = new Date();//var updateDate = date.toISOString(); //"2011-12-19T15:28:46.493Z"
        var updateDate = date.toGMTString(); // Tue, 17 Nov 2020 14:16:29 GMT --> Gibt mir die jetzige Uhrzeit im Format das lastModiefied Header Request auch hat
     
 
//      //FOR TESTING
    //  var ampelDatatrue = { updateDate: 'Tue, 17 Nov 2020 14:16:29 GMT', items_json };
    //  var ampelDatatrue = { updateDate: updateDate, items_json };


         var Datatrue = {AnzahlAktiveFaelle: AnzahlAktiveFaelle, updateDate: updateDate,  allItems};    
//             //console.log(Datatrue);
        alleBezirksDaten3.push(Datatrue);

;

}
//     //console.log("ALLE BEZIRKSDATEN:",alleBezirksDaten);
    
    
        
        



// //prefixes of implementation that we want to test
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

        
//ON SUCCESS
     request.onsuccess = function(event) {
      
      db = event.target.result;
      console.log("success: "+ db);
        


    if (!db.objectStoreNames.contains('bezirksdaten')) {
          console.log("storage wird erzeugt");
		  add();
		
        }else{
			console.log("storage wird geupdated");
			
			clearOS();
			updateDB();
		}
        
        console.log("etagssindnedleich");
       
      
       readItems();
       meineDatenFunktion();
      
    };
        



//ON ERROR
     request.onerror = function(event) {   
        console.error("Database error: " + event.target.errorCode);
        };


     
     request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("bezirksdaten", { autoIncrement : true });
       
 
  }


















//________FUNCTIONS_____________
//INDEXEDDB FUNKTIONS___________
function add(){
  var db = event.target.result;
  var transaction = db.transaction(["bezirksdaten"], "readwrite");

  transaction.oncomplete = function(event) {
    console.log("All done!");
  };
  
  transaction.onerror = function(event) {
    // Don't forget to handle errors!
  };
  
  var objectStore = transaction.objectStore("bezirksdaten");
  BezirksDaten.forEach(function(bezirksdaten) {
    var request = objectStore.add(bezirksdaten);
    request.onsuccess = function(event) {
      // event.target.result === customer.ssn;
    };
  });
}


function updateDB(){
	var db = event.target.result;
	var transaction = db.transaction(["bezirksdaten"], "readwrite");
  
	transaction.oncomplete = function(event) {
	  console.log("All done!");
	};
	
	transaction.onerror = function(event) {
	  // Don't forget to handle errors!
	};
	
	var objectStore = transaction.objectStore("bezirksdaten");
	BezirksDaten.forEach(function(bezirksdaten) {
	  var request = objectStore.put(bezirksdaten);
	  request.onsuccess = function(event) {
		// event.target.result === customer.ssn;
	  };
	});
  }



function clearOS(){
  var db = event.target.result;
  var transaction = db.transaction(["bezirksdaten"], "readwrite");

  transaction.oncomplete = function(event) {
    console.log("All done!");
  };
  
  transaction.onerror = function(event) {
    // Don't forget to handle errors!
  };
  
  var objectStore = transaction.objectStore("bezirksdaten");
  objectStore.clear();
}



function deleteDB(){
  var db = event.target.result;
  var transaction = db.transaction(["bezirksdaten"], "readwrite");
  var objectStore = transaction.objectStore("bezirksdaten");
  delete(objectStore);
}




function update() {
  //list.textContent = '';
  var db = event.target.result;
  const transaction = db.transaction(['bezirksdaten'], 'readwrite');
  const objectStore = transaction.objectStore('bezirksdaten');

  objectStore.openCursor().onsuccess = function(event) {
    const cursor = event.target.result;
    if (cursor) {
      
        const updateData = cursor.bezirksdaten;

        //updateData.year = 2050;
        const request = cursor.update(updateData);
        request.onsuccess = function() {
          console.log('Your Data got updated');
        
      };

      cursor.continue();
    } else {
      console.log('Entries displayed.');
    }
  };
};















function readItems(){
  var db = event.target.result;
  var transaction = db.transaction(["bezirksdaten"]);
var objectStore = transaction.objectStore("bezirksdaten");
console.log("DB VERSION", db.version);

var request = objectStore.getAll();
request.onerror = function(event) {
  // Handle errors!
};
request.onsuccess = function(event) {
  // Do something with the request.result!
  var alleDaten = request.result;
  //console.log(alleDaten);
};
  };


  
function updateItems(){
  var db = event.target.result;
  var objectStore = db.transaction(["bezirksdaten"], "readwrite").objectStore("bezirksdaten");
  var request = objectStore.getAll();
  request.onerror = function(event) {
    // Handle errors!
  };
  request.onsuccess = function(event) {
    // Get the old value that we want to update
    var data = event.target.result;
  console.log(data);
 // update the value(s) in the object that you want to change
    //data.age = 42;
  
   // Put this updated object back into the database.
    var requestUpdate = objectStore.put(data);
     requestUpdate.onerror = function(event) {
       // Do something with the error
     };
     requestUpdate.onsuccess = function(event) {
       // Success - the data is updated!
     };
 };

}
  


//Do not use for that purpose..

function cursor() {
  var db = event.target.result;
  var objectStore = db.transaction("bezirksdaten").objectStore("bezirksdaten");
  objectStore.openCursor().onsuccess = function(event) {

     var cursor = event.target.result;     
     if (cursor) {
     makeUmlauts(cursor.value.allItems.Bezirk);
    
      if (cursor.value.allItems.Bezirk == bezirk){
        targetBezirkAAFArray.push(cursor.value.AnzahlAktiveFaelle);
        getAktiveFaelle = cursor.value.AnzahlAktiveFaelle;
      }
      cursor.continue();      
       document.getElementById("aktiveFaelleValue").innerHTML = getAktiveFaelle;
     } else {
       console.log("No more entries!");    
     }
  };
}






function meineDatenFunktion(){
  var db = event.target.result;
  var objectStore = db.transaction("bezirksdaten").objectStore("bezirksdaten");
  objectStore.getAll().onsuccess = function(event) {

    var alleMeineDaten = event.target.result;
    //makeUmlauts(alleMeineDaten);
    console.log(alleMeineDaten);
    
    for (i = 0; i<alleMeineDaten.length; i++){
      makeUmlauts(alleMeineDaten[i].allItems.Bezirk);

      //eTagLocalBezirke2 = alleMeineDaten[i].eTag;



    if (alleMeineDaten[i].allItems.Bezirk == bezirk){



//Auslastung: Bundesländer/österreich immer nur aktueller tag


 
        //ARRAYS ALLER DATEN DES GEWÄHLTEN BEZIRKS (siehe globale deklaration)
        var alleMeineAAF = alleMeineDaten[i].AnzahlAktiveFaelle;
        meineDatenAAF.push(alleMeineAAF);

        var alleMeineAEW = alleMeineDaten[i].allItems.AnzEinwohner;
        meineDatenAEW.push(alleMeineAEW);

        var alleMeineAF = alleMeineDaten[i].allItems.AnzahlFaelle;
        meineDatenAF.push(alleMeineAF);

        var alleMeineAFSiebenT = alleMeineDaten[i].allItems.AnzahlFaelle7Tage;
        meineDatenAFSiebenT.push(alleMeineAFSiebenT);

        var alleMeineAFS = alleMeineDaten[i].allItems.AnzahlFaelleSum;
        meineDatenAFS.push(alleMeineAFS);

        var alleMeineAGS = alleMeineDaten[i].allItems.AnzahlGeheiltSum;
        meineDatenAGS.push(alleMeineAGS);

        var alleMeineAGT = alleMeineDaten[i].allItems.AnzahlGeheiltTaeglich;
        meineDatenAGT.push(alleMeineAGT);

        var alleMeineATS = alleMeineDaten[i].allItems.AnzahlTotSum;
        meineDatenATS.push(alleMeineATS);

        var alleMeineATT = alleMeineDaten[i].allItems.AnzahlTotTaeglich;
        meineDatenATT.push(alleMeineATT);

        var alleMeineSTI = alleMeineDaten[i].allItems.SiebenTageInzidenzFaelle;
        meineDatenSTI.push(alleMeineSTI);

        var alleMeineDatum = alleMeineDaten[i].allItems.datum;
        meineDatenDatum.push(alleMeineDatum);

      }
  
  }
  
  
    console.log("meineDatenDatum",alleMeineDatum);


    var IndexlastElementAAF = meineDatenAAF.length-1;
    console.log(IndexlastElementAAF);
    console.log("letzter Wert:", meineDatenAAF[IndexlastElementAAF]);
    getAktiveFaelle = meineDatenAAF[IndexlastElementAAF];
    //document.getElementById("aktiveFaelleValue").innerHTML = getAktiveFaelle;
  };
  }


//GENERAL FUNCTIONS___________