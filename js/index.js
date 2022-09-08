

// ==== function for load api ======= 
const loadDrinks = async (firstletter) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstletter ? firstletter : 'r'}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDrinks(data);
}





//  ================== function for display image on web site ======== 
const displayDrinks = (data) => {
    const drinks = data.drinks;   // getting into drinks array in API
    console.log(data);
    const drinksContainer = document.getElementById("drinks-container")
    drinksContainer.innerHTML =''

    drinks.forEach(drink => {
        
        const column = document.createElement('div')
        column.classList.add("col")         
        column.innerHTML = `<div class="card" >
        <img src="${drink.strDrinkThumb}" onclick="loadInstruction(${drink.idDrink})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      </div>`

      drinksContainer.appendChild(column)    
    });

}





// ===========  function for displaying details === 
const displayInstruction = (data)=>{
    const drink = data.drinks[0]
    
    const insContainer = document.getElementById('modal-container')

    insContainer.innerHTML= `
    <div class="drink-modal">
        
    <h1 class="text-center">${drink.strDrink}</h1>
    <img src="${drink.strDrinkThumb}" alt="" class="modal-image-unique">
    <p class="ins">${drink.strInstructions}</p>

    </div>

    `

}





// ============ function for load data from id by clicking on photo ====== 

const loadInstruction = async(idDrink)=>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
    const res = await fetch(url)
    const data = await res.json()
    displayInstruction(data); //calling function for displaying details
}





// ============= search by search button and input ===== 
document.getElementById("search-btn").addEventListener("click", ()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    
    
    if(searchText === ""){
        alert("please input a name or first letter");
    }

    
    if(searchText.length <=1){
        loadDrinks(searchText);
        console.log(searchText);
    }else{
        const searchLetter = searchText.slice(0,1);
        loadDrinks(searchLetter);
        console.log(searchLetter);
    }


    loadDrinks(searchText)
    searchField.value = ''
    
})


loadDrinks('r');
















