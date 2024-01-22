let intro = document.querySelector("#start");
let button_start = document.querySelector("#start button");
let img_mole = document.querySelector("img");
let body = document.querySelector("body");
let shotzone = document.querySelector("#cible");
let cutieMole = document.querySelector("#start .cutieMole");


function getRandom(min, max) {  //une fonction qui permet de générer un chiffre aléatoirement
    return Math.floor(Math.random() * (max - min + 1)) + min;;
}

img_mole.style.left = getRandom(5, 95) + '%';
img_mole.style.top = getRandom(5, 90) + '%';
cutieMole.src="images/beginCutieMole.png";
button_start.textContent = "START";

function hide_intro() { //une fonction qui cache la page d'introduction quand on clique sur le bouton Start et qui lance le jeu

    intro.classList.add("invisible");
    img_mole.classList.remove("untouchable");
    body.classList.add("greenFloor");
    
    timer();
}


let scoreDisplay = document.querySelector(".scoreAffichage");
let remainingHit = document.querySelector(".hits");
scoreDisplay.textContent = "0"; //affichage du score avant le début du jeu
remainingHit.textContent = "10"; //affichage du nombre de coups restants
let score = 0;
let nbr_mole = 0;
let hitTotal = nbr_mole + 10;


function timer() {
    let appearence = setInterval(function () {
        let mole = document.createElement('img');
        mole.src = "images/TipTapTaupe.png";
        shotzone.appendChild(mole);
        nbr_mole++;
        img_mole = mole;
        img_mole.classList.add("anime1");
        img_mole.style.left = getRandom(5, 95) + '%';
        img_mole.style.top = getRandom(5, 80) + '%';
        hitTotal -= 1;
        remainingHit.textContent = hitTotal;
        img_mole.addEventListener("click", shoot);
        if (nbr_mole >= 11) {
            img_mole.classList.remove("anime1");
            clearInterval(appearence);
            remainingHit.textContent = "0";
            final();
        }
    }, 1500);

}

let annuncement = "";

function shoot() {

    if (img_mole.classList.contains("untouchable")) {
        score += 0;
    } else {
        score += 1;
        img_mole.classList.remove("anime1");
        img_mole.classList.add("untouchable");
        img_mole.classList.add("anime2");
    }

    if (hitTotal >= 0) {
        scoreDisplay.textContent = score; 
    }

    if(score >=10){
        annuncement = "T'es un warrior !<br/> Rien à redire !";
    }else if(score >= 7){
        annuncement = "T'es trop fort !<br/> Tu es prêt à détauper ton jardin !";
    } else if(score >= 5){
        annuncement = "C'est pas mal !<br/> Mais tu peux mieux faire !";
    }else if(score >= 3){
        annuncement = "Mouais, très moyen tout ça !<br/> Essaie encore.";
    } else if(score >=1) {
        annuncement = "T'es vraiment pas doué !<br/> Tu n'as aucun avenir en tant que détaupeur.";
    } else if(score <= 0){
        annuncement = "No comment!";
    }
}

let lancement = document.querySelector(".welcome");
let again = document.querySelector(".again");

function final(){
    
    intro.classList.remove("invisible");
    cutieMole.src="images/endCutieMole.png";
    body.classList.remove("greenFloor");
    lancement.classList.add("invisible");
    button_start.remove();
    again.innerHTML= "Ton score est de :<br/> <strong>" + score + "/10</strong><br/>" + annuncement + "<br/> <a href='index.html'><button>REJOUER</button></a>";

}

button_start.addEventListener("click", hide_intro);


