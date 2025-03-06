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

function make_card_with_pokemon_evolutions(){
    search_pokemon_evolutions().then(async res => {
        tab_evolution = res

        console.log(tab_evolution)

        for (let i = 0; i < tab_evolution.length; i++) {

            const data_evolution_card = await fetch(`https://pokeapi.co/api/v2/pokemon/${tab_evolution[i]}`)  
            const element_evolution_card = await data_evolution_card.json()
                 
            evolution_gif = element_evolution_card.sprites.other.showdown.front_default

            const card_evolution = document.querySelector("#card_evolution")
            const card_evol_stade = document.createElement("img")

            card_evol_stade.src = evolution_gif
            
            card_evolution.appendChild(card_evol_stade)  
        }
    })    
}

async function detailled_card_function(){
//Chercher les infos
    const pokemon_sticker_id = localStorage.getItem("pokemon_sticker_id")
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_sticker_id}`)        
    const element = await data.json()

    const img = element.sprites.other['official-artwork'].front_default
    const name = element.forms[0].name

    //Chercher evolution
    make_card_with_pokemon_evolutions()
    //Chercher evolution

    //Chercher description
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
    //Chercher description
//Chercher les infos

//Intégrer infos à html
    const card_img = document.querySelector("#card_img")
    card_img.src = img

    const card_name = document.querySelector("#card_name")
    card_name.textContent = name



    //TODO faire une boucle
    const progress_bar_1 = document.querySelector("#progress_bar_1")
    progress_bar_1.value = element.stats[0].base_stat 
    const label_progress_bar_1 = document.querySelector("#label_progress_bar_1")
    label_progress_bar_1.textContent = element.stats[0].stat.name + ` ${element.stats[0].base_stat }%`

    const progress_bar_2 = document.querySelector("#progress_bar_2")
    progress_bar_2.value = element.stats[1].base_stat 
    const label_progress_bar_2 = document.querySelector("#label_progress_bar_2")
    label_progress_bar_2.textContent = element.stats[1].stat.name + ` ${element.stats[1].base_stat }%`

    const progress_bar_3 = document.querySelector("#progress_bar_3")
    progress_bar_3.value = element.stats[2].base_stat 
    const label_progress_bar_3 = document.querySelector("#label_progress_bar_3")
    label_progress_bar_3.textContent = element.stats[2].stat.name + ` ${element.stats[2].base_stat }%`

    const progress_bar_4 = document.querySelector("#progress_bar_4")
    progress_bar_4.value = element.stats[3].base_stat 
    const label_progress_bar_4 = document.querySelector("#label_progress_bar_4")
    label_progress_bar_4.textContent = element.stats[3].stat.name + ` ${element.stats[3].base_stat }%`

    const progress_bar_5 = document.querySelector("#progress_bar_5")
    progress_bar_5.value = element.stats[4].base_stat 
    const label_progress_bar_5 = document.querySelector("#label_progress_bar_5")
    label_progress_bar_5.textContent = element.stats[4].stat.name + ` ${element.stats[4].base_stat }%`

    const progress_bar_6 = document.querySelector("#progress_bar_6")
    progress_bar_6.value = element.stats[5].base_stat 
    const label_progress_bar_6 = document.querySelector("#label_progress_bar_6")
    label_progress_bar_6.textContent = element.stats[5].stat.name + ` ${element.stats[5].base_stat }%`

//Intégrer infos à html

}

function home(){
    window.location.href = "home.html"
}

detailled_card_function()