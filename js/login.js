

// document.getElementById("loginForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const robotCheck = document.getElementById("robotCheck").checked;

//   // Frontend validation
//   if (!robotCheck) {
//     alert("Please confirm you are not a robot.");
//     return;
//   }
//   if (!email || !password) {
//     alert("Both email and password are required.");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:5000/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     alert(data.message);

//     if (response.ok) {
//       // Ensure age and email exist before storing
//       const userToStore = {
//         fullname: data.fullname || "",
//         age: data.age !== undefined ? data.age : "",
//         email: data.email || ""
//       };

//       localStorage.setItem("user", JSON.stringify(userToStore));
//       window.location.href = "index.html";
//     }
//   } catch (error) {
//     alert("Server error. Try again later.");
//     console.error(error);
//   }
// });

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const robotCheck = document.getElementById("robotCheck").checked;

  if (!robotCheck) {
    alert("Please confirm you are not a robot.");
    return;
  }

  if (!email || !password) {
    alert("Both email and password are required.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      // ← Only store correct keys in localStorage
      const userToStore = {
        fullname: data.fullname,
        age: data.age,
        email: data.email
      };
      localStorage.setItem("user", JSON.stringify(userToStore));

      window.location.href = "profile.html"; // redirect to profile page
    }
  } catch (error) {
    alert("Server error. Try again later.");
    console.error(error);
  }
});

