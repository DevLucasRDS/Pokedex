const btnCarregar = document.querySelector("#btn-carregar");
let pagina = 0; // Página atual da lista

// Função para buscar Pokémon
const fetchPokemon = async (pokemon) => {
	const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	if (APIResponse.status === 200) return await APIResponse.json();
	return null;
};

// carrega a lista de Pokémon
async function listarPokemonsPorPagina() {
	const listaContainer = document.createElement("ul");
	listaContainer.classList.add("lista-pokemons");

	const inicio = pagina * 20 + 1;
	const fim = inicio + 19;

	for (let i = inicio; i <= fim; i++) {
		const data = await fetchPokemon(i);
		if (data) {
			const item = document.createElement("li");
			item.innerHTML = `<img src="${data.sprites.front_default}" alt="${data.name}" style="width:48px;vertical-align:middle;"><br>${data.id} - ${data.name}`;
			listaContainer.appendChild(item);
		}
	}

	const oldList = document.querySelector(".lista-pokemons");
	if (oldList) oldList.remove();

	document.querySelector("main").appendChild(listaContainer);
	pagina++;
}

// Eventos
btnCarregar.addEventListener("click", listarPokemonsPorPagina);
