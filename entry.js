const emailInput = document.getElementById("email");
  const checkboxInput = document.getElementById("checkbox");
  const loginButton = document.getElementById("button");

  function checkInputs() {
    const emailFilled = emailInput.value.trim() !== "";
    const checkboxChecked = checkboxInput.checked;

    if (emailFilled) {
    localStorage.setItem("email", emailInput.value.trim()); // ← ここで保存！
  }

    if (emailFilled && checkboxChecked) {
      loginButton.classList.add("active");
      loginButton.disabled = false;
    } else {
      loginButton.classList.remove("active");
      loginButton.disabled = true;
    }
  }

  emailInput.addEventListener("input", checkInputs);

  checkboxInput.addEventListener("input", checkInputs);
