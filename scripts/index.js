// creation d'un tableau vierge afin de stocker les données json
var listpromo = [];
//declaration des variable pour la creation de promo
var newPromo = document.querySelector('#newPromo');
var createPromo = document.querySelector('#createPromo');
function getPromotion (){
// Récupérez la liste des promotions via un fetch et affichez la via un console.log

    fetch("http://api-students.popschool-lens.fr/api/promotions")
// la reponse est envoyé par l'api puis recupérée en format json
        .then(response => response.json())
// le json devient promo est renvoyé par la console via console log
        .then(promo => {
// la notation entre crochets m'a permi de selectionner uniquement la partie qui m'interesse         
            console.log(promo['hydra:member']);
            listpromo  = promo['hydra:member'];
            listpromo.forEach(promotion => {
                var myDiv = document.querySelector("#myDiv");
                myDiv.innerHTML += promotion.name + "<br>";
            })
     })

}
getPromotion();

// creation d'un event listener pour le bouton
createPromo.addEventListener('click', createPromotion);

// fonction qui permettra de creer la fonction
function createPromotion () {
    fetch("http://api-students.popschool-lens.fr/api/promotions", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body: JSON.stringify({
            name: newPromo.value
        })
       })
       .then(response => response.json())
       .then(promo => {
           console.log(promo.name + " créé")
       })
       
        
}
