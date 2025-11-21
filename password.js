const emailInput = document.getElementById("email");
  const loginButton = document.getElementById("button");

  function checkInputs() {
    const emailFilled = emailInput.value.trim() !== "";

    if (emailFilled) {
      loginButton.classList.add("active");
      loginButton.disabled = false;
    } else {
      loginButton.classList.remove("active");
      loginButton.disabled = true;
    }
  }

  emailInput.addEventListener("input", checkInputs);
