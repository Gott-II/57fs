const randomPromise = new Promise((resolve, reject) => {
  const isSuccess = Math.random() < 0.5;

  if (isSuccess) {
    resolve("Best day of my life");
  } else {
    reject(new Error("Something is off"));
  }
});

randomPromise
  .then((message) => {
    console.log("Успех:", message);
  })
  .catch((error) => {
    console.log("Ошибка:", error.message);
  });
