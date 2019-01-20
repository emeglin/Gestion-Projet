// creation d'un tableau vierge afin de stocker les données json
// create an empty array to store json data
var listpromo = [];
//declaration des variable pour la creation de promo
//Create all variables for promotions
var newPromo = document.querySelector('#newPromo');
var createPromo = document.querySelector('#createPromo');
var modifyPromo = document.querySelector('#modifyPromo');
var deletePromo = document.querySelector('#deletePromo');
var mySelect = document.querySelector('#list');
var myDiv = document.querySelector("#myDiv");

function getPromotion() {
    // Récupérez la liste des promotions via un fetch et affichez la via un console.log

    // Get the promotion list thanks to fetch and display it with console.log

    fetch("http://api-students.popschool-lens.fr/api/promotions")
        // la reponse est envoyé par l'api puis recupérée en format json
        // the response is sent by the api then converted in json
        .then(response => response.json())
        // le json devient promo est renvoyé par la console via console log

        // json become promo and displayed by console
        .then(promo => {
            // la notation entre crochets m'a permi de selectionner uniquement la partie qui m'interesse

        
            console.log(promo);
            console.log(promo['hydra:member']);
            listpromo = promo['hydra:member'];
            myDiv.innerHTML = '';
            mySelect.innerHTML = '';
            listpromo.forEach(promotion => {
                myDiv.innerHTML += promotion.id + ". " + promotion.name + "<br>";
                // ici je veux rajouter la liste dans le menu deroulant 
                // here i add the list in my select menu        
                var myOption = document.createElement('option');
                myOption.innerHTML = promotion.name;
                myOption.value = promotion.id
                mySelect.appendChild(myOption);
            })
        })

}
getPromotion();

// creation d'un event listener pour le bouton
createPromo.addEventListener('click', createPromotion);

// La methode POST permettra de rajouter la nouvelle promotion a la liste deja pré-existante.
// POST method will allow to add a new promotion in the already existing list
function createPromotion() {
    fetch("http://api-students.popschool-lens.fr/api/promotions", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            // on transforme la valeur du champs input newPromo en chaine Json via stringify
            // we transform the newPromo input value in Json
            body: JSON.stringify({
                name: newPromo.value
            })
        })
        .then(response => response.json())
        .then(promo => {
            getPromotion();
            console.log(promo.name + " créé")
        })
}

deletePromo.addEventListener('click', function () {

    // Je demande confirmation à l'utilisateur avant suppression 
    // Asking the user to confirm the deletion
    if (confirm("Supprimer la promo : " + mySelect.value + " ?")) {
        // confirme la suppression
        // deletion confirmed
        deletePromotion(mySelect.value);
        // ici le value correspond a celui que j'ai monté dans le DOM en l'allouant a l'option
        // here the value is the one that i've created in the html page by allocating it in the option
    }
})


// C'est la fonction qui est déclarée pour s'occuper de la suppression
// That's the declared function to do the deletion
function deletePromotion(idPromo) {
    fetch("http://api-students.popschool-lens.fr/api/promotions/" + idPromo, {
            method: "DELETE"
        })
        .then(function (response) {
            getPromotion();
            console.log("supprimé")
        });
}

modifyPromo.addEventListener('click', function () {

    // Je demande confirmation à l'utilisateur avant modification
    // Asking to the user for change confirming
    if (confirm("Modifier la promo : " + mySelect.value + " ?")) {        
        modifyPromotion(mySelect.value);        
    }
})

function modifyPromotion(idPromo) {
    fetch("http://api-students.popschool-lens.fr/api/promotions/" + idPromo, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },            
            method: "PUT",            
            body: JSON.stringify({
                name: newPromo.value
            })
        })
        .then(response => response.json())
        .then(promo => {
            console.log(promo.name + "modifié")
            getPromotion();
        })
        .catch(error =>{
            console.log("ERROR");
        })
}