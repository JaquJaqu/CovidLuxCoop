
let bezirk;
let bundesland;

function getLocation(latitude, longitude) {

    var apiString = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' 
    + latitude + '&longitude=' + longitude + '&localityLanguage=de' ;

    loadJSON(apiString,
        function(data) {for(i=0; i<data.localityInfo.administrative.length; i++){ 
            
            if(data.city == 'Wien'){
                if(data.localityInfo.administrative[i].adminLevel == '4'){
                    document.getElementById('bezirk').innerHTML = data.localityInfo.administrative[i].name;
                    bezirk = document.getElementById('bezirk').innerText;
                    console.log(bezirk);
            }
         } else if(data.localityInfo.administrative[i].adminLevel == '6'){
             document.getElementById('bezirk').innerHTML = data.localityInfo.administrative[i].name;
             bezirk = document.getElementById('bezirk').innerText;
             console.log(bezirk);
             }
             document.getElementById('bundesland').innerHTML = data.principalSubdivision;
             bundesland = data.principalSubdivision;
             console.log(bundesland);
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