const pokemonImagem = document.querySelector(".pokemon-imagem");
const pokemonNome = document.querySelector(".pokemon-nome");
const pokemonNumero = document.querySelector(".pokemon-numero");
const form = document.querySelector("form");
const input = document.querySelector("input");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;

// Busca dos dados do Pokémon da API
const fetchPokemon = async (pokemon) => {
	const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	if (APIResponse.status === 200) return await APIResponse.json();
	return null;
};

// Renderiza o Pokémon na tela
const renderPokemon = async (pokemon) => {
	pokemonNome.innerHTML = "Loading...";
	pokemonNumero.innerHTML = "";

	const data = await fetchPokemon(pokemon);

	if (data) {
		pokemonNome.innerHTML = data.name;
		pokemonNumero.innerHTML = `${data.id} -`;
		pokemonImagem.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
		searchPokemon = data.id;
		input.value = "";
	} else {
		pokemonImagem.src = "./imagens/notFound.png";
		pokemonNome.innerHTML = "Not Found";
		pokemonNumero.innerHTML = "";
	}
};

// Eventos
form.addEventListener("submit", (event) => {
	event.preventDefault();
	renderPokemon(input.value.toLowerCase());
});
buttonPrev.addEventListener("click", () => {
	if (searchPokemon > 1) {
		searchPokemon--;
		renderPokemon(searchPokemon);
	}
});
buttonNext.addEventListener("click", () => {
	searchPokemon++;
	renderPokemon(searchPokemon);
});

// Inicializa com o Pokémon 1
renderPokemon(searchPokemon);
