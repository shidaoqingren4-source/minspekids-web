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

// 認証チェック（fetch使用）
async function checkLogin() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  try {
   const response = await fetch("http://localhost/check_login.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
});
});

    if (!response.ok) {
      throw new Error("サーバーエラー");
    }

    const result = await response.json();

    if (result.valid) {
      window.location.href = "index.html"; // 認証成功 → 遷移先
    } else {
      errorDiv.textContent = result.message || "メールアドレスまたはパスワードが違います";
      errorDiv.style.color = "red";
      loginButton.classList.remove("active");
      loginButton.disabled = true;
    }
  } catch (error) {
    console.error("通信エラー:", error);
    errorDiv.textContent = "通信エラーが発生しました";
    errorDiv.style.color = "red";
    loginButton.classList.remove("active");
    loginButton.disabled = true;
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

// ボタン押下で認証チェック
loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  await checkLogin();
});

