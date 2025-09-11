const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("button");

  function checkInputs() {
    const emailFilled = emailInput.value.trim() !== "";
    const passwordFilled = passwordInput.value.trim() !== "";

    if (emailFilled && passwordFilled) {
      loginButton.classList.add("active");
      loginButton.disabled = false;
    } else {
      loginButton.classList.remove("active");
      loginButton.disabled = true;
    }
  }

  emailInput.addEventListener("input", checkInputs);
  passwordInput.addEventListener("input", checkInputs);


const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";

  // アイコンを切り替える
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

const errorDiv = document.querySelector(".error-message");

async function validateLogin() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    loginButton.disabled = true;
    errorDiv.textContent = "";
    return;
  }

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
  } else {
    loginButton.disabled = true;
    loginButton.classList.remove("active");
    errorDiv.textContent = result.message || "ログインできませんでした";
    errorDiv.style.color = "red";
  }
}
