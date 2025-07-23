const heading = document.getElementById("heading");
const img = document.getElementById("avatar");
const emailEl = document.getElementById("email");

async function fetchProfile() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    heading.textContent = "Nicht angemeldet. Weiterleitung...";
    setTimeout(() => {
      window.location.href = "/signin.html";
    }, 2000);
    return;
  }

  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Fehler beim Abruf: ${res.status}`);
    }

    const user = await res.json();
    console.log("Profil geladen:", user);

    const { avatar, email, name } = user;
    heading.textContent = `Willkommen, ${name || "Nutzer"}!`;
    img.src = avatar;
    img.alt = `${name}'s Avatar`;
    emailEl.textContent = `E-Mail: ${email}`;

  } catch (error) {
    console.error("Profil-Fehler:", error.message);
    heading.textContent = "Profil konnte nicht geladen werden.";
    emailEl.textContent = "Fehler: " + error.message;
  }
}

fetchProfile();

