function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.getElementsByTagName("form")[0];
const btnClose = document.getElementById("btnClose");

const inputPrenom = document.getElementById("first");
const errorPrenom = document.getElementById("error-prenom");

const inputNom = document.getElementById("last");
const errorNom = document.getElementById("error-nom");

const inputMail = document.getElementById("email");
const errorMail = document.getElementById("error-mail");

const inputDate = document.getElementById("birthdate");
const errorDate = document.getElementById("error-date");

const inputNumberTournois = document.getElementById("quantity");
const errorNumber = document.getElementById("error-number");

const listCheckbox = document.querySelectorAll(".checkbox-input");
const errorCheckbox = document.getElementById("error-checkbox");

const checkboxConditionsAccepted = document.getElementById("checkbox1");
const errorCheckboxConditionsAccepted = document.getElementById("error-checkbox1");

const modalSuccess = document.getElementById("valid-form");
const btnCloseInfoSuccess = document.getElementById("close-infos");

const queryString = window.location.search;
if (queryString != null && queryString != ""){
  launchModal();
  form.style.display = "none";
  modalSuccess.className = "valid-form";
  
}
else{

  form.style.display = "block";

  modalSuccess.style.display = "none";

}


checkboxConditionsAccepted.addEventListener("click", function () {
  checkValidity(checkboxConditionsAccepted, errorCheckboxConditionsAccepted);
})
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
listCheckbox.forEach((btn) => btn.addEventListener("click", function () {
  checkValidity(listCheckbox, errorCheckbox);
}))
btnClose.addEventListener("click", closeModal);

btnCloseInfoSuccess.addEventListener("click", function(){
  let url = window.location;
  url = url.href.substring(0,url.href.length-window.location.search.length);
  //on redirige vers la page d'acceuil après l'affichage du message de validation de l'inscription
  document.location.href = url;  
} );
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}
inputPrenom.addEventListener("keyup", function () {
  checkValidity(inputPrenom, errorPrenom);
});
inputNom.addEventListener("keyup", function () {
  checkValidity(inputNom, errorNom);
});

inputMail.addEventListener("keyup", function () {
  checkValidity(inputMail, errorMail);
})

inputDate.addEventListener("keyup", function () {
  checkValidity(inputDate, errorDate);
})

inputNumberTournois.addEventListener("keyup", function () {
  checkValidity(inputNumberTournois, errorNumber);

});



