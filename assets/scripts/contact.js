document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var fullname = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;
    var note = document.getElementById("note").value;

    if (!fullname || !email || !address || !phone || !note) {
      alert("Please fill in all fields!");
    } else {
      var formData = {
        fullname: fullname,
        email: email,
        address: address,
        phone: phone,
        note: note,
      };
      console.log(formData);
    }
  });
