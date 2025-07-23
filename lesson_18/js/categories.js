const categoriesList = document.getElementById("categories");

// 🔄 Holt Kategorien von der API
async function fetchCategories() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    if (!res.ok) throw new Error("Fehler beim Laden der Kategorien");

    const categories = await res.json();
    categories.forEach(({ id, name, image }) => renderCategory(id, name, image));
  } catch (error) {
    console.error("Fehler beim Abruf:", error);
  }
}

// 🧱 Erstellt eine einzelne Kategorie mit Bearbeiten & Löschen
function renderCategory(id, name, image) {
  const categoryItem = document.createElement("li");
  categoryItem.classList.add("category-item");

  const img = document.createElement("img");
  img.src = image;
  img.alt = name;

  const nameLabel = document.createElement("p");
  nameLabel.textContent = name;

  const edit = createEditForm(id, name, image, categoryItem);
  const deleteBtn = createDeleteButton(id, categoryItem);

  categoryItem.append(nameLabel, img, edit.toggleButton, edit.element, deleteBtn);
  categoriesList.appendChild(categoryItem);
}

// ✏️ Formular zur Bearbeitung
function createEditForm(id, currentName, currentImage, categoryItem) {
  const form = document.createElement("form");
  form.style.display = "none";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.placeholder = "Name";
  nameInput.value = currentName;

  const imageInput = document.createElement("input");
  imageInput.type = "text";
  imageInput.name = "image";
  imageInput.placeholder = "Bild-URL";
  imageInput.value = currentImage;

  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.textContent = "Speichern";

  form.append(nameInput, imageInput, saveBtn);

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.textContent = "Bearbeiten";
  toggleBtn.onclick = () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedName = nameInput.value.trim();
    const updatedImage = imageInput.value.trim();
    updateCategory(id, updatedName, updatedImage, categoryItem);
    form.style.display = "none";
  });

  return { element: form, toggleButton: toggleBtn };
}

// 🔁 Aktualisiert die Kategorie
async function updateCategory(id, name, image, categoryItem) {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    });

    if (!res.ok) throw new Error("Aktualisierung fehlgeschlagen");

    categoryItem.querySelector("p").textContent = name;
    categoryItem.querySelector("img").src = image;
  } catch (error) {
    console.error("Fehler beim Aktualisieren:", error);
  }
}

// 🗑️ Löscht eine Kategorie ohne Seitenreload
function createDeleteButton(id, categoryItem) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Löschen";
  button.classList.add("delete-btn");
  button.onclick = () => deleteCategory(id, categoryItem);
  return button;
}

async function deleteCategory(id, categoryItem) {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Fehler beim Löschen");

    categoryItem.remove();
  } catch (error) {
    console.error("Fehler beim Löschen der Kategorie:", error);
  }
}

// 🚀 Start beim Laden
fetchCategories();


