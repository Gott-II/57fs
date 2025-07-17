// https://www.amazon.com/gp/video/search?phrase=asd&k=asd&ref=atv_rs_redirect

// URL Uniform Resourse Locator
// Resourse ->           любой файл, например картинка, html или любой другой код
// www.amazon.com ->     Domain
// https ->              протокол - правила - как мы можем делать запросы
//  - http                  - основные правила
// /gp/video/search ->   Путь - path
// ?phrase=asd&k=asd&ref=atv_rs_redirect -> query параметры
//      вопросительный знак и дальше пары ключ значение через амперсант без пробелов
//      phrase: asd
//      k: asd
//      ref: atv_rs_redirect

// /products/1
// /products/25 - path variable - параметр пути - переменная пути - получить один продукт под id25
// /products?color=red  -> получить все продукты удовлетоворяющие условию

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signin-form");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!validateEmail(email)) {
      showMessage("Ungültige E-Mail-Adresse!", "red");
      return;
    }

    if (password.length < 6) {
      showMessage("Das Passwort muss mindestens 6 Zeichen lang sein.", "red");
      return;
    }

    const credentials = { email, password };
    const result = await fetchLogin(credentials);

    if (result && result.access_token) {
      showMessage("Anmeldung erfolgreich! 🎉", "green");
      console.log("Token:", result.access_token);
      // Optional: Weiterleitung oder Speicherung des Tokens
    } else {
      showMessage("Login fehlgeschlagen. Überprüfe deine Daten!", "red");
    }

    form.reset();
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
  }

  async function fetchLogin(credentials) {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP-Fehler ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Fehler beim Login:", error.message);
      return null;
    }
  }
});



