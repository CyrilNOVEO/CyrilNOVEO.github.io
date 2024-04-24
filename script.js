// Variables des gammes de portes avec leurs dimensions
var gammes = {
    "VulTek+ A": { dormant_largeur_OE: 87, dormant_largeur_OI: 88.5, jeu_largeur: 5, jeu_hauteur: 10, empietement_OE: 70, empietement_OI: 68.5, abattement_porte_double: 0 },
    "VulTek+ S": { dormant_largeur_OE: 65, dormant_largeur_OI: 65, jeu_largeur: 10, jeu_hauteur: 20, empietement_OE: 34.5, empietement_OI: 34.5, abattement_porte_double: 0 },
    "VulTek+ AS EI²60": { dormant_largeur_OE: 87, dormant_largeur_OI: 88.5, jeu_largeur: 4, jeu_hauteur: 10, empietement_OE: 90.75, empietement_OI: 89.25, abattement_porte_double: 0 },
    "VulTek+ AS EI²120": { dormant_largeur_OE: 87, dormant_largeur_OI: 88.5, jeu_largeur: 4, jeu_hauteur: 10, empietement_OE: 111.5, empietement_OI: 110, abattement_porte_double: 0 },
    "MagTek A": { dormant_largeur_OE: 87, dormant_largeur_OI: 88.5, jeu_largeur: 5, jeu_hauteur: 10, empietement_OE: 70, empietement_OI: 68.5, abattement_porte_double: 0 },
    "BlasTek A": { dormant_largeur_OE: 87, dormant_largeur_OI: 87, jeu_largeur: 5, jeu_hauteur: 10, empietement_OE: 70, empietement_OI: 70, abattement_porte_double: 0 },
    "MagTek A Lite": { dormant_largeur_OE: 75, dormant_largeur_OI: 75, jeu_largeur: 5, jeu_hauteur: 10, empietement_OE: 53, empietement_OI: 53, abattement_porte_double: 0 }
};

// Fonction pour sélectionner le sens d'ouverture de la porte
function selectOption(option) {
    // Définir la valeur du champ de sélection avec l'option choisie
    document.getElementById("ouverture_porte").value = option;
    // Désélectionner tous les autres boutons de sens d'ouverture
    var buttons = document.querySelectorAll(".input-group .btn-sens");
    buttons.forEach(function(button) {
        if (button.textContent !== option) {
            button.classList.remove("active");
        }
    });
    // Ajouter la classe "active" au bouton sélectionné
    event.target.classList.add("active");
}

// Fonction pour sélectionner le type de porte
function selectTypePorte(type) {
    // Définir la valeur du champ de sélection avec le type choisi
    document.getElementById("type_porte").value = type;
    // Désélectionner tous les autres boutons de type de porte
    var buttons = document.querySelectorAll(".input-group .btn-type-porte");
    buttons.forEach(function(button) {
        if (button.textContent !== type) {
            button.classList.remove("active");
        }
    });
    // Ajouter la classe "active" au bouton sélectionné
    event.target.classList.add("active");
}

// Fonction pour sélectionner le seuil AEV
function selectSeuilAEV(option) {
    // Définir la valeur du champ de sélection avec l'option choisie
    document.getElementById("seuil_aev").value = option;
    // Désélectionner tous les autres boutons de seuil AEV
    var buttons = document.querySelectorAll(".input-group .btn-seuil");
    buttons.forEach(function(button) {
        if (button.textContent !== option) {
            button.classList.remove("active");
        }
    });
    // Ajouter la classe "active" au bouton sélectionné
    event.target.classList.add("active");
}

