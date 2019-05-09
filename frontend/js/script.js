var userlog = "shamin";
function loginForm(form){
  var usr = form.elements.namedItem("username").value;
  userlog = usr;
  console.log("i am from login form");
  form.submit();
}
function signUpForm(form){
    console.log("i am from signup form");
  form.submit();
}

// Create a "close" button and append it to each list item
  var myNodelist = document.getElementsByTagName("LI");
 var obj = [];
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function addElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  obj = obj.push(t);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
// this function will be called after user login successfull..
function oldElements() {

  var xmlhttp = new XMLHttpRequest();                            //  here AJAX is required to fetch data from server..
//  var inputValue = "hey do you remember me!! ";
  xmlhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
           updateList(this);
       }
   };
  xmlhttp.open('POST', '/fetchnote', true);
      xmlhttp.send();
}

 
 function updateList(xml){
   var xmlDoc = xml.responseText;
   var li = document.createElement("li");
   var inputValue = xmlDoc;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);
   if (inputValue === '') {
     alert("You must write something!");
   } else {
     document.getElementById("myUL").appendChild(li);
   }
   document.getElementById("myInput").value = "";

   var span = document.createElement("SPAN");
   var txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);

   for (i = 0; i < close.length; i++) {
     close[i].onclick = function() {
       var div = this.parentElement;
       div.style.display = "none";
     }
   }

 }
