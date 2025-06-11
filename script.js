// script.js - Advanced Age Calculator JS with Extra Features

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
  const totalWeeksOld = Math.floor(totalDaysOld / 7);
  const totalHours = totalDaysOld * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;
  const totalMonths = years * 12 + months;

  const dayOfWeekBorn = birth.toLocaleString('en-US', { weekday: 'long' });
  const zodiac = getZodiacSign(birth.getDate(), birth.getMonth() + 1);

  const nextBirthday = new Date(compare.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < compare) nextBirthday.setFullYear(compare.getFullYear() + 1);
  const diffToNext = nextBirthday - compare;
  const daysLeft = Math.floor(diffToNext / (1000 * 60 * 60 * 24));
  const monthsLeft = Math.floor(daysLeft / 30.44);
  const remDays = Math.round(daysLeft % 30.44);

  const results = `
    <h3>Age Result</h3>
    <p>🎂 You are ${years} years, ${months} months, and ${days} days old.</p>
    <p>📅 Total Days Old: ${totalDaysOld}</p>
    <p>📆 You were born on a: ${dayOfWeekBorn}</p>
    <p>🗓️ Western Zodiac Sign: ${zodiac}</p>
    <p>⌛ Summary: You are ${years} years old, born on a ${dayOfWeekBorn}, and have lived ${totalDaysOld} days.</p>
  `;

  const extras = `
    <h3>🧠 More Details</h3>
    <ul>
      <li>🗓️ Age in Months: ${totalMonths} months</li>
      <li>📅 Age in Weeks: ${totalWeeksOld} weeks</li>
      <li>⏱️ Age in Hours: ${totalHours.toLocaleString()}</li>
      <li>⏱️ Minutes: ${totalMinutes.toLocaleString()}</li>
      <li>⏱️ Seconds: ${totalSeconds.toLocaleString()}</li>
      <li>🎈 Next Birthday: In ${monthsLeft} months and ${remDays} days</li>
    </ul>
    <h3>🎉 Birthday Quiz</h3>
    <p>Guess what day of the week you were born on:</p>
    <input type="text" id="quizAnswer" placeholder="e.g., Monday" />
    <button onclick="checkBirthdayQuiz('${dayOfWeekBorn}')">Check Answer</button>
    <div id="quizResult"></div>
  `;

  document.getElementById("resultArea").innerHTML = results;
  document.getElementById("additionalFeatures").innerHTML = extras;
}

function getZodiacSign(day, month) {
  const zodiacs = [
    ["Capricorn", 20], ["Aquarius", 19], ["Pisces", 20], ["Aries", 20], ["Taurus", 21],
    ["Gemini", 21], ["Cancer", 23], ["Leo", 23], ["Virgo", 23], ["Libra", 23],
    ["Scorpio", 22], ["Sagittarius", 22], ["Capricorn", 31]
  ];
  return day < zodiacs[month - 1][1] ? zodiacs[month - 1][0] : zodiacs[month][0];
}

function checkBirthdayQuiz(correctDay) {
  const userAnswer = document.getElementById("quizAnswer").value.trim().toLowerCase();
  const isCorrect = correctDay.toLowerCase() === userAnswer;
  document.getElementById("quizResult").innerHTML = isCorrect
    ? "✅ Correct! Well done."
    : `❌ Incorrect. You were born on a ${correctDay}.`;
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
