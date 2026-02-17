// SAVE USER DETAILS
function saveUserDetails() {
  const insta = document.getElementById("instagram").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email  = document.getElementById("email").value.trim();

  if (!insta || !mobile || !email) {
    alert("Please fill all details");
    return;
  }

  const user = {
    instagram: insta,
    mobile: mobile,
    email: email,
    time: new Date().toLocaleString()
  };

  localStorage.setItem("userDetails", JSON.stringify(user));
  window.location.href = "age.html";
}

// AGE CONFIRMATION
function acceptAge() {
  localStorage.setItem("age_ok", "yes");
  window.location.href = "choice.html";
}

function exitSite() {
  window.location.href = "https://google.com";
}

// NAV
function go(page) {
  window.location.href = page;
}

// PAYMENT
function pay(amount) {
  localStorage.setItem("paidAmount", amount);
  const upi = `upi://pay?pa=9620151434@upi&pn=Jawahar&am=${amount}&cu=INR`;
  window.location.href = upi;
  setTimeout(() => {
    window.location.href = "thankyou.html";
  }, 5000);
}
