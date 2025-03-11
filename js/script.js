function home(){
    window.location.href = "home.html"
}


function input_appear() {
    // let bottom_bar_input = document.querySelector("#bottom_bar_input")
    
    // if (bottom_bar_input.classList.contains("show")) {
    //     bottom_bar_input.classList.remove("show")
    // } else {
    //     bottom_bar_input.classList.add("show")
    // }
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

function make_pokemon_sticker(url_pokemon) {  //TODO voir comment je peux faire pour qu'il prenne le temps de charger et les avoir dans l'ordre
    fetch(url_pokemon)        
        .then((res) => res.json())
        .then(async (data) => {
            const sprites = data.sprites; //pour acceder l'image
            const forms = data.forms; //pour acceder au nom
            const species = data.species; //pour trouver la couleur correspondant au pokemon
            url_species = species.url
            const div = document.querySelector('#list_151_first')
            
            let pokemon_sticker_div = document.createElement("div")
            pokemon_sticker_div.id = "id_div_sticker"
            let color = await div_background_color(url_species)
        
            pokemon_sticker_div.className = `pixel-corners_10`


            let pokemon_sticker_img = document.createElement("img") //creation emplacement
            let pokemon_sticker_name = document.createElement("span")
            let pokemon_sticker_id = document.createElement("span") 
            let pokemon_sticker_types_div = document.createElement("div") 

            pokemon_sticker_name.id = "sticker_span_name"
            pokemon_sticker_id.id = "sticker_span_id"


            //chercher données
            pokemon_sticker_img.src = sprites.front_default    
            pokemon_sticker_name.textContent = forms[0].name
            pokemon_sticker_id.textContent = `n°${data.id}`
            //chercher données

            
            let pokemon_sticker_id_to_export = data.id            //"Voir plus" button
            pokemon_sticker_div.addEventListener("click", function(){
                window.location.href = "detailled_card.html"
                localStorage.setItem('pokemon_sticker_id', pokemon_sticker_id_to_export); 
            })


            const list_types = data.types
            for (let i = 0; i < list_types.length; i++) {     //Crée un span pour les types du pokemon
                let pokemon_sticker_type = document.createElement("span") 
                pokemon_sticker_type.textContent = list_types[i].type.name
                pokemon_sticker_types_div.appendChild(pokemon_sticker_type)
            }



            pokemon_sticker_div.appendChild(pokemon_sticker_id)
            pokemon_sticker_div.appendChild(pokemon_sticker_img)  //ajouter dans emplacement
            pokemon_sticker_div.appendChild(pokemon_sticker_name)
            pokemon_sticker_div.appendChild(pokemon_sticker_types_div)



            div.appendChild(pokemon_sticker_div)
        }
    );
}

async function div_background_color(url){
    const data = await fetch(url)        
    const color = await data.json()
    return color.color.name
}

function add_to_fav(){

}

search_151_pokemon()