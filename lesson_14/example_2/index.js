//const burgerPromise = new Promise(function(res, rej){
  //  setTimeout
//(() => {
  //      console.log("Burger is ready!");
   //     res("Burger");
//    }, 5000);
//});

// Promise

// fullfilled
// rejected
// pending

 // Promise { <pending> }

// setTimeout(() => {
//   console.log(burgerPromise);
// }, 6000);

// then - можем получить значение без таймера -> fullfilled
// catch - обработать ошибку - в случае reject -> rejected

// Раскрыть промис без сет таймаут

burgerPromise
  .then((burger) => {
    console.log(burger);
  })
  .catch((err) => {
    console.log(err);
  });

  const burgerPromise = new Promise(function(res, rej) {
  setTimeout(() => {
    const isReady = Math.random() > 0.5; // 70% chance it's ready
    if (isReady) {
      console.log("Burger is ready!");
      res("🍔 Burger served");
    } else {
      console.log("Oops, the burger burned!");
      rej("🔥 Burger failed");
    }
  }, 5000);
});

burgerPromise
  .then(result => console.log("Success:", result))
  .catch(error => console.log("Error:", error));

  const hopInterval = setInterval(() => {
  console.log("Hop!");
}, 3000);

setTimeout(() => {
  clearInterval(hopInterval); // остановит интервал через 10 секунд
}, 10000);