const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("button");
const errorDiv = document.querySelector(".error-message");
const togglePassword = document.getElementById("togglePassword");
const loginForm = document.getElementById("loginForm");

let isLoginValid = false;

async function checkInputs() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    loginButton.disabled = true;
    loginButton.classList.remove("active");
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
      loginButton.disabled = false;
      loginButton.classList.add("active");
      errorDiv.textContent = "";
      isLoginValid = true;
    } else {
      loginButton.disabled = true;
      loginButton.classList.remove("active");
      errorDiv.textContent = result.message || "メールアドレスまたはパスワードが違います";
      isLoginValid = false;
    }
  } catch (error) {
    loginButton.disabled = true;
    loginButton.classList.remove("active");
    errorDiv.textContent = "通信エラーが発生しました";
    isLoginValid = false;
  }
}

emailInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await checkInputs();

  if (isLoginValid) {
    loginForm.action = "login.php"; // 本物のログイン処理へ
    loginForm.submit();
  }
});
