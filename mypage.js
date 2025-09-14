window.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".sidebar li");
  const sections = document.querySelectorAll(".section");

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      // メニューの選択状態を更新
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      // 表示するセクションを切り替え
      const target = item.getAttribute("data-section");
      sections.forEach(section => {
        section.classList.remove("active");
        if (section.id === target) {
          section.classList.add("active");
        }
      });
    });
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("name").textContent = localStorage.getItem("userName");
  document.getElementById("user").textContent = localStorage.getItem("userName");
  document.getElementById("email").textContent = localStorage.getItem("email");
  document.getElementById("birth").textContent = localStorage.getItem("birth");
  document.getElementById("phone").textContent = localStorage.getItem("phone");
  document.getElementById("post-number").textContent = localStorage.getItem("post-number");
  document.getElementById("address").textContent = localStorage.getItem("address");

});

document.getElementById("button-logout").addEventListener("click", function() {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("birth");
    localStorage.removeItem("phone");
    localStorage.removeItem("post-number");
    localStorage.removeItem("address");
    window.location.href = "index.html";
  });





