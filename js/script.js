function home(){
    window.location.href = "home.html"
}

function input_appear() {
    const searchContainer = document.querySelector('.search-container');
    searchContainer.classList.toggle('active');

    search()
}

function search(){
    let input = document.querySelector("#bottom_bar_input")
    const div = document.querySelector("#list_151_first");
    input.addEventListener("input", () => {
    })
}

function filter_pokemon() {
    let filter_button = document.querySelector("#filter_button");
    let filter_container = document.querySelector("#filter_container");

    // Supprime l'ancien select s'il existe
    let existingSelect = document.querySelector("#filter_select");
    if (existingSelect) {
        existingSelect.remove();
    }

    let select = document.createElement("select");
    select.id = "filter_select";
    
    if (filter_button.textContent.trim() === 'Types') {
        filter_button.textContent = 'Région';
        filter_button.style.backgroundColor = '#27DEF2';

        let types = ["Normal", "Feu", "Eau", "Plante", "Électrik", "Glace", "Combat", "Poison", "Sol", "Vol",
                     "Psy", "Insecte", "Roche", "Spectre", "Dragon", "Ténèbres", "Acier", "Fée"];

        types.forEach(type => {
            let option = document.createElement("option");
            option.value = type.toLowerCase();
            option.textContent = type;
            select.appendChild(option);
        });

    } else {
        filter_button.textContent = 'Types';
        filter_button.style.backgroundColor = '#5EBF76';

        let regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unys", "Kalos", "Alola", "Galar", "Paldea"];

        regions.forEach(region => {
            let option = document.createElement("option");
            option.value = region.toLowerCase();
            option.textContent = region;
            select.appendChild(option);
        });
    }

    // Ajoute le select au conteneur prévu
    filter_container.appendChild(select);
}


async function load_pokemons() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=125&offset=0");
        const data = await res.json();

        const stickersArray = new Array(data.results.length); // Stockage ordonné

        data.results.forEach((pokemon, index) => {
            make_pokemon_sticker(pokemon.url, index, stickersArray);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des Pokémon :", error);
    }
}

let allStickers = [];
async function make_pokemon_sticker(url_pokemon, index) {
    try {
        const res = await fetch(url_pokemon);
        const data = await res.json();

        const pokemon_sticker_div = document.createElement("div");
        pokemon_sticker_div.className = "pixel-corners_10";
        pokemon_sticker_div.id = "id_div_sticker";
        pokemon_sticker_div.dataset.name = data.name.toLowerCase(); // Stocker le nom pour la recherche

        // Image
        const img = document.createElement("img");
        img.src = data.sprites.front_default;
        img.alt = data.name;
        img.id = "sticker_span_img";


        // ID du Pokémon
        const id = document.createElement("span");
        id.textContent = `n°${data.id}`;
        id.id = "sticker_span_id";

        // Nom
        const name = document.createElement("span");
        name.textContent = data.forms[0].name;
        name.id = "sticker_span_name";
        const color = await div_background_color(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
        name.style.borderBottom = `5px solid ${color}`;

        // Types
        const typesDiv = document.createElement("div");
        data.types.forEach(async t => {
            const typeSpan = document.createElement("span");
            typeSpan.textContent = t.type.name;
            typeSpan.id = "sticker_span_type";
            typeSpan.textContent = typeSpan.textContent.charAt(0).toUpperCase() + typeSpan.textContent.slice(1).toLowerCase();
                // Assigner une couleur à chaque type via switch case
            let types_color = typesColor(t.type.name)

            typeSpan.style.backgroundColor = types_color;
            typesDiv.appendChild(typeSpan);
        });

        const name_and_typesDiv = document.createElement("div")
        name_and_typesDiv.append(name, typesDiv);
        name_and_typesDiv.id = "sticker_div_name_and_types"

        // Ajout au div principal
        pokemon_sticker_div.append(id, img, name_and_typesDiv);

        // Gestion du clic
        pokemon_sticker_div.addEventListener("click", () => {
            localStorage.setItem('pokemon_sticker_id', data.id);
            window.location.href = "detailled_card.html";
        });

        // Stocker le sticker dans le tableau
        allStickers[index] = pokemon_sticker_div;

        // Vérifier si tous les stickers sont chargés avant d'afficher
        if (!allStickers.includes(undefined)) {
            displayResults(allStickers);
        }
    } catch (error) {
        console.error("Erreur lors de la création du sticker :", error);
    }
}

function displayResults(stickers) {
    const div = document.querySelector("#list_151_first");
    div.innerHTML = ""; 
    stickers.forEach(sticker => div.appendChild(sticker));
}

function typesColor(name){
    switch (name) {
        case "fire":
            types_color = "#F08030"; // Exemple couleur pour Fire
            break;
        case "water":
            types_color = "#6890F0"; // Exemple couleur pour Water
            break;
        case "grass":
            types_color = "#78C850"; // Exemple couleur pour Grass
            break;
        case "electric":
            types_color = "#F8D030"; // Exemple couleur pour Electric
            break;
        case "bug":
            types_color = "#A8B820"; // Exemple couleur pour Bug
            break;
        case "normal":
            types_color = "#A8A878"; // Exemple couleur pour Normal
            break;
        case "poison":
            types_color = "#A040A0"; // Exemple couleur pour Poison
            break;
        case "ground":
            types_color = "#E0C068"; // Exemple couleur pour Ground
            break;
        case "fairy":
            types_color = "#EE99AC"; // Exemple couleur pour Fairy
            break;
        case "fighting":
            types_color = "#C03028"; // Exemple couleur pour Fighting
            break;
        case "psychic":
            types_color = "#F85888"; // Exemple couleur pour Psychic
            break;
        case "rock":
            types_color = "#B8A038"; // Exemple couleur pour Rock
            break;
        case "ghost":
            types_color = "#705898"; // Exemple couleur pour Ghost
            break;
        case "dragon":
            types_color = "#7038F8"; // Exemple couleur pour Dragon
            break;
        case "dark":
            types_color = "#705848"; // Exemple couleur pour Dark
            break;
        case "steel":
            types_color = "#B8B8D0"; // Exemple couleur pour Steel
            break;
        case "ice":
            types_color = "#98D8D8"; // Exemple couleur pour Ice
            break;
        case "flying":
            types_color = "#A890F0"; // Exemple couleur pour Flying
            break;
        default:
            types_color = "#D3D3D3"; // Couleur par défaut pour les types non définis
            break;
    }
    return types_color
}

const input = document.getElementById("bottom_bar_input");
input.style.color = "white";
input.addEventListener("input", function() {
    const searchTerm = input.value.toLowerCase();
    const filteredStickers = allStickers.filter(sticker =>
        sticker.dataset.name.startsWith(searchTerm) // Filtre par nom
    );
    displayResults(filteredStickers);
});

async function div_background_color(url){
    const data = await fetch(url)        
    const color = await data.json()
    return color.color.name
}

async function types_background_color(url){
    const data = await fetch(url)        
    const color = await data.json()
    return color.color.name
}

document.addEventListener("DOMContentLoaded", load_pokemons);