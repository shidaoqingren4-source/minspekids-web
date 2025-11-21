
const emailInput = document.getElementById("email");
const loginButton = document.getElementById("button");
const errorDiv = document.querySelector(".error-message");


// 入力チェック（リアルタイム）
function checkInputs() {
  const email = emailInput.value.trim();

  if (email) {
    loginButton.classList.add("active");
    loginButton.disabled = false;
    errorDiv.textContent = "";
  } else {
    loginButton.classList.remove("active");
    loginButton.disabled = true;
    errorDiv.textContent = "メールアドレスを入力してください";
    errorDiv.style.color = "red";
  }
}

// 認証チェック（fetch使用）
async function checkLogin() {
  const email = emailInput.value.trim();

  try {
   const response = await fetch("", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: `email=${encodeURIComponent(email)}`
});


    if (!response.ok) {
      throw new Error("サーバーエラー");
    }


  } catch (error) {
    console.error("通信エラー:", error);
    errorDiv.textContent = "通信エラーが発生しました";
    errorDiv.style.color = "red";
    loginButton.classList.remove("active");
    loginButton.disabled = true;
  }
}

// 入力イベントに反応
emailInput.addEventListener("input", checkInputs);

// ボタン押下で認証チェック
loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  await checkLogin();
});





