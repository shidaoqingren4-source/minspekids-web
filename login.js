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
    loginButton.disabled = false;
    errorDiv.textContent = "";
  } else {
    loginButton.classList.remove("active");
    loginButton.disabled = true;
    errorDiv.textContent = "";
  }
}

// 認証チェック（submit時のみ）
async function checkLogin() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    const response = await fetch("http://localhost/check_login.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    });

    const result = await response.json();

    if (result.valid) {
      // 認証成功 → ログイン後のページへ遷移
      window.location.href = "index.html"; // ← ここは好きな遷移先に変更OK
    } else {
      errorDiv.textContent = result.message || "メールアドレスまたはパスワードが違います";
      errorDiv.style.color = "red";
      loginButton.disabled = true;
      loginButton.classList.remove("active");
    }
  } catch (error) {
    errorDiv.textContent = "通信エラーが発生しました";
    errorDiv.style.color = "red";
    loginButton.disabled = true;
    loginButton.classList.remove("active");
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

// ボタン押下で認証チェック（フォーム送信は使わない）
loginButton.addEventListener("click", async (e) => {
  e.preventDefault(); // ← ボタンが type="submit" でも送信を止める
  await checkLogin();
});


