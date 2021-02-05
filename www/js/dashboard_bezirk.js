
const urlBezirke4 = 'https://covid19-dashboard.ages.at/data/CovidFaelle_Timeline_GKZ.csv';
//const corsFixBezirke2 = 'https://evening-reaches-25236.herokuapp.com/';
const corsFixBezirke4 = 'https://evening-reaches-25236.herokuapp.com/';
let pathBezirke4 = corsFixBezirke2 + urlBezirke2;

downloadBezirksFile4(pathBezirke4);



//Bezirksfile Download
function downloadBezirksFile4(pathBezirke4) {
  Papa.parse(pathBezirke4, {
    download: true,
    header: true,
    complete: function (results, file) {
         dataOfflineBez4 = results.data;   
         prepareBezirksData4(dataOfflineBez4);   
          },
  }); 
}


function prepareBezirksData4(pathBezirke4){
  const stringReplace = JSON.stringify(pathBezirke4);
  const jsonReplace = stringReplace;
  const realData = JSON.parse(jsonReplace);
  items_jsonBezirke4 = realData; 
  


  for (i = 0; i < items_jsonBezirke4.length; i ++){
    const obj = items_jsonBezirke4[i];
    const newKeys = { Time: "datum"}; //wenn geändert wird dann unten auch! 
    const renamedObj = renameKeys(obj, newKeys);
    items_jsonBezirke4[i] = renamedObj;    

bezirk = localStorage.getItem("letzterBezirk"); 

  if(bezirk == items_jsonBezirke4[i].Bezirk){

      var fulldatesofitems4 = items_jsonBezirke4[i].datum; 
      var dateofitems4 = fulldatesofitems4.split(" ");
      var dateofitem4 = dateofitems4[0]; 
      items_jsonBezirke4[i].datum = dateofitem4; 
      itemsstoreBezirk4 = items_jsonBezirke4[i];
                
      //Anzahl Aktive Fälle berechnen
      let AnzahlFaelleSum = itemsstoreBezirk4.AnzahlFaelleSum;
      let AnzahlGeheiltSum = itemsstoreBezirk4.AnzahlGeheiltSum;
      let AnzahlTotSum = itemsstoreBezirk4.AnzahlTotSum;
      AktiveFaellestoreBezirk = AnzahlFaelleSum - AnzahlGeheiltSum - AnzahlTotSum;





     
      // //Anzahl Neuerkrankungen
      Neuerkrankungen = items_jsonBezirke4[i].AnzahlFaelle;

       // //Anzahl Todesfälle
       Todesfaelle = items_jsonBezirke4[i].AnzahlTotTaeglich;


      let letzteAkt = items_jsonBezirke4[i].datum;
      document.getElementById("letzte_zahlen").innerHTML = "Letzte Aktualisierung: "+letzteAkt;

      if(AktiveFaellestoreBezirk != null){
      document.getElementById("hfBez_aktF").innerHTML = "<div class = 'hardfacts'>" + AktiveFaellestoreBezirk + "</div";
      }
      if(Neuerkrankungen != null){
      document.getElementById("hfBez_Neuerk").innerHTML = "<div class = 'hardfacts'>" + Neuerkrankungen + "</div";
      }
      if(Todesfaelle != null){
      document.getElementById("hfBez_TTBez").innerHTML = "<div class = 'hardfacts'>" + Todesfaelle + "</div";
      }


      //Speicherdatum
      var date = new Date();
      var updateDatestoreBezirk = date.toGMTString(); 
      DatatruestoreBezirk = {AnzahlAktiveFaelle: AktiveFaellestoreBezirk, Standort: storeBezirk, updateDate: updateDatestoreBezirk};    
      alleBezirksDaten.push(DatatruestoreBezirk);
     
      //Speicher den Bezirk + den Wert im LS
      
      localStorage.setItem("letzterBezirk", bezirk);        
  } 
  
}    


} 




function setHardfacts() {
  //HARDFACTS
  if(getAktiveFaelleBez != null){
  document.getElementById("hfBez_aktF").innerHTML = "<div class = 'hardfacts'>" + getAktiveFaelleBez + "</div";
  }
  if(getNeuerkrankungenBez != null){
  document.getElementById("hfBez_Neuerk").innerHTML = "<div class = 'hardfacts'>" + getNeuerkrankungenBez + "</div";
  }
  if(getTodesfaelleBez != null){
  document.getElementById("hfBez_TTBez").innerHTML = "<div class = 'hardfacts'>" + getTodesfaelleBez + "</div";
  }

}

//_________DB STUFF ENDE______________________

function onload_bezirk() {
  if(bezirk == null || localStorage.getItem("letzterBezirk") == null){
    document.getElementById("dash_bezirk_name").innerHTML = "Bitte wähle einen Bezirk!";
  }
  if (localStorage.getItem("letzterBezirk") == null && bezirk != null) {
    document.getElementById("dash_bezirk_name").innerHTML = bezirk;
  }
  else if (localStorage.getItem("letzterBezirk") != null) {
    document.getElementById("dash_bezirk_name").innerHTML = localStorage.getItem("letzterBezirk");
  }
}

function myFunction_bezirk() {
  document.getElementById("myDropdown_bezirk").classList.toggle("show");
}

loadJSON("bundesland_dropdown.json", function (data) {
  for (i = 0; i < data[0].Bezirke.length; i++) {
    arrBezirk.push(data[0].Bezirke[i].Bezirk);
  }
  for (i = 0; i < arrBezirk.length; i++) {
    dropdownContent = document.getElementById('myDropdown_bezirk');
    htmlToAppend = document.createElement('LI');

    htmlToAppend.setAttribute('onclick', 'changeText_bezirk(this)');
    textnode = document.createTextNode(arrBezirk[i]);
    htmlToAppend.appendChild(textnode);
    htmlToAppend.setAttribute('value', arrBezirk[i]);
    dropdownContent.appendChild(htmlToAppend);

  }
  sortListDir("myDropdown_bezirk");

}, function (xhr) { console.error(xhr); });

function changeText_bezirk(elm) {
  bezirk = elm.getAttribute('value');
  myFunction_bezirk();
  document.getElementById("dropbtn_bezirk").innerHTML = bezirk;
  localStorage.setItem("letzterBezirk", bezirk);


}



