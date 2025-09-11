const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("button");
const errorDiv = document.querySelector(".error-message");
const togglePassword = document.getElementById("togglePassword");
const loginForm = document.getElementById("loginForm");

// 入力チェック（リアルタイムで見た目だけ制御）
function checkInputs() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (email && password) {
    loginButton.classList.add("active");
  } else {
    loginButton.classList.remove("active");
  }
}

// 認証チェック（submit時のみ）
async function checkLogin() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    const response = await fetch("check_login.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    });

    const result = await response.json();

    if (result.valid) {
      loginForm.action = "login.php";
      loginForm.submit();
    } else {
      errorDiv.textContent = result.message || "メールアドレスまたはパスワードが違います";
      errorDiv.style.color = "red";
      loginButton.disabled = true;
    }
  } catch (error) {
    errorDiv.textContent = "通信エラーが発生しました";
    errorDiv.style.color = "red";
    loginButton.disabled = true;
  }
}

// 入力イベントに反応（見た目だけ）
emailInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

// パスワード表示切り替え
togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

// フォーム送信を制御
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginButton.disabled = true; // 一旦無効化して二重送信防止
  await checkLogin();
});
