const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("button");
const errorDiv = document.querySelector(".error-message");
const togglePassword = document.getElementById("togglePassword");
const loginForm = document.querySelector("form");

let isLoginValid = false; // 認証結果を保持

// 入力チェック＋認証チェック（リアルタイム）
async function checkInputs() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    loginButton.classList.remove("active");
    loginButton.disabled = true;
    errorDiv.textContent = "";
    isLoginValid = false;
    return;
  }

  try {
    const response = await fetch("check_login.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    });

    const result = await response.json();

    if (result.valid) {
      loginButton.classList.add("active");
      loginButton.disabled = false;
      errorDiv.textContent = "";
      isLoginValid = true;
    } else {
      loginButton.classList.remove("active");
      loginButton.disabled = true;
      errorDiv.textContent = result.message || "メールアドレスまたはパスワードが違います";
      errorDiv.style.color = "red";
      isLoginValid = false;
    }
  } catch (error) {
    loginButton.classList.remove("active");
    loginButton.disabled = true;
    errorDiv.textContent = "通信エラーが発生しました";
    errorDiv.style.color = "red";
    isLoginValid = false;
  }
}

// 入力イベントに反応
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
  e.preventDefault(); // 送信
