// 🧩 Получаем элементы из DOM
const formElement = document.getElementById("form");
const listElement = document.getElementById("persons-list");
const clearBtnElement = document.getElementById("clear");
const clearOneBtnElement = document.getElementById("clear-one");

// 🧠 Массив пользователей
const persons = [];

// 🔥 Liste komplett leeren mit childNodes
function clearList() {
  const nodes = listElement.childNodes;
  while (nodes.length > 0) {
    listElement.removeChild(nodes[0]); // entfernt auch Textknoten
  }
}

// 🧼 Nur <li>-Elemente entfernen mit .children
function clearOne() {
  const items = listElement.children;
  if (items.length > 0) {
    listElement.removeChild(items[0]); // entfernt gezielt nur <li>
  }
}

// 🧹 Eingabefelder leeren
function clearInputs(event) {
  event.target.nickname.value = "";
  event.target.place.value = "";
}

// 🔄 Status wechseln
function changeStatus(event) {
  const el = event.target;
  el.style.textDecoration =
    el.style.textDecoration === "line-through" ? "none" : "line-through";
}

// 📣 Event-Listener
clearBtnElement.addEventListener("click", clearList);
clearOneBtnElement.addEventListener("click", clearOne);

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const nickname = event.target.nickname.value.trim();
  const place = event.target.place.value.trim();

  if (!nickname || !place) {
    alert("Bitte beide Felder ausfüllen.");
    return;
  }

  const person = {
    name: nickname,
    place: place,
  };

  persons.push(person);

  const li = document.createElement("li");
  li.textContent = `${person.name} ${person.place}🥷🏻`;
  li.addEventListener("click", changeStatus);
  listElement.appendChild(li);

  clearInputs(event);
});

