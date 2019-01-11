// creation d'un tableau vierge afin de stocker les données json
var listpromo = [];
//declaration des variable pour la creation de promo
var newPromo = document.querySelector('#newPromo');
var createPromo = document.querySelector('#createPromo');
var modifyPromo = document.querySelector('#modifyPromo');
var deletePromo = document.querySelector('#deletePromo');
var mySelect = document.querySelector('#list');
var myDiv = document.querySelector("#myDiv");
function getPromotion (){
// Récupérez la liste des promotions via un fetch et affichez la via un console.log

    fetch("http://api-students.popschool-lens.fr/api/promotions")
// la reponse est envoyé par l'api puis recupérée en format json
        .then(response => response.json())
// le json devient promo est renvoyé par la console via console log
        .then(promo => {
// la notation entre crochets m'a permi de selectionner uniquement la partie qui m'interesse
            console.log(promo);
            console.log(promo['hydra:member']);
            listpromo  = promo['hydra:member'];
            myDiv.innerHTML = '';
            listpromo.forEach(promotion => {
                 myDiv.innerHTML +=   promotion.id + ". " + promotion.name + "<br>";
// ici je veux rajouter la liste dans le menu deroulant         
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

// fonction qui permettra de creer la fonction, la methode POST permettra de rajouter la nouvelle promotion a la liste deja pré-existante.
function createPromotion () {
    fetch("http://api-students.popschool-lens.fr/api/promotions", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
// on transforme la valeur du champs input newPromo en chaine Json via stringify
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

 deletePromo.addEventListener ('click', function (){
    
    // Je demande confirmation à l'utilisateur avant suppression 
    if (confirm("Supprimer la promo : " + mySelect.value + " ?")) {
        // confirme la suppression
        deletePromotion(mySelect.value);
    // ici le value correspond a celui que j'ai monté dans le DOM en l'allouant a l'option
    }
})


 // C'est la fonction qui est déclarée pour s'occuper de la suppression
function deletePromotion(idPromo) 
{
        fetch("http://api-students.popschool-lens.fr/api/promotions/" + idPromo, {
            method: "DELETE"
        })
            .then(function (response) {                
                getPromotion();
                console.log ("supprimé")
            });
}