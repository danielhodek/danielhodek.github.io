const addArtistBtn = document.getElementById("add-artist-btn");
const addBtn = document.getElementById("add-btn");
const artistForm = document.getElementById("artist-form");
const artistList = document.querySelector(".artist-list");

addArtistBtn.addEventListener("click", () => {
  toggleForm(artistForm);
});

addBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const about = document.getElementById("about").value;
  const imgUrl = document.getElementById("img-url").value;

  if (name === "" || about === "" || imgUrl === "") {
    return;
  }

  const card = createArtistCard(name, about, imgUrl);
  artistList.appendChild(card);
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

function createArtistCard(name, about, imgUrl) {
  // create elements
  const li = document.createElement("li");
  const img = document.createElement("img");
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const button = document.createElement("button");

  // add event listeners
  button.addEventListener('click', () => {
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
