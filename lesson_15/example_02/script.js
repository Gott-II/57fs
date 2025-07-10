const heading = document.getElementById("heading");
const shipTitle = document.getElementById("ship-title");
const cannonInfo = document.getElementById("canon-number");
const weaponList = document.getElementById("weapon-list");

// Promise<Respone> -json-> Promise<Pirate>
fetch("https://gott-ii.github.io/pirate-api/jack-sparrow.json") // Promise<Response>
  .then((res) => res.json()) // Promise<Pirate>
  .then((pirate) => {
    console.log(pirate.age);
    heading.textContent = pirate.name;
    shipTitle.textContent += pirate.ship.title;
    cannonInfo.textContent += pirate.ship.numberOfCanons;

    pirate.weapons.forEach((weapon) => {
      const li = document.createElement("li"); //<li></li>
      li.textContent = weapon;
      weaponList.appendChild(li);
    });
  })
  .catch((e) => {
    console.log(e);
  });