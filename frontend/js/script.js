"use strict";
//var global;
function loginForm(form){
  //var usr = form.elements.namedItem("username").value;
  var str = document.getElementById("loginform").elements[0].value;
  history(str);
  form.submit();
}

function signUpForm(form){
    form.submit();
  }

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
//var obj = [];
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
//  obj = obj.push(t);
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
 var k;
  for (k = 0; k < close.length; k++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
// this function will be called after user login successfull..
function history(str) {
   var xmlhttp = new XMLHttpRequest();                           //  here AJAX is required to fetch data from server..
   xmlhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
           updateList(this);
       }
   };

   xmlhttp.open("POST", "http://localhost:5000/fetchnote?username="+str, true);
      xmlhttp.send();
}

function updateList(arr) {
  var str = arr.responseText;
  var json = JSON.parse(str);
  var out = "";
  var i;
  var input;
  console.log(json.length);

  localStorage["userData"] = JSON.stringify(json);

  for(i = 0; i < json.length; i++) {

    input = json[i].usernote;
    var li = document.createElement("li");
    var t = document.createTextNode(input);

    li.appendChild(t);
    if (input === '') {
     alert("You must write something!");
   } else {
    document.getElementById("myUL").appendChild(li);
    }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);               //
  var j=0;
  for (j = 0; j < close.length; j++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
 }

}


function myFunction() {

   var json = JSON.parse(localStorage["userData"]);

    //alert("You have no previous data!!");


   for(i = 0; i < json.length; i++) {

     var input = json[i].usernote;
     var li = document.createElement("li");
     var t = document.createTextNode(input);

     li.appendChild(t);
     if (input === '') {
      alert("You must write something!");
    } else {
     document.getElementById("myUL").appendChild(li);
     }
   document.getElementById("myInput").value = "";

   var span = document.createElement("SPAN");
   var txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);               //
   var j=0;
   for (j = 0; j < close.length; j++) {
     close[i].onclick = function() {
       var div = this.parentElement;
       div.style.display = "none";
     }
   }
  }
alert("You are now Loged In..");

}
