const arrBundesland = [];

function onload_bundesland(){
    document.getElementById("dropbtn_bundesland").innerHTML = sessionStorage.getItem("storeBundesland");
}

function myFunction_bundesland() {
    document.getElementById("myDropdown_bundesland").classList.toggle("show");
   }


d3.json(corsFix + url).then(res => {


    //Gib mir alle Bezirknamen
        for(i=0; i<res[0].Warnstufen.length; i++){
            if(res[0].Warnstufen[i].Region =="Bundesland"){
            arrBundesland.push(res[0].Warnstufen[i].Name);
        }
       }
    //DROP DOWN__
    for(i=0; i<arrBundesland.length;i++){

        dropdownContent = document.getElementById('myDropdown_bundesland');
        htmlToAppend = document.createElement('LI');
        
        htmlToAppend.setAttribute('onclick', 'changeText_bundesland(this)');
        textnode = document.createTextNode(arrBundesland[i]);
        htmlToAppend.appendChild(textnode);
        htmlToAppend.setAttribute('value', arrBundesland[i]);
        dropdownContent.appendChild(htmlToAppend); 
      
    }
    });

    function changeText_bundesland(elm){
        bundesland = elm.getAttribute('value');
        myFunction_bundesland();
        document.getElementById("dropbtn_bundesland").innerHTML = bundesland;
      }