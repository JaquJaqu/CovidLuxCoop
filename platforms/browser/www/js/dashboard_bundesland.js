var arrLänge_bundesland = 0;
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
            arrLänge_bundesland= arrLänge_bundesland + 1;
            arrBundesland.push(res[0].Warnstufen[i].Name);
        }
       }
    console.log(arrBundesland);
    //DROP DOWN__
    for(i=0; i<res[0].Warnstufen.length;i++){
        if(res[0].Warnstufen[i].Region =="Bundesland"){
        allebezirknamen = res[0].Warnstufen[i];
        }
    
    
        element = allebezirknamen;
        dropdownContent = document.getElementById('myDropdown_bundesland');
        htmlToAppend = document.createElement('LI');
        
        htmlToAppend.setAttribute('onclick', 'changeText(this)');
        textnode = document.createTextNode(element.Name);
        htmlToAppend.appendChild(textnode);
        htmlToAppend.setAttribute('value', element.Name);
        dropdownContent.appendChild(htmlToAppend); 
      
    }

    sortListDir("myDropdown_bundesland");
    
    });