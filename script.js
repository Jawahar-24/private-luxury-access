/* ================= GUARD ================= */
function guard() {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "index.html";
  }
}

/* ================= WARNING ================= */
function showWarning(msg) {
  const box = document.getElementById("warningBox");
  if (!box) return;
  box.textContent = msg;
  box.style.display = "block";
  clearTimeout(window._w);
  window._w = setTimeout(() => box.style.display = "none", 2500);
}

/* ================= SAVE USER ================= */
function saveUserDetails() {
  const insta = document.getElementById("instagram");
  const mobile = document.getElementById("mobile");
  const email = document.getElementById("email");

  [insta, mobile, email].forEach(i => i.classList.remove("input-error"));

  if (!insta.value || !mobile.value || !email.value) {
    showWarning("All details are required");
    [insta, mobile, email].forEach(i => !i.value && i.classList.add("input-error"));
    return;
  }

  if (!/^@?[a-zA-Z0-9._]{3,30}$/.test(insta.value)) {
    showWarning("Invalid Instagram ID");
    insta.classList.add("input-error");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(mobile.value)) {
    showWarning("Invalid mobile number");
    mobile.classList.add("input-error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value)) {
    showWarning("Invalid email");
    email.classList.add("input-error");
    return;
  }

  const user = {
    instagram: insta.value.replace("@", ""),
    mobile: mobile.value,
    email: email.value,
    time: new Date().toISOString()
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(user));

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
function go(p) {
  window.location.href = p;
}

/* ================= PAYMENT ================= */
function pay(amount, plan) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const payment = { ...user, amount, plan, paidAt: new Date().toISOString() };
  localStorage.setItem("paymentData", JSON.stringify(payment));

  document.getElementById("overlay").style.display = "flex";
  window.location.href = `upi://pay?pa=9620151434@upi&am=${amount}&cu=INR`;

  setTimeout(() => window.location.href = "thankyou.html", 5000);
}

/* ================= FREE VIDEO CLICK TRACKING ================= */
function openFreeVideo(videoName, videoUrl) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  const log = {
    instagram: user.instagram,
    video: videoName,
    time: new Date().toISOString()
  };

  const logs = JSON.parse(localStorage.getItem("freeVideoLogs")) || [];
  logs.push(log);
  localStorage.setItem("freeVideoLogs", JSON.stringify(logs));

  window.open(videoUrl, "_blank", "noopener,noreferrer");
}
