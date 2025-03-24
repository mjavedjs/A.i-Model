import { signInWithEmailAndPassword ,} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { auth } from "./config.js";


const form = document.querySelector('#form');
const email = document.querySelector('#loginEmail');
const password = document.querySelector('#loginPassword');

form.addEventListener('submit', event => {
    event.preventDefault()
    console.log(email.value);
    console.log(password.value);
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location = "home.html"
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
        }); 

})