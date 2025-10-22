
// // Load user info
// const user = JSON.parse(localStorage.getItem("user"));
// const stats = JSON.parse(localStorage.getItem("gameStats")) || {};

// if (!user) {
//   alert("⚠️ Please login first.");
//   window.location.href = "login.html";
// } else {
//   const fullname = user.fullname || "Unknown";
//   const age = user.age !== undefined && user.age !== null ? Number(user.age) : "N/A";
//   const email = user.email || "N/A";

//   document.getElementById("fullname").textContent = fullname;
//   document.getElementById("age").textContent = age;
//   document.getElementById("email").textContent = email;

//   const userStats = stats[user.email] || { plays: {}, scores: {} };
  
//   // Fill high scores
//   document.getElementById("score-flappy").textContent = userStats.scores?.["Flappy Bird"] || 0;
//   document.getElementById("score-ttt").textContent = userStats.scores?.["Tic Tac Toe"] || 0;
//   document.getElementById("score-space").textContent = userStats.scores?.["Space Shooter"] || 0;
//   document.getElementById("score-memory").textContent = userStats.scores?.["Memory Game"] || 0;
//   document.getElementById("score-rps").textContent = userStats.scores?.["Rock Paper Scissors"] || 0;
//   document.getElementById("score-hangman").textContent = userStats.scores?.["Hangman"] || 0;

//   // Fill most and least played
//   const plays = userStats.plays || {};
//   const playEntries = Object.entries(plays);

//   if (playEntries.length > 0) {
//     playEntries.sort((a, b) => b[1] - a[1]); // descending by count
//     document.getElementById("mostPlayed").textContent = playEntries[0][0];
//     document.getElementById("leastPlayed").textContent = playEntries[playEntries.length - 1][0];
//   }
// }

// // Logout
// document.getElementById("logoutBtn").addEventListener("click", () => {
//   localStorage.removeItem("user");
//   window.location.href = "login.html";
// });

// Load user info
const user = JSON.parse(localStorage.getItem("user"));
const stats = JSON.parse(localStorage.getItem("gameStats")) || {};

if (!user) {
  alert("⚠️ Please login first.");
  window.location.href = "login.html";
} else {
  const fullname = user.fullname || "Unknown";
  const age = user.age !== undefined && user.age !== null ? Number(user.age) : "N/A";
  const email = user.email || "N/A";

  document.getElementById("fullname").textContent = fullname;
  document.getElementById("age").textContent = age;
  document.getElementById("email").textContent = email;

  const userStats = stats[user.email] || { plays: {}, scores: {} };

  // Only show selected games
  document.getElementById("score-flappy").textContent =
    userStats.scores?.["Flappy Bird"] || 0;
  document.getElementById("score-space").textContent =
    userStats.scores?.["Space Shooter"] || 0;
  document.getElementById("score-memory").textContent =
    userStats.scores?.["Memory Game"] || 0;

  // Most and least played
  const plays = userStats.plays || {};
  const playEntries = Object.entries(plays);

  if (playEntries.length > 0) {
    playEntries.sort((a, b) => b[1] - a[1]);
    document.getElementById("mostPlayed").textContent = playEntries[0][0];
    document.getElementById("leastPlayed").textContent =
      playEntries[playEntries.length - 1][0];
  }
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "login.html";
});
