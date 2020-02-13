const ARTISTS_KEY = "artists";

const addArtistBtn = document.getElementById("add-artist-btn");
const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const addBtn = document.getElementById("add-btn");
const artistForm = document.getElementById("artist-form");
const artistList = document.querySelector(".artist-list");

let artists;

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
};

document.addEventListener("DOMContentLoaded", () => {
  artists = localStorage.getObj(ARTISTS_KEY);

  if (!artists) {
    artists = [];
    return;
  }

  for (let a of artists) {
    addArtistCard(a);
  }
});

searchBtn.addEventListener("click", () => {
  const searchStr = search.value;
  const regex = new RegExp(searchStr, "i");

  for (let i = 0; i < artists.length; i++) {
    if (!regex.test(artists[i].name)) {
      artistList.children[i].classList.add("hide");
    } else {
      artistList.children[i].classList.remove("hide");
    }
  }
});

addArtistBtn.addEventListener("click", () => {
  toggleForm(artistForm);
});

addBtn.addEventListener("click", e => {
  e.preventDefault();

  const artist = {
    name: document.getElementById("name").value,
    about: document.getElementById("about").value,
    imgUrl: document.getElementById("img-url").value
  };

  addArtist(artist);
  addArtistCard(artist);

  toggleForm(artistForm);
});

function toggleForm(form) {
  clearForm(form);
  artistForm.classList.toggle("hide");
}

function clearForm(form) {
  const formInputs = form.getElementsByTagName("input");
  for (let i of formInputs) {
    i.value = "";
  }
}

function addArtist(artist) {
  artists.push(artist);
  localStorage.setObj(ARTISTS_KEY, artists);
}

function deleteArtist(index) {
  artists.splice(index, 1);
  localStorage.setObj(ARTISTS_KEY, artists);
}

function addArtistCard(artist) {
  const card = createArtistCard(artist.name, artist.about, artist.imgUrl);
  artistList.appendChild(card);
}

function indexOf(element) {
  let i = 0;
  while ((element = element.previousElementSibling) != null) {
    i++;
  }
  return i;
}

function createArtistCard(name, about, imgUrl) {
  // create elements
  const li = document.createElement("li");
  const img = document.createElement("img");
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const button = document.createElement("button");

  // add event listeners
  button.addEventListener("click", () => {
    deleteArtist(indexOf(li));
    li.remove();
  });

  // add classes
  li.classList.add("artist-card");
  img.classList.add("artist-img");
  div.classList.add("artist-text");
  h3.classList.add("artist-name");
  p.classList.add("artist-description");
  button.classList.add("delete-btn");

  // set attributes
  img.setAttribute("src", imgUrl);

  // set text content
  h3.textContent = name;
  p.textContent = about;
  button.textContent = "Delete";

  // append
  li.appendChild(img);
  li.appendChild(div);
  li.appendChild(button);
  div.appendChild(h3);
  div.appendChild(p);

  return li;
}
