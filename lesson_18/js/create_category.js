const form = document.getElementById('add-category-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newCategory = {
    name: event.target.name.value,
    image: event.target.image.value
  };

  try {
    const res = await axios.post(
      'https://api.escuelajs.co/api/v1/categories',
      newCategory
    );
    console.log('Kategorie erfolgreich erstellt:', res.data);
    form.reset(); // optional: Formular zurücksetzen nach Erfolg
  } catch (error) {
    console.error('Fehler beim Erstellen der Kategorie:', error);
  }
});


