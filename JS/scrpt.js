const pokemonImagem = document.querySelector(".pokemon-imagem");
const pokemonNome = document.querySelector(".pokemon-nome");
const pokemonNumero = document.querySelector(".pokemon-numero");

const form = document.querySelector("form");
const input = document.querySelector("input");

const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
	const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	if (APIResponse.status === 200) {
		const data = await APIResponse.json();
		return data;
	} else {
		return null;
	}
};

const renderPokemon = async (pokemon) => {
	pokemonNome.innerHTML = "Loading...";
	pokemonNumero.innerHTML = "";

	const data = await fetchPokemon(pokemon);

	if (data) {
		pokemonNome.innerHTML = data.name;
		pokemonNumero.innerHTML = `${data.id} -`;

		pokemonImagem.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
		input.value = "";
		searchPokemon = data.id;

		input.value = "";
	} else {
		pokemonImagem.src = "./imagens/pokedex-fechada.png";
		pokemonNome.innerHTML = "Not Found";
		pokemonNumero.innerHTML = "";
	}
};

form.addEventListener("submit", (event) => {
	event.preventDefault();
	renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
	if (searchPokemon > 1) {
		searchPokemon -= 1;
		renderPokemon(searchPokemon);
	}
});
buttonNext.addEventListener("click", () => {
	searchPokemon += 1;
	renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
