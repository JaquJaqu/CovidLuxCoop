var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

function onload_bezirk(){
document.getElementById("dropbtn_bezirk").innerHTML = sessionStorage.getItem("storeBezirk");
}
function onload_bundesland(){
document.getElementById("dropbtn_bundesland").innerHTML = sessionStorage.getItem("storeBundesland");
}
function onload_info(){
  var name = sessionStorage.getItem("pathname");
  var link = document.getElementById("back2");
  link.setAttribute('href', name);
}


function onload_settings(){
    toggleStorageTrue = sessionStorage.getItem("storeToggleTrue");
    toggleStorageFalse = sessionStorage.getItem("storeToggleFalse");
    console.log(sessionStorage.getItem("storeToggleTrue"));
console.log(sessionStorage.getItem("storeToggleFalse"));

var name = sessionStorage.getItem("pathname");
  var link = document.getElementById("back1");
  link.setAttribute('href', name);

    if(toggleStorageTrue != null){
          document.getElementById("switchValue_setting").checked = true;
        }
  
        if(toggleStorageFalse != null){
          document.getElementById("switchValue_setting").checked = false;
        }
}

function checkToggle(){
  let isChecked=document.getElementById("switchValue_setting");
   if(isChecked.checked){
     checkBool = true;
   }
   else{
     checkBool = false;
   }
        //Manuelle Lokation
        if(checkBool == true){
            sessionStorage.setItem("storeToggleTrue", true);
            sessionStorage.removeItem("storeToggleFalse");

            console.log(document.getElementById("switchValue").checked);
            document.getElementById("switchValue").checked = true;
            

            console.log(sessionStorage.getItem("storeToggleTrue"));
            console.log(sessionStorage.getItem("storeToggleFalse"));

        //Standortbasierte Lokation
        }else if(checkBool == false){

            sessionStorage.setItem("storeToggleFalse", false);
            sessionStorage.removeItem("storeToggleTrue");

            document.getElementById("switchValue").checked = false;

            console.log(sessionStorage.getItem("storeToggleTrue"));
            console.log(sessionStorage.getItem("storeToggleFalse"));
        }
}

function saveHistory(){
  sessionStorage.setItem("pathname",location.pathname);
}


function myFunctionbezirk(){
  document.getElementById("myDropdown_bezirk").classList.toggle("show");
 }

 function myFunctionbundesland(){
  document.getElementById("myDropdown_bundesland").classList.toggle("show");
 }




   