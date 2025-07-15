const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // предотвращаем отправку формы

  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP-Fehler: ${response.status}`);
    }

    const result = await response.json();
    console.log("Registrierung erfolgreich:", result);
    alert("Registrierung erfolgreich!");
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error);
    alert("Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.");
  }
});
// Функция для валидации формы

