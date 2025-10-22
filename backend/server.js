
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load users from file
const usersFile = "./users.json";
let users = [];

if (fs.existsSync(usersFile)) {
  try {
    users = JSON.parse(fs.readFileSync(usersFile));
    if (!Array.isArray(users)) users = [];
  } catch (err) {
    console.error("Error reading users.json:", err);
    users = [];
  }
} else {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// 🧾 Registration Route
app.post("/register", (req, res) => {
  const { fullname, age, email, password } = req.body;

  if (!fullname || !age || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { 
    fullname, 
    age: Number(age), // ← convert age to number
    email, 
    password 
  };
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  console.log("Registered new user:", newUser);
  res.json({ message: "Registration successful!" });
});

// 🔐 Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.log("Logged in user:", user);

  // ← Important: Always send valid fullname, age, email
  res.json({ 
    message: "Login successful!", 
    fullname: user.fullname || "Unknown",
    age: user.age !== undefined && user.age !== null ? Number(user.age) : "N/A",
    email: user.email || "N/A"
  });
});

// 🟢 Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
