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
      .catch(() => {
        clearAddressFields();
      });
  } else {
    clearAddressFields();
  }
});

function clearAddressFields() {
  document.getElementById("pref").value = "";
  document.getElementById("city").value = "";
  document.getElementById("town").value = "";
}

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword1");

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";

  // アイコンを切り替える
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

const passwordInput2 = document.getElementById("password-onemore");
const togglePassword2 = document.getElementById("togglePassword2");

togglePassword2.addEventListener("click", () => {
  const isHidden = passwordInput2.type === "password";
  passwordInput2.type = isHidden ? "text" : "password";

  // アイコンを切り替える
  togglePassword2.classList.toggle("fa-eye");
  togglePassword2.classList.toggle("fa-eye-slash");
});

const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

// 年セレクトを 2025〜1915 で生成（降順）
for (let y = 2025; y >= 1915; y--) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = `${y}年`;
  yearSelect.appendChild(option);
}

// 月セレクトが空なら 1〜12月を生成
if (monthSelect.options.length === 0) {
  for (let m = 1; m <= 12; m++) {
    const option = document.createElement("option");
    option.value = m;
    option.textContent = `${m}月`;
    monthSelect.appendChild(option);
  }
}

// 日付更新関数（うるう年対応）
function updateDays() {
  const year = parseInt(yearSelect.value);
  const month = parseInt(monthSelect.value);

  if (!year || !month) return;

  const daysInMonth = new Date(year, month, 0).getDate();

  // 日セレクトをクリア
  daySelect.innerHTML = '<option value="">日</option>';

  // 日数分のオプションを追加
  for (let d = 1; d <= daysInMonth; d++) {
    const option = document.createElement("option");
    option.value = d;
    option.textContent = `${d}日`;
    daySelect.appendChild(option);
  }
}

// イベントリスナー
yearSelect.addEventListener("change", updateDays);
monthSelect.addEventListener("change", updateDays);

// 初期化（初期選択がある場合に対応）
updateDays();

document.getElementById("button").addEventListener("click", function (e) {
  const form = document.querySelector("form");
  const requiredFields = form.querySelectorAll("input[required], select[required]");

  let isValid = true;
  let missingFields = [];

  // 未入力チェック
  requiredFields.forEach(field => {
    if (!field.value || field.value.trim() === "") {
      isValid = false;
      missingFields.push(field);
      field.classList.add("input-error");
    } else {
      field.classList.remove("input-error");
    }
  });

  // パスワード一致チェック
  const password = document.getElementById("password");
  const confirm = document.getElementById("password-onemore");
  const passwordsFilled = password.value.trim() !== "" && confirm.value.trim() !== "";
  const passwordsMatch = password.value === confirm.value;

  // 条件分岐：パスワード不一致のみの場合
  if (missingFields.length === 0 && passwordsFilled && !passwordsMatch) {
    e.preventDefault();
    password.classList.add("input-password-error");
    confirm.classList.add("input-password-error");
    alert("パスワードが一致していません。");
    confirm.focus();
    return;
  }

  // 条件分岐：未入力項目がある場合（パスワード一致・不一致問わず）
  if (!isValid) {
    e.preventDefault();
    alert("すべての必須項目を入力してください。");
    missingFields[0].focus();
    return;
  }

  // 条件分岐：すべてOK
  form.submit();

});

document.querySelector("form").addEventListener("submit", (e) => {
  console.log("pref:", document.querySelector("#pref").value);
  console.log("password:", document.querySelector("#password").value);
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault(); // 通常の送信を止める

  const form = e.target;
  const formData = new FormData(form);
  const params = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    params.append(key, value);
  }

  try {
    const response = await fetch("https://minspekids.wuaze.com/test.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const result = await response.text(); // PHPがJSON返すなら .json() にしてもOK
    alert("登録が完了しました！");
    console.log("サーバー応答:", result);
  } catch (error) {
    alert("通信エラーが発生しました");
    console.error("fetchエラー:", error);
  }
});

