var arrLänge_bezirk = 0;

function onload_bezirk(){
    document.getElementById("dropbtn_bezirk").innerHTML = sessionStorage.getItem("storeBezirk");
}

function myFunction_bezirk() {
    document.getElementById("myDropdown_bezirk").classList.toggle("show");
   }

d3.json(corsFix + url).then(res => {


    //Gib mir alle Bezirknamen
        for(i=0; i<res[0].Warnstufen.length; i++){
            if(res[0].Warnstufen[i].Region =="Bezirk"){
            arrLänge_bezirk= arrLänge_bezirk + 1;
        }
       }
    
    //DROP DOWN__
    //Alle Berzirknamen im Json File vom letzten Datum 
    
    for(i=0; i<arrLänge_bezirk;i++){
        if(res[0].Warnstufen[i].Region =="Bezirk"){
        allebezirknamen = res[0].Warnstufen[i];
        }
    
        element = allebezirknamen;
        dropdownContent = document.getElementById('myDropdown_bezirk');
        htmlToAppend = document.createElement('LI');
        
        htmlToAppend.setAttribute('onclick', 'changeText_bezirk(this)');
        textnode = document.createTextNode(element.Name);
        htmlToAppend.appendChild(textnode);
        htmlToAppend.setAttribute('value', element.Name);
        dropdownContent.appendChild(htmlToAppend); 
      
    }
    sortListDir("myDropdown_bezirk");    
    });

    function changeText_bezirk(elm){
        bezirk = elm.getAttribute('value');
        myFunction_bezirk();
        document.getElementById("dropbtn_bezirk").innerHTML = bezirk;
      }