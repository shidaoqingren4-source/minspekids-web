loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

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
  }
});
