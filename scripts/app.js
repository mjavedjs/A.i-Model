import { getDocs ,  where , query, collection} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import {auth,db} from "./config.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

   const userProfile = document.querySelector(".profile-img");
   const userName = document.querySelector('#name');
  

   onAuthStateChanged(auth, async(user) => {
     if (user) {
       // User is signed in, see docs for a list of available properties
       // https://firebase.google.com/docs/reference/js/auth.user
       const uid = user.uid;
       console.log(uid)
         getdata(uid);
 
       // ...
     } else {
       // User is signed out
       console.log('singout ')
       
       // ...
     }
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

