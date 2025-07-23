const select = document.getElementById("categoryId");
const form = document.getElementById("add-product-form");

async function fetchCategories() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/categories");
    if (!response.ok) throw new Error("Failed to fetch categories");

    const categories = await response.json();

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

async function fetchCreateProduct(product) {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    window.location.href = "/";
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newProduct = {
    title: form.title.value.trim(),
    price: parseFloat(form.price.value),
    description: form.description.value.trim(),
    categoryId: parseInt(form.categoryId.value),
    images: [form.image.value.trim()],
  };

  fetchCreateProduct(newProduct);
});

function showFancyMessage(text, color = "green") {
  const msg = document.createElement("div");
  msg.textContent = text;
  msg.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${color};
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: fadeOut 3s forwards;
  `;
  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 3000);
}

const style = document.createElement("style");
style.textContent = `
@keyframes fadeOut {
  0% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
}
`;
document.head.appendChild(style);


fetchCategories();

