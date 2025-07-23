async function fetchProfile() {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Kein Token gefunden");

    const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Fehler beim Abrufen des Profils");

    const user = await res.json();
    console.log(user);

    const { avatar, email, name } = user;
    heading.textContent = name;
    img.src = avatar;
    emailEl.textContent = email;
  } catch (error) {
    console.error("Profil konnte nicht geladen werden:", error);
    heading.textContent = "Nicht angemeldet";
    emailEl.textContent = "";
    img.src = "default-avatar.png"; // Optionales Platzhalterbild
  }
}

