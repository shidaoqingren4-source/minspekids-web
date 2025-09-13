
  const loginFigure = document.getElementById("login");
  const loginIcon = document.getElementById("login-icon");
  const navText = loginFigure?.querySelector("figcaption nav");

  console.log("loggedIn:", localStorage.getItem("loggedIn"));
  console.log("navText:", navText);

  // まず既存のイベントを削除（念のため）
  loginFigure?.replaceWith(loginFigure.cloneNode(true));
  const newLoginFigure = document.getElementById("login");

  if (localStorage.getItem("loggedIn") === "true") {
    if (navText) navText.textContent = "マイページ";
    if (loginIcon) {
      loginIcon.classList.remove("fa-user");
      loginIcon.classList.add("fa-id-card");
    }

    newLoginFigure?.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "mypage.html";
    });
  } 
