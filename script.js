function opengame() {
  window.location.href ="guesser2.html"
}
function opentime() {
  window.location.href ="time3.html"
}
function backtomenu() {
  window.location.href ="game-library.html"
}
function openlibrary() {
  window.location.href="game-library.html"
}
function openbot() {
  window.location.href="discord-bot.html"
}
function opendownloader() {
  window.location.href="download-hub.html"
}
function downloadtimer() {
  window.location.href="time.zip"
}
function downloadLogo() {
  window.location.href="logo.zip"
}
function downloadbewerbung() {
  window.location.href="Bewerbung-Content_creator.zip"
}
function downloadmemes() {
  window.location.href="memes.zip"
}
function opentwitchplayer() {
  window.location.href="musicplayer.html"
}
function downloadmsgs() {
  window.location.href="msg-coded.zip"
}
function opendiscord() {
  window.open("Discord.html")
}
function opentest() {
  window.location.href="test-coupon-page.html"
}
function openlateindl() {
  window.location.href="projects/latein/verben-gruppen-projekt/downloader.html"
}
function opentycoon() {
  window.location.href="tycoon.html"
}
const unitOptions = {
  weight: ["kg", "g", "lb"],
  length: ["m", "km", "mi"],
  speed: ["km/h", "m/s", "mph"],
};

const currencyList = ["USD", "EUR", "GBP", "CHF", "JPY"];

document.getElementById("categorySelect").addEventListener("change", updateUnits);

function updateUnits() {
  const category = document.getElementById("categorySelect").value;
  const from = document.getElementById("fromUnit");
  const to = document.getElementById("toUnit");

  let options = [];

  if (category === "currency") options = currencyList;
  else options = unitOptions[category];

  from.innerHTML = options.map(opt => `<option value="${opt}">${opt}</option>`).join("");
  to.innerHTML = options.map(opt => `<option value="${opt}">${opt}</option>`).join("");
}

async function convert() {
  const value = parseFloat(document.getElementById("inputValue").value);
  const category = document.getElementById("categorySelect").value;
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;
  const result = document.getElementById("result");

  if (isNaN(value)) return result.textContent = "Bitte eine gültige Zahl eingeben.";

  if (category === "currency") {
    const res = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${value}`);
    const data = await res.json();
    result.textContent = `Ergebnis: ${data.result.toFixed(2)} ${to}`;
    return;
  }

  // Einfache Umrechnungstabellen
  const factors = {
    weight: { kg: 1, g: 1000, lb: 2.20462 },
    length: { m: 1, km: 0.001, mi: 0.000621371 },
    speed: { "km/h": 1, "m/s": 0.277778, mph: 0.621371 },
  };

  const base = value / factors[category][from];
  const converted = base * factors[category][to];
  result.textContent = `Ergebnis: ${converted.toFixed(2)} ${to}`;
}

// Initialisieren
updateUnits();

