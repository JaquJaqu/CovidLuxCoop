
let remoteData;
let getSpeicherDatum;

yourMainCode();
HardfactsBL();


//MainCode
function yourMainCode() {
  

  read_and_prepare_Bundeslanddata()
  


}//Ende yourMainCode

function HardfactsBL() {


  bl = localStorage.getItem("storeBundesland");
  i = dataOffline.length - 1; //richtiges Bundesland, letzter Eintrag??

  let AF_BL = 'tbc';
  let Neuerk_BL = dataOffline[i].AnzahlFaelle;
  let TT_BL = dataOffline[i].AnzahlTotTaeglich;

}








//Offline Daten auslesen = Daten vom Local Storage
function read_and_prepare_Bundeslanddata() {
  //DATEN
  var items_json = localStorage.getItem("Bundeslanddaten");
  if (items_json != null) { //check of es diese Daten im localstorage gibt
    items = JSON.parse(items_json); //mit Speicherdatum 
    dataOffline = items.items_json; //Ohne Speicherdatum 
    getSpeicherDatum = items.updateDate; //SpeicherDatum


    for (i = 0; i < dataOffline.length; i++) {
      getDatum = dataOffline[i].datum;
      getBundesland = dataOffline[i].Bundesland;
      getBundeslandID = dataOffline[i].BundeslandID;
      getAnzEinwohner = dataOffline[i].AnzEinwohner;
      getAnzahlFaelle = dataOffline[i].AnzahlFaelle;
      getAnzahlFaelleSum = dataOffline[i].AnzahlFaelleSum;
      getAnzahlFaelle7Tage = dataOffline[i].AnzahlFaelle7Tage;
      getSiebenTageInzidenzFaelle = dataOffline[i].SiebenTageInzidenzFaelle;
      getAnzahlTotTaeglich = dataOffline[i].AnzahlTotTaeglich;
      getAnzahlTotSum = dataOffline[i].AnzahlTotSum;
      getAnzahlGeheiltTaeglich = dataOffline[i].AnzahlGeheiltTaeglich;
      getAnzahlGeheiltSum = dataOffline[i].AnzahlGeheiltSum;

    }

  } else {
    checkForUpdate();
  }

}

//"Time" zu "date"
function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

//Umlaute ersetzen
function replaceUmlauts(value) {
  value = value.replace(/\u00e4/g, 'ae');
  value = value.replace(/\u00f6/g, 'oe');
  value = value.replace(/\u00fc/g, 'ue');
  value = value.replace(/\u00c4/g, 'Ae');
  value = value.replace(/\u00d6/g, 'Oe');
  value = value.replace(/\u00dc/g, 'Ue');
  value = value.replace(/\u00df/g, 'ss');
  return value;
}






