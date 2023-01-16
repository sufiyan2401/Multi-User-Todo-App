// code of main too 
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase ,ref , push ,set, onValue,onChildAdded,get,remove,update, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxHg49e-IJto3hQvVp3sZ4ikAh5BC-zTQ",
    authDomain: "module-2-t-all.firebaseapp.com",
    projectId: "module-2-t-all",
    storageBucket: "module-2-t-all.appspot.com",
    messagingSenderId: "105200600055",
    appId: "1:105200600055:web:fa378da333fae09f3d24f2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

var inp = document.getElementById("Name")
var descri= document.getElementById("Description") 
var status = document.getElementById("Status")


window.sendtodo = function () {
    var obj = {
        task: inp.value,
        description:descri.value,
        status:status.value,
        uid:localStorage.getItem("uid")
    };
       if(obj.task=="",obj.description=="",obj.status==""){
        alert("All Fields Are Requried")
        return false
       }
       else{

    const keyRef = ref(database, 'todotask','Users')
    obj.id=push(keyRef).key;
    const refrences = ref(database, `todotask/${obj.id}/`);
    // const sab =  localStorage.setItem()
    // console.log(sab)



    set(refrences,obj)
        console.log(obj.id)
        console.log(obj)
        alert("data addded")

}
}
var list = []
function renderData(){
    const refrences = ref(database, `todotask/`);
    var parent = document.getElementById('parent')
    parent.innerHTML = "";
    for(var i=0;  i<list.length; i++ ){
      // console.log(list[i].uid)
        if(list[i].uid==localStorage.getItem("uid")){
          parent.innerHTML += `<ul><li id=${list[i].id}>Name : ${list[i].task}</br><li id=${list[i].id}>Description:${list[i].description}</br><li id=${list[i].id}>Status:${list[i].status}</br><button onclick="delTask(this)" id="del">${"Delete"}</button><button onclick="editask(this)" id="edit">${"Edit"}</button></li></ul>`;
        }
    }
}
"user"
var un = [];
function username(){

  var usn =  document.getElementById('user');
  usn.innerHTML = "";
  for (var i=0; i<un.length; i++){
    usn.innerHTML += `<h2>${un[i].user}</h2>`
  }

}
username();

window.getdata = function () {

  onValue(ref(database, '/todotask/'), (snapshot) => {
    // console.log(snapshot.val())
  });


  const taskRef =ref(database,'todotask/');
  onChildAdded(taskRef, function(data){
   list.push(data.val());
      // console.log(data.val());
      renderData();
  });
  // console.log(list.uid)

}
window.delTask = function(y){
    let UID = y.parentElement.getAttribute("id")
  remove(ref(database,`todotask/${UID}`))
  .then(()=>{
    alert("data removed successfully ")
  })
  .catch((error)=>{
     alert("error"+error)
  })
  y.parentElement.parentElement.remove()
}
window.editask = function(y){
    let Value = prompt("Please Enter new name ",y.parentElement.value)
    let Value2 = prompt("Please Enter new description ",y.parentElement.value)
    let Value3 = prompt("Please Enter new Status ",y.parentElement.value)
    let UID = y.parentElement.getAttribute("id")
  const REF = ref(database, `todotask/${UID}`);
  update(REF,{
    task: Value,
    description:Value2,
    status:Value3
  })
  .then(()=>{
    alert("data Update successfully ")
    var parent = document.getElementById('parent')
    parent.innerHTML="";
    getdata()
  })
  .catch((error)=>{
     alert("error"+error)
  })
// console.log()
  
}



window.logout = function () {
  signOut(auth)
    .then(function () {
      alert("Logout Successfully");
      window.location.href = "login.html";
    })
    .catch(function (err) {
      console.log(err);
    });
};

function checkAuthentication() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      
      
      const uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
      window.location.href = "login.html";
    }
  });
}
checkAuthentication();