document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const termsCheckbox = document.getElementById("terms");
  const submitButton = document.getElementById("submit-button");

  function validateForm() {
    const emailFilled = emailInput.value.trim() !== "";
    const termsChecked = termsCheckbox.checked;
    submitButton.disabled = !(emailFilled && termsChecked);
  }

  emailInput.addEventListener("input", validateForm);
  termsCheckbox.addEventListener("change", validateForm);
  validateForm(); // 初期状態でボタンを無効化
});
