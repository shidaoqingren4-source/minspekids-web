
  const loginFigure = document.getElementById("login");
  const loginIcon = document.getElementById("login-icon");
  const navText = loginFigure?.querySelector("figcaption nav");

  console.log("loggedIn:", localStorage.getItem("loggedIn"));
  console.log("navText:", navText);

  if (localStorage.getItem("loggedIn") === "true") {
    if (navText) {
      navText.textContent = "マイページ";
    }
    if (loginIcon) {
      loginIcon.classList.remove("fa-user");
      loginIcon.classList.add("fa-id-card");
    }

    loginFigure?.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "mypage.html";
    });
  }else{
    loginFigure?.addEventListener("click", (e) => {
      window.location.href = "login.html";
  }

