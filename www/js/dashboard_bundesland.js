var arrLänge_bundesland = 0;

function onload_bundesland(){
    document.getElementById("dropbtn_bundesland").innerHTML = sessionStorage.getItem("storeBundesland");
}


d3.json(corsFix + url).then(res => {


    //Gib mir alle Bezirknamen
        for(i=0; i<res[0].Warnstufen.length; i++){
            if(res[0].Warnstufen[i].Region =="Bundesland"){
            arrLänge_bundesland= arrLänge_bundesland + 1;
        }
       }
    
    //DROP DOWN__
    for(i=0; i<arrLänge_bundesland;i++){
        if(res[0].Warnstufen[i].Region =="Bundesland"){
        allebundeslandnamen = res[0].Warnstufen[i];
        }
    
        object = allebundeslandnamen;
        dropdownContentbundesland = document.getElementById('myDropdown_bundesland');
        htmlToAppendbundesland = document.createElement('LI');
        
        htmlToAppendbundesland.setAttribute('onclick', 'changeText(this)');
        textnodebundesland= document.createTextNode(object.Name);
        htmlToAppendbundesland.appendChild(textnodebundesland);
        htmlToAppendbundesland.setAttribute('value', object.Name);
        dropdownContentbundesland.appendChild(htmlToAppendbundesland); 
      
    }

    sortListDir("myDropdown_bundesland");
    
    });