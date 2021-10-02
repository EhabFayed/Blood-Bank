import axios from "axios";
var name= document.getElementById(name).value;
var email= document.getElementById(email).value;
var idnumber= parseInt(document.getElementById(idnumber).value);
var phonenumber= parseInt(document.getElementById(phonenumber).value);
var bloodtype= document.getElementById(bloodtype).value;

async function data(){
   await axios.post("/doneer",{name,email,idnumber,phonenumber,bloodtype})
   .then(res=>{
       console.log("Post request res",res)
   });

}