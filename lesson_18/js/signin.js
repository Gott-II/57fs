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

const loginForm = document.getElementById("login-form");
const messageEl = document.getElementById("message");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const credentials = {
    email: e.target.email.value.trim(),
    password: e.target.password.value.trim(),
  };

  // Optional: einfache Validierung
  if (!credentials.email || !credentials.password) {
    showMessage("Bitte E-Mail und Passwort eingeben", "red");
    return;
  }

  fetchLogin(credentials);
});

async function fetchLogin(credentials) {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await res.json();

    if (!res.ok) {
      showMessage(result.message || "Login fehlgeschlagen", "red");
    } else {
      const { access_token } = result;
      localStorage.setItem("accessToken", access_token);
      showMessage("Erfolgreich eingeloggt! 🎉", "green");

      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
    }
  } catch (error) {
    console.error("Login Error:", error);
    showMessage("Serverfehler, versuche es später erneut", "red");
  }
}

function showMessage(text, color = "black") {
  messageEl.textContent = text;
  messageEl.style.color = color;
  messageEl.style.textAlign = "center";
}


// POST https://api.escuelajs.co/api/v1/auth/login
// Content-Type: application/json

// {
//   "email": "john@mail.com",
//   "password": "changeme"
// }

// {
//     message: "",
//     statusCode:""
// }

// Cookies, localStorage, sessionStorage
