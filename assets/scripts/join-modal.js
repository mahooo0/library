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
