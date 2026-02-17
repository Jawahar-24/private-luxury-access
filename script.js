/* ================= USER DETAILS ================= */

function saveUserDetails() {
  const instagram = document.getElementById("instagram").value.trim();
  const mobile    = document.getElementById("mobile").value.trim();
  const email     = document.getElementById("email").value.trim();

  if (!instagram || !mobile || !email) {
    showWarning("All details are required.");
    return;
  }

  if (!/^@?[a-zA-Z0-9._]{3,30}$/.test(instagram)) {
    showWarning("Invalid Instagram username.");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    showWarning("Invalid mobile number.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    showWarning("Invalid email address.");
    return;
  }

  const user = {
    instagram: instagram.replace("@",""),
    mobile,
    email,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("userDetails", JSON.stringify(user));
  window.location.href = "age.html";
}

/* ================= AGE ================= */

function acceptAge() {
  localStorage.setItem("age_ok", "yes");
  window.location.href = "choice.html";
}

function exitSite() {
  window.location.href = "https://google.com";
}

/* ================= NAV ================= */

function go(page) {
  window.location.href = page;
}

/* ================= PAYMENT ================= */

function pay(amount, plan) {
  const user = JSON.parse(localStorage.getItem("userDetails"));

  const paymentData = {
    ...user,
    amount,
    plan,
    time: new Date().toLocaleString()
  };

  localStorage.setItem("paymentData", JSON.stringify(paymentData));

  const upi = `upi://pay?pa=9620151434@upi&pn=Jawahar&am=${amount}&cu=INR`;

  document.getElementById("overlay").style.display = "flex";
  window.location.href = upi;

  setTimeout(() => {
    window.location.href = "thankyou.html";
  }, 5000);
}

/* ================= WARNING ================= */

function showWarning(message) {
  const box = document.getElementById("warningBox");
  box.textContent = message;
  box.style.display = "block";

  clearTimeout(window._warn);
  window._warn = setTimeout(() => {
    box.style.display = "none";
  }, 2500);
}

/* ================= GUARD ================= */

function guard() {
  if (!localStorage.getItem("userDetails")) {
    window.location.href = "index.html";
  }
}
.admin-output {
  text-align: left;
  font-size: 13px;
  background: #111;
  color: #0f0;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  white-space: pre-wrap;
}
