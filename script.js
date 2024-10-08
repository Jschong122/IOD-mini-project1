document.addEventListener("DOMContentLoaded", (fetchDogBreeds) => {
  document
    .getElementById("userInput")
    .addEventListener("input", fetchDogBreeds);
  document
    .getElementById("barkinglevel")
    .addEventListener("change", fetchDogBreeds);

  function fetchDogBreeds() {
    const dogName = document.getElementById("userInput").value.toLowerCase();
    if (!dogName) {
      console.error("Dog name is required.");
      return;
    }

    const barkingLevel = document.getElementById("barkinglevel").value;
    clearDogs();

    const apiUrl = `https://leafy-froyo-e04e7a.netlify.app/.netlify/functions/fetch-api?name=${dogName}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        let filteredData = data;

        if (barkingLevel === "0") {
          displayDogs(data);
        } else {
          let filteredData = data.filter((dog) => {
            if (dog.barking) {
              const barking = dog.barking.toString().toLowerCase();
              return barking === barkingLevel;
            }
            return false;
          });
          displayDogs(filteredData);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function clearDogs() {
    const cardContainer = document.getElementById("cardcontainer");
    if (cardContainer) {
      cardContainer.innerHTML = " ";
    }
  }

  function displayDogs(dogs) {
    const cardContainer = document.getElementById("cardcontainer");
    if (!cardContainer) {
      console.error("card-body element not found");
      return;
    }
    cardContainer.innerHTML = "";
    dogs.forEach((dog) => {
      const cardImg = document.createElement("div");
      cardImg.className = "card-img";

      const imgInCard = document.createElement("img");
      imgInCard.className = "animal-img";
      imgInCard.src = `${dog.image_link}`;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      console.log("Dog object:", dog);
      cardBody.innerHTML = `<p>Breed : ${dog.name}</p>
          <p>Max life Expectancy: ${dog.max_life_expectancy}</p>
          <p>Min life Expectancy: ${dog.min_life_expectancy}</p>
          <p>Barking Level: ${dog.barking} </p>`;
      cardContainer.appendChild(cardImg);
      cardImg.appendChild(imgInCard);
      cardImg.appendChild(cardBody);
    });
  }
});
