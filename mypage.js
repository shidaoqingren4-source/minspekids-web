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
  document.getElementById("user").textContent = localStorage.getItem("username");
  document.getElementById("email").textContent = localStorage.getItem("email");
  document.getElementById("password").textContent = localStorage.getItem("password");
  
});