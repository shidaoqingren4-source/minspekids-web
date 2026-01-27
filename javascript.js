
const button = document.querySelector('#button');
const menu = document.querySelector('#menu');

if(button){
    button.addEventListener('click',() => {
        button.classList.toggle('active');
        menu.classList.toggle('active');
    });
}

document.getElementById("search").addEventListener("click", function() {
    window.location.href = "search.html";
  });

document.getElementById("entry").addEventListener("click", function() {
    window.location.href = "entry.html";
  });

document.getElementById("login").addEventListener("click", function() {
    window.location.href = "login.html";
  });



 
function scrollToPosition(y) {
  window.scrollTo({
    top: y,
    behavior: 'smooth'
  });
}
 
let current = 0;
const slides = document.querySelectorAll('.slide');

setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, 3000); // 3秒ごとに切り替え

const facilities = [
  {
    name: "神戸市立本多聞小学校（旧校舎）",
    address: "兵庫県神戸市垂水区本多聞4丁目4-1",
    phone: "078-000-0000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbXfjqRsyGYR7aZxfN96MomVaT8Y0o_jtnZA&s",
    link: "http://www2.kobe-c.ed.jp/htm-es/"
  },
  {
    name: "三木市立みなぎ台小学校（旧校舎）",
    address: "兵庫県三木市吉川町みなぎ台1丁目31-3",
    phone: "0794-00-0000",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Minagidaisyo.jpg",
    link: ""
  },
  {
    name: "姫路市立城南小学校（旧校舎）",
    address: "兵庫県姫路市城南町1丁目",
    phone: "079-000-0000",
    image: "http://www.harima.or.jp/school/himeji/jyonan/castle.jpg",
    link: "http://www.harima.or.jp/school/himeji/jyonan/index.htm"
  },
  {
    name: "豊岡市立港東小学校（旧校舎）",
    address: "兵庫県豊岡市気比3291番地の235",
    phone: "0796-00-0000",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwicLxb-W6eU53xrDlmIawcd4kFSdivxEKWA&s",
    link: ""
  },
  {
    name: "西宮市立船坂小学校（旧校舎）",
    address: "兵庫県西宮市山口町船坂",
    phone: "0798-00-0000",
    image: "https://nishinomiya-yamaguchi.jp/wp-content/uploads/2011/01/IMG_50151.jpg",
    link: ""
  }
];








