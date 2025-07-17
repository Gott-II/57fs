const loginForm = document.getElementById("login-form");
const messageEl = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const credentials = {
    email: e.target.email.value.trim(),
    password: e.target.password.value,
  };

  const result = await fetchLogin(credentials);

  if (result && result.access_token) {
    messageEl.textContent = "Login erfolgreich! 🎉";
    messageEl.style.color = "green";
    console.log("Token:", result.access_token);
    // Optional: Token speichern
    // localStorage.setItem("token", result.access_token);
    // window.location.href = "/dashboard.html";
  } else {
    messageEl.textContent = "Login fehlgeschlagen. Bitte überprüfe deine Zugangsdaten.";
    messageEl.style.color = "red";
  }
});

async function fetchLogin(credentials) {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      throw new Error(`HTTP-Fehler ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fehler beim Login:", error.message);
    return null;
  }
}
