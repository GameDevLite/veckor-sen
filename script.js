// === Hjälpfunktioner ===
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getDateOfISOWeek(week, year) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4)
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

// === Elementreferenser ===
const weekElem = document.getElementById("veckonummer");
const currElem = document.getElementById("nuvarande");
const rangeElem = document.getElementById("intervall");
const prevBtn = document.getElementById("prevWeek");
const nextBtn = document.getElementById("nextWeek");

const today = new Date();
const currentWeek = getWeekNumber(today);
let displayWeek = currentWeek + 1;
let displayYear = today.getFullYear();

if (displayWeek > 52) {
  displayWeek = 1;
  displayYear++;
}

// === Formatering ===
const formatDate = (d) =>
  d.toLocaleDateString("sv-SE", { day: "numeric", month: "short" });

// === Funktion för att uppdatera visning ===
function updateDisplay(week, year) {
  const start = getDateOfISOWeek(week, year);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  weekElem.textContent = "Vecka " + week;
  currElem.textContent = "Nuvarande vecka är " + currentWeek + ".";
  rangeElem.textContent = `Vecka ${week} är ${formatDate(start)} – ${formatDate(end)}.`;
}

// === Navigeringsknappar ===
nextBtn.addEventListener("click", () => {
  displayWeek++;
  if (displayWeek > 52) {
    displayWeek = 1;
    displayYear++;
  }
  updateDisplay(displayWeek, displayYear);
});

prevBtn.addEventListener("click", () => {
  displayWeek--;
  if (displayWeek < 1) {
    displayWeek = 52;
    displayYear--;
  }
  updateDisplay(displayWeek, displayYear);
});

// === Init ===
updateDisplay(displayWeek, displayYear);

// === Tema-knapp ===
const themeBtn = document.getElementById("toggleTheme");
const body = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  themeBtn.textContent = "🌙";
} else {
  themeBtn.textContent = "🌞";
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  const darkMode = body.classList.contains("dark");
  themeBtn.textContent = darkMode ? "🌙" : "🌞";
  localStorage.setItem("theme", darkMode ? "dark" : "light");
});