const prefectures = {
   "北海道": [
  "赤平市", "旭川市", "網走市", "芦別市", "伊達市", "岩見沢市", "恵庭市", "江別市", "小樽市", "北広島市", "北見市", "北斗市", "釧路市", "札幌市", "士別市", "砂川市", "滝川市", "千歳市", "苫小牧市", "富良野市", "函館市", "深川市", "美唄市", "三笠市", "室蘭市", "名寄市", "紋別市", "夕張市", "歌志内市", "留萌市", "稚内市", "根室市", "石狩市", "帯広市"
],
"青森県": [
  "青森市", "五所川原市", "黒石市", "十和田市", "つがる市", "八戸市", "平川市", "弘前市", "三沢市", "むつ市"
],
"岩手県": [
  "一関市", "奥州市", "大船渡市", "釜石市", "北上市", "久慈市", "陸前高田市", "宮古市", "盛岡市", "二戸市", "花巻市", "八幡平市", "遠野市"
],
"宮城県": [
  "石巻市", "岩沼市", "大崎市", "角田市", "気仙沼市", "栗原市", "塩竈市", "白石市", "仙台市", "多賀城市", "登米市", "名取市", "東松島市"
],
"秋田県": [
  "秋田市", "潟上市", "鹿角市", "北秋田市", "男鹿市", "大館市", "仙北市", "能代市", "にかほ市", "湯沢市", "横手市", "由利本荘市", "大仙市"
],
"山形県": [
  "上山市", "寒河江市", "酒田市", "新庄市", "鶴岡市", "天童市", "長井市", "南陽市", "村山市", "米沢市", "山形市", "東根市", "尾花沢市"
],
"福島県": [
  "会津若松市", "伊達市", "いわき市", "郡山市", "喜多方市", "白河市", "須賀川市", "相馬市", "田村市", "福島市", "二本松市", "本宮市", "南相馬市"
],
"茨城県": [
  "かすみがうら市", "古河市", "桜川市", "下妻市", "常総市", "常陸大宮市", "常陸太田市", "神栖市", "行方市", "高萩市", "笠間市", "鹿嶋市", "北茨城市", "小美玉市", "坂東市", "潮来市", "筑西市", "つくば市", "つくばみらい市", "取手市", "那珂市", "日立市", "ひたちなか市", "鉾田市", "水戸市", "守谷市", "稲敷市", "龍ケ崎市", "牛久市", "結城市", "石岡市"
],
"栃木県": [
  "さくら市", "佐野市", "下野市", "小山市", "鹿沼市", "真岡市", "足利市", "宇都宮市", "大田原市", "栃木市", "那須烏山市", "那須塩原市", "日光市", "矢板市"
],
"群馬県": [
  "安中市", "伊勢崎市", "太田市", "館林市", "桐生市", "渋川市", "高崎市", "富岡市", "沼田市", "藤岡市", "前橋市", "みどり市"
],
"埼玉県": [
  "あさか市", "上尾市", "朝霞市", "入間市", "桶川市", "春日部市", "加須市", "川口市", "川越市", "北本市", "行田市", "久喜市", "熊谷市", "鴻巣市", "越谷市", "さいたま市", "坂戸市", "幸手市", "狭山市", "志木市", "草加市", "秩父市", "鶴ヶ島市", "戸田市", "新座市", "羽生市", "飯能市", "東松山市", "日高市", "富士見市", "ふじみ野市", "深谷市", "蓮田市", "三郷市", "八潮市", "吉川市", "和光市", "白岡市"
],
"千葉県": [
  "いすみ市", "旭市", "我孫子市", "印西市", "市川市", "浦安市", "柏市", "勝浦市", "香取市", "鎌ケ谷市", "鴨川市", "木更津市", "君津市", "佐倉市", "山武市", "白井市", "匝瑳市", "袖ケ浦市", "館山市", "千葉市", "銚子市", "東金市", "富里市", "富津市", "成田市", "習志野市", "野田市", "八街市", "八千代市", "船橋市", "松戸市", "南房総市", "四街道市", "茂原市"
],
"東京都": [
  "あきる野市", "足立区", "荒川区", "板橋区", "稲城市", "江戸川区", "江東区", "大田区", "葛飾区", "北区", "清瀬市", "国分寺市", "国立市", "狛江市", "小金井市", "小平市", "品川区", "渋谷区", "新宿区", "杉並区", "世田谷区", "台東区", "立川市", "多摩市", "中央区", "調布市", "千代田区", "豊島区", "中野区", "西東京市", "練馬区", "羽村市", "東久留米市", "東大和市", "東村山市", "府中市", "福生市", "文京区", "町田市", "三鷹市", "港区", "目黒区", "武蔵野市", "武蔵村山市", "青梅市", "八王子市"
],
"神奈川県": [
  "厚木市", "綾瀬市", "伊勢原市", "海老名市", "小田原市", "鎌倉市", "川崎市", "相模原市", "座間市", "茅ヶ崎市", "逗子市", "秦野市", "平塚市", "藤沢市", "三浦市", "南足柄市", "横須賀市", "横浜市", "大和市"
],
"新潟県": [
  "阿賀野市", "糸魚川市", "魚沼市", "加茂市", "柏崎市", "五泉市", "三条市", "上越市", "小千谷市", "新潟市", "新発田市", "胎内市", "十日町市", "長岡市", "南魚沼市", "妙高市", "見附市", "村上市", "燕市", "佐渡市"
],
"富山県": [
  "射水市", "魚津市", "黒部市", "高岡市", "滑川市", "南砺市", "富山市", "砺波市", "氷見市", "小矢部市"
],
"石川県": [
  "かほく市", "加賀市", "金沢市", "小松市", "珠洲市", "七尾市", "野々市市", "能美市", "羽咋市", "白山市", "輪島市"
],
"福井県": [
  "あわら市", "越前市", "小浜市", "勝山市", "坂井市", "鯖江市", "敦賀市", "福井市", "大野市"
],
"山梨県": [
  "上野原市", "甲斐市", "甲府市", "中央市", "都留市", "韮崎市", "笛吹市", "富士吉田市", "北杜市", "南アルプス市", "山梨市", "大月市"
],
"長野県": [
  "飯田市", "飯山市", "伊那市", "上田市", "岡谷市", "小諸市", "佐久市", "塩尻市", "諏訪市", "千曲市", "茅野市", "長野市", "中野市", "東御市", "松本市", "南箕輪村（市でないため除外可）", "須坂市", "大町市"
],
"岐阜県": [
  "恵那市", "大垣市", "各務原市", "可児市", "岐阜市", "郡上市", "下呂市", "関市", "高山市", "多治見市", "土岐市", "中津川市", "羽島市", "飛騨市", "瑞浪市", "瑞穂市", "美濃市", "美濃加茂市", "本巣市", "山県市", "養老町（市でないため除外可）"
],
"静岡県": [
  "熱海市", "伊豆市", "伊豆の国市", "磐田市", "御前崎市", "掛川市", "湖西市", "島田市", "下田市", "静岡市", "菊川市", "裾野市", "沼津市", "浜松市", "袋井市", "藤枝市", "富士市", "富士宮市", "焼津市", "三島市", "牧之原市"
],
"愛知県": [
  "愛西市", "安城市", "一宮市", "稲沢市", "犬山市", "岩倉市", "大府市", "岡崎市", "春日井市", "蒲郡市", "刈谷市", "北名古屋市", "江南市", "小牧市", "新城市", "瀬戸市", "高浜市", "田原市", "知多市", "知立市", "津島市", "東海市", "豊川市", "豊田市", "豊橋市", "名古屋市", "西尾市", "日進市", "半田市", "碧南市", "みよし市", "弥富市"
],
"三重県": [
  "伊賀市", "伊勢市", "いなべ市", "尾鷲市", "亀山市", "熊野市", "桑名市", "志摩市", "鈴鹿市", "津市", "鳥羽市", "名張市", "松阪市", "四日市市"
],
"滋賀県": [
  "大津市", "草津市", "甲賀市", "湖南市", "高島市", "長浜市", "東近江市", "彦根市", "米原市", "守山市", "野洲市"
],
"京都府": [
  "綾部市", "井手町（市でないため除外可）", "宇治市", "亀岡市", "京田辺市", "京丹後市", "京都市", "城陽市", "長岡京市", "南丹市", "福知山市", "舞鶴市", "宮津市", "向日市", "八幡市"
],
"大阪府": [
  "池田市", "泉大津市", "泉佐野市", "和泉市", "茨木市", "大阪狭山市", "大阪市", "貝塚市", "柏原市", "交野市", "岸和田市", "熊取町（市でないため除外可）", "堺市", "四條畷市", "吹田市", "摂津市", "泉南市", "高石市", "高槻市", "大東市", "豊中市", "富田林市", "寝屋川市", "羽曳野市", "阪南市", "東大阪市", "枚方市", "藤井寺市", "松原市", "箕面市", "守口市", "八尾市"
],
"兵庫県": [
  "相生市", "明石市", "赤穂市", "朝来市", "芦屋市", "尼崎市", "淡路市", "伊丹市", "加古川市", "加西市", "加東市", "川西市", "神戸市", "篠山市（現：丹波篠山市）", "三田市", "宍粟市", "洲本市", "高砂市", "宝塚市", "たつの市", "丹波市", "西宮市", "西脇市", "姫路市", "豊岡市", "南あわじ市", "三木市", "養父市"
],
"奈良県": [
  "生駒市", "宇陀市", "香芝市", "橿原市", "葛城市", "五條市", "御所市", "桜井市", "天理市", "奈良市", "大和郡山市", "大和高田市"
],
"和歌山県": [
  "有田市", "岩出市", "海南市", "紀の川市", "紀美野町（市でないため除外可）", "御坊市", "新宮市", "田辺市", "橋本市", "和歌山市"
],
"鳥取県": [
  "岩美町（市でないため除外可）", "倉吉市", "境港市", "鳥取市", "米子市"
],
"島根県": [
  "出雲市", "雲南市", "江津市", "浜田市", "益田市", "松江市"
],
"岡山県": [
  "赤磐市", "浅口市", "井原市", "岡山市", "笠岡市", "倉敷市", "瀬戸内市", "総社市", "高梁市", "玉野市", "津山市", "新見市", "備前市", "美作市"
],
"広島県": [
  "安芸高田市", "江田島市", "大竹市", "尾道市", "呉市", "庄原市", "竹原市", "廿日市市", "東広島市", "福山市", "府中市", "三原市", "三次市", "広島市"
],
"山口県": [
  "宇部市", "山口市", "萩市", "防府市", "下関市", "岩国市", "光市", "長門市", "柳井市", "美祢市", "周南市", "山陽小野田市"
],
"徳島県": [
  "阿南市", "阿波市", "石井町（市でないため除外可）", "小松島市", "徳島市", "鳴門市", "美馬市", "三好市"
],
"香川県": [
  "綾川町（市でないため除外可）", "観音寺市", "坂出市", "さぬき市", "善通寺市", "高松市", "東かがわ市", "丸亀市", "三豊市"
],
"愛媛県": [
  "今治市", "伊予市", "宇和島市", "大洲市", "西条市", "四国中央市", "新居浜市", "松山市", "八幡浜市", "東温市", "西予市"
],
"高知県": [
  "安芸市", "香南市", "香美市", "高知市", "四万十市", "宿毛市", "須崎市", "土佐市", "南国市"
],
"福岡県": [
  "朝倉市", "飯塚市", "糸島市", "うきは市", "大川市", "大野城市", "大牟田市", "小郡市", "久留米市", "古賀市", "田川市", "筑後市", "筑紫野市", "中間市", "直方市", "福岡市", "豊前市", "みやま市", "宮若市", "宗像市", "柳川市", "八女市", "行橋市"
],
"佐賀県": [
  "伊万里市", "嬉野市", "小城市", "鹿島市", "佐賀市", "多久市", "武雄市", "鳥栖市"
],
"長崎県": [
  "壱岐市", "諫早市", "雲仙市", "大村市", "五島市", "佐世保市", "島原市", "対馬市", "長崎市", "西海市", "平戸市", "南島原市"
],
"熊本県": [
  "阿蘇市", "天草市", "荒尾市", "宇城市", "宇土市", "上天草市", "菊池市", "熊本市", "合志市", "玉名市", "人吉市", "水俣市", "山鹿市"
],
"大分県": [
  "宇佐市", "臼杵市", "大分市", "杵築市", "国東市", "佐伯市", "竹田市", "津久見市", "中津市", "日田市", "豊後高田市", "豊後大野市"
],
"宮崎県": [
  "えびの市", "延岡市", "小林市", "西都市", "日南市", "日向市", "東諸県郡（市でないため除外可）", "都城市", "宮崎市"
],
"鹿児島県": [
  "阿久根市", "奄美市", "出水市", "伊佐市", "指宿市", "いちき串木野市", "鹿児島市", "霧島市", "薩摩川内市", "志布志市", "曽於市", "垂水市", "西之表市", "南さつま市", "南九州市", "枕崎市"
],
"沖縄県": [
  "糸満市", "うるま市", "浦添市", "沖縄市", "宜野湾市", "那覇市", "名護市", "南城市", "宮古島市", "石垣市"
]
};

