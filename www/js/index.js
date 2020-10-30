/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}



//=======================END CORDOVA STUFF=================================





//=======================LOAD JSON AMPELDATA=================================


const url = 'https://corona-ampel.gv.at/sites/corona-ampel.gv.at/files/assets/Warnstufen_Corona_Ampel_aktuell.json';
const corsFix = 'https://cors-anywhere.herokuapp.com/';

// METHOD 1
Papa.parse(corsFix + url, {
    download: true,
    header: true,
    complete: function (results, file) {
        console.log('Completed loading the file...');
        
        // Here starts your real code with this function
        yourMainCode(results.data);
    },
});


function yourMainCode(remoteData) {
    let data = remoteData;
    console.log('Here you can use the data: ', data);
}




//=======================Initialise Reverse Geocode API Client --> BigDataCloud: https://www.bigdatacloud.com/=================================

// Initialise Reverse Geocode API Client */
var reverseGeocoder=new BDCReverseGeocode();
                    
/* Get the current user's location information, based on the coordinates provided by their browser */
/* Fetching coordinates requires the user to be accessing your page over HTTPS and to allow the location prompt. */
reverseGeocoder.getClientLocation(function(result) {
    console.log(result);
});

/* You can also set the locality language as needed */
reverseGeocoder.localityLanguage='es';

// onError Callback receives a PositionError object
//
function onError(error) {
    console.log('code: '    + error.code    + '\n' );
}


