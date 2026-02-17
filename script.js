function saveUserDetails() {
  const insta = document.getElementById("instagram").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email  = document.getElementById("email").value.trim();

  // VALIDATION
  if (insta === "" || mobile === "" || email === "") {
    showWarning("Please fill all details to continue");
    return;
  }

  // Mobile validation (basic)
  if (mobile.length < 10 || isNaN(mobile)) {
    showWarning("Please enter a valid mobile number");
    return;
  }

  // Email validation (basic)
  if (!email.includes("@")) {
    showWarning("Please enter a valid email address");
    return;
  }

  // SAVE DATA
  const user = {
    instagram: insta,
    mobile: mobile,
    email: email,
    time: new Date().toLocaleString()
  };

  localStorage.setItem("userDetails", JSON.stringify(user));

  // REDIRECT TO AGE PAGE
  window.location.href = "age.html";
}

// WARNING POPUP
function showWarning(message) {
  const box = document.getElementById("warningBox");
  box.innerText = message;
  box.style.display = "block";

  setTimeout(() => {
    box.style.display = "none";
  }, 2500);
}