function displayResults(filtered) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>該当する施設が見つかりませんでした。</p>";
  } else {
    filtered.forEach(facility => {
      const div = document.createElement("div");
      div.className = "facility";
      div.innerHTML = `
        <img src="${facility.image}" alt="${facility.name}" class="facility-img">
        <div class="facility-info">
          <strong>${facility.name}</strong><br>
          住所：${facility.address}<br>
          電話番号：${facility.phone}
        </div>
      `;

      // 🔗 クリックで予約画面へ遷移
      div.addEventListener("click", () => {
        // 施設情報を保存（localStorageなど）
        localStorage.setItem("selectedFacility", JSON.stringify(facility));
        // 予約画面へ遷移
        window.location.href = "reservation.html"; // ←予約画面のURLに合わせて変更
      });

      resultsDiv.appendChild(div);
    });
  }
}


document.getElementById("prefSelect").addEventListener("change", function () {
  const selectedPref = this.value;
  const cityContainer = document.getElementById("city");
  const citySelect = document.getElementById("citySelect");

  if (selectedPref === "") {
    cityContainer.style.display = "none";
    citySelect.innerHTML = '<option value="">すべて</option>';
    return;
  }

  const cities = prefectures[selectedPref] || [];
  citySelect.innerHTML = '<option value="">すべて</option>';
  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });

  cityContainer.style.display = "block";
});

