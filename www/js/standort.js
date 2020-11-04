
let bezirk;
let bundesland;

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
                //bezirk = result; 
                bezirk = bezirk.slice(7);
             }
             document.getElementById('bezirk').innerHTML = bezirk;

                        


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