// Fonction pour calculer les valeurs
function calculerValeurs() {
    // Variables pour les dimensions de la porte
    var largeurPassageInput = document.getElementById("largeur_passage");
    var hauteurPassageInput = document.getElementById("hauteur_passage");
    var largeurFabricationInput = document.getElementById("largeur_fabrication");
    var hauteurFabricationInput = document.getElementById("hauteur_fabrication");
    var largeurMaconnerieInput = document.getElementById("largeur_maconnerie");
    var hauteurMaconnerieInput = document.getElementById("hauteur_maconnerie");

    // Variables pour les valeurs saisies
    var largeurPassage = parseFloat(largeurPassageInput.value);
    var hauteurPassage = parseFloat(hauteurPassageInput.value);
    var largeurFabrication = parseFloat(largeurFabricationInput.value);
    var hauteurFabrication = parseFloat(hauteurFabricationInput.value);
    var largeurMaconnerie = parseFloat(largeurMaconnerieInput.value);
    var hauteurMaconnerie = parseFloat(hauteurMaconnerieInput.value);

    // Vérifier quel champ est rempli
    var passageRempli = !isNaN(largeurPassage) && !isNaN(hauteurPassage);
    var fabricationRempli = !isNaN(largeurFabrication) && !isNaN(hauteurFabrication);
    var maconnerieRempli = !isNaN(largeurMaconnerie) && !isNaN(hauteurMaconnerie);

    // Vérifier que seul un champ est rempli
    if (!((passageRempli && !fabricationRempli && !maconnerieRempli) || (!passageRempli && fabricationRempli && !maconnerieRempli) || (!passageRempli && !fabricationRempli && maconnerieRempli))) {
        alert("Veuillez remplir uniquement un ensemble de valeurs : passage, fabrication ou maçonnerie.");
        return;
    }

    // Vérifier si les valeurs saisies sont valides
    if (passageRempli) {
        if (isNaN(largeurPassage) || isNaN(hauteurPassage)) {
            alert("Veuillez saisir des valeurs numériques valides pour la largeur et la hauteur du passage.");
            return;
        }
    } else if (fabricationRempli) {
        if (isNaN(largeurFabrication) || isNaN(hauteurFabrication)) {
            alert("Veuillez saisir des valeurs numériques valides pour la largeur et la hauteur de fabrication.");
            return;
        }
    } else if (maconnerieRempli) {
        if (isNaN(largeurMaconnerie) || isNaN(hauteurMaconnerie)) {
            alert("Veuillez saisir des valeurs numériques valides pour la largeur et la hauteur de maçonnerie.");
            return;
        }
    }

    // Récupérer la gamme de porte sélectionnée
    var gammePorteInput = document.getElementById("gamme_porte");
    var gammePorte = gammePorteInput.value;

    // Récupérer le type de porte sélectionné
    var typePorteInput = document.getElementById("type_porte");
    var typePorte = typePorteInput.value;

    // Récupérer le sens d'ouverture de porte sélectionné
    var ouverturePorteInput = document.getElementById("ouverture_porte");
    var ouverturePorte = ouverturePorteInput.value;

    // Récupérer l'état du seuil AEV
    var seuilAevInput = document.getElementById("seuil_aev");
    var seuilAev = seuilAevInput.value === "aev";

    // Vérifier quel ensemble de valeurs est rempli
    if (passageRempli) {
        // Calcul des autres valeurs à partir de la largeur et de la hauteur du passage
        largeurPassage = parseFloat(largeurPassageInput.value);
        hauteurPassage = parseFloat(hauteurPassageInput.value);

        // Récupérer la gamme de porte sélectionnée
        var gammePorteInput = document.getElementById("gamme_porte");
        var gammePorte = gammePorteInput.value;

        // Récupérer le type de porte sélectionné
        var typePorteInput = document.getElementById("type_porte");
        var typePorte = typePorteInput.value;

        // Récupérer le sens d'ouverture de porte sélectionné
        var ouverturePorteInput = document.getElementById("ouverture_porte");
        var ouverturePorte = ouverturePorteInput.value;

        // Récupérer l'état du seuil AEV
        var seuilAevInput = document.getElementById("seuil_aev");
        var seuilAev = seuilAevInput.value === "aev";

        // Calcul de la largeur et de la hauteur de fabrication
        if (typePorte === "Porte intérieure"){
        var largeurFabrication = largeurPassage + (2 * gammes[gammePorte].dormant_largeur_OI) + gammes[gammePorte].empietement_OI;
        var hauteurFabrication = hauteurPassage + gammes[gammePorte].dormant_largeur_OI;
        }
        else if (typePorte === "Porte extérieure"){
        var largeurFabrication = largeurPassage + (2 * gammes[gammePorte].dormant_largeur_OE) + gammes[gammePorte].empietement_OE;
        var hauteurFabrication = hauteurPassage + gammes[gammePorte].dormant_largeur_OE;
        }
    else {
            alert("Veuillez sélectionner un type de porte.");
            return;
        }

        // Calcul de la largeur et de la hauteur de maçonnerie
        if (typePorte === "Porte intérieure"){
        var largeurMaconnerie = largeurFabrication + (2 * gammes[gammePorte].jeu_largeur);
        var hauteurMaconnerie = hauteurFabrication + gammes[gammePorte].jeu_hauteur;
        }
        else if (typePorte === "Porte extérieure"){
        var largeurMaconnerie = largeurFabrication + (2 * gammes[gammePorte].jeu_largeur);
        var hauteurMaconnerie = hauteurFabrication + gammes[gammePorte].jeu_hauteur;
        } else {
            alert("Veuillez sélectionner un type de porte.");
            return;
        }

        // Remplissage des valeurs dans les champs correspondants
        largeurFabricationInput.value = largeurFabrication.toFixed(2);
        hauteurFabricationInput.value = hauteurFabrication.toFixed(2);
        largeurMaconnerieInput.value = largeurMaconnerie.toFixed(2);
        hauteurMaconnerieInput.value = hauteurMaconnerie.toFixed(2)
        }
        
else if (fabricationRempli) {
        // Calcul des autres valeurs à partir de la largeur et de la hauteur de fabrication
        largeurFabrication = parseFloat(largeurFabricationInput.value);
        hauteurFabrication = parseFloat(hauteurFabricationInput.value);
        
        // Récupérer la gamme de porte sélectionnée
        var gammePorteInput = document.getElementById("gamme_porte");
        var gammePorte = gammePorteInput.value;

        // Récupérer le type de porte sélectionné
        var typePorteInput = document.getElementById("type_porte");
        var typePorte = typePorteInput.value;

        // Récupérer le sens d'ouverture de porte sélectionné
        var ouverturePorteInput = document.getElementById("ouverture_porte");
        var ouverturePorte = ouverturePorteInput.value;

        // Récupérer l'état du seuil AEV
        var seuilAevInput = document.getElementById("seuil_aev");
        var seuilAev = seuilAevInput.value === "aev";

        // Calcul de la largeur et de la hauteur du passage
        if (typePorte === "Porte intérieure"){
        var largeurPassage = largeurFabrication - (2 * gammes[gammePorte].dormant_largeur_OI) - gammes[gammePorte].empietement_OI;
        var hauteurPassage = hauteurFabrication - gammes[gammePorte].dormant_largeur_OI;
        }
        else if (typePorte === "Porte extérieure"){
        var largeurPassage = largeurFabrication - (2 * gammes[gammePorte].dormant_largeur_OE) - gammes[gammePorte].empietement_OE;
        var hauteurPassage = hauteurFabrication - gammes[gammePorte].dormant_largeur_OE;
        } else {
            alert("Veuillez sélectionner un type de porte.");
            return;
        }

        // Calcul de la largeur et de la hauteur de maçonnerie
        if (typePorte === "Porte intérieure"){
        var largeurPassage = largeurFabrication - (2 * gammes[gammePorte].dormant_largeur_OI) - gammes[gammePorte].empietement_OI;
        var hauteurPassage = hauteurFabrication - gammes[gammePorte].dormant_largeur_OI;
        }
        else if (typePorte === "Porte extérieure"){
        var largeurMaconnerie = largeurFabrication + (2 * gammes[gammePorte].jeu_largeur);
        var hauteurMaconnerie = hauteurFabrication + gammes[gammePorte].jeu_hauteur;
        } else {
            alert("Veuillez sélectionner un type de porte.");
            return;
        }

        // Remplissage des valeurs dans les champs correspondants
        largeurPassageInput.value = largeurPassage.toFixed(2);
        hauteurPassageInput.value = hauteurPassage.toFixed(2);
        largeurMaconnerieInput.value = largeurMaconnerie.toFixed(2);
        hauteurMaconnerieInput.value = hauteurMaconnerie.toFixed(2);
    } else if (maconnerieRempli) {
        // Calcul des autres valeurs à partir de la largeur et de la hauteur de maçonnerie
        largeurMaconnerie = parseFloat(largeurMaconnerieInput.value);
        hauteurMaconnerie = parseFloat(hauteurMaconnerieInput.value);

        // Récupérer la gamme de porte sélectionnée
        var gammePorteInput = document.getElementById("gamme_porte");
        var gammePorte = gammePorteInput.value;

        // Récupérer le type de porte sélectionné
        var typePorteInput = document.getElementById("type_porte");
        var typePorte = typePorteInput.value;

        // Récupérer le sens d'ouverture de porte sélectionné
        var ouverturePorteInput = document.getElementById("ouverture_porte");
        var ouverturePorte = ouverturePorteInput.value;

        // Récupérer l'état du seuil AEV
        var seuilAevInput = document.getElementById("seuil_aev");
        var seuilAev = seuilAevInput.value === "aev";

        // Calcul de la largeur et de la hauteur du passage
        if (typePorte === "Porte intérieure"){
        var largeurPassage = largeurMaconnerie - (2 * gammes[gammePorte].jeu_largeur)- (2 * gammes[gammePorte].dormant_largeur_OI) - gammes[gammePorte].empietement_OI;
        var hauteurPassage = hauteurMaconnerie - gammes[gammePorte].jeu_hauteur - gammes[gammePorte].dormant_largeur_OI;
        }
        else if (typePorte === "Porte extérieure"){
        var largeurPassage = largeurMaconnerie - (2 * gammes[gammePorte].jeu_largeur)- (2 * gammes[gammePorte].dormant_largeur_OE) - gammes[gammePorte].empietement_OE;
        var hauteurPassage = hauteurMaconnerie - gammes[gammePorte].jeu_hauteur - gammes[gammePorte].dormant_largeur_OE;
        } else {
            alert("Veuillez sélectionner un type de porte.");
            return;
        }
        
        // Calcul de la largeur et de la hauteur de fabrication
        if (typePorte === "Porte intérieure"){
        var largeurFabrication = largeurMaconnerie - (2 * gammes[gammePorte].jeu_largeur);
        var hauteurFabrication = hauteurMaconnerie - gammes[gammePorte].jeu_hauteur;
        }
        else if (typePorte === "Porte extérieure"){
        var largeurFabrication = largeurMaconnerie - (2 * gammes[gammePorte].jeu_largeur);
        var hauteurFabrication = hauteurMaconnerie - gammes[gammePorte].jeu_hauteur;    
        } else {
            alert("Veuillez sélectionner un type de porte.");
            return;
        }

        // Remplissage des valeurs dans les champs correspondants
        largeurPassageInput.value = largeurPassage.toFixed(2);
        hauteurPassageInput.value = hauteurPassage.toFixed(2);
        largeurFabricationInput.value = largeurFabrication.toFixed(2);
        hauteurFabricationInput.value = hauteurFabrication.toFixed(2);
    }
}

