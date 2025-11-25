
document.addEventListener("DOMContentLoaded", () => {
  // メールアドレスをlocalStorageから取得してhiddenにセット
  const email = localStorage.getItem("email");
  const emailHidden = document.getElementById("email-hidden");
  if (email && emailHidden) {
    emailHidden.value = email;
  }

  // 郵便番号 → 住所自動入力
  const postInput = document.getElementById("post-number");
  postInput.addEventListener("input", () => {
    let zip = postInput.value.replace(/[^0-9]/g, "");
    if (zip.length > 3) {
      zip = zip.slice(0, 3) + "-" + zip.slice(3, 7);
    }
    postInput.value = zip;

    if (zip.replace("-", "").length === 7) {
      fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip.replace("-", "")}`)
        .then(res => res.json())
        .then(data => {
          if (data.results) {
            const result = data.results[0];
            document.getElementById("pref").value = result.address1;
            document.getElementById("city").value = result.address2;
            document.getElementById("town").value = result.address3;
          } else {
            clearAddressFields();
          }
        })
        .catch(() => clearAddressFields());
    } else {
      clearAddressFields();
    }
  });

  function clearAddressFields() {
    document.getElementById("pref").value = "";
    document.getElementById("city").value = "";
    document.getElementById("town").value = "";
  }

  // パスワード表示切り替え
  const togglePassword = document.getElementById("togglePassword1");
  const passwordInput = document.getElementById("password");
  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });

  const togglePassword2 = document.getElementById("togglePassword2");
  const passwordInput2 = document.getElementById("password-onemore");
  togglePassword2.addEventListener("click", () => {
    const isHidden = passwordInput2.type === "password";
    passwordInput2.type = isHidden ? "text" : "password";
    togglePassword2.classList.toggle("fa-eye");
    togglePassword2.classList.toggle("fa-eye-slash");
  });

  // 生年月日セレクト生成
  const yearSelect = document.getElementById("year");
  const monthSelect = document.getElementById("month");
  const daySelect = document.getElementById("day");

  for (let y = new Date().getFullYear(); y >= 1915; y--) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = `${y}年`;
    yearSelect.appendChild(option);
  }

  function updateDays() {
    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    if (!year || !month) return;

    const daysInMonth = new Date(year, month, 0).getDate();
    daySelect.innerHTML = '<option value="">日</option>';
    for (let d = 1; d <= daysInMonth; d++) {
      const option = document.createElement("option");
      option.value = d;
      option.textContent = `${d}日`;
      daySelect.appendChild(option);
    }
  }

  yearSelect.addEventListener("change", updateDays);
  monthSelect.addEventListener("change", updateDays);
  updateDays(); // 初期表示

  // フォーム送信処理
  const form = document.getElementById("form");
  const submitButton = document.getElementById("button");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const requiredFields = form.querySelectorAll("input[required]:not([type='hidden']), select[required]");
    let isValid = true;
    let missingFields = [];

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        missingFields.push(field);
        field.classList.add("input-error");
      } else {
        field.classList.remove("input-error");
      }
    });

    const password = passwordInput.value.trim();
    const confirm = passwordInput2.value.trim();
    if (password && confirm && password !== confirm) {
      passwordInput.classList.add("input-password-error");
      passwordInput2.classList.add("input-password-error");
      alert("パスワードが一致していません。");
      passwordInput2.focus();
      return;
    }

    if (!isValid) {
      alert("すべての必須項目を入力してください。");
      missingFields[0].focus();
      return;
    }

    // fetch送信
    fetch("http://localhost/complete.php", {
      method: "POST",
      body: new FormData(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          localStorage.setItem("userName", data.name);
          localStorage.setItem("birth", data.birth);
          localStorage.setItem("phone", data.phone);
          localStorage.setItem("post-number", data.postnumber);
          localStorage.setItem("address", data.address);
          localStorage.setItem("loggedIn", "true");
          window.location.href = "index.html";
        } else {
          alert("登録に失敗しました: " + data.message);
        }
      })
      .catch(err => {
        alert("通信エラーが発生しました。");
        console.error(err);
      });
  });
});

