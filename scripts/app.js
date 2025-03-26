import { getDocs ,  where , query, collection,} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import {auth,db} from "./config.js";
import {onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

   const userProfile = document.querySelector(".profile-img");
   const userName = document.querySelector('#name');
   const logbtn = document.querySelector('#logout-btn')
  

   onAuthStateChanged(auth, async(user) => {
     if (user) {
       // User is signed in, see docs for a list of available properties
       // https://firebase.google.com/docs/reference/js/auth.user
       const uid = user.uid;
       console.log(uid)
         getdata(uid);
       // ...
     } else {
       console.log('singout ');
      //  if (window.location.pathname !== "/login.html") {
      //   window.location.href = "login.html";
      // }
       // ...
     }


     logbtn.addEventListener("click", (e) => {
      e.preventDefault();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log("user Sign-out successful ");
          window.location = "login.html";
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    });
    
   });
 async function getdata(uid){
     let user = null
     try {
          const q = query(collection(db, "users"),where("uid", "==",uid)  )
          const docSnap = await getDocs(q);   
    if (docSnap) {
      docSnap.forEach((doc) => {
          console.log("User Data:", doc.data());
           const data = doc.data();
           console.log(data)
          userName.innerHTML = data.fullName
          userProfile.src = data.profileImg || "default-profile.png"; // Fallback image
        });
} 
else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
     } catch (error) {
          console.log('Fetcthing data error',error)
     }
     return user
     
}



//  main page work satarted here 