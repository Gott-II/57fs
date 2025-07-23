const productsList = document.getElementById("products-list");

// 🔍 Produkte aus der API laden
async function fetchProducts() {
  try {
    const { data } = await axios.get("https://api.escuelajs.co/api/v1/products");
    data.forEach(renderProduct);
  } catch (error) {
    console.error("Fehler beim Laden der Produkte:", error);
  }
}

// 🧱 Einzelnes Produkt-Element erstellen
function renderProduct({ title, description, images, id, price }) {
  const productCard = document.createElement("li");
  productCard.id = "product-" + id;
  productCard.classList.add("product-card");

  const titleEl = document.createElement("h2");
  titleEl.textContent = title;

  const descriptionEl = document.createElement("p");
  descriptionEl.textContent = description;

  const img = document.createElement("img");
  img.src = images[0];
  img.alt = title;
  img.referrerPolicy = "no-referrer";

  const priceEl = document.createElement("p");
  priceEl.textContent = `Price: ${price}`;

  const deleteBtn = createDeleteButton(id);
  const editBtn = createEditButton(id, productCard);

  productCard.append(titleEl, img, descriptionEl, priceEl, deleteBtn, editBtn);
  productsList.appendChild(productCard);
}

// 🗑️ Delete-Button erstellen
function createDeleteButton(id) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Delete";
  button.onclick = () => fetchDeleteProduct(id);
  return button;
}

// ✏️ Edit-Button mit Formular erstellen
function createEditButton(id, productCard) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Edit";

  button.onclick = () => {
    let form = document.getElementById("edit-product-" + id);

    // Verhindert mehrfaches Erstellen des Formulars
    if (!form) {
      form = document.createElement("form");
      form.id = "edit-product-" + id;

      form.innerHTML = `
        <input type="text" name="title" placeholder="Title" required />
        <input type="number" name="price" placeholder="Price" required />
        <button type="submit">Save</button>
      `;

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        fetchUpdateProduct(
          id,
          form.title.value.trim(),
          Number(form.price.value)
        );
      });

      productCard.appendChild(form);
    }

    form.style.display = form.style.display === "none" ? "block" : "none";
  };

  return button;
}

// 🔄 Produkt aktualisieren
async function fetchUpdateProduct(id, title, price) {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ title, price }),
    });

    if (!res.ok) throw new Error("Fehler beim Aktualisieren");
    console.log("Produkt erfolgreich aktualisiert");
  } catch (error) {
    console.error("Update fehlgeschlagen:", error);
  }
}

// 🧹 Produkt aus DOM entfernen
async function fetchDeleteProduct(productId) {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const productCard = document.getElementById("product-" + productId);
      productCard.remove();
    } else {
      throw new Error("Löschen fehlgeschlagen");
    }
  } catch (error) {
    console.error("Fehler beim Löschen des Produkts:", error);
  }
}

// 🌟 Initialer Ladevorgang
fetchProducts();

