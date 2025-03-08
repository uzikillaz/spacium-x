// NASA API Key
const NASA_API_KEY = "7gHcIZyLKIbMrgEqjVZObiEpfBhIONW0vMIwp7aV";

// Translations
const translations = {
  en: {
    searchPlaceholder: "Search for space news...",
    createdBy: "Created by",
    settings: "Settings",
    moreInfo: "More Info",
    settingsTitle: "Settings",
  },
  az: {
    searchPlaceholder: "Kosmik xəbərlər axtar...",
    createdBy: "Yaradıb",
    settings: "Tənzimləmələr",
    moreInfo: "Daha çox məlumat",
    settingsTitle: "Tənzimləmələr",
  },
  tr: {
    searchPlaceholder: "Uzay haberlerini ara...",
    createdBy: "Oluşturan",
    settings: "Ayarlar",
    moreInfo: "Daha fazla bilgi",
    settingsTitle: "Ayarlar",
  },
  ru: {
    searchPlaceholder: "Поиск космических новостей...",
    createdBy: "Создано",
    settings: "Настройки",
    moreInfo: "Подробнее",
    settingsTitle: "Настройки",
  },
};

// Current language
let currentLanguage = "en";

// Change language
function changeLanguage(lang) {
  currentLanguage = lang;
  updateUI();
}

// Update UI with translations
function updateUI() {
  document.getElementById("search-bar").placeholder =
    translations[currentLanguage].searchPlaceholder;
  document.getElementById("info-text").textContent =
    `${translations[currentLanguage].createdBy} Eldar Alekberoff`;
  document.getElementById("settings-button").textContent =
    translations[currentLanguage].settings;
  document.getElementById("settings-title").textContent =
    translations[currentLanguage].settingsTitle;

  // Update "More Info" buttons
  const moreInfoButtons = document.querySelectorAll(".more-info");
  moreInfoButtons.forEach((button) => {
    button.textContent = translations[currentLanguage].moreInfo;
  });
}

// Open settings page
function openSettings() {
  document.getElementById("settings-page").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

// Close settings page
function closeSettings() {
  document.getElementById("settings-page").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Fetch news from NASA API
async function fetchNews() {
  const searchQuery = document.getElementById("search-bar").value;
  const newsList = document.getElementById("news-list");

  try {
    // Fetch data from NASA API
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=10`
    );
    const data = await response.json();

    // Clear existing news
    newsList.innerHTML = "";

    // Add news items
    data.forEach((item) => {
      const newsItem = document.createElement("div");
      newsItem.className = "news-item";
      newsItem.innerHTML = `
        <img src="${item.url}" alt="${item.title}" />
        <h2>${item.title}</h2>
        <p>${item.explanation}</p>
        <div class="more-info" onclick="toggleDescription(this)">
          ${translations[currentLanguage].moreInfo}
        </div>
      `;
      newsList.appendChild(newsItem);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    newsList.innerHTML = `<p>Failed to load news. Please try again later.</p>`;
  }
}

// Toggle article description
function toggleDescription(button) {
  const description = button.previousElementSibling;
  description.style.display = description.style.display === "none" ? "block" : "none";
  button.textContent =
    description.style.display === "none"
      ? translations[currentLanguage].moreInfo
      : "Less Info";
}

// Initial load
updateUI();
fetchNews();
