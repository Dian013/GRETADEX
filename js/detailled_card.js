async function search_pokemon_evolutions(){
    try {     //Trouve 3 evolutions
        const pokemon_sticker_id = localStorage.getItem("pokemon_sticker_id")

        const data_pokemon_species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_sticker_id}`)
        const element_evolution = await data_pokemon_species.json()  //aller sur le json pokemon species
        const evolution_chain_url = element_evolution.evolution_chain.url //chercher l'url des evolutions

        const data_evolution_chain = await fetch(`${evolution_chain_url}`) 
        const element_evolution_chain = await data_evolution_chain.json() //aller sur le json des evolution

        const evolution_1 = element_evolution_chain.chain.species.name
        const evolution_2 = element_evolution_chain.chain.evolves_to[0].species.name
        const evolution_3 = element_evolution_chain.chain.evolves_to[0].evolves_to[0].species.name


        let tab_evolution = [evolution_1, evolution_2, evolution_3]
        return tab_evolution

    } catch {
        try { //Trouve 2 evolutions
            const pokemon_sticker_id = localStorage.getItem("pokemon_sticker_id")
    
            const data_pokemon_species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_sticker_id}`)
            const element_evolution = await data_pokemon_species.json()  //aller sur le json pokemon species
            const evolution_chain_url = element_evolution.evolution_chain.url //chercher l'url des evolutions
    
            const data_evolution_chain = await fetch(`${evolution_chain_url}`) 
            const element_evolution_chain = await data_evolution_chain.json() //aller sur le json des evolution
    
            const evolution_1 = element_evolution_chain.chain.species.name
            const evolution_2 = element_evolution_chain.chain.evolves_to[0].species.name    
    
            let tab_evolution = [evolution_1, evolution_2]
            return tab_evolution

        }catch{
            try{ //Trouve pokemon seul
                const pokemon_sticker_id = localStorage.getItem("pokemon_sticker_id")
    
                const data_pokemon_species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_sticker_id}`)
                const element_evolution = await data_pokemon_species.json()  //aller sur le json pokemon species
                const evolution_chain_url = element_evolution.evolution_chain.url //chercher l'url des evolutions
        
                const data_evolution_chain = await fetch(`${evolution_chain_url}`) 
                const element_evolution_chain = await data_evolution_chain.json() //aller sur le json des evolution
        
                const evolution_1 = element_evolution_chain.chain.species.name 
        
                let tab_evolution = [evolution_1]
                return tab_evolution
            }catch{
                console.log("Error search evolution")
            }
        }
    }
}

function update_evolutions(){
    search_pokemon_evolutions().then(async res => {
        tab_evolution = res

        console.log(tab_evolution)

        for (let i = 0; i < tab_evolution.length; i++) {

            const data_evolution_card = await fetch(`https://pokeapi.co/api/v2/pokemon/${tab_evolution[i]}`)  
            const element_evolution_card = await data_evolution_card.json()
                 
            evolution_gif = element_evolution_card.sprites.other.showdown.front_default

            const card_evolution = document.querySelector("#card_evolution")
            const card_evol_stade_img = document.createElement("img")
            card_evol_stade_img.src = evolution_gif
            card_evol_stade_img.id = "card_evol_stade_img"
            
            const card_evol_stade_div = document.createElement("div")
            card_evol_stade_div.id = "card_evol_stade_div"
            card_evol_stade_div.style.backgroundImage = "url(../img/pokeballliss.png)";
            

            
            card_evol_stade_div.appendChild(card_evol_stade_img)  
            card_evolution.appendChild(card_evol_stade_div)  
        }
    })    
}

let isFront = false; // Pour savoir si on affiche l'image de face ou de dos
let pokemonSprites = {}; // Stockage des images pour éviter plusieurs fetch()

async function detailled_card_function() {
    try {
        const pokemon_sticker_id = localStorage.getItem("pokemon_sticker_id");
        if (!pokemon_sticker_id) {
            console.error("Aucun ID de Pokémon trouvé !");
            return;
        }

        // Fetch des données du Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_sticker_id}`);
        const element = await response.json();

        // Récupération des images (utilisation de front_default et back_default)
        pokemonSprites.front = element.sprites.other["showdown"].front_default;
        pokemonSprites.back = element.sprites.other["showdown"].back_default; // Si pas de back, garder front

        // Mise à jour de l'image
        const card_img = document.querySelector("#card_img");
        card_img.src = pokemonSprites.front;

        const div_card_img = document.querySelector("#div_card_img");
        div_card_img.style.backgroundImage = "url(../img/pokeballliss.png)";

        // Mise à jour du nom
        document.querySelector("#card_name").textContent = element.forms[0].name;

        // Récupération des autres infos
        updateDescription(pokemon_sticker_id);
        updateProgressBar(element);
        update_evolutions();

    } catch (error) {
        console.error("Erreur lors du chargement des données du Pokémon :", error);
    }
}

async function updateProgressBar(element) {
    function setBarProperties(bar, value) {
        const filledPart = bar.querySelector("span");

        // Largeur en pixels (max 255px)
        filledPart.style.width = value + "px";

        // Supprimer les anciennes classes
        bar.classList.remove("low", "medium", "high");

        // Ajouter la bonne classe
        if (value <= 85) {
            bar.classList.add("low");
        } else if (value <= 110) {
            bar.classList.add("medium");
        } else {
            bar.classList.add("high");
        }
    }

    const progress_bars = [
        document.querySelector("#progress_bar_1"),
        document.querySelector("#progress_bar_2"),
        document.querySelector("#progress_bar_3"),
        document.querySelector("#progress_bar_4"),
        document.querySelector("#progress_bar_5"),
        document.querySelector("#progress_bar_6"),
    ];

    const maxStats = {
        hp: 255,
        attack: 190,
        defense: 250,
        "special-attack": 194,
        "special-defense": 250,
        speed: 200
    };

    progress_bars.forEach((bar, index) => {
        const stat = element.stats[index].stat.name;
        const statValue = element.stats[index].base_stat;
        const maxValue = maxStats[stat] || 255; // Fallback à 255 si la stat n'existe pas dans l'objet
    
        setBarProperties(bar, statValue, maxValue);
        document.querySelector(`#label_progress_bar_${index + 1}`).textContent =
            `${stat} ${statValue} / ${maxValue}`;
    });
}

async function updateDescription(pokemon_sticker_id) {
    try {
        const data_characteristic = await fetch(`https://pokeapi.co/api/v2/characteristic/${pokemon_sticker_id}`) 
        const element_characteristic = await data_characteristic.json() //aller sur le json des evolution

        const description = element_characteristic.descriptions[7].description

        const card_description = document.querySelector("#card_description")
        card_description.textContent = description
    } catch {
        const card_description = document.querySelector("#card_description")
        card_description.textContent = "it doesn't have a description, but all i know is that it's my favorite pokemon"
        card_description.style.textAlign= "center"
    }
}

function home(){
    window.location.href = "home.html"
}

function rotate(){
    const card_img = document.querySelector("#card_img");
    
    card_img.src = isFront ? pokemonSprites.front : pokemonSprites.back;
    isFront = !isFront;
}

detailled_card_function()