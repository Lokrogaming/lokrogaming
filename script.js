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
const units = {
  weight: {
    kg: 1,
    g: 1000,
    lb: 2.20462,
    oz: 35.274
  },
  length: {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    mi: 0.000621371,
    yd: 1.09361,
    ft: 3.28084,
    in: 39.3701
  },
  speed: {
    "m/s": 1,
    "km/h": 3.6,
    "mph": 2.23694,
    "kn": 1.94384
  }
};

document.getElementById("categorySelect").addEventListener("change", updateUnits);

function updateUnits() {
  const category = document.getElementById("categorySelect").value;
  const fromSelect = document.getElementById("fromUnit");
  const toSelect = document.getElementById("toUnit");

  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  if (category === "currency") {
    loadCurrencies(); // Ruft API auf
  } else {
    const categoryUnits = Object.keys(units[category]);
    categoryUnits.forEach(unit => {
      const optionFrom = new Option(unit, unit);
      const optionTo = new Option(unit, unit);
      fromSelect.add(optionFrom);
      toSelect.add(optionTo);
    });
  }
}

async function loadCurrencies() {
  const apiKey = "5a85e6ebf9db63b0364178c999ad268f";
  const res = await fetch(`https://api.exchangerate.host/symbols?apikey=${apiKey}`);
  const data = await res.json();

  const fromSelect = document.getElementById("fromUnit");
  const toSelect = document.getElementById("toUnit");

  Object.keys(data.symbols).forEach(code => {
    const option1 = new Option(code, code);
    const option2 = new Option(code, code);
    fromSelect.add(option1);
    toSelect.add(option2);
  });

  fromSelect.value = "USD";
  toSelect.value = "EUR";
}

async function convert() {
  const value = parseFloat(document.getElementById("inputValue").value);
  const category = document.getElementById("categorySelect").value;
  const from = document.getElementById("fromUnit").value;
  const to = document.getElementById("toUnit").value;
  const result = document.getElementById("result");

  if (isNaN(value)) {
    result.textContent = "Bitte eine gültige Zahl eingeben.";
    return;
  }

  if (category === "currency") {
    const apiKey = "5a85e6ebf9db63b0364178c999ad268f";
    const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${value}&apikey=${apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.result) {
        result.textContent = `Ergebnis: ${data.result.toFixed(2)} ${to}`;
      } else {
        result.textContent = "Fehler beim Abrufen des Wechselkurses.";
      }
    } catch (error) {
      result.textContent = "API-Fehler: " + error.message;
    }
    return;
  }

  const fromFactor = units[category][from];
  const toFactor = units[category][to];
  if (fromFactor === undefined || toFactor === undefined) {
    result.textContent = "Ungültige Einheit.";
    return;
  }

  const baseValue = value / fromFactor;
  const converted = baseValue * toFactor;
  result.textContent = `Ergebnis: ${converted.toFixed(2)} ${to}`;
}

// Seite initialisieren mit Gewicht
document.addEventListener("DOMContentLoaded", () => {
  updateUnits();
});
