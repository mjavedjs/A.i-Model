import { createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

import { auth,db} from "./config.js";

// login with google start 
const googleBtn = document.querySelector('#googleSignIn');

const provider = new GoogleAuthProvider();

googleBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            console.log("User signed in: ", user);

            // Check if user already exists in Firestore (optional)
            const userRef = collection(db, "users");
            
            try {
                await addDoc(userRef, {
                    fullName: user.displayName, // Google provides this
                    email: user.email,
                    uid: user.uid,
                    profileImg: user.photoURL, // Google profile pic
                    createdAt: new Date(),
                });

                console.log("User data stored successfully!");
                window.location = 'dashboard.html'; // Redirect to dashboard
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        })
        .catch((error) => {
            console.error("Google Sign-In Error: ", error.message);
        });
});

//login google end



const form = document.querySelector('#form');
const email = document.querySelector('#registerEmail');
const password = document.querySelector('#registerPassword');
const fullName = document.querySelector('#fullName');
let userProfilePicUrl = " "

let  myWidget = cloudinary.createUploadWidget({
    cloudName: 'dhro6nafp', 
    uploadPreset: 'my_preset'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info);
        userProfilePicUrl = result.info.secure_url;
      }
    }
  )
  document.getElementById("upload_widget").addEventListener("click", function(e){
    e.preventDefault()
      myWidget.open();
    }, false);
    
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
   createUserWithEmailAndPassword(auth, email.value, password.value)
 .then( async (userCredential) => {
   const user = userCredential.user;
   console.log(user.uid);
   try {
       const docRef = await addDoc(collection(db, "users"), {
           fullName: fullName.value,
           email: email.value,
           uid: user.uid,
           profileImg:userProfilePicUrl,
           createdAt: new Date(),
       });
    window.location = 'login.html'
       console.log("Document written with ID are: ", docRef.id);
   } 
   catch (e) {
       console.error("Error adding document: ", e);
   }


 })
 .catch((error) => {
   const errorCode = error.code;
   const errorMessage = error.message;
   console.log(errorCode);
   console.log(errorMessage);
 });
})