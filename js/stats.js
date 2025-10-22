
function updateGameStats(gameName, newScore) {
  // Get the user object from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return alert("⚠️ Please log in first!");

  // Load or initialize stats
  let stats = JSON.parse(localStorage.getItem("gameStats")) || {};

  if (!stats[user.email]) {
    stats[user.email] = {
      plays: {},
      scores: {}
    };
  }

  // Update play count
  stats[user.email].plays[gameName] = (stats[user.email].plays[gameName] || 0) + 1;

  // Update high score (keep the higher one)
  const currentHigh = stats[user.email].scores[gameName] || 0;
  if (newScore > currentHigh) {
    stats[user.email].scores[gameName] = newScore;
  }

  // Save back to localStorage
  localStorage.setItem("gameStats", JSON.stringify(stats));

  // 🔹 Debug: see updated stats in console
  console.log(`✅ Updated stats for ${user.email}:`, stats[user.email]);
}

// Optional helper: get stats for current user
function getUserStats() {
  const user = JSON.parse(localStorage.getItem("user"));
  const stats = JSON.parse(localStorage.getItem("gameStats")) || {};
  return user ? stats[user.email] || { plays: {}, scores: {} } : null;
}
