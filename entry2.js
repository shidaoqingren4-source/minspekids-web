document.addEventListener("DOMContentLoaded", () => {
  // 郵便番号 → 住所自動入力
  document.getElementById("post-number").addEventListener("input", function () {
    let zip = this.value.replace(/[^0-9]/g, "");
    if (zip.length > 3) {
      zip = zip.slice(0, 3) + "-" + zip.slice(3, 7);
    }
    this.value = zip;

    if (zip.replace("-", "").length === 7) {
      fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip.replace("-", "")}`)
        .then(response => response.json())
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
        .catch(clearAddressFields);
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

  for (let y = 2025; y >= 1915; y--) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = `${y}年`;
    yearSelect.appendChild(option);
  }

  if (monthSelect.options.length === 0) {
    for (let m = 1; m <= 12; m++) {
      const option = document.createElement("option");
      option.value = m;
      option.textContent = `${m}月`;
      monthSelect.appendChild(option);
    }
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
  updateDays();

  // 登録処理（バリデーション → fetch送信）
  document.getElementById("button").addEventListener("click", async (e) => {
    e.preventDefault();
    const form = document.querySelector("form");
    const requiredFields = form.querySelectorAll("input[required], select[required]");
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

    const password = document.getElementById("password");
    const confirm = document.getElementById("password-onemore");
    const passwordsMatch = password.value === confirm.value;

    if (!isValid) {
      alert("すべての必須項目を入力してください。");
      missingFields[0].focus();
      return;
    }

    if (password.value && confirm.value && !passwordsMatch) {
      alert("パスワードが一致していません。");
      confirm.focus();
      return;
    }

    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      params.append(key, value);
    }

    try {
      const response = await fetch("https://if0_39923913.infinityfreeapp.com/complete.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
      });

      const result = await response.text();
      alert("登録が完了しました！");
      console.log("サーバー応答:", result);
    } catch (error) {
      alert("通信エラーが発生しました");
      console.error("fetchエラー:", error);
    }
  });
});



