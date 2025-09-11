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

