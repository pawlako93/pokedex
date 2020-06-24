const pokedex = document.getElementById("pokedex");
const buttons = document.getElementById("buttons");
const nextPage = document.getElementById("nextPage");
const previousPage = document.getElementById("previousPage");
const perPage = document.getElementById("perPage");
const statsDiv = document.getElementById("stats");



const elements5 = document.getElementById("elements5");
elements5.addEventListener('click', ()=>{ let url='https://pokeapi.co/api/v2/pokemon?offset=0&limit=5'; getPokemons(url); pokedex.innerHTML = '';});

const elements10 = document.getElementById("elements10");
elements10.addEventListener('click', ()=>{ let url='https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'; getPokemons(url); pokedex.innerHTML = '';});

const elements15 = document.getElementById("elements15");
elements15.addEventListener('click', ()=>{ let url='https://pokeapi.co/api/v2/pokemon?offset=0&limit=15'; getPokemons(url); pokedex.innerHTML = '';});

const elements20 = document.getElementById("elements20");
elements20.addEventListener('click', ()=>{ let url='https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'; getPokemons(url); pokedex.innerHTML = '';});



nextPage.addEventListener('click', () => {
    if (nextUrl === null){
        return
    } else {
    getPokemons(nextUrl);
    pokedex.innerHTML = ''
    }
})
previousPage.addEventListener('click', () => {
    if (prevUrl === null){
        return
    } else {
        getPokemons(prevUrl);
        pokedex.innerHTML = ''
    }
    

});

let offset = 0;
let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
let urlPokemon = null;
let nextUrl = null;
let prevUrl = null;


const getPokemons = async (url) => {
    const fetchPokemonData = async (pokemon) => {
        let url = pokemon.url;
        const response = await fetch(url)
        const data = await response.json();
        const pokemons = {
        id: data.id,
        name: data.name,
    }
    displayPokemon(pokemons);
    }

    const response = await fetch(url);
    const data = await response.json();
    const pokemonsData = data.results.forEach((pokemon) => {
        fetchPokemonData(pokemon);
    });
    nextUrl = data.next;
    prevUrl = data.previous;
    
}

const displayPokemon = pokemons => {    
    const cards = 
        `<li class="card" onclick="selectPokemon(${pokemons.id})">
            <h2 class="card-title">${pokemons.id}. ${pokemons.name}</h2>
            <img class="card-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemons.id}.png"/>
        </li>`;
    pokedex.innerHTML += cards;
}

const selectPokemon = async (id) => {
    const urlStats = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const responseStats = await fetch(urlStats);
    const dataStats = await responseStats.json();
    showStats(dataStats);
}

const showStats = pokemon => {
    const stats = {
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        type: pokemon.types.map(type => type.type.name).join(", "),
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        id: pokemon.id,
    }
    statsWindow(stats)
};

const statsWindow = stats => {
    const statsHTML = `
    <div class="statsWindow">
        <button id="closeBtn" onclick="closeStatsWindow()">Close</button>
        <div class="statCard">
            <img class="card-image" src="https://pokeres.bastionbot.org/images/pokemon/${stats.id}.png"/>
            <h2 class="card-title">${stats.name}</h2>
            <p><small>Type: ${stats.type} | Height:</small> ${stats.height} | Weight: ${stats.weight}</p>
            <p><small>HP: ${stats.hp} | ATTACK: ${stats.attack} | DEFENSE: ${stats.defense}</p>
        </div>
    </div>`;
    statsDiv.innerHTML = statsHTML;
};

const closeStatsWindow = () => {
    const statsWindow = document.querySelector(".statsWindow");
    statsWindow.parentElement.removeChild(statsWindow);
};

getPokemons(url);