//verification validité formulaire
function checkValidity(inputTested, spanError) {
  let isValid = true;
  let messageError = "";

  //On vérifie le type d'input à tester avec un switch case
  switch (inputTested.type) {
    //si l'input est de type text
    case "text":
      //on défini la valeur du booleen isValid avec la condition
      //si le nb de caractere entré est >= au nombre de caractere minLength défini ds le html isValue = true sinon isValue = false 
      isValid = inputTested.value.length >= inputTested.minLength;
      //on défini le texte d'erreur à afficher 
      //une condition ternaire permet de définir si l'input testé correspond au prénom(first) ou au nom
      messageError = "Le " + ((inputTested.name == "first") ? "prénom" : "nom") + " doit etre composé d'au moins 2 lettres";
      break;
    //si l'input est de type email  
    case "email":
      //j'utilise une expression réguliere (regex) pour vérifier si l'adresse mail est valide ou non
      isValid = inputTested.value.match(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
      messageError = "Vous devez entrer une adresse email valide";
      break;
    //si l'input est de type number  
    case "number":
      //on vérifie si la donnée entrée est bien un nombre compris entre la valeur min et la valeur max indiqué ds le html
      isValid = (parseInt(inputTested.value) >= parseInt(inputTested.min) && parseInt(inputTested.value) <= parseInt(inputTested.max));
      messageError = "Vous devez indiquer un nombre entre "+inputTested.min+" et "+inputTested.max;
      break;
    //si l'input est de type date  
    case "date":
      //on définit la date du jour
      const today = new Date();
      //on cree un objet date en prenant en parametre la valeur indiqué dans l'input
      const birthdate = new Date(inputTested.value);
      //on défini un age minimum
      const ageMin = 13;
      //on défini un age maximum
      const ageMax = 120;
      //on calcul l'age en fonction de la date de naissance
      const age = ((today.getTime() - birthdate.getTime()) / 31536000000).toFixed(0);
      //on vérifie si l'age est supérieur ou égal à l'age min et inferieur ou égal à l'age min
      isValid = age >= ageMin && age <= ageMax;
      //si birthdate.getTime() ne retourne pas un nombre c'est que l'utilisateur n'a pas respecté le format de date
      if (birthdate.getTime = isNaN)
        messageError = "Vous devez entrer une date valide";
      
      if (age < ageMin)
        messageError = "Vous devez avoir plus de " + ageMin + " ans pour participer";

      if (age > ageMax)
        messageError = "Vous devez avoir moins de " + ageMax + " ans pour participer";


      break;
    //si l'input est de type indefini c'est que l'on teste la liste de boutons radio
    case undefined:
      //on vérifie que l'input est bien une instance de l'objet NodeList
      if (inputTested instanceof NodeList) {
        //on defini un compteur initialisé à 0 pour compter le nb de btn radion selectionné
        let compteur = 0;
        //pour chaque boutons radio dans la liste
        for (const radioButton of inputTested) {
          //si le bouton radio est selectionné on incrémente la variable compteur
          if (radioButton.checked && radioButton.value != "on" && radioButton.type === "radio") {
            compteur++;

            break;
          }
        }
        //si compteur est > 0 c'est qu'au moins un bouton radio est selectionné
        isValid = compteur > 0;
        messageError = "Vous devez selectionner un tournoi";

      }

      break;
    //Si l'input et de type checkbox 
    case "checkbox":
      //on verifie si la checkbox est cochée
      isValid = inputTested.checked;
      messageError = "Vous devez accepter les conditions d'utilisations";
      break;
  }
  //si isValid = false
  if (!isValid) {
    //si l'input n'est pas la liste de boutons radio on encadre l'element en rouge et on defini la couleur du texte en rouge
   if (inputTested.type != undefined) {
      inputTested.style.border = "2px solid red";
      inputTested.style.color = "red";
   }
   // si c'est la liste de boutons radio en encadre en rouge toute la liste
    else {
      document.getElementById("checkbox-list").style.border = "2px solid red";
    }
    //on défini la couleur et la taille du message d'erreur
    spanError.style.color = "red";
    spanError.style.fontSize ="0.4em";
    //on ajoute le message d'erreur au dom
    spanError.innerText = messageError;
  }
  //si isValid = true
  else {
    //si l'input n'est pas la liste de boutons radio on encadre l'element en vert et on defini la couleur du texte en noir
    if (inputTested.type != undefined) {
      inputTested.style.border = "2px solid green";
      inputTested.style.color = "black";
    } 
    // si c'est la liste de boutons radio on supprime la bordure
    else {
      document.getElementById("checkbox-list").style.border = "none";

    }

    spanError.innerText = "";

  }
  return isValid;

}

//fonction appelée lors de la soumission du formulaire
function validate() {
  //si tout les champs sont valides
  if (checkValidity(inputPrenom, errorPrenom) &&
      checkValidity(inputNom, errorNom) &&
        checkValidity(inputMail, errorMail) &&
          checkValidity(inputDate, errorDate) &&
            checkValidity(inputNumberTournois, errorNumber) &&
              checkValidity(listCheckbox, errorCheckbox)&&
                checkValidity(checkboxConditionsAccepted, errorCheckboxConditionsAccepted)

  ){
    //on envoie le formulaire
    return true;

  }
  //sinon on affiche toutes les erreurs et on annule la soumission
  else {
    checkValidity(inputPrenom, errorPrenom);
    checkValidity(inputNom, errorNom);
    checkValidity(inputMail, errorMail);
    checkValidity(inputDate, errorDate);
    checkValidity(inputNumberTournois, errorNumber);
    checkValidity(listCheckbox, errorCheckbox);
    checkValidity(checkboxConditionsAccepted, errorCheckboxConditionsAccepted);
    return false;
  }
}
