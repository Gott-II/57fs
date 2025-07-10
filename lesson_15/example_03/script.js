const productsList = document.getElementById('products-list');

fetch('https://api.escuelajs.co/api/v1/products')
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP-Fehler: ${res.status}`);
    return res.json();
  })
  .then((products) => {
    products.forEach((product) => {
      const { price, title, images } = product;
      const productItem = document.createElement('li');

      const h3 = document.createElement('h3');
      h3.textContent = title;
      h3.setAttribute('aria-label', `Produkt: ${title}`);
      productItem.appendChild(h3);

      const priceSpan = document.createElement('span');
      priceSpan.textContent = `Preis: $${price} €`;
      priceSpan.setAttribute('aria-label', `Preis: ${price} Euro`);
      productItem.appendChild(priceSpan);

      if (Array.isArray(images) && images.length) {
        images.forEach((url) => {
          if (typeof url === 'string' && url.startsWith('http')) {
            const img = document.createElement('img');
            img.src = url;
            img.alt = title;
            img.referrerPolicy = 'no-referrer';
            img.crossOrigin = 'anonymous';
            img.width = 200;
            img.height = 200;
            productItem.appendChild(img);
          }
        });
      }

      productsList.appendChild(productItem);
    });
  })
  .catch((err) => {
    console.error('Fehler beim Laden der Produkte:', err.message);
    const errorItem = document.createElement('li');
    errorItem.textContent = 'Produkte konnten nicht geladen werden.';
    productsList.appendChild(errorItem);
  });

