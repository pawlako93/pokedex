const pokedex = document.getElementById("pokedex");

let offset = 0;
let limit = 10;

const getPokemons = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    const pokemon = data.results.map((result, index) => ({
        name: result.name,
        id: index + offset + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + offset + 1}.png`,
        url: result.url,
        next: data.next,
        previous: result.previous,
    }));
    displayPokemon(pokemon);

};

const displayPokemon = pokemons => {
    const cards = pokemons
        .map(pokemon =>
            `<li class="card" onclick="selectPokemon(${pokemon.id})">
                <img class="card-image" src="${pokemon.image}"/>
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
            </li>`
        ).join("");
    pokedex.innerHTML = cards;
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
    }

    console.log(stats);
    statsWindow(stats)
}

const statsWindow = stats => {
    const statsHTML = `
    <div class="statsWindow">
        <button id="closeBtn" onclick="closeStatsWindow()">Close</button>
        <div class="card">
            <h2 class="card-title">${stats.name}</h2>
            <p><small>Type: ${stats.type} | Height:</small> ${stats.height} | Weight: ${stats.weight}</p>
            <p><small>HP: ${stats.hp}| ATTACK: ${stats.attack} | DEFENSE: ${stats.defense}</p>
        </div>
    </div>`;
    pokedex.innerHTML = statsHTML + pokedex.innerHTML;
};

const closeStatsWindow = () => {
    const statsWindow = document.querySelector(".statsWindow");
    statsWindow.parentElement.removeChild(statsWindow);
};

getPokemons();