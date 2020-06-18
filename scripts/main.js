const pokemons = [];
const pokedex = document.getElementById("pokedex");



const getPokemons = async () => {

    for (let i = 1; i <= 150; i++) {
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        pokemons.push(data);
    }

    const pokemonsData = pokemons.map(data => ({
        name: data.name,
        id: data.id,
        image: data.sprites["front_default"],
        type: data.types.map(type => type.type.name).join(", "),
    }));

    displayPokemon(pokemonsData);

};

const displayPokemon = pokemon => {
    const cards = pokemon
      .map( pokeman =>
            `<ul class="card">
                <img class="card-image" src="${pokeman.image}"/>
                <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
                <p class="card-subtitle">Type: ${pokeman.type}</p>
            </ul>`
      ).join("");
    pokedex.innerHTML = cards;}

getPokemons();