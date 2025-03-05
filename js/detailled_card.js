
async function detailled_card_function(){
    const pokemon_sticker_id = localStorage.getItem("pokemon_sticker_id");
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_sticker_id}`)        
    const element = await data.json()

    const img = element.sprites.other['official-artwork'].front_default
    const name = element.forms[0].name
    //stats
    //evolution https://pokeapi.co/api/v2/evolution-chain/1
    //description

    console.log(img)
}

function home(){
    window.location.href = "home.html"
}

detailled_card_function()