/*const productsList = document.getElementById('products-list');

async function loadProducts() {
 try {
    const res = await fetch('https://api.escuelajs.co/api/v1/products');
    if (!res.ok) throw new Error(`HTTP-Fehler: ${res.status}`);
    const products = await res.json();

    products.forEach((product) => {
      const { price, title, images } = product;
      const productItem = document.createElement('li');
      productItem.innerHTML = `
        <h3>${title}</h3>
        <p>Preis: €${price}</p>
        <img src="${images[0]}" alt="${title}" width="120" />
      `;
      productsList.appendChild(productItem);
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Produkte:', error);
  }
}

loadProducts();
*/

const productsList = document.getElementById("products-list");

// объявим асинхронную функцию
async function fetchProducts() {
  // await - это синтаксический сахар
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const products = await res.json();
  console.log(products);

  products.forEach((product) => {
    const { title, description, images } = product;

    const productCard = document.createElement("li");

    const titleEl = document.createElement("h2");
    const descriptionEl = document.createElement("p");
    const img = document.createElement("img");

    titleEl.textContent = title;
    descriptionEl.textContent = description;
    img.src = images[0];

    productCard.append(titleEl, img, descriptionEl);
    productsList.appendChild(productCard);
  });
}

// не забудем вызвать функцию
fetchProducts();

// CRUD = Create Read Update Delete
