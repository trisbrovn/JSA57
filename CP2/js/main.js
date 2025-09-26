// ====== CẤU HÌNH ======
// Thay YOUR_API_KEY_HERE bằng API Key bạn lấy từ https://openweathermap.org
const API_KEY = "59abdd3e3849401729e56fdeb4035654";
const UNITS = "metric"; // 'metric' (Celsius) hoặc 'imperial'
const LANG = "vi";

// ====== DOM ======
const searchBtn = document.getElementById("searchBtn");
const locateBtn = document.getElementById("locateBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");
const intro = document.getElementById("intro");
const errorEl = document.getElementById("error");

// Fields
const locationName = document.getElementById("locationName");
const weatherDesc = document.getElementById("weatherDesc");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const coords = document.getElementById("coords");
const weatherIcon = document.getElementById("weatherIcon");
const timeZone = document.getElementById("timeZone");

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove("d-none");
}
function clearError() {
  errorEl.classList.add("d-none");
  errorEl.textContent = "";
}

function buildUrlByCity(city) {
  const base = "https://api.openweathermap.org/data/2.5/weather";
  const q = new URLSearchParams({
    q: city,
    appid: API_KEY,
    units: UNITS,
    lang: LANG,
  });
  return `${base}?${q}`;
}
function buildUrlByCoords(lat, lon) {
  const base = "https://api.openweathermap.org/data/2.5/weather";
  const q = new URLSearchParams({
    lat,
    lon,
    appid: API_KEY,
    units: UNITS,
    lang: LANG,
  });
  return `${base}?${q}`;
}

async function fetchWeather(url) {
  clearError();
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = data.message
        ? `Lỗi từ API: ${data.message}`
        : `Lỗi HTTP ${res.status}`;
      throw new Error(msg);
    }
    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    result.classList.add("d-none");
    showError(err.message || "Không thể lấy dữ liệu thời tiết");
  }
}

function renderWeather(data) {
  if (!data || !data.weather) {
    showError("Dữ liệu trả về không đúng định dạng");
    return;
  }

  intro.classList.add("d-none");
  result.classList.remove("d-none");
  clearError();

  const w = data.weather[0];
  const main = data.main || {};
  const windd = data.wind || {};

  locationName.textContent = `${data.name || ""}${
    data.sys && data.sys.country ? ", " + data.sys.country : ""
  }`;
  weatherDesc.textContent = w.description ? capitalize(w.description) : "";
  temp.textContent =
    main.temp != null ? Math.round(main.temp) + "°C" : "-";
  feelsLike.textContent =
    main.feels_like != null
      ? `Cảm giác như ${Math.round(main.feels_like)}°C`
      : "";
  humidity.textContent = main.humidity != null ? main.humidity + "%" : "-";
  pressure.textContent =
    main.pressure != null ? main.pressure + " hPa" : "-";
  wind.textContent = windd.speed
    ? windd.speed + (UNITS === "metric" ? " m/s" : " mph")
    : "-";
  coords.textContent = data.coord
    ? `${data.coord.lat.toFixed(3)}, ${data.coord.lon.toFixed(3)}`
    : "-";

  if (typeof data.timezone === "number") {
    const tzMinutes = data.timezone / 60;
    timeZone.textContent = `Múi giờ: UTC${formatOffset(tzMinutes)}`;
  } else {
    timeZone.textContent = "";
  }

  if (w.icon) {
    weatherIcon.src = `https://openweathermap.org/img/wn/${w.icon}@2x.png`;
    weatherIcon.alt = w.description || "icon";
  } else {
    weatherIcon.src = "";
    weatherIcon.alt = "";
  }
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function formatOffset(minutes) {
  const sign = minutes >= 0 ? "+" : "-";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60).toString().padStart(2, "0");
  const m = Math.abs(abs % 60).toString().padStart(2, "0");
  return `${sign}${h}:${m}`;
}

// Event handlers
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Vui lòng nhập tên thành phố.");
    return;
  }
  fetchWeather(buildUrlByCity(city));
});

cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchBtn.click();
});

locateBtn.addEventListener("click", () => {
  clearError();
  if (!navigator.geolocation) {
    showError("Trình duyệt không hỗ trợ Geolocation");
    return;
  }
  locateBtn.disabled = true;
  locateBtn.textContent = "Đang lấy vị trí...";
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      locateBtn.disabled = false;
      locateBtn.textContent = "Dùng vị trí";
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      fetchWeather(buildUrlByCoords(lat, lon));
    },
    (err) => {
      locateBtn.disabled = false;
      locateBtn.textContent = "Dùng vị trí";
      if (err.code === 1)
        showError("Quyền định vị bị từ chối. Vui lòng cho phép vị trí.");
      else showError("Không thể lấy vị trí: " + (err.message || err.code));
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
  );
});

if (API_KEY === "YOUR_API_KEY_HERE") {
  console.warn(
    "Bạn chưa thay API_KEY. Thay YOUR_API_KEY_HERE bằng API Key từ openweathermap.org"
  );
}
