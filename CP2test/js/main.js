const API_KEY = "59abdd3e3849401729e56fdeb4035654"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const ICON_URL = "https://openweathermap.org/img/wn/";

// --- Lấy các phần tử DOM ---
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locateBtn = document.getElementById('locateBtn');

const resultDiv = document.getElementById('result');
const messageArea = document.getElementById('messageArea');

const locationName = document.getElementById('locationName');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDesc = document.getElementById('weatherDesc');
const timeZone = document.getElementById('timeZone');
const temp = document.getElementById('temp');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');
const coords = document.getElementById('coords');

// --- HÀM HỖ TRỢ ---

function displayMessage(msg, isError = false) {
    // Ẩn khu vực kết quả
    resultDiv.classList.add('d-none');
    // Hiện khu vực thông báo
    messageArea.classList.remove('d-none');
    // Đặt nội dung và kiểu dáng thông báo
    messageArea.textContent = msg;
    messageArea.className = `alert text-center ${isError ? 'alert-danger' : 'alert-info'}`;
}

function capitalizeFirstLetter(str) {
    if (!str) return '';
    // Viết hoa chữ cái đầu
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function updateWeatherUI(data) {
    const { main, weather, wind: windData, sys, coord, name, timezone } = data;

    // Hiện khu vực kết quả, ẩn thông báo
    resultDiv.classList.remove('d-none');
    messageArea.classList.add('d-none');

    // Cập nhật tên địa điểm
    locationName.textContent = `${name}, ${sys.country}`;
    // Cập nhật icon
    weatherIcon.src = `${ICON_URL}${weather[0].icon}@2x.png`;
    weatherIcon.alt = weather[0].description;
    // Cập nhật mô tả
    weatherDesc.textContent = capitalizeFirstLetter(weather[0].description);
    
    // Cập nhật nhiệt độ
    temp.textContent = `${Math.round(main.temp)}°C`;
    feelsLike.textContent = `${Math.round(main.feels_like)}°C`;

    // Cập nhật chi tiết
    humidity.textContent = `${main.humidity}%`;
    wind.textContent = `${windData.speed} m/s`;
    pressure.textContent = `${main.pressure} hPa`;
    coords.textContent = `[${coord.lat.toFixed(2)}, ${coord.lon.toFixed(2)}]`;
    
    // Cập nhật múi giờ
    const offsetHours = timezone / 3600;
    timeZone.textContent = `UTC ${offsetHours >= 0 ? '+' : ''}${offsetHours}`;
}

// --- GỌI API ---

async function fetchWeather(url) {
    try {
        // Hiển thị trạng thái đang tải
        displayMessage("Đang tìm kiếm...");
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            // Cập nhật giao diện nếu thành công
            updateWeatherUI(data);
        } else {
            // Xử lý lỗi từ API
            displayMessage(`Lỗi ${data.cod}: ${data.message || 'Không tìm thấy dữ liệu.'}`, true);
        }
    } catch (error) {
        console.error("Lỗi gọi API:", error);
        displayMessage("Lỗi kết nối mạng hoặc lỗi server.", true);
    }
}

// --- XỬ LÝ SỰ KIỆN ---

function searchByCity() {
    const city = cityInput.value.trim();
    if (city) {
        // Tạo URL tìm kiếm theo tên thành phố
        const url = `${BASE_URL}?q=${city}&units=metric&lang=vi&appid=${API_KEY}`;
        fetchWeather(url);
    } else {
        displayMessage("Vui lòng nhập tên thành phố.", true);
    }
}

function searchByGeolocation() {
    if (navigator.geolocation) {
        displayMessage("Đang yêu cầu quyền truy cập vị trí...");
        // Vô hiệu hóa nút trong khi chờ
        locateBtn.disabled = true;

        // Lấy vị trí hiện tại
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // Tạo URL tìm kiếm theo tọa độ
                const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&lang=vi&appid=${API_KEY}`;
                fetchWeather(url);
                locateBtn.disabled = false;
            },
            (error) => {
                // Xử lý lỗi định vị
                let errorMessage;
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Bạn đã từ chối quyền truy cập vị trí.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Thông tin vị trí không khả dụng.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Yêu cầu lấy vị trí hết thời gian.";
                        break;
                    default:
                        errorMessage = "Lỗi không xác định khi lấy vị trí.";
                        break;
                }
                displayMessage(errorMessage, true);
                locateBtn.disabled = false;
            }
        );
    } else {
        displayMessage("Trình duyệt của bạn không hỗ trợ Geolocation.", true);
    }
}

// --- GẮN SỰ KIỆN ---

// Tìm kiếm khi nhấn nút "Tìm"
searchBtn.addEventListener('click', searchByCity);

// Tìm kiếm khi nhấn Enter trong input thành phố
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchByCity();
    }
});

// Tìm kiếm theo định vị khi nhấn nút "Vị trí"
locateBtn.addEventListener('click', searchByGeolocation);

// Hiển thị hướng dẫn khi tải lần đầu
document.addEventListener('DOMContentLoaded', () => {
    displayMessage("Nhập tên thành phố và nhấn **Tìm**, hoặc nhấn **Vị trí** để xem thời tiết hiện tại của bạn!");
});