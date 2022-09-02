var pokedex = document.getElementById('pokedex');

console.log(pokedex);


function fetchPokemon() {
    
    var promises = [];
    for(let i = 1; i <= 150; i++) { 

        var url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(function(response) {
            return response.json();
        }))
    }

    Promise.all(promises).then(function(results) {
       const pokemon = results.map((data) => ({
           name: data.name,
           id: data.id,
           image: data.sprites['front_default'],
           type: data.types.map((type) => 
           type.type.name).join(", ")
       }));
      displayPokemon(pokemon); 
    });
};

var displayPokemon = function(pokemon) {
    console.log(pokemon);
    var pokemonHtmlString = pokemon.map ( pokeman => `
    <li class="card">
      <img class="card-image" src="${pokeman.image}"/>
      <h2 class="card-title"> ${pokeman.id}. ${pokeman.name}</h2>
      <p class="card-subtitle"> Type: ${pokeman.type}</p>

    </li>
    `
    ).join('');
    pokedex.innerHTML = pokemonHtmlString;
}

fetchPokemon();