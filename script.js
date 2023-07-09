//Se crea una constante poke_container que hace referencia al elemento HTML con el id "poke-container".
const poke_container = document.getElementById('poke-container');
//Se define la cantidad de Pokémon que se obtendrán, en este caso, se establece en 600.
const pokemon_count = 600;
//Se crea un objeto colors que asocia cada tipo de Pokémon con un color específico.
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};
//Se crea un array main_types que contiene los nombres de los tipos de Pokémon.
const main_types = Object.keys(colors);
//Se declara una función fetchPokemons que utiliza el bucle for para iterar desde 1 hasta la cantidad de Pokémon especificada.
//Dentro del bucle, se llama a la función getPokemon para obtener la información de cada Pokémon.
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};
//Se declara una función getPokemon que recibe un ID como argumento.
const getPokemon = async (id) => {
	//Se construye la URL de la API utilizando el ID proporcionado.
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	//Se utiliza fetch para realizar una solicitud HTTP a la URL y se espera la respuesta utilizando await.
	const res = await fetch(url);
	//Se convierte la respuesta en formato JSON utilizando el método json().
	const data = await res.json();
	//Se llama a la función createPokemonCard pasando los datos del Pokémon obtenidos como argumento.
	createPokemonCard(data);
};
// Se declara una función createPokemonCard que recibe un objeto pokemon como argumento.








const createPokemonCard = (pokemon) => {
	//Se crea un elemento <div> utilizando document.createElement() y se le añade la clase "pokemon".
	const pokemonElement = document.createElement('div');
	pokemonElement.classList.add('pokemon');
	//Se extraen los tipos de Pokémon del objeto pokemon y se almacenan en el array pokemonTypes.
	const pokemonTypes = pokemon.types.map((type) => type.type.name);
	//Se busca el tipo principal del Pokémon utilizando main_types.find() y comparando los tipos con pokemonTypes.
	const type = main_types.find((type) => pokemonTypes.indexOf(type) > -1);
	//Se obtiene el color correspondiente al tipo encontrado.
	const color = colors[type];
	//Se establece el color de fondo del elemento pokemonElement utilizando style.backgroundColor.
	pokemonElement.style.backgroundColor = color;
	// otra parte donde se pueden sacar las imagenes <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
	const pokemonHTML = `
    <div class="img-container">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="${pokemon.name}">
    </div>
    <div class="info">
      <span class="number">${pokemon.id.toString().padStart(3, '0')}</span>
      <h3 class="name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <small class="type">Type: <span>${type}</span></small>
    </div>
  `;
  //Se establece el contenido HTML del elemento pokemonElement utilizando innerHTML.
  pokemonElement.innerHTML = pokemonHTML;
  //Se añade el elemento pokemonElement como hijo del contenedor poke_container utilizando appendChild().
  poke_container.appendChild(pokemonElement);
};
//Finalmente, se llama a la función fetchPokemons para comenzar a obtener los datos de los Pokémon y crear las tarjetas correspondientes en el contenedor.
fetchPokemons();