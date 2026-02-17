/* ================= GUARD ================= */
function guard(requireAge = false) {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    window.location.replace("index.html");
    return;
  }

  if (requireAge && localStorage.getItem("age_ok") !== "yes") {
    window.location.replace("age.html");
  }
}

/* ================= WARNING ================= */
function showWarning(msg) {
  const box = document.getElementById("warningBox");
  if (!box) return;

  box.textContent = msg;
  box.style.display = "block";

  clearTimeout(showWarning._t);
  showWarning._t = setTimeout(() => {
    box.style.display = "none";
  }, 2500);
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

  if (!/^@?[a-zA-Z0-9._]{3,30}$/.test(insta.value.trim())) {
    showWarning("Invalid Instagram ID");
    insta.classList.add("input-error");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(mobile.value.trim())) {
    showWarning("Invalid mobile number");
    mobile.classList.add("input-error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
    showWarning("Invalid email");
    email.classList.add("input-error");
    return;
  }

  const user = {
    instagram: insta.value.replace("@", "").trim(),
    mobile: mobile.value.trim(),
    email: email.value.trim(),
    time: new Date().toISOString()
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(user));

  window.location.replace("age.html");
}

/* ================= AGE ================= */
function acceptAge() {
  localStorage.setItem("age_ok", "yes");
  window.location.replace("choice.html");
}

function exitSite() {
  window.location.href = "https://www.google.com";
}

/* ================= NAV ================= */
function go(page) {
  window.location.href = page;
}

/* ================= PAYMENT ================= */
function pay(amount, plan) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) return;

  const payment = {
    ...user,
    amount,
    plan,
    paidAt: new Date().toISOString()
  };

  localStorage.setItem("paymentData", JSON.stringify(payment));

  const overlay = document.getElementById("overlay");
  if (overlay) overlay.style.display = "flex";

  const upiUrl = `upi://pay?pa=9620151434@upi&pn=VideoAccess&am=${amount}&cu=INR`;

  // IMPORTANT: redirect first, then fallback
  window.location.href = upiUrl;

  // User manually returns → then we redirect
  setTimeout(() => {
    window.location.replace("thankyou.html");
  }, 8000);
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

/* ================= SOCIAL PROOF ================= */
(function fakeChosenCounter() {
  const el = document.getElementById("chosenCount");
  if (!el) return;

  let count = 438 + Math.floor(Math.random() * 6);
  el.textContent = count;

  setInterval(() => {
    if (Math.random() > 0.7) {
      count++;
      el.textContent = count;
    }
  }, 6000);
})();

/* ================= SCARCITY TIMER ================= */
(function scarcityTimer() {
  const el = document.getElementById("slotsLeft");
  if (!el) return;

  let slots = 5 + Math.floor(Math.random() * 4);
  el.textContent = slots;

  setInterval(() => {
    if (slots > 2 && Math.random() > 0.65) {
      slots--;
      el.textContent = slots;
    }
  }, 12000);
})();
