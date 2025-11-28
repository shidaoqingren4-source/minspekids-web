document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const termsCheckbox = document.getElementById("checkbox");
  const submitButton = document.getElementById("button");
  const form = document.getElementById("pre-register-form");

  function validateForm() {
    const emailFilled = emailInput.value.trim() !== "";
    const termsChecked = termsCheckbox.checked;

   if (emailFilled && termsChecked) {
    submitButton.classList.add("active");
    submitButton.disabled = false;
  } else {
    submitButton.classList.remove("active");
    submitButton.disabled = true;

  }
  }

  emailInput.addEventListener("input", validateForm);
  termsCheckbox.addEventListener("change", validateForm);
  validateForm(); // 初期状態でボタンを無効化

  // 仮登録フォーム送信時に localStorage にメールアドレスを保存
  form.addEventListener("submit", () => {
    const email = emailInput.value.trim();
    if (email) {
      localStorage.setItem("email", email);
    }
  });
});



