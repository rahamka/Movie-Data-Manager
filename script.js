let movieName = document.getElementById("movieNameInput");
let movieRoll = document.getElementById("movieRoll");
let movieDiscript = document.getElementById("movieDiscript");
let btn = document.getElementById("submitBtn");
let dataAppendEl = document.getElementById("dataAppend");
let themeToggle = document.getElementById("themeToggle");

// Load stored movies
let movies = JSON.parse(localStorage.getItem("movies")) || [];

function renderMovies() {
  dataAppendEl.innerHTML = "";
  movies.forEach((movie, index) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${movie.roll}</td>
      <td>${movie.name}</td>
      <td>${movie.description}</td>
      <td><button class="delete-btn" onclick="deleteMovie(${index})">Delete</button></td>
    `;

    dataAppendEl.appendChild(tr);
  });
}

function saveMovies() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

btn.addEventListener("click", () => {
  let nameValue = movieName.value.trim();
  let rollValue = movieRoll.value.trim();
  let discriptValue = movieDiscript.value.trim();

  if (!nameValue || !rollValue || !discriptValue) {
    alert("Please fill all fields!");
    return;
  }

  movies.push({
    roll: rollValue,
    name: nameValue,
    description: discriptValue,
  });

  saveMovies();
  renderMovies();

  movieName.value = "";
  movieRoll.value = "";
  movieDiscript.value = "";
});

function deleteMovie(index) {
  movies.splice(index, 1);
  saveMovies();
  renderMovies();
}

// THEME SWITCH
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light")
    ? "☀️"
    : "🌙";
});

// Load movies on start
renderMovies();
