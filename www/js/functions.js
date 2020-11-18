const url = 'https://corona-ampel.gv.at/sites/corona-ampel.gv.at/files/assets/Warnstufen_Corona_Ampel_aktuell.json';
const corsFix = 'https://cors-anywhere.herokuapp.com/';

function saveHistory(){
  sessionStorage.setItem("pathname",location.pathname);
}


function sortListDir(name) {
  var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  list = document.getElementById(name);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  // Make a loop that will continue until no switching has been done:
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("LI");
    // Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      if (dir == "asc") {
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
         shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      // Each time a switch is done, increase switchcount by 1:
      switchcount ++;
    } else {
     
     if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}



//____DROP DOWN FILTER_____

function filterFunction(input,dropdown) {
  var input, filter, ul, li, a, i;
  input = document.getElementById(input);
  filter = input.value.toUpperCase();
  div = document.getElementById(dropdown);
  a = div.getElementsByTagName("li");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function myFunction(dropdown) {
  document.getElementById(dropdown).classList.toggle("show");
 }





   