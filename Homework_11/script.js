### Задание 1


// У вас есть массив объектов:

// ```js
// const starWarsHeroes = [
//    { name: "Anakin Skywalker", age: 30, isJedi: true },
//    { name: "Luke Skywalker", age: 25, isJedi: true },
//    { name: "Han Solo", age: 35, isJedi: false },
//    { name: "Princess Leia", age: 30, isJedi: false },
//    { name: "Obi-Wan Kenobi", age: 60, isJedi: true },
// ];

/*
Используйте методы массивов.

1.2 Создайте новый массив с джедаями младше 40 лет

1.3 Посчитайте возраст всех джедаев

1.4 Повысьте возраст героев на 10 лет

1.5 Создайте новый массив, где "Anakin Skywalker" заменен на:
`{ name: "Darth Vader", isJedi: false, age: 50 }`

1.6 Создайте на основе старого массива новый массив объектов по образу:
`[{ name: "Luke Skywalker", isJedi: true }, { name: "Han Solo", isJedi: false }, ...]`
*/


const starWarsHeroes = [
  { name: "Anakin Skywalker", age: 30, isJedi: true },
  { name: "Luke Skywalker", age: 25, isJedi: true },
  { name: "Han Solo", age: 35, isJedi: false },
  { name: "Princess Leia", age: 30, isJedi: false },
  { name: "Obi-Wan Kenobi", age: 60, isJedi: true },
];

// 1.2 Джедаи младше 40 лет
const youngJedis = starWarsHeroes.filter(hero => hero.isJedi && hero.age < 40);

// 1.3 Суммарный возраст всех джедаев
const totalJediAge = starWarsHeroes
  .filter(hero => hero.isJedi)
  .reduce((sum, hero) => sum + hero.age, 0);

// 1.4 Повышение возраста на 10 лет
const heroesPlusTen = starWarsHeroes.map(hero => ({
  ...hero,
  age: hero.age + 10,
}));

// 1.5 Замена Анакина на Дарта Вейдера
const updatedHeroes = starWarsHeroes.map(hero =>
  hero.name === "Anakin Skywalker"
    ? { name: "Darth Vader", isJedi: false, age: 50 }
    : hero
);

// 1.6 Массив только с name и isJedi
const simplifiedHeroes = starWarsHeroes.map(({ name, isJedi }) => ({ name, isJedi }));
