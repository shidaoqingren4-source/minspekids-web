let facility = null;

document.addEventListener("DOMContentLoaded", () => {
  // 施設情報の取得
  facility = JSON.parse(localStorage.getItem("selectedFacility"));
  if (!facility) {
    document.body.innerHTML = "<p>施設情報が見つかりませんでした。</p>";
    return;
  }

  // 今日以前を選べないようにする
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}-${mm}-${dd}`;
  document.getElementById("date").setAttribute("min", formattedDate);

  // 施設情報を表示
  document.getElementById("facilityName").textContent = facility.name;
  document.getElementById("facilityType").textContent = facility.type;
  document.getElementById("facilityAddress").textContent = facility.address;
  document.getElementById("facilityPhone").textContent = facility.phone;
  document.getElementById("facilityLink").innerHTML = `<a href="${facility.link}" target="_blank">施設の詳細はこちら</a>`;
  document.getElementById("facilityImage").src = facility.image;
  document.getElementById("facilityImage").alt = facility.name;
});

// 予約フォーム送信処理
document.getElementById("reservationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const isLoggedIn = localStorage.getItem("loggedIn");
  if (isLoggedIn !== "true") {
    window.location.href = "login.html";
    return;
  }

  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!date || !time) {
    alert("利用日と時間帯を選択してください");
    return;
  }

  // 予約確認の表示
  const confirmation = document.getElementById("confirmation");
  confirmation.style.display = "block";
  confirmation.innerHTML = `
    <p>以下の内容で予約を受け付けました：</p>
    <ul>
      <li>施設名：${facility.name}</li>
      <li>利用日：${date}</li>
      <li>時間帯：${time}</li>
    </ul>
  `;
});

// 日付入力の整形
document.getElementById("date").addEventListener("input", function () {
  const raw = this.value.replace(/\D/g, "");
  if (raw.length === 8) {
    const year = raw.slice(0, 4);
    const month = raw.slice(4, 6);
    const day = raw.slice(6, 8);
    this.value = `${year}/${month}/${day}`;
  }
});

// カレンダー描画
const monthYear = document.getElementById("monthYear");
const calendarBody = document.querySelector("#calendar-body tbody");
const dateInput = document.getElementById("date");
let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = `${year}年 ${month + 1}月`;
  calendarBody.innerHTML = "";

  let row = document.createElement("tr");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement("td"));
  }

  for (let day = 1; day <= lastDate; day++) {
    if (row.children.length === 7) {
      calendarBody.appendChild(row);
      row = document.createElement("tr");
    }

    const cell = document.createElement("td");
    cell.textContent = day;

    const cellDate = new Date(year, month, day);
    cellDate.setHours(0, 0, 0, 0);

    const dayOfWeek = (firstDay + day - 1) % 7;
    if (dayOfWeek === 0) {
      cell.style.color = "#d32f2f";
      cell.style.backgroundColor = "#fff7f7ff";
    } else if (dayOfWeek === 6) {
      cell.style.color = "#1976d2";
      cell.style.backgroundColor = "rgb(241, 248, 255)";
    } else {
      cell.style.color = "#333";
      cell.style.backgroundColor = "#f6f6f6ff";
    }

    if (cellDate < today) {
      cell.classList.add("disabled");
      cell.style.backgroundColor = "#fafafaff";
      cell.style.color = "#c0c0c0ff";
      cell.style.pointerEvents = "none";
      cell.style.cursor = "default";
    } else {
      cell.addEventListener("click", () => {
        const formattedMonth = String(month + 1).padStart(2, "0");
        const formattedDay = String(day).padStart(2, "0");
        const formattedDate = `${year}/${formattedMonth}/${formattedDay}`;
        dateInput.value = formattedDate;
      });
    }

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.style.backgroundColor = "#ffe082";
    }

    row.appendChild(cell);
  }

  calendarBody.appendChild(row);
}

document.getElementById("prevMonth").onclick = () => {
  const tempDate = new Date(currentDate);
  tempDate.setMonth(tempDate.getMonth() - 1);

  const today = new Date();
  today.setDate(1);
  today.setHours(0, 0, 0, 0);

  if (tempDate >= today) {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  }
};

document.getElementById("nextMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
};

renderCalendar(currentDate);

