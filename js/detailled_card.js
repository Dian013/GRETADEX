
async function detailled_card_function(){
//Chercher les infos
    const pokemon_sticker_id = localStorage.getItem("pokemon_sticker_id");
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_sticker_id}`)        
    const element = await data.json()

    const img = element.sprites.other['official-artwork'].front_default
    const name = element.forms[0].name
    const stats = element.stats[0].base_stat  //renvoie un nombre entre 0 et 100,   faire une boucle pour parcourir les 5

    //Chercher evolution
    const data_pokemon_species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_sticker_id}`)
    const element_evolution = await data_pokemon_species.json()  //aller sur le json pokemon species
    const evolution_chain_url = element_evolution.evolution_chain.url //chercher l'url des evolutions

    const data_evolution_chain = await fetch(`${evolution_chain_url}`) 
    const element_evolution_chain = await data_evolution_chain.json() //aller sur le json des evolution

    try {
        const evolution_1 = element_evolution_chain.chain.species.name
        console.log(evolution_1)
    } catch{
        console.log("Pas d'évolution disponible")
    }

    try {
        const evolution_2 = element_evolution_chain.chain.evolves_to[0].species.name
        console.log(evolution_2)
    } catch{
        console.log("Pas d'évolution disponible")
    }

    try {
        const evolution_3 = element_evolution_chain.chain.evolves_to[0].evolves_to[0].species.name
        console.log(evolution_3)
    } catch{
        console.log("Pas d'évolution disponible")
    }
    //Chercher evolution

    //Chercher description
    const data_characteristic = await fetch(`https://pokeapi.co/api/v2/characteristic/${pokemon_sticker_id}`) 
    const element_characteristic = await data_characteristic.json() //aller sur le json des evolution

    const description = element_characteristic.descriptions[7].description

    //Chercher description
//Chercher les infos

//Intégrer infos à html
    const card_img = document.querySelector("#card_img")
    card_img.src = img

    const card_name = document.querySelector("#card_name")
    card_name.textContent = name

    const card_description = document.querySelector("#card_description")
    card_description.textContent = description

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