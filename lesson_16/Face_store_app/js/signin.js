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

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    // Dummy Login-Prüfung
    const dummyEmail = "test@example.com";
    const dummyPassword = "geheim123";

    if (email === dummyEmail && password === dummyPassword) {
      message.textContent = "Anmeldung erfolgreich!";
      message.style.color = "green";
      form.reset();
    } else {
      message.textContent = "Ungültige Anmeldedaten!";
      message.style.color = "red";
    }
  });
});


