//Consigo los datos del html
const searchBtn = document.getElementById('searchBtn');
const pokemonInput = document.getElementById('pokemonInput');
const pokemonContainer = document.getElementById('pokemonContainer');

//consigo la base de datos de pokemones
async function fetchPokemon(query) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase().trim()}`);
        return response.data;
    } catch {
        throw new Error('Pokémon no encontrado');
    }
}
//Renderizo al pokemon con todos sus datos
function renderPokemon(pokemon) {
    const { name, id, sprites, types } = pokemon;
    //Pongo directo el html aca para que sea modular
    pokemonContainer.innerHTML = `
    <img src="${sprites.front_default}" alt="${name}" />
    <h2>${name} <span>#${id}</span></h2>
    <div class="types">
        ${types.map(t => `<span class="type">${t.type.name}</span>`).join('')}
    </div>
    `;
}
//cuanto pulso buscar hago comprobacion y luego llamo a fetch y render
searchBtn.addEventListener('click', async () => {
    const query = pokemonInput.value;
    if (!query) return;
    pokemonContainer.innerHTML = 'Buscando...';
    try {
        const pokemon = await fetchPokemon(query);
        renderPokemon(pokemon);
    //manejo de errores
    } catch (err) {
    pokemonContainer.innerHTML = `<p>${err.message}</p>`;
    }
});
//Tambien se puede buscar con enter
pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchBtn.click();
    }
});
