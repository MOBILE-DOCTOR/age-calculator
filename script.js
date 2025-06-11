document.getElementById("dob").max = new Date().toISOString().split("T")[0];

function calculateAge() {
  const dob = new Date(document.getElementById("dob").value);
  if (!dob) return;

  const today = new Date();
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
  const dayBorn = dob.toLocaleDateString('en', { weekday: 'long' });

  const result = document.getElementById("result");
  result.innerHTML = `
    <h3>Your Age</h3>
    <p>${years} Years, ${months} Months, ${days} Days</p>
    <p><strong>Total Days Old:</strong> ${totalDays}</p>
    <p><strong>Day of the Week Born:</strong> ${dayBorn}</p>
    <p><strong>Voting Eligibility:</strong> ${years >= 18 ? '✅ Eligible' : '❌ Not Eligible'}</p>
    <p><strong>SIM Eligibility:</strong> ${years >= 18 ? '✅ Eligible' : '❌ Not Eligible'}</p>
    <p><strong>Passport:</strong> ✅ Eligible to Apply</p>
  `;
}

function toggleFeatures() {
  const features = document.getElementById("features");
  features.style.display = features.style.display === "block" ? "none" : "block";
}

function resetForm() {
  document.getElementById("dob").value = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("features").style.display = "none";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function setLanguage(lang) {
  const heading = document.getElementById("heading");
  const translations = {
    en: "Advanced Age Calculator",
    ta: "மேம்பட்ட வயது கணக்கீடு",
    hi: "उन्नत आयु कैलकुलेटर",
    te: "అధునాతన వయస్సు క్యాలిక్యులేటర్"
  };
  heading.innerText = translations[lang] || translations.en;
}

// Voting Logic
const voteCounts = { yes: 0, no: 0 };

function vote(type) {
  if (type === 'yes') voteCounts.yes++;
  if (type === 'no') voteCounts.no++;
  showVoteResults();
}

function showVoteResults() {
  const total = voteCounts.yes + voteCounts.no;
  if (total === 0) return;
  const yesPercent = ((voteCounts.yes / total) * 100).toFixed(1);
  const noPercent = ((voteCounts.no / total) * 100).toFixed(1);
  document.getElementById('voteResult').innerText =
    `👍 Yes: ${yesPercent}% | 👎 No: ${noPercent}% (Total Votes: ${total})`;
}

// PDF Download
function downloadPDF() {
  const element = document.getElementById('pdfContent');
  html2pdf().from(element).save('AgeCalculatorResult.pdf');
}
