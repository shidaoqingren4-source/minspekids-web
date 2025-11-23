const passwordInput = document.getElementById("password");
const passwordInput2 = document.getElementById("password-onemore");
const togglePassword = document.getElementById("togglePassword");
const togglePassword2 = document.getElementById("togglePassword2");
const submitButton = document.getElementById("button");
const form = document.querySelector("form");

// パスワード表示切り替え
togglePassword.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

togglePassword2.addEventListener("click", () => {
  passwordInput2.type = passwordInput2.type === "password" ? "text" : "password";
  togglePassword2.classList.toggle("fa-eye");
  togglePassword2.classList.toggle("fa-eye-slash");
});

// 入力状態に応じてボタンの状態を更新
function updateButtonState() {
  const pw = passwordInput.value.trim();
  const confirm = passwordInput2.value.trim();

  if (pw && confirm) {
    submitButton.classList.add("active");
    submitButton.disabled = false;
  } else {
    submitButton.classList.remove("active");
    submitButton.disabled = true;
  }
}

passwordInput.addEventListener("input", updateButtonState);
passwordInput2.addEventListener("input", updateButtonState);

// 送信時のチェック（不一致なら赤枠を付ける）
submitButton.addEventListener("click", (e) => {
  const pw = passwordInput.value.trim();
  const confirm = passwordInput2.value.trim();

  if (!pw || !confirm) {
    e.preventDefault();
    alert("パスワードを入力してください。");
    return;
  }

  if (pw !== confirm) {
    e.preventDefault();
    alert("パスワードが一致していません。");

    // 赤枠を付ける
    passwordInput.classList.add("input-password-error");
    passwordInput2.classList.add("input-password-error");
    passwordInput2.focus();
    return;
  }

  // 一致していれば赤枠を外す
  passwordInput.classList.remove("input-password-error");
  passwordInput2.classList.remove("input-password-error");

  form.submit();
});