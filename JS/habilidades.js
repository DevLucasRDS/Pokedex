const pokemonImagem = document.querySelector(".pokemon-imagem");
const pokemonNome = document.querySelector(".pokemon-nome");
const pokemonNumero = document.querySelector(".pokemon-numero");

const form = document.querySelector("form");
const input = document.querySelector("input");

// Botões
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const buttonPrevGen = document.querySelector(".btn-prevgen");
const buttonNextGen = document.querySelector(".btn-nextgen");
const buttonShiny = document.querySelector(".btn-shiny");

// Container da direita
const rightContainer = document.querySelector(".right");

let searchPokemon = 1;
let currentGen = 5;
let shinyMode = false;

// Mapeamento das gerações dos sprites
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

// Busca os dados do Pokémon na API
const fetchPokemon = async (pokemon) => {
	const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	if (APIResponse.status === 200) {
		return await APIResponse.json();
	}
	return null;
};

// Renderiza o Pokémon na tela
const renderPokemon = async (pokemon) => {
	pokemonNome.innerHTML = "Loading...";
	pokemonNumero.innerHTML = "";
	rightContainer.innerHTML = "";

	const data = await fetchPokemon(pokemon);

	if (!data) {
		pokemonImagem.src = "./imagens/notFound.png";
		pokemonNome.innerHTML = "Not Found";
		pokemonNumero.innerHTML = "";
		rightContainer.innerHTML = "";
		return;
	}

	// Atualiza informações do Pokémon
	pokemonNome.innerHTML = data.name;
	pokemonNumero.innerHTML = `${data.id} -`;
	searchPokemon = data.id;

	// Seleciona sprite da geração atual
	const [genFolder, gameFolder] = generationPaths[currentGen] || [
		"generation-v",
		"black-white",
		"animated",
		"front_default",
	];

	const sprite = data.sprites.versions[genFolder]?.[gameFolder];
	const imgPath = shinyMode
		? sprite?.front_shiny || data.sprites.front_shiny
		: sprite?.front_default || data.sprites.front_default;

	pokemonImagem.src = imgPath || "./imagens/notFound.png";
	input.value = "";

	// Cria e exibe lista de abilities
	const title = document.createElement("h2");
	title.textContent = "Abilities";
	title.style.marginBottom = "10px";

	const list = document.createElement("ul");
	list.style.listStyle = "none";
	list.style.padding = "0";

	data.abilities.forEach((ab) => {
		const li = document.createElement("li");
		li.textContent = ab.ability.name + (ab.is_hidden ? " (Hidden)" : "");
		list.appendChild(li);
	});

	rightContainer.appendChild(title);
	rightContainer.appendChild(list);
};

// Eventos dos formulários e botões
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

// Carrega o Pokémon inicial
renderPokemon(searchPokemon);