function search() {
  const Input = document.getElementById("cityInput")?.value.trim() || "";
  const pref = document.getElementById("prefSelect").value;
  const city = document.getElementById("citySelect").value;

  let filtered = facilities.filter(facility => {
    const matchInput = Input === "" || facility.address.includes(Input)
    ||facility.name.includes(Input);
    const matchPref = pref === "" || facility.address.includes(pref);
    const matchCity = city === "" || facility.address.includes(city);
    return matchInput&& matchPref && matchCity;
  });

  displayResults(filtered);
}

// 🔥 ページ読み込み時に全施設表示
window.addEventListener("DOMContentLoaded", () => {
  search();
});

// 🔍 検索ボタンでも検索できるように
document.getElementById("searchBtn").addEventListener("click", search);

// ⌨️ Enterキーでも検索できるように
document.getElementById("cityInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    search();
  }
});

document.getElementById("inquiry").addEventListener("click", function() {
  window.location.href = "index.html"; // 遷移先のURL
});

document.getElementById("check-button").addEventListener("click", function (e) {
  e.preventDefault();

  const isLoggedIn = localStorage.getItem("loggedIn");
  if (isLoggedIn !== "true") {
    window.location.href = "login.html";
    return;
  }
  window.location.href = "reservation.html";
});








































