// script.js - Advanced Age Calculator JS

let isLoggedIn = false;
let currentUser = "";
const admin = { username: "admin", password: "admin123" };
const user = { username: "user", password: "user123" };

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if ((username === admin.username && password === admin.password) ||
      (username === user.username && password === user.password)) {
    isLoggedIn = true;
    currentUser = username;
    alert("Login successful as " + username);
    document.querySelector(".login-container").classList.add("hidden");
    document.getElementById("moreFeaturesMessage").innerHTML =
      "✨ More features will appear after calculation...";
  } else {
    alert("Invalid credentials");
  }
}

function calculateAge() {
  const dob = document.getElementById("dob").value;
  const compareDate = document.getElementById("compareDate").value || new Date().toISOString().split("T")[0];
  if (!dob) return alert("Please enter your Date of Birth");

  const birth = new Date(dob);
  const compare = new Date(compareDate);
  if (birth > compare) return alert("Date of Birth must be before compare date!");

  let years = compare.getFullYear() - birth.getFullYear();
  let months = compare.getMonth() - birth.getMonth();
  let days = compare.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(compare.getFullYear(), compare.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDaysOld = Math.floor((compare - birth) / (1000 * 60 * 60 * 24));
  const dayOfWeekBorn = birth.toLocaleString('en-US', { weekday: 'long' });

  const results = `
    <h3>Age Result</h3>
    <p>🎂 You are ${years} years, ${months} months, and ${days} days old.</p>
    <p>📅 Total Days Old: ${totalDaysOld}</p>
    <p>📆 You were born on a: ${dayOfWeekBorn}</p>
  `;
  document.getElementById("resultArea").innerHTML = results;

  document.getElementById("additionalFeatures").innerHTML = `
    <h3>✨ More Features</h3>
    <ul>
      <li>🗓️ Age in Other Calendars: (Coming soon)</li>
      <li>💎 Birthstone: Garnet</li>
      <li>🌸 Birth Flower: Carnation</li>
      <li>🌳 Celtic Tree Sign: Birch</li>
      <li>🐉 Chinese Zodiac Animal: Dragon</li>
      <li>🌍 Earth Revolutions: ${years}</li>
      <li>🎂 Birthdays Celebrated: ${years}</li>
      <li>🌕 Moon Cycles: ~${Math.floor(totalDaysOld / 29.53)}</li>
      <li>🌟 Famous People Born Today: Coming Soon</li>
      <li>🛂 Passport Eligibility: ${years >= 18 ? "Eligible" : "Not Eligible"}</li>
      <li>📞 SIM Eligibility: ${years >= 18 ? "Eligible" : "Not Eligible"}</li>
      <li>🗳️ Voting Eligibility: ${years >= 18 ? "Eligible" : "Not Eligible"}</li>
    </ul>
  `;
}

function resetCalculator() {
  document.getElementById("dob").value = "";
  document.getElementById("compareDate").value = "";
  document.getElementById("resultArea").innerHTML = "";
  document.getElementById("additionalFeatures").innerHTML = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function generatePDF() {
  const element = document.querySelector(".container");
  html2pdf().from(element).save("AgeDetails.pdf");
}
