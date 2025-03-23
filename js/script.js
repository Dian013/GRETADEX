function home(){
    window.location.href = "home.html"
}


function input_appear() {
    const searchContainer = document.querySelector('.search-container');
    searchContainer.classList.toggle('active');
}

function filter_pokemon() {
    let filter_button = document.querySelector("#filter_button")

    if (filter_button.textContent.trim() === 'Types') {
        filter_button.textContent = 'Région'
        filter_button.style.backgroundColor = '#27DEF2'
    } else {
        filter_button.textContent = 'Types'
        filter_button.style.backgroundColor = '#5EBF76'
    }
}

function search_151_pokemon(){
    fetch("https://pokeapi.co/api/v2/pokemon?limit=300=0")
        .then((res) => res.json())
        .then((data) => {
            const results_list = data.results

            for (let i = 0; i < results_list.length; i++) {

                let url_pokemon = results_list[i].url

                make_pokemon_sticker(url_pokemon)
            }
        }
    );
}

// Appel de la fonction avec l'URL de la liste des Pokémon
load_pokemons("https://pokeapi.co/api/v2/pokemon?limit=300");

async function load_pokemons(url_list) {
    const res = await fetch(url_list);
    const data = await res.json();

    const stickersArray = new Array(data.results.length); // Stockage ordonné

    data.results.forEach((pokemon, index) => {
        make_pokemon_sticker(pokemon.url, index, stickersArray);
    });
}

async function make_pokemon_sticker(url_pokemon, index, stickersArray) {
    const res = await fetch(url_pokemon);
    const data = await res.json();

    const div = document.querySelector("#list_151_first");

    const pokemon_sticker_div = document.createElement("div");
    pokemon_sticker_div.className = "pixel-corners_10";
    pokemon_sticker_div.id = "id_div_sticker";

    // Récupération de l'image, du nom et du type
    const img = document.createElement("img");
    img.src = data.sprites.front_default;
    img.id = "sticker_span_img";

    const id = document.createElement("span");
    id.textContent = `n°${data.id}`;
    id.id = "sticker_span_id";

    const name = document.createElement("span");
    name.textContent = data.forms[0].name;
    name.id = "sticker_span_name";
    const color = await div_background_color(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
    console.log(data.id)
    name.style.borderTop = `6px solid ${color}`;


    // Création du div pour les types
    const typesDiv = document.createElement("div");
    data.types.forEach(t => {
        const typeSpan = document.createElement("span");
        typeSpan.textContent = t.type.name;
        typesDiv.appendChild(typeSpan);
    });

    // Ajout au div principal
    pokemon_sticker_div.append(id, img, name, typesDiv);



    // Stocker l'ordre avant l'affichage
    stickersArray[index] = pokemon_sticker_div;

    // Si tous les stickers sont chargés, les afficher dans l'ordre
    if (!stickersArray.includes(undefined)) {
        stickersArray.forEach(sticker => div.appendChild(sticker));
    }



    let pokemon_sticker_id_to_export = data.id   
    pokemon_sticker_div.addEventListener("click", function(){
        window.location.href = "detailled_card.html"
        localStorage.setItem('pokemon_sticker_id', pokemon_sticker_id_to_export); 
    })
}


async function div_background_color(url){
    const data = await fetch(url)        
    const color = await data.json()
    return color.color.name
}
