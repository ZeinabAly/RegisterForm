let inputs = document.querySelectorAll('input');
let progressbar = document.getElementById("progress-bar");
let passwordInput = document.getElementById('password');
let firstname, lastname, email, password, confirmPass;
form = document.getElementById('form')


// AFFICHAGE DES ERREURS
const errorDisplay = (tag, error, message) => {
    let container = document.querySelector('.'+tag+'-container');
    let span = document.querySelector('.'+tag+'-container > span');

    if(error){
        container.classList.add('error');
        span.textContent = message;
    }else{
        container.classList.remove('error');
        span.textContent = message;
    }
}
//********  VALIDATION POUR CHAQUE CHAMP **************/


// PRENOM
const firstnameChecker = (value) => {
    if(value.length > 1 && (value.length < 3 || value.length > 20)){
        // errorDisplay('firstname', true, 'Le prenom doit comporter au moins 3 caractères');
        errorDisplay('firstname', true, 'The first name must contain at least 3 characters');
    }else if(!value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)){
        // errorDisplay('firstname', true, 'Le prenom ne peut contenir les chiffres, symboles ou caractères spéciaux');
        errorDisplay('firstname', true, 'The first name cannot contain numbers, symbols, or special characters');
    }else{
        errorDisplay('firstname', false, "");
        firstname = value;
    }
}
    
// NOM
const lastnameChecker = (value) => {
    if(value.length > 1 && (value.length < 3 || value.length > 20)){
        // errorDisplay('lastname', true, 'Le nom doit comporter au moins 3 caractères');
        errorDisplay('lastname', true, 'The last name must contain at least 3 characters');
    }else if(!value.match(/^[a-zA-Z0-9_.-]*$/)){
        // errorDisplay('lastname', true, 'Le nom ne doit pas contenir de caractères speciaux');
        errorDisplay('lastname', true, 'The last name must not contain special characters');
    }else{
        errorDisplay('lastname', false, "");
        lastname = value;
    }
}
 
// EMAIL
const emailChecker = (value) => {
    if(value.length > 1 && (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i))){
        // errorDisplay('email', true, 'Email doit avoir le format exemple@gmail.com');
        errorDisplay('email', true, 'Please enter a valid email address, such as example@gmail.com');
    }else{
        errorDisplay('email', false, "");
        email = value;
    }
}
     
// MOT DE PASSE
const passwordChecker = (value) => {
    if(value.length > 1 && (!value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/))){
        // errorDisplay('password', true, 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial');
        errorDisplay('password', true, 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special characte');
        progressbar.classList.add('progressRed');
        progressbar.classList.remove('progressGreen');
        progressbar.classList.remove('progressBlue');
        
    }else if(value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/) && value.length <= 12){
        errorDisplay('password', false, "");
        progressbar.classList.remove('progressRed');
        progressbar.classList.remove('progressGreen');
        progressbar.classList.add('progressBlue');
        passwordInput.classList.add('progressBlueInput');
        password = value;
        
    }else if(value.length > 12){
        errorDisplay('password', false, "");
        progressbar.classList.remove('progressRed');
        progressbar.classList.remove('progressBlue');
        progressbar.classList.add('progressGreen');
        passwordInput.classList.remove('progressBlueInput');
        password = value;

    }else{
        errorDisplay('password', false, "");
        progressbar.classList.remove('progressRed');
        progressbar.classList.remove('progressBlue');
        progressbar.classList.remove('progressGreen');
        passwordInput.classList.remove('progressBlueInput');
        password = value;
    }

    if(confirmPass){confirmChecker(confirmPass)}
}

// CONFIRMATION DE MOT DE PASSE
const confirmChecker = (value) => {
    if(value.length > 1 && value !== password ){
        // errorDisplay('confirm', true, 'Les mots de passe doivent être identiques');
        errorDisplay('confirm', true, 'Passwords must match exactly');
    }else{
        errorDisplay('confirm', false, "");
        confirmPass = value;
    }
}
    


// FONCTION POUR AFFICHER LES ERREURS POUR CHAQUE CAS
inputs.forEach(input => {
   input.addEventListener('input', function(e){
        value = e.target.value;
        
        switch (e.target.id) {
            case "firstname":
                firstnameChecker(value);
                break;
            case "lastname":
                lastnameChecker(value);
                break;
            case "email":
                emailChecker(value);
                break;
            case "password":
                passwordChecker(value);
                break;
            case "confirm":
                confirmChecker(value);
                break;
            default:
                break;
        }
   })
   
});


// GESTION DE LA SOUMISSION DU FORMULAIRE

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(firstname && lastname && email && password && confirmPass){
        const data = {
            firstname, lastname, email, password
        }
        console.log(data);
        firstname = "";
        lastname = "";
        email = "";
        confirmPass = "";
    
        inputs.forEach(input => {
            input.value = "";
            progressbar.classList.remove("progressGreen");
        });
        alert("Inscription passée avec succès ! ");
    }else{
        alert("Veuillez remplir tous les champs");
    }
})
