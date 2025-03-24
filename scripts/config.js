
  import { initializeApp} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
  import {  getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBij-eb2q3OVuh2IwsglZPTV4Ep0tnBVRs",
    authDomain: "aimodel-4cf32.firebaseapp.com",
    projectId: "aimodel-4cf32",
    storageBucket: "aimodel-4cf32.firebasestorage.app",
    messagingSenderId: "126377867680",
    appId: "1:126377867680:web:4f537835d895fa0457ccc5",
    measurementId: "G-YLXL48PZE0"
  };

  export  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app)



  