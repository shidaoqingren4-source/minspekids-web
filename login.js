
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



loginButton.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  fetch("http://localhost/check_login.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        // ✅ ログイン成功時だけ保存
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userName", data.name);
        window.location.href = "https://shidaoqingren4-source.github.io/minspekids-web/index.html";
      } else {
        errorDiv.textContent = data.message;
        errorDiv.style.color = "red";
      }
    })
    .catch(err => {
      errorDiv.textContent = "通信エラーが発生しました";
      errorDiv.style.color = "red";
      console.error(err);
    });
});











