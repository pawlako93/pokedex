const pokedex = document.getElementById("pokedex");
const buttons = document.getElementById("buttons");
const nextPageBtn = document.getElementById("nextPage");
const prevPageBtn = document.getElementById("previousPage");
const perPage = document.getElementById("perPage");
const statsDiv = document.getElementById("stats");
const searchBar = document.getElementById("searchBar");
const loader = document.querySelector(".loading");
 
let urlPokemon = null;
let currentPage = 0;
let limit = 20;
let offset = 0;
let nextPage = 0;
let prevPage = 0;
let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;
let pokemonID = 0;


/*
window.addEventListener("load", () => {
    loader.className += " hidden";
})
 */

const getPokemons = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
  const pokemons = data.results.map((data, index) => ({
    name: data.name,
    id: index + 1 + pokemonID,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1 + pokemonID}.png`,
  }))
    
  console.log(pokemons);
  displayPokemon(pokemons);
};
nextPageBtn.addEventListener("click", () => {
  if (currentPage === null) {
    return;
  } else {
    currentPage++;
    offset = currentPage * limit;
    pokemonID = offset;
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    getPokemons(url);
    pokedex.innerHTML = "";
    nextPageBtn.setAttribute('disabled', 'disabled');
    setTimeout(() => { nextPageBtn.removeAttribute('disabled')}, 1000);
}
});

prevPageBtn.addEventListener("click", () => {
  if (currentPage === 0) {
    return;
  } else {
    currentPage--;
    offset = currentPage * limit;
    pokemonID = offset;
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    getPokemons(url);
    pokedex.innerHTML = "";
    prevPageBtn.setAttribute('disabled', 'disabled');
    setTimeout(() => { prevPageBtn.removeAttribute('disabled')}, 1000);
  }
});
 
let pagination = (e) => {
  if (e.keyCode == 13) {
    const perPage = e.target.value;
    if (perPage === "") {
      alert("You need to type something!");
    } else {
      limit = perPage;
      currentPage = 0;
      offset = currentPage * limit;
      pokemonID = offset;
      let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
      pokedex.innerHTML = "";
      getPokemons(url);
    }
  }
};
 
perPage.addEventListener("keyup", (e) => pagination(e));
 
searchBar.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    const searchString = e.target.value.toLowerCase();
    if (searchString === "") {
      alert("You need to type something!");
    } else {
      let url = `https://pokeapi.co/api/v2/pokemon/${searchString}`;
      singlePokemon(url).catch((error) => {
        if (error) {
          alert("Pokemon doesn't exist");
        }
      });
    }
  }
});
 
const singlePokemon = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const pokemon = {
    id: data.id,
    name: data.name,
  };
  displaySinglePokemon(pokemon);
};
 
const displaySinglePokemon = (pokemon) => {
  pokedex.innerHTML = "";
  const cards = `<li class="card" onclick="selectPokemon(${pokemon.id})">
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <img class="card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
                </li>`;
  pokedex.innerHTML += cards;
};
 

 
const displayPokemon = (pokemons) => {
  const cards = pokemons.map (pokemon =>
    ` <li class="card" onclick="selectPokemon(${pokemon.id})">
      <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
      <img class="card-image" src="${pokemon.image}"/>
      </li>`
    )
  pokedex.innerHTML += cards;
};
 
const selectPokemon = async (id) => {
  const urlStats = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const responseStats = await fetch(urlStats);
  const dataStats = await responseStats.json();
  showStats(dataStats);
};
 
const showStats = (pokemon) => {
  const stats = {
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    type: pokemon.types.map((type) => type.type.name).join(", "),
    hp: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    id: pokemon.id,
  };
  statsWindow(stats);
};
 
const statsWindow = (stats) => {
  const statsHTML = `
    <div class="statsWindow">
        <div class="statCard">
            <img class="card-image" loading="lazy" src="https://pokeres.bastionbot.org/images/pokemon/${stats.id}.png"/>
            <h2 class="card-title">${stats.name}</h2>
            <p>Type: ${stats.type} | Height: ${stats.height} | Weight: ${stats.weight}</p>
            <p>HP: ${stats.hp} | ATTACK: ${stats.attack} | DEFENSE: ${stats.defense}</p>
        </div>
        <button id="closeBtn" onclick="closeStatsWindow()">Close</button>

    </div>`;
  statsDiv.innerHTML = statsHTML;
};
 
const closeStatsWindow = () => {
  const statsWindow = document.querySelector(".statsWindow");
  statsWindow.parentElement.removeChild(statsWindow);
};
 

getPokemons(url);
