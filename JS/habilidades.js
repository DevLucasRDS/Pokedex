const pokemonImagem = document.querySelector(".pokemon-imagem");
const pokemonNome = document.querySelector(".pokemon-nome");
const pokemonNumero = document.querySelector(".pokemon-numero");

const form = document.querySelector("form");
const input = document.querySelector("input");

const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const buttonPrevGen = document.querySelector(".btn-prevgen");
const buttonNextGen = document.querySelector(".btn-nextgen");
const buttonShiny = document.querySelector(".btn-shiny");

let searchPokemon = 1;
let currentGen = 5;
let shinyMode = false;

const generationPaths = {
	1: ["generation-i", "red-blue"],
	2: ["generation-ii", "crystal"],
	3: ["generation-iii", "emerald"],
	4: ["generation-iv", "platinum"],
	5: ["generation-v", "black-white", "animated", "front_default"],
	6: ["generation-vi", "x-y"],
	7: ["generation-vii", "ultra-sun-ultra-moon"],
	8: ["generation-viii", "icons"],
};

const fetchPokemon = async (pokemon) => {
	const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	if (APIResponse.status === 200) {
		return await APIResponse.json();
	}
	return null;
};

const renderPokemon = async (pokemon) => {
	pokemonNome.innerHTML = "Loading...";
	pokemonNumero.innerHTML = "";

	const data = await fetchPokemon(pokemon);

	if (data) {
		pokemonNome.innerHTML = data.name;
		pokemonNumero.innerHTML = `${data.id} -`;
		searchPokemon = data.id;

		const [genFolder, gameFolder] = generationPaths[currentGen] || [
			"generation-v",
			"black-white",
			"animated",
			"front_default",
		];

		let sprite = data.sprites.versions[genFolder]?.[gameFolder];
		let imgPath = null;

		if (shinyMode) {
			imgPath = sprite?.front_shiny || data.sprites.front_shiny;
		} else {
			imgPath = sprite?.front_default || data.sprites.front_default;
		}

		pokemonImagem.src = imgPath || "./imagens/notFound.png";

		input.value = "";
	} else {
		pokemonImagem.src = "./imagens/notFound.png";
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
		searchPokemon--;
		renderPokemon(searchPokemon);
	}
});

buttonNext.addEventListener("click", () => {
	searchPokemon++;
	renderPokemon(searchPokemon);
});

buttonPrevGen.addEventListener("click", () => {
	if (currentGen > 1) {
		currentGen--;
		renderPokemon(searchPokemon);
	}
});

buttonNextGen.addEventListener("click", () => {
	if (currentGen < 8) {
		currentGen++;
		renderPokemon(searchPokemon);
	}
});

buttonShiny.addEventListener("click", () => {
	shinyMode = !shinyMode;
	renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
