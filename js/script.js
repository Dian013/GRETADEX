function input_appear() {
    let bottom_bar_input = document.querySelector("#bottom_bar_input");
    
    if (bottom_bar_input.classList.contains("show")) {
        bottom_bar_input.classList.remove("show");
    } else {
        bottom_bar_input.classList.add("show");
    }
}

function filter_pokemon() {
    let filter_button = document.querySelector("#filter_button");

    console.log("button clicked")

    if (filter_button.textContent.trim() === 'red') {
        filter_button.textContent = 'green';
    } else {
        filter_button.textContent = 'red';
    }
}

fetch("https://pokeapi.co/api/v2/pokemon?limit=151=0")
    .then((res) => res.json())
    .then((data) => {
        const results_list = data.results;

        for (let i = 0; i < results_list.length; i++) {

            let url_pokemon = results_list[i].url;

            search_pokemon_sticker(url_pokemon)
        }

        setTimeout(function(){
            const div = document.querySelector('#list_151_first')
            let footer = document.createElement("div");  //permet d'avoir tout les éléments dans le "screen", sans ça une partie sera caché
            footer.style.height = "130px"
            footer.textContent = "Tu n'es pas censé voir ceci"
            div.appendChild(footer);
        }, 1000);  //set time parce que sinon la case et charger avant les pokemon
    }
);

function search_pokemon_sticker(url_pokemon) {
    fetch(url_pokemon)        
        .then((res) => res.json())
        .then((data) => {
            const sprites = data.sprites;
            const div = document.querySelector('#list_151_first')

            let pokemon_sticker = document.createElement("img");

            pokemon_sticker.src = sprites.front_default

            div.appendChild(pokemon_sticker);
        }
    );
}
