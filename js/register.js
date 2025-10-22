document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const strengthMsg = document.getElementById("passwordStrength");

  // Password strength indicator
  passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;
    if (value.length < 6) {
      strengthMsg.textContent = "Weak password ❌";
      strengthMsg.style.color = "red";
    } else if (/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)) {
      strengthMsg.textContent = "Strong password ✅";
      strengthMsg.style.color = "green";
    } else {
      strengthMsg.textContent = "Medium strength ⚠️";
      strengthMsg.style.color = "orange";
    }
  });

  // Registration form submit
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const age = document.getElementById("age").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const robotCheck = document.getElementById("captcha").checked; // ✅ FIXED ID

    if (!robotCheck) {
      alert("Please confirm you are not a robot.");
      return;
    }

    if (!fullname || !age || !email || !password) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, age, email, password }),
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        window.location.href = "login.html";
      }
    } catch (error) {
      alert("Server error. Try again later.");
      console.error(error);
    }
  });
});
