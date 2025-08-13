const form = document.querySelector("form");
const input = document.querySelector(".input_pesquisa");

const fetchPokemon = async (pokemon) => {
	const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	if (APIResponse.status === 200) {
		const data = await APIResponse.json();
		return data;
	} else {
		return null;
	}
};

async function listarPokemonsAte(numero) {
	const listaContainer = document.createElement("ul");
	listaContainer.style.marginTop = "20px";
	listaContainer.style.listStyle = "none";
	listaContainer.style.padding = "0";

	for (let i = 1; i <= numero; i++) {
		const data = await fetchPokemon(i);
		if (data) {
			const item = document.createElement("li");
			item.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${data.name}" style="width:48px;vertical-align:middle;">
            <br>
            ${data.id} - ${data.name}
         `;
			listaContainer.appendChild(item);
		}
	}

	const oldList = document.querySelector(".lista-pokemons");
	if (oldList) oldList.remove();

	listaContainer.classList.add("lista-pokemons");
	document.querySelector("main").appendChild(listaContainer);
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const valor = input.value.trim();
	if (!isNaN(valor) && valor > 1) {
		listarPokemonsAte(Number(valor));
	}
	input.value = "";
});
