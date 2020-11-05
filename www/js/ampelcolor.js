// const url = 'https://corona-ampel.gv.at/sites/corona-ampel.gv.at/files/assets/Warnstufen_Corona_Ampel_aktuell.json';
// const corsFix = 'https://cors-anywhere.herokuapp.com/';
// //const corsFix = 'https://crossorigin.me.herokuapp.com/';

// // METHOD 2
// d3.json(corsFix + url).then(res => {
//     // console.log('Alle: ', res[0].Warnstufen);
//     // console.log('Länge neuster Datensatz: ', res[0].Warnstufen.length);


// // //Gib mir alle Bundesländer
// // for(i=0; i<res[0].Warnstufen.length; i++){
// //     if(res[0].Warnstufen[i].Region =="Bundesland"){
// //     bundeslandname = res[0].Warnstufen[i].Name;
// //     ampelwarnstufeBL = res[0].Warnstufen[i].Warnstufe;
// //     }
// // }

// //Gib mir alle Bezirknamen
//     for(i=0; i<res[0].Warnstufen.length; i++){
//         if(res[0].Warnstufen[i].Region =="Bezirk"){
//         bezirkname = res[0].Warnstufen[i].Name;
//         ampelwarnstufe = res[0].Warnstufen[i].Warnstufe;
//     }
//    }



// //Versuch die Anzahl der Bezirke automatisch zu bekommen, fnktioniert aber nicht, stattdessen 89 Elemente
// for(i=0; i<res[0].Warnstufen.length; i++){
//     if(res[0].Warnstufen[i].Region =="Bezirk"){
//     arrLänge=[i];
//     //console.log("arrlänge:",arrLänge);
//     }
// }


// //DROP DOWN__
// //Alle Berzirknamen im Json File vom letzten Datum 

// for(i=0; i<89; i++){
//     if(res[0].Warnstufen[i].Region =="Bezirk"){
//     allebezirknamen = res[0].Warnstufen[i];
//     }

//     element = allebezirknamen;
//     dropdownContent = document.querySelector('#dropdown-content');
//       htmlToAppend = document.createElement('option');
//     htmlToAppend.setAttribute('onclick', 'changeListener()');
//     htmlToAppend.setAttribute('id', element.Name);
//     htmlToAppend.innerHTML = element.Name;
//     dropdownContent.appendChild(htmlToAppend);

   
    
    
// }


// //_________Farbe wechseln
// lokationbezirk = document.getElementById('bezirk').innerHTML;
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




// });

// //Auswählen des Bezirks im Drop Down
// document.getElementById("dropdown-content").onchange = changeListener;
//   function changeListener(){
//   var value = this.value
//     console.log(value);
    
     
//   }



   