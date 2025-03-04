function input_appear() {
    let bottom_bar_input = document.querySelector("#bottom_bar_input")

    if(bottom_bar_input.style.display == 'block') {
        bottom_bar_input.style.display = 'none';
    } else {
        bottom_bar_input.style.display  = 'block';
    }
 
}






fetch("https://pokeapi.co/api/v2/pokemon?limit=151=0")
    .then((res) => res.json())
    .then((data) => {
        const results_list = data.results;
        const div = document.querySelector('#list_151_first')

        for (let i = 0; i < results_list.length; i++) {

            let url_pokemon = results_list.url;

            // fetch(url_pokemon)              //chercher infos pokemon 1 par 1
            // .then((res) => res.json())
            // .then((data) => {
            //     const results = data.results;
            //     let pokemon_sticker = document.createElement("div");
            //     pokemon_sticker.textContent = results_list[i].abilities;
            // });

            let pokemon_sticker = document.createElement("div");
            pokemon_sticker.textContent = results_list[i].name;

            div.appendChild(pokemon_sticker);
        }
    });