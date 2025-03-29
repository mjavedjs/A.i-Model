import { getDocs ,  where , query, collection,} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import {auth,db} from "./config.js";
import {onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

   let userProfile = document.querySelector(".profile-img");
   const userName = document.querySelector('#name');
   const logbtn = document.querySelector('#logout-btn')
   let userData = []

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
        window.location = 'singup.html'
    ; // Yeh har bar user ko login page par bhej raha hai

      //  if (window.location.pathname !== "/login.html") {
      //   window.location.href = "login.html";
      // }
       // ...
     }

// sing out btn

logbtn.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("user Sign-out successful ");
      window.location= "singup.html";
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
})
  
    
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
           userData.push(doc.data())
           console.log(data)
          userName.innerHTML = data.fullName
          userProfile.src = data.profileImg || "default-profile.png"; // Fallback image
      const loginUserName = document.querySelector("#userName")
        loginUserName.innerHTML = data.fullName
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

// Mobile menu toggle
document.querySelector('.topbarAction i').addEventListener('click', function() {
  document.querySelector('.sideNavigation').classList.toggle('active');
});

// Close menu when clicking outside on mobile
document.addEventListener('click', function(event) {
  const sideNav = document.querySelector('.sideNavigation');
  const menuButton = document.querySelector('.topbarAction i');
  
  if (window.innerWidth < 992 && 
      !sideNav.contains(event.target) && 
      event.target !== menuButton && 
      !menuButton.contains(event.target)) {
      sideNav.classList.remove('active');
  }
});

// Update side navigation width when resizing
window.addEventListener('resize', function() {
  if (window.innerWidth >= 992) {
      document.querySelector('.sideNavigation').classList.remove('active');
  }
});


let  sideNavigation = document.querySelector(".sideNavigation"),
sidebarTogglebtn = document.querySelector('fa-bars'),
startContentUl =document.querySelector('startContent li'),
input_area = document.querySelector('.input-area input'),
sednRequest = document.querySelector(".fa-paper-plane"),
chathistory = document.querySelector(".chatHistory ul"),
startContent = document.querySelector('.startContent'),
chatContent = document.querySelector('.chatContent'),
result = document.querySelector('.result');


const newChat = document.querySelector("#newChat");
newChat.addEventListener('click',()=>{
  window.location = 'home.html'
})
input_area.addEventListener('keyup', (e) => {
  // console.log(e.target.value); 
  if(e.target.value.length > 0){
     sednRequest.style.display='inline';
  }
  else{
    sednRequest.style.display = 'none';
 
  }
});

sednRequest.addEventListener('click',()=>{
  getResponse(input_area.value,true)
})



function getResponse(question, appendHistory) {
  console.log(question);
  const chathistory = document.querySelector('.chatHistory ul');
  let li = document.createElement('li');
  li.textContent = question;
  chathistory.appendChild(li);
  chathistory.scrollLeft = chathistory.scrollWidth; // Auto-scroll to end
  
  input_area.value = "";
  startContent.style.display = 'none';
  chatContent.style.display = 'block';
  
  let userImg = userData.length > 0 ? userData[0].profileImg : "default.jpg";
  let questionDiv = document.createElement('div');
  questionDiv.innerHTML = `
    <div class="resultTitle" style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
      <img src="${userImg}" alt="User Image" style="width: 40px; height: 40px; border-radius: 50%;">
      <p style="font-weight: 500; font-size: 1rem; padding: 8px; border-radius: 5px; max-width: 100%;">${question}</p>
    </div>`;
  
  let answerDiv = document.createElement('div');
  answerDiv.innerHTML = `
    <div class="loading-spinner" style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
      <div style="display: flex; align-items: center;">
        <div class="spinner" style="width: 20px; height: 20px; border: 3px solid #ddd; border-top: 3px solid #333; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <span style="margin-left: 10px; font-size: 0.9rem;">Loading...</span>
      </div>
    </div>`;
  
  result.appendChild(questionDiv);
  result.appendChild(answerDiv);
  
  if(!result.classList.contains('visible')) {
    result.style.width = '1000px';
    result.style.height = '500px';
    result.style.overflowY = 'auto';
    result.classList.add('visible');
  }
  
  result.scrollTop = result.scrollHeight;
  
  const apikey = "AIzaSyBRDG-mCuMgeE9khNQIPvahLsTWG4zvQ5g";
  const api = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apikey}`;
  
  fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: question }] }]
    })
  })
  .then((res) => res.json())
  .then((data) => {
    let responseText = data.candidates && data.candidates.length > 0
      ? data.candidates[0].content.parts[0].text
      : "Sorry, no response available.";
  
    const formattedResponse = responseText
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  
    answerDiv.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 20px; position: relative;">
        <div style="width: calc(100% - 50px);">
          ${formattedResponse}
        </div>
        <i class="fas fa-copy" style="cursor: pointer;" onclick="copyText(this)"></i>
      </div>`;
  
    result.scrollTop = result.scrollHeight;
  })
  .catch((error) => {
    console.error("Error:", error);
    answerDiv.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 20px; color: red;">
        <div style="width: calc(100% - 50px);">
          Error fetching response. Please try again.
        </div>
      </div>`;
  });
}

function copyText(icon) {
  let text = icon.previousElementSibling.innerText;
  navigator.clipboard.writeText(text).then(() => {
    let alertBox = document.createElement('div');
    alertBox.innerText = "Text copied!";
    alertBox.style.position = "absolute";
    alertBox.style.top = "-20px";
    alertBox.style.right = "0";
    alertBox.style.background = "#333";
    alertBox.style.color = "#fff";
    alertBox.style.padding = "5px 10px";
    alertBox.style.borderRadius = "5px";
    alertBox.style.fontSize = "0.8rem";
    alertBox.style.transition = "opacity 0.5s";
    icon.parentElement.appendChild(alertBox);
    setTimeout(() => { alertBox.style.opacity = "0"; setTimeout(() => alertBox.remove(), 500); }, 1000);
  });
}
