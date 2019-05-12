"use strict";
//var global;
var addnode = [];                                        // to add all new node into one array and send it to server
var delnode = [];
var finalnode = [];




function loginForm(){
  //var usr = form.elements.namedItem("username").value;
  var username = document.getElementById("loginform").elements[0].value;
  var pass = document.getElementById("loginform").elements[1].value;         // xxxx

  localStorage.setItem('name', username);
  //alert("Hii "+username+" Welcome to QKepp!!");

   getHistory(username);
//  form.submit();
}
function signUpForm(form){
    form.submit();
  }
  // add addEventListener for LogOut
  // Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
for (var o = 0; o < myNodelist.length; o++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("Delete");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");

for (var p = 0; p < close.length; p++) {
  close[i].onclick = function() {
    //delnode.push(document.getElementsById("myInput").value);  //xxxx
   alert("first!!");
    var div = this.parentElement;
    div.style.display = "none";
  }
}

function addElement() {
// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'li') {
    ev.target.classList.toggle('checked');
  }
}, true);

  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  addnode.push(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("Delete");   //\u00D7
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);


  for ( var v = 0; v<close.length; v++) {
      close[v].onclick = function() {
      finalnode = [];
      alert("The node will be deleted permanently if you click save!!");
      var child=document.getElementById("myUL");
      var str = child.parentElement.innerText;
      console.log(str);
      finalnode.push(str);
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

}
// this function will be called after user login successfull..
function sendData(username, pass) {

   var xmlhttp = new XMLHttpRequest();
                   //  here AJAX is required to fetch data from server..
   xmlhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
      //     alert("i am inside readyState");
            showLogInfo(this);            //xxxxx
       }
   };
  var parameters="username="+username[0]+"&pass="+pass;
  xmlhttp.open("POST", "/login", true);       //xxxxxxxx
  xmlhttp.send(parameters);

}

 function getHistory(user) {

   var xmlhttp = new XMLHttpRequest();
                       //  here AJAX is required to fetch data from server..
   xmlhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
        // updateList(this);
         updateList(this);            //xxxxx
       }
   };

   xmlhttp.open("POST", "http://localhost:5000/fetchnote?username="+user, true);       //xxxxxxxx
      xmlhttp.send();
}


function showLogInfo(arr){
   //var str = arr.responseText;
   console.log("from showLogInfo!!");
//  var json = JSON.parse(str);
  //if (str["status"]=="0")
  //alert("Login Successfully!!");
  //else if (json["status"]=="1")
  //alert("Login Failed");
  }

   function updateList(arr) {
    var str = arr.responseText;
    var json = JSON.parse(str);
  //  alert("before localStorage");                         // delete alerts
    localStorage["userData"] = JSON.stringify(json);
  }



function myFunction(){
document.getElementById("user").innerText = "";
var log = localStorage.getItem('name');
if(log != "false")
{

   // this section will  change the login name to log account
   document.getElementById("user").innerText = "LogOut";
   var json = JSON.parse(localStorage["userData"]);
   var p;


   for(p = 0; p < json.length; p++) {

     var input = json[p].usernote;
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
   var txt = document.createTextNode("Delete");   //\u00D7
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);               //
   var m;
   for (m = 0; m < close.length; m++) {
     close[m].onclick = function() {
      alert("The node will be deleted permanently if you click save!!");
       var div = this.parentElement;
       div.style.display = "none";
     }
   }
  }
 alert("You are Loged In "+log);
}
}

function save(){
 var user = window.localStorage.getItem('name');
 //alert(user);
 var enter=0;
//  here AJAX is required to fetch data from server..
if (finalnode.length == 0){
for(var p=0; p<addnode.length ; p++)
 {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     // updateList(this);
      console.log(this.responseText);
     if(enter==0) {alert("Saved Successfully to our server!!"); enter=1;}            //xxxxx
    }
};
   xmlhttp.open("POST", "http://localhost:5000/update?user="+user+"&node="+addnode[p], true);       //xxxxxxxx
   xmlhttp.send();

 }
}

else{
   var en=0;
   var final = finalnode[0].split("Delete");    //to split the data fetched from DOM
   var filter = final.filter(function (el) {      // to remove empty values if any..
               return el != "";
           });

   for(var q=0; q<filter.length ; q++)
   {
      console.log(filter[q]);
      var xmlhttp = new XMLHttpRequest();
       xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       // updateList(this);
        console.log(this.responseText);
        if(en==0) { alert("Final Updation Steps after deletion!!"); en =1; }
     }
   };
      xmlhttp.open("POST", "http://localhost:5000/update?user="+user+"&node="+filter[q], true);       //xxxxxxxx
      xmlhttp.send();
  }
 }
}

function logout(){
  alert("You will be logged out!! "+window.localStorage.getItem('name'));
  document.getElementById("user").innerText = "";
  document.getElementById("myUL").innerHTML= "";
  localStorage.setItem('name','false');

}
