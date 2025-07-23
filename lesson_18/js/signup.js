const registerForm = document.getElementById("register-form");
const messageEl = document.getElementById("message");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target.name.value.trim();
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();
  const avatar = event.target.avatar.value.trim();

  // ✋ Einfache Validierung
  if (!name || !email || !password || !avatar) {
    showMessage("Bitte alle Felder ausfüllen!", "red");
    return;
  }

  const newUser = { name, email, password, avatar };
  fetchRegister(newUser);
});

// 📤 Sendet neuen User zur API
async function fetchRegister(newUser) {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const result = await res.json();

    if (res.ok) {
      showMessage("🎉 Registrierung erfolgreich!", "green");
      registerForm.reset();
    } else {
      showMessage(result.message || "❌ Registrierung fehlgeschlagen!", "red");
    }
  } catch (error) {
    console.error("Signup Error:", error);
    showMessage("⚠️ Serverfehler, bitte später erneut versuchen", "red");
  }
}

// 💬 Zeigt Nachricht farbig im DOM
function showMessage(text, color = "black") {
  messageEl.textContent = text;
  messageEl.style.color = color;
  messageEl.style.textAlign = "center";
  messageEl.style.fontWeight = "bold";
}


