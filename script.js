// AGE MEMORY
function acceptAge() {
  localStorage.setItem("age_ok", "yes");
  document.getElementById("ageCard").style.display = "none";
}

// OTP DEMO
let otpCode = null;

function sendOTP() {
  const mobile = document.getElementById("mobile").value;
  if (mobile.length < 10) {
    alert("Enter valid mobile number");
    return;
  }
  otpCode = Math.floor(100000 + Math.random() * 900000);
  alert("Demo OTP: " + otpCode);
  document.getElementById("otpBox").style.display = "block";
}

function verifyOTP() {
  const entered = document.getElementById("otp").value;
  if (entered == otpCode) {
    localStorage.setItem("loggedIn", "yes");
    alert("Login successful");
  } else {
    alert("Invalid OTP");
  }
}

// NAVIGATION
function go(page) {
  window.location.href = page;
}

// PAYMENT
function pay(amount) {
  localStorage.setItem("paidAmount", amount);
  const upi = `upi://pay?pa=9620151434@upi&pn=Jawahar&am=${amount}&cu=INR`;
  document.getElementById("overlay").style.display = "flex";
  window.location.href = upi;
  setTimeout(() => {
    window.location.href = "thankyou.html";
  }, 5000);
}

// AUTO AGE CHECK
window.onload = () => {
  if (localStorage.getItem("age_ok") === "yes") {
    const age = document.getElementById("ageCard");
    if (age) age.style.display = "none";
  }
};
