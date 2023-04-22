/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...

const container = document.querySelector(".cardsContainer");

function setFavoritesBackground() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.forEach((id) => {
    const item = document.getElementById(id);
    if (item) {
      item.style.backgroundColor = "red";
      item.dataset.fav = "true";
    }
  });
}

function addToFavorites(id) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

function removeFromFavorites(id) {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  const index = favorites.indexOf(id);
  if (index !== -1) {
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

function toggleFavorite(item) {
  const id = item.id;
  const isFavorite = item.dataset.fav === "true";

  if (isFavorite) {
    item.style.backgroundColor = "white";
    item.dataset.fav = "false";
    removeFromFavorites(id);
  } else {
    item.style.backgroundColor = "red";
    item.dataset.fav = "true";
    addToFavorites(id);
  }
}

setFavoritesBackground();

container.addEventListener("click", (event) => {
  const clickedItem = event.target.closest(".card");
  if (clickedItem) toggleFavorite(clickedItem);
});
