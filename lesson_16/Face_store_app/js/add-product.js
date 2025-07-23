document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ADD-Product-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newProduct = {
      title: event.target.title.value.trim(),
      price: Number(event.target.price.value),
      description: event.target.description.value.trim(),
      categoryId: Number(event.target.categoryId.value),
      images: [event.target.imageUrl.value.trim()], // Achte auf den richtigen Feldnamen
    };

    const result = await fetchCreateProduct(newProduct);

    if (result) {
      alert("✅ Produkt erfolgreich hinzugefügt!");
      window.location.href = "/";
    } else {
      alert("❌ Produkt konnte nicht hinzugefügt werden.");
    }
  });
});

async function fetchCreateProduct(product) {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("⚠️ Du musst angemeldet sein, um Produkte hinzuzufügen.");
      window.location.href = "/signin.html";
      return null;
    }

    const res = await fetch("https://api.escuelajs.co/api/v1/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      throw new Error(`Fehler: ${res.status}`);
    }

    const data = await res.json();
    console.log("Produkt hinzugefügt:", data);
    return data;
  } catch (error) {
    console.error("Fehler beim Produkt hinzufügen:", error.message);
    return null;
  }
}


