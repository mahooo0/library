
let joinBtn = document.querySelector("#joinBtn");
let joinModal = document.querySelector("#joinModal");
document.addEventListener("DOMContentLoaded", function () {
  //sehife tam acildiqdan sonra ishlesin

  //join buttonuna click etdikde modal acilsin
  joinBtn.addEventListener("click", function () {
    if (joinModal.style.display === "none" || joinModal.style.display === "") {
      joinModal.style.display = "block";
    } else {
      joinModal.style.display = "none";
    }
  });
});

//modaldan kenar her hansi bir yere click etdikde modal baglansin

window.addEventListener("click", function (event) {
  if (event.target === joinModal) {
    joinModal.style.display = "none";
  }
});

const Join_email_inp=document.querySelector("#Join_email")
const Join_password_inp=document.querySelector("#Join_password")
const Join_btn=document.querySelector("#Join_btn")

//  join us fire bas
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCV_voaw0_yXKkpKGQF3oLjmaLCxiLhWMA",
      authDomain: "library-auth-d42eb.firebaseapp.com",
      projectId: "library-auth-d42eb",
      storageBucket: "library-auth-d42eb.appspot.com",
      messagingSenderId: "145737395628",
      appId: "1:145737395628:web:89b70be0447b0a50a35e09"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    Join_btn.addEventListener("click",()=>{
      let Join_email=Join_email_inp.value
      let Join_password=Join_password_inp.value
      createUserWithEmailAndPassword(auth, Join_email, Join_password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log("created");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       console.log(errorCode + errorMessage);
      });

    })
//  join us fire bas
