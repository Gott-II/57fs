const categoriesList = document.getElementById("categories");
const productsList = document.getElementById("products-list");
const form = document.getElementById("product-form");
const categorySelect = document.getElementById("categoryId");

// Kategorien abrufen und in Liste + Select einfügen
async function fetchCategories() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/categories");
    if (!res.ok) throw new Error("Fehler beim Abrufen der Kategorien");
    const categories = await res.json();

    categoriesList.innerHTML = "";
    categorySelect.innerHTML = "";

    categories.forEach(({ id, name, image }) => {
      const li = document.createElement("li");
      li.classList.add("category-item");

      const img = document.createElement("img");
      img.src = image;
      img.alt = name;
      img.loading = "lazy";

      const p = document.createElement("p");
      p.textContent = name;

      li.append(p, img);
      categoriesList.appendChild(li);

      // Option ins Select einfügen
      const option = document.createElement("option");
      option.value = id;
      option.textContent = name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error(error.message);
  }
}

// Produkte abrufen und anzeigen
async function fetchProducts() {
  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    if (!res.ok) throw new Error("Fehler beim Abrufen der Produkte");
    const products = await res.json();

    productsList.innerHTML = "";
    products.forEach(({ id, title, description, images, price }) => {
      const li = document.createElement("li");
      li.classList.add("product-card");
      li.dataset.id = id;

      const titleEl = document.createElement("h2");
      titleEl.textContent = title;

      const img = document.createElement("img");
      img.src = images?.[0] || "https://via.placeholder.com/200";
      img.alt = title;
      img.loading = "lazy";

      const descEl = document.createElement("p");
      descEl.textContent = description;

      const priceEl = document.createElement("p");
      priceEl.textContent = `Preis: $${price}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Löschen";
      deleteBtn.onclick = async () => {
        const success = await deleteProduct(id);
        if (success) li.remove();
      };

      li.append(titleEl, img, descEl, priceEl, deleteBtn);
      productsList.appendChild(li);
    });
  } catch (error) {
    console.error(error.message);
  }
}

// Produkt löschen
async function deleteProduct(id) {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    console.error("Fehler beim Löschen:", error.message);
    return false;
  }
}

// Neues Produkt hinzufügen
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = form.elements["title"].value.trim();
  const price = parseFloat(form.elements["price"].value);
  const description = form.elements["description"].value.trim();
  const categoryId = parseInt(form.elements["categoryId"].value);
  const imageUrl = form.elements["image"].value.trim();

  if (!title || isNaN(price) || !description || isNaN(categoryId) || !imageUrl) {
    alert("Bitte gültige Werte in allen Feldern eingeben.");
    return;
  }

  try {
    const res = await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        price,
        description,
        categoryId,
        images: [imageUrl],
      }),
    });

    if (!res.ok) throw new Error("Fehler beim Speichern");
    form.reset();
    fetchProducts(); // Liste neu laden
  } catch (error) {
    console.error(error.message);
  }
});


// Initiale Daten laden
fetchCategories();
fetchProducts();

  