// Fonction pour réinitialiser les champs non remplis en fonction de la section modifiée
function reinitialiserChampsNonRemplis(champActif, sectionModifiee) {
    var champsPassageLibre = ["largeur_passage", "hauteur_passage"];
    var champsFabrication = ["largeur_fabrication", "hauteur_fabrication"];
    var champsMaconnerie = ["largeur_maconnerie", "hauteur_maconnerie"];
    
    // Parcourir les champs et les vider en fonction de la section modifiée
    switch (sectionModifiee) {
        case "passage":
            champsFabrication.concat(champsMaconnerie).forEach(function(champ) {
                document.getElementById(champ).value = "";
            });
            break;
        case "fabrication":
            champsPassageLibre.concat(champsMaconnerie).forEach(function(champ) {
                document.getElementById(champ).value = "";
            });
            break;
        case "maconnerie":
            champsPassageLibre.concat(champsFabrication).forEach(function(champ) {
                document.getElementById(champ).value = "";
            });
            break;
    }
}

// Ajouter des événements pour chaque champ d'entrée
document.getElementById("largeur_passage").addEventListener("input", function() {
    reinitialiserChampsNonRemplis("largeur_passage", "passage");
});
document.getElementById("hauteur_passage").addEventListener("input", function() {
    reinitialiserChampsNonRemplis("hauteur_passage", "passage");
});
document.getElementById("largeur_fabrication").addEventListener("input", function() {
    reinitialiserChampsNonRemplis("largeur_fabrication", "fabrication");
});
document.getElementById("hauteur_fabrication").addEventListener("input", function() {
    reinitialiserChampsNonRemplis("hauteur_fabrication", "fabrication");
});
document.getElementById("largeur_maconnerie").addEventListener("input", function() {
    reinitialiserChampsNonRemplis("largeur_maconnerie", "maconnerie");
});
document.getElementById("hauteur_maconnerie").addEventListener("input", function() {
    reinitialiserChampsNonRemplis("hauteur_maconnerie", "maconnerie");
});

// Fonction pour mettre à jour la couleur de fond et de la police des champs de nombre en fonction de leur contenu
function updateInputBackground() {
    var inputs = document.querySelectorAll("input[type='number']");
    inputs.forEach(function(input) {
        if (input.dataset.calculated === "true") {
            input.style.backgroundColor = "#CCFFCC"; // Vert pâle pour les champs calculés
            input.style.color = "magenta"; // Magenta pour la police des champs calculés
            input.style.fontWeight = "bold"; // Texte en gras pour les champs calculés
        } else {
            input.style.backgroundColor = "#CCE5FF"; // Bleu pâle pour les champs d'entrée
            input.style.color = "black"; // Noir pour la police des champs d'entrée
            input.style.fontWeight = "normal"; // Texte normal pour les champs d'entrée
        }
    });
}


// Ajouter des écouteurs d'événements pour chaque champ de texte afin de mettre à jour la couleur de fond
var textInputs = document.querySelectorAll("input[type='text']");
textInputs.forEach(function(input) {
    input.addEventListener("input", updateInputBackground);
});

// Appel initial pour mettre à jour la couleur de fond au chargement de la page
updateInputBackground();

