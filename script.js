/* ===================================================
   USER DETAILS VALIDATION & FLOW CONTROL
   =================================================== */

function saveUserDetails() {
  const instagram = document.getElementById("instagram").value.trim();
  const mobile    = document.getElementById("mobile").value.trim();
  const email     = document.getElementById("email").value.trim();

  // HARD STOP IF EMPTY
  if (instagram === "" || mobile === "" || email === "") {
    showWarning("Please fill all details to continue.");
    return false;
  }

  // INSTAGRAM VALIDATION
  const instaRegex = /^@?[a-zA-Z0-9._]{3,30}$/;
  if (!instaRegex.test(instagram)) {
    showWarning("Please enter a valid Instagram username.");
    return false;
  }

  // MOBILE VALIDATION (India)
  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(mobile)) {
    showWarning("Please enter a valid 10-digit mobile number.");
    return false;
  }

  // EMAIL VALIDATION
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    showWarning("Please enter a valid email address.");
    return false;
  }

  // SAVE DATA
  const userData = {
    instagram: instagram.replace("@", ""),
    mobile: mobile,
    email: email,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("userDetails", JSON.stringify(userData));

  // ONLY NOW REDIRECT
  window.location.href = "age.html";
  return true;
}

/* ===================================================
   WARNING UI
   =================================================== */

function showWarning(message) {
  const box = document.getElementById("warningBox");
  if (!box) return;

  box.innerText = message;
  box.style.display = "block";

  clearTimeout(window._warnTimer);
  window._warnTimer = setTimeout(() => {
    box.style.display = "none";
  }, 2500);
}
