
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("button");
const errorDiv = document.querySelector(".error-message");
const togglePassword = document.getElementById("togglePassword");

// 入力チェック（リアルタイム）
function checkInputs() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email && password) {
    loginButton.classList.add("active");
    loginButton.disabled = false;
    errorDiv.textContent = "";
  } else {
    loginButton.classList.remove("active");
    loginButton.disabled = true;
    errorDiv.textContent = "メールアドレスとパスワードを入力してください";
    errorDiv.style.color = "red";
  }
}



// パスワード表示切り替え
togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

// 入力イベントに反応
emailInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

const params = new URLSearchParams(window.location.search);
const errorMessage = params.get("error");

if (errorMessage) {
  const errorDiv = document.querySelector(".error-message");
  errorDiv.textContent = decodeURIComponent(errorMessage);
  errorDiv.style.color = "red";
}








