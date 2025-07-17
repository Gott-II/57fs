document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const messageEl = document.getElementById("message");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // ✅ Validierung
    if (!validateEmail(email)) {
      showMessage("Bitte gib eine gültige E-Mail-Adresse ein.", "red");
      return;
    }

    if (password.length < 6) {
      showMessage("Das Passwort muss mindestens 6 Zeichen lang sein.", "red");
      return;
    }

    const credentials = { email, password };
    const tokenObj = await fetchLogin(credentials);

    if (tokenObj && tokenObj.access_token) {
      const { access_token } = tokenObj;
      localStorage.setItem("accessToken", access_token);
      showMessage("Login erfolgreich! 🎉", "green");
      console.log("Access Token:", access_token);
      window.location.href = "./profile"

      // Optional: Weiterleitung nach erfolgreichem Login
      // window.location.href = "/dashboard.html";
    } else {
      showMessage("Login fehlgeschlagen. Bitte überprüfe deine Zugangsdaten.", "red");
    }

    loginForm.reset();
  });

  function showMessage(text, color) {
    messageEl.textContent = text;
    messageEl.style.color = color;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

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
        throw new Error(`Server antwortet mit Status ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Fehler beim Login:", error.message);
      return null;
    }
  }
});

