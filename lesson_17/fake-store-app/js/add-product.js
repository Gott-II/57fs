document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ADD-Product-form");
  const categorySelect = document.getElementById("categoryId");

  // 🧠 Kategorien laden
  fetchCategories();

  // 📦 Produkt absenden
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const price = Number(form.price.value);
    const categoryId = Number(form.categoryId.value);
    const imageUrl = form.imageUrl.value.trim();

    const productData = {
      title,
      price,
      description,
      categoryId,
      images: [imageUrl], // Die API erwartet ein Array
    };

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Nicht eingeloggt – bitte zuerst anmelden!");
        window.location.href = "/signin.html";
        return;
      }

      const res = await fetch("https://api.escuelajs.co/api/v1/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        throw new Error(`Fehler: ${res.status}`);
      }

      const result = await res.json();
      console.log("Produkt hinzugefügt:", result);
      alert("✅ Produkt erfolgreich hinzugefügt!");
      form.reset();
    } catch (error) {
      console.error("Produktfehler:", error.message);
      alert("❌ Fehler beim Hinzufügen des Produkts.");
    }
  });

  // 📚 Kategorien abrufen und anzeigen
  async function fetchCategories() {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/categories");
      if (!res.ok) {
        throw new Error(`Fehler beim Abrufen der Kategorien: ${res.status}`);
      }

      const categories = await res.json();
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    } catch (error) {
      console.error("Kategorienfehler:", error.message);
    }
  }
});


