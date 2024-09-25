// Produits
let produits = [];

// Variables 
let qteItemsPanier = 0;
let panier = [];
let menuElements = document.getElementsByClassName("menuElements");
let nav = document.getElementById("nav");
let main = document.getElementById("main");
let langue = "Francais";
let currentCurrencyTaux = "";
let currentCurrencySymbol = "&";


// Récupère les produits la première fois
function fetchProduits() {
    return fetch(langue + '.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            return response.json();
        })
        .then(data => {
            produits = [];
            data.produits.forEach(produit => {
                produits.push({
                    id: produit.id,
                    nom: produit.nom,
                    description: produit.description,
                    prix: produit.prix,
                    wikipedia: produit.wikipedia,
                    categories: produit.categories,
                    stock: produit.stock
                });
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}


// Appel de la fonction qui récupère les produits
fetchProduits();



// Fonction qui met a jour le contenu en fonction de la langue sélectionner
let selectedLangue = document.getElementById("selectedLangue");

selectedLangue.addEventListener("change", function changeLangue() {
    let selectedValue = selectedLangue.value;

    langue = selectedValue;
    console.log(langue);

    closeDetail();

    changeView("accueil-view");

    fetchProduits().then(() => {
        let currentView = document.getElementById("main").className;
        changeView(currentView);
    });


});



// Afficher le bon contenu en fonction du tag <a> sélectionné
document.body.addEventListener("onload", changeView("accueil-view"));


for (let i = 0; i < menuElements.length; i++) {

    menuElements[i].addEventListener("click", function () {
        let innerText = menuElements[i].innerText;

        let menuElement = innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        let pageView = menuElement + "-view";

        nav.className = pageView;
        main.className = pageView;

        changeView(pageView);
        closeDetail();
    });
}


// function pour changer la view selon l'élément a cliqué

function changeView(view) {

    if (view == "accueil-view" || view == "home-view") {
        fetch(langue + '.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                let titre = data.accueilView.titre;
                let texte = data.accueilView.texte;

                document.getElementById("a-element-accueil").classList.add("active");
                document.getElementById("a-element-accueil").innerText = data.navigation.accueil;

                document.getElementById("a-element-arbres").classList.remove("active");
                document.getElementById("a-element-arbres").innerText = data.navigation.arbre;

                document.getElementById("a-element-fleurs").classList.remove("active");
                document.getElementById("a-element-fleurs").innerText = data.navigation.fleurs;

                document.getElementById("a-element-materiel").classList.remove("active");
                document.getElementById("a-element-materiel").innerText = data.navigation.materiel;

                document.getElementById("a-element-panier").classList.remove("active");
                document.getElementById("a-element-panier").innerText = data.navigation.panier;

                document.getElementById("a-element-contact").classList.remove("active");
                document.getElementById("a-element-contact").innerText = data.navigation.contact;

                document.getElementById("a-element-garantie").classList.remove("active");
                document.getElementById("a-element-garantie").innerText = data.navigation.garantie;

                document.getElementById("a-element-admin").classList.remove("active");

                main.innerHTML = "<div id='mot-bienvenue'><h1>" + titre + "</h1><p>" + texte + "</p></div><img id='background-img' src='images/background.jpg'>";

            })
            .catch(error => {
                console.error('Erreur:', error);
            });



    } else if (view == "arbres-view" || view == "trees-view") {

        console.log("test")
        fetch(langue + '.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                let titre = data.arbresView.titre;
                let texte = data.arbresView.texte;

                document.getElementById("a-element-accueil").classList.remove("active");
                document.getElementById("a-element-accueil").innerText = data.navigation.accueil;

                document.getElementById("a-element-arbres").classList.add("active");
                document.getElementById("a-element-arbres").innerText = data.navigation.arbre;

                document.getElementById("a-element-fleurs").classList.remove("active");
                document.getElementById("a-element-fleurs").innerText = data.navigation.fleurs;

                document.getElementById("a-element-materiel").classList.remove("active");
                document.getElementById("a-element-materiel").innerText = data.navigation.materiel;

                document.getElementById("a-element-panier").classList.remove("active");
                document.getElementById("a-element-panier").innerText = data.navigation.panier;

                document.getElementById("a-element-contact").classList.remove("active");
                document.getElementById("a-element-contact").innerText = data.navigation.contact;

                document.getElementById("a-element-garantie").classList.remove("active");
                document.getElementById("a-element-garantie").innerText = data.navigation.garantie;

                document.getElementById("a-element-admin").classList.remove("active");

                main.innerHTML = "<h1>" + titre + "</h1><p>" + texte + "</p><div id='product-container'></div>";

                let productContainer = document.getElementById("product-container");

                console.log(currentCurrencyTaux);

                for (let i = 0; i < produits.length; i++) {
                    if (produits[i].categories == "arbre" || produits[i].categories == "tree") {

                        let imgSrc = "images/" + produits[i].id + "-1.png";

                        let productCard = document.createElement("div");

                        productCard.className = "product-card";
                        productCard.innerHTML = "<img alt='img' src='" + imgSrc + "'><p>" + produits[i].nom + "<br>" + ((produits[i].prix * currentCurrencyTaux).toFixed(2) * currentCurrencyTaux).toFixed(2) + " " + currentCurrencySymbol + "</p>";
                        productCard.setAttribute("onclick", "showDetails('" + produits[i].id + "')");
                        productCard.setAttribute("oncontextmenu", "showContextMenu('" + produits[i].id + "')");
                        productContainer.appendChild(productCard);
                    }
                }

            })
            .catch(error => {
                console.error('Erreur:', error);
            });




    } else if (view == "fleurs-view" || view == "flowers-view") {

        fetch(langue + '.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                let titre = data.fleursView.titre;
                let texte = data.fleursView.texte;

                document.getElementById("a-element-accueil").classList.remove("active");
                document.getElementById("a-element-accueil").innerText = data.navigation.accueil;

                document.getElementById("a-element-arbres").classList.remove("active");
                document.getElementById("a-element-arbres").innerText = data.navigation.arbre;

                document.getElementById("a-element-fleurs").classList.add("active");
                document.getElementById("a-element-fleurs").innerText = data.navigation.fleurs;

                document.getElementById("a-element-materiel").classList.remove("active");
                document.getElementById("a-element-materiel").innerText = data.navigation.materiel;

                document.getElementById("a-element-panier").classList.remove("active");
                document.getElementById("a-element-panier").innerText = data.navigation.panier;

                document.getElementById("a-element-contact").classList.remove("active");
                document.getElementById("a-element-contact").innerText = data.navigation.contact;

                document.getElementById("a-element-garantie").classList.remove("active");
                document.getElementById("a-element-garantie").innerText = data.navigation.garantie;

                document.getElementById("a-element-admin").classList.remove("active");

                main.innerHTML = "<h1>" + titre + "</h1><p>" + texte + "</p><div id='product-container'></div>";

                let productContainer = document.getElementById("product-container");

                for (let i = 0; i < produits.length; i++) {
                    if (produits[i].categories == "fleur" || produits[i].categories == "flower") {

                        let imgSrc = "images/" + produits[i].id + "-1.png";

                        let productCard = document.createElement("div");

                        productCard.className = "product-card";
                        productCard.innerHTML = "<img alt='img' src='" + imgSrc + "'><p>" + produits[i].nom + "<br>" + (produits[i].prix * currentCurrencyTaux).toFixed(2) + " " + currentCurrencySymbol + "</p>";
                        productCard.setAttribute("onclick", "showDetails('" + produits[i].id + "')");
                        productCard.setAttribute("oncontextmenu", "showContextMenu('" + produits[i].id + "')");
                        productContainer.appendChild(productCard);
                    }
                }

            })
            .catch(error => {
                console.error('Erreur:', error);
            });

    } else if (view == "materiel-view" || view == "equipment-view") {
        fetch(langue + '.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                let titre = data.materielView.titre;
                let texte = data.materielView.texte;

                document.getElementById("a-element-accueil").classList.remove("active");
                document.getElementById("a-element-accueil").innerText = data.navigation.accueil;

                document.getElementById("a-element-arbres").classList.remove("active");
                document.getElementById("a-element-arbres").innerText = data.navigation.arbre;

                document.getElementById("a-element-fleurs").classList.remove("active");
                document.getElementById("a-element-fleurs").innerText = data.navigation.fleurs;

                document.getElementById("a-element-materiel").classList.add("active");
                document.getElementById("a-element-materiel").innerText = data.navigation.materiel;

                document.getElementById("a-element-panier").classList.remove("active");
                document.getElementById("a-element-panier").innerText = data.navigation.panier;

                document.getElementById("a-element-contact").classList.remove("active");
                document.getElementById("a-element-contact").innerText = data.navigation.contact;

                document.getElementById("a-element-garantie").classList.remove("active");
                document.getElementById("a-element-garantie").innerText = data.navigation.garantie;

                document.getElementById("a-element-admin").classList.remove("active");

                main.innerHTML = "<h1>" + titre + "</h1><p>" + texte + "</p><div id='product-container'></div>";

                let productContainer = document.getElementById("product-container");

                for (let i = 0; i < produits.length; i++) {
                    if (produits[i].categories == "materiel" || produits[i].categories == "equipment") {

                        let imgSrc = "images/" + produits[i].id + "-1.png";

                        let productCard = document.createElement("div");

                        productCard.className = "product-card";
                        productCard.innerHTML = "<img alt='img' src='" + imgSrc + "'><p>" + produits[i].nom + "<br>" + (produits[i].prix * currentCurrencyTaux).toFixed(2) + " " + currentCurrencySymbol + "</p>";
                        productCard.setAttribute("onclick", "showDetails('" + produits[i].id + "')");
                        productCard.setAttribute("oncontextmenu", "showContextMenu('" + produits[i].id + "')");
                        productContainer.appendChild(productCard);
                    }
                }

            })
            .catch(error => {
                console.error('Erreur:', error);
            });

    } else if (view == "panier-view" || view == "cart-view") {

        fetch(langue + '.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                let titre = data.panierView.titre;
                let panierVideTexte = data.panierView.panierVideTexte;
                let titreColonneQuantite = data.panierView.titreColonneQuantite;
                let titreColonneProduits = data.panierView.titreColonneProduits;
                let titreColonnePrixUnit = data.panierView.titreColonnePrixUnit;
                let titreColonneTotal = data.panierView.titreColonneTotal;
                let titreLigneSousTotal = data.panierView.titreLigneSousTotal;
                let titreLigneTPS = data.panierView.titreLigneTPS;
                let titreLigneTVQ = data.panierView.titreLigneTVQ;
                let titreLigneTotal = data.panierView.titreLigneTotal;
                let btnSubmit = data.panierView.btnSubmit;

                document.getElementById("a-element-accueil").classList.remove("active");
                document.getElementById("a-element-accueil").innerText = data.navigation.accueil;

                document.getElementById("a-element-arbres").classList.remove("active");
                document.getElementById("a-element-arbres").innerText = data.navigation.arbre;

                document.getElementById("a-element-fleurs").classList.remove("active");
                document.getElementById("a-element-fleurs").innerText = data.navigation.fleurs;

                document.getElementById("a-element-materiel").classList.remove("active");
                document.getElementById("a-element-materiel").innerText = data.navigation.materiel;

                document.getElementById("a-element-panier").classList.add("active");
                document.getElementById("a-element-panier").innerText = data.navigation.panier;

                document.getElementById("a-element-contact").classList.remove("active");
                document.getElementById("a-element-contact").innerText = data.navigation.contact;

                document.getElementById("a-element-garantie").classList.remove("active");
                document.getElementById("a-element-garantie").innerText = data.navigation.garantie;

                document.getElementById("a-element-admin").classList.remove("active");

                main.innerHTML = "<h1>Panier</h1>";

                if (panier.length == 0) {
                    main.innerHTML = "<div><h1>" + titre + "</h1><div class='main-content'><p>" + panierVideTexte + "</p></div></div>";
                } else {
                    let container = document.createElement("div");
                    container.className = "main-content";

                    let table = document.createElement("table");

                    let headTr = document.createElement("tr");
                    headTr.innerHTML = "<th>" + titreColonneQuantite + "</th><th>" + titreColonneProduits + "</th><th>" + titreColonnePrixUnit + "</th><th>" + titreColonneTotal + "</th>";


                    main.append(container);

                    container.append(table);
                    table.append(headTr);

                    let sousTotal = 0;


                    for (let i = 0; i < panier.length; i++) {
                        let newRow = document.createElement("tr");
                        newRow.innerHTML = "<tr><td>" + panier[i][3] + "</td><td>" + panier[i][1] + "</td><td>" + panier[i][2] + " " + currentCurrencySymbol + "</td><td>" + (panier[i][2] * panier[i][3]).toFixed(2) + " " + currentCurrencySymbol + "</td></tr>";
                        table.append(newRow);

                        sousTotal += panier[i][2] * panier[i][3];
                    }

                    let totalContainer = document.createElement("table");
                    totalContainer.id = "total-container"



                    let sousTotalArrondie = sousTotal.toFixed(2);
                    let tps = (sousTotalArrondie * 0.05).toFixed(2);
                    let tvq = (sousTotalArrondie * 0.09975).toFixed(2);
                    let taxes = parseFloat(tps) + parseFloat(tvq);
                    let total = parseFloat(taxes) + parseFloat(sousTotalArrondie);

                    totalContainer.innerHTML = "<tr><td>" + titreLigneSousTotal + " :</td><td>" + sousTotalArrondie + " " + currentCurrencySymbol + "</td></tr><tr><td>" + titreLigneTPS + " :</td><td>" + tps + " " + currentCurrencySymbol + "</td></tr><tr><td>" + titreLigneTVQ + " :</td><td>" + tvq + " " + currentCurrencySymbol + "</td></tr><tr><td>" + titreLigneTotal + " :</td><td>" + total.toFixed(2) + " " + currentCurrencySymbol + "</td></tr>";

                    container.append(totalContainer);

                    let button = document.createElement("button");
                    button.innerHTML = btnSubmit;
                    button.id = "submit-btn";
                    button.setAttribute("onclick", "submit()");

                    main.append(button);
                    main.style.height = "100%";
                }

            })
            .catch(error => {
                console.error('Erreur:', error);
            });



    } else if (view == "contact-view") {
        fetch(langue + '.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                let titre = data.contactView.titre;
                let texte = data.contactView.texte;

                document.getElementById("a-element-accueil").classList.remove("active");
                document.getElementById("a-element-accueil").innerText = data.navigation.accueil;

                document.getElementById("a-element-arbres").classList.remove("active");
                document.getElementById("a-element-arbres").innerText = data.navigation.arbre;

                document.getElementById("a-element-fleurs").classList.remove("active");
                document.getElementById("a-element-fleurs").innerText = data.navigation.fleurs;

                document.getElementById("a-element-materiel").classList.remove("active");
                document.getElementById("a-element-materiel").innerText = data.navigation.materiel;

                document.getElementById("a-element-panier").classList.remove("active");
                document.getElementById("a-element-panier").innerText = data.navigation.panier;

                document.getElementById("a-element-contact").classList.add("active");
                document.getElementById("a-element-contact").innerText = data.navigation.contact;

                document.getElementById("a-element-garantie").classList.remove("active");
                document.getElementById("a-element-garantie").innerText = data.navigation.garantie;

                document.getElementById("a-element-admin").classList.remove("active");

                main.innerHTML = "<div><h1>" + titre + "</h1><div id='contact-content' class='main-content'>" + texte + "</div></div>";

            })
            .catch(error => {
                console.error('Erreur:', error);
            });


    } else if (view == "garantie-view" || view == "warranty-view") {
        fetch(langue + '.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                let titre = data.garantieView.titre;
                let texte = data.garantieView.texte;

                document.getElementById("a-element-accueil").classList.remove("active");
                document.getElementById("a-element-accueil").innerText = data.navigation.accueil;

                document.getElementById("a-element-arbres").classList.remove("active");
                document.getElementById("a-element-arbres").innerText = data.navigation.arbre;

                document.getElementById("a-element-fleurs").classList.remove("active");
                document.getElementById("a-element-fleurs").innerText = data.navigation.fleurs;

                document.getElementById("a-element-materiel").classList.remove("active");
                document.getElementById("a-element-materiel").innerText = data.navigation.materiel;

                document.getElementById("a-element-panier").classList.remove("active");
                document.getElementById("a-element-panier").innerText = data.navigation.panier;

                document.getElementById("a-element-contact").classList.add("active");
                document.getElementById("a-element-contact").innerText = data.navigation.contact;

                document.getElementById("a-element-garantie").classList.remove("active");
                document.getElementById("a-element-garantie").innerText = data.navigation.garantie;

                document.getElementById("a-element-admin").classList.remove("active");

                main.innerHTML = "<div><h1>" + titre + "</h1><div id='garantie-content' class='main-content'>" + texte + "</div></div>";

            })
            .catch(error => {
                console.error('Erreur:', error);
            });

    } else if (view == "search-view") {

        fetch(langue + '.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                let titre = data.searchView.titre;
                let aucunResultatMessage = data.searchView.aucunResultatMessage;

                document.getElementById("a-element-accueil").classList.remove("active");
                document.getElementById("a-element-accueil").innerText = data.navigation.accueil;

                document.getElementById("a-element-arbres").classList.remove("active");
                document.getElementById("a-element-arbres").innerText = data.navigation.arbre;

                document.getElementById("a-element-fleurs").classList.remove("active");
                document.getElementById("a-element-fleurs").innerText = data.navigation.fleurs;

                document.getElementById("a-element-materiel").classList.remove("active");
                document.getElementById("a-element-materiel").innerText = data.navigation.materiel;

                document.getElementById("a-element-panier").classList.remove("active");
                document.getElementById("a-element-panier").innerText = data.navigation.panier;

                document.getElementById("a-element-contact").classList.remove("active");
                document.getElementById("a-element-contact").innerText = data.navigation.contact;

                document.getElementById("a-element-garantie").classList.remove("active");
                document.getElementById("a-element-garantie").innerText = data.navigation.garantie;

                document.getElementById("a-element-admin").classList.remove("active");

                main.innerHTML = "<div><h1>" + titre + "</h1><div id='product-container'></div></div>";


                let productContainer = document.getElementById("product-container");

                let searchBarValue = document.getElementById("search-bar-input").value;
                let searchBar = searchBarValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                productContainer.innerHTML = ""; // Clear the previous results

                let resultatExiste = false;

                for (let i = 0; i < produits.length; i++) {

                    let produitNom = produits[i].nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                    if (produitNom.startsWith(searchBar)) {
                        let imgSrc = "images/" + produits[i].id + "-1.png";

                        let productCard = document.createElement("div");
                        productCard.className = "product-card";
                        productCard.innerHTML = "<img alt='img' src='" + imgSrc + "'><p>" + produits[i].nom + "<br>" + (produits[i].prix * currentCurrencyTaux).toFixed(2) + " " + currentCurrencySymbol + "</p>";
                        productCard.setAttribute("onclick", "showDetails('" + produits[i].id + "')");
                        productCard.setAttribute("oncontextmenu", "showContextMenu('" + produits[i].id + "')");
                        productContainer.appendChild(productCard);
                        resultatExiste = true;
                    }
                }

                if (!resultatExiste) {
                    main.innerHTML = "<div><h1>" + titre + "</h1><div class='main-content'><p>" + aucunResultatMessage + "</p></div></div>";
                }





            })
            .catch(error => {
                console.error('Erreur:', error);
            });

    } else if (view == "admin-view") {

        fetch(langue + '.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                let titre = data.adminView.titre;
                let labelUtilisateur = data.adminView.labelUtilisateur;
                let labelPassword = data.adminView.labelPassword;
                let btnSubmit = data.adminView.btnSubmit;
                let texte = data.adminView.texte;
                let btnSauvegarder = data.adminView.btnSauvegarder;
                let btnDeconnection = data.adminView.btnDeconnection;

                document.getElementById("a-element-accueil").classList.remove("active");
                document.getElementById("a-element-accueil").innerText = data.navigation.accueil;

                document.getElementById("a-element-arbres").classList.remove("active");
                document.getElementById("a-element-arbres").innerText = data.navigation.arbre;

                document.getElementById("a-element-fleurs").classList.remove("active");
                document.getElementById("a-element-fleurs").innerText = data.navigation.fleurs;

                document.getElementById("a-element-materiel").classList.remove("active");
                document.getElementById("a-element-materiel").innerText = data.navigation.materiel;

                document.getElementById("a-element-panier").classList.remove("active");
                document.getElementById("a-element-panier").innerText = data.navigation.panier;

                document.getElementById("a-element-contact").classList.remove("active");
                document.getElementById("a-element-contact").innerText = data.navigation.contact;

                document.getElementById("a-element-garantie").classList.remove("active");
                document.getElementById("a-element-garantie").innerText = data.navigation.garantie;

                document.getElementById("a-element-admin").classList.add("active");

                main.innerHTML =
                    `<div>
                <h1>`+ titre + `</h1>
                    <div id="login-section">
                        <label>`+ labelUtilisateur + ` :</label>
                        <input type="text" id="username" required>
                        <br>
                        <label>`+ labelPassword + ` :</label>
                        <input type="password" id="password" required>
                        <button id="submit-btn" onclick="login()">`+ btnSubmit + `</button>
                    </div>
                    <div id="admin-section" style="display:none;">
                        <p>`+ texte + `</p>
                        <textarea id="content"></textarea><br>
                        <button id="save-button">`+ btnSauvegarder + `</button>
                        <button id="logout-button" onclick="changeView('admin-view')">`+ btnDeconnection + `</button>
                    </div>
            </div>`;
                saveBtn();  // Appel de la fonction pour intéragir avec

            })
            .catch(error => {
                console.error('Erreur:', error);
            });

    }


}



// Afficher les détails en cliquant sur les cartes de produits
function showDetails(id) {

    for (let i = 0; i < produits.length; i++) {
        if (produits[i].id == id) {
            let detailView = document.getElementById("detail-view-container");
            detailView.hidden = false;
            document.body.style.overflow = 'hidden';

            let imgNumber = 1;
            let imgSrc = "images/" + produits[i].id + "-" + imgNumber + ".png";

            if (produits[i].stock == 0) {
                detailView.innerHTML = "<div id='detail-view'><button id='close-btn' onclick='closeDetail()'>X</button><div id='img-container'><img src='" + imgSrc + "' class='active-img'><div><button id='prev' onclick='prevImg(1," + id + ")' class='change-img-btn' ><</button><button id='next' onclick='nextImg(1," + id + ")' class='change-img-btn'>></button></div></div><div id='info-container'><h1>" + produits[i].nom + "</h1><p>" + produits[i].description + "</p><strong>" + (produits[i].prix * currentCurrencyTaux).toFixed(2) + " " + currentCurrencySymbol + "</strong><label>Quantité : </label><input id='selected-qte-produit-" + produits[i].id + "' type='number' value='1'><button id='add-btn' onclick='addToCart(" + produits[i].id + ")' disabled>Ajouter au panier</button><p class='erreur'>" + produits[i].stock + " items restants</p><div></div>";
            } else {
                detailView.innerHTML = "<div id='detail-view'><button id='close-btn' onclick='closeDetail()'>X</button><div id='img-container'><img src='" + imgSrc + "' class='active-img'><div><button id='prev' onclick='prevImg(1," + id + ")' class='change-img-btn' ><</button><button id='next' onclick='nextImg(1," + id + ")' class='change-img-btn'>></button></div></div><div id='info-container'><h1>" + produits[i].nom + "</h1><p>" + produits[i].description + "</p><strong>" + (produits[i].prix * currentCurrencyTaux).toFixed(2) + " " + currentCurrencySymbol + "</strong><label>Quantité : </label><input id='selected-qte-produit-" + produits[i].id + "' type='number' value='1'><button id='add-btn' onclick='addToCart(" + produits[i].id + ")'>Ajouter au panier</button><p id='erreur-stock-" + produits[i].id + "' class='erreur' hidden></p><p>" + produits[i].stock + " items restants</p></div>";
            }


        }
    }

}


// Ferme la vue détail
function closeDetail() {
    document.getElementById("detail-view-container").hidden = true;
    document.body.style.overflow = 'auto';

}



// ContextMenu (click-droit)
window.addEventListener("click", function () {
    let contextMenu = document.getElementById("context-menu-container");
    contextMenu.hidden = true;
    contextMenu.style.display = "";
})

function showContextMenu(id) {
    for (let i = 0; i < produits.length; i++) {
        if (produits[i].id == id) {
            let contextMenu = document.getElementById("context-menu-container");
            contextMenu.hidden = false;
            if (produits[i].stock == 0) {
                contextMenu.innerHTML = "<strong>En rupture de stock</strong><a onclick='showDetails(" + id + ")'>Voir les détails</a><a target='_blank' href='" + produits[i].wikipedia + "'>Wikipédia</a>"
            } else {
                contextMenu.innerHTML = "<a onclick='showDetails(" + id + ")'>Voir les détails</a><a target='_blank' href='" + produits[i].wikipedia + "'>Wikipédia</a><a onclick='addOneToCart(" + produits[i].id + ")' disabled>Ajouter au panier</a>"
            }
            contextMenu.style.display = "flex";
            window.addEventListener("contextmenu", function (e) {
                console.log(e);
                let x = e.pageX + "px";
                let y = e.pageY + "px";

                contextMenu.style.top = "calc(" + y + " - 150px)";
                contextMenu.style.left = "calc(" + x + " - 175px)";
                e.preventDefault()
            })


        }
    }

}



// ajout au panier et validation des stocks
function addOneToCart(id) {
    validateQte(id, 1);
}

function addToCart(id) {

    let selectedQte = parseInt(document.getElementById("selected-qte-produit-" + id).value);

    validateQte(id, selectedQte);
}

function validateQte(id, selectedQte) {
    let arrayPosition = id - 1;

    let stock = parseInt(produits[arrayPosition].stock);

    if (selectedQte <= stock) {
        if (panier.length == 0) {
            panier.push([
                produits[arrayPosition].id,
                produits[arrayPosition].nom,
                produits[arrayPosition].prix,
                selectedQte,
            ]);
            closeDetail();
            changeView("panier-view");

            let qteItemsContainer = document.getElementById("qte-items-container");
            qteItemsContainer.hidden = false;
            qteItemsPanier += selectedQte;
            qteItemsContainer.innerText = qteItemsPanier;

            produits[arrayPosition].stock = stock - selectedQte;
        } else {
            let produitExiste = false;

            for (let i = 0; i < panier.length; i++) {
                if (panier[i][0] == id) {
                    panier[i][3] += selectedQte;
                    produitExiste = true;
                    closeDetail();
                    changeView("panier-view");

                    let qteItemsContainer = document.getElementById("qte-items-container");
                    qteItemsContainer.hidden = false;
                    qteItemsPanier += selectedQte;
                    qteItemsContainer.innerText = qteItemsPanier;

                    produits[arrayPosition].stock = stock - selectedQte;
                    break;
                }
            }

            if (!produitExiste) {
                panier.push([
                    produits[arrayPosition].id,
                    produits[arrayPosition].nom,
                    produits[arrayPosition].prix,
                    selectedQte
                ]);
                closeDetail();
                changeView("panier-view");

                let qteItemsContainer = document.getElementById("qte-items-container");
                qteItemsContainer.hidden = false;
                qteItemsPanier += selectedQte;
                qteItemsContainer.innerText = qteItemsPanier;

                produits[arrayPosition].stock = stock - selectedQte;
            }
        }
    } else {
        let erreur = document.getElementById("erreur-stock-" + id);
        erreur.innerText = "Nombre d'articles en stock insuffisant."
        erreur.hidden = false;
    }
}



// Envoie de la commande
function submit() {
    let qteItemsContainer = document.getElementById("qte-items-container");
    qteItemsContainer.innerText = 0;
    qteItemsContainer.hidden = true;

    qteItemsPanier = 0;

    panier = [];

    changeView("accueil-view");

    alert("✔");
}



// Changement d'images sur le detail-view
function nextImg(active, id) {
    if (active < 3) {
        let imgNumber = active + 1;

        let src = "images/" + id + "-" + imgNumber + ".png";

        let img = document.querySelector(".active-img");
        img.src = src;

        let prevButton = document.getElementById("prev");
        prevButton.setAttribute("onclick", "prevImg(" + imgNumber + "," + id + ")");

        let nextButton = document.getElementById("next");
        nextButton.setAttribute("onclick", "nextImg(" + imgNumber + "," + id + ")");

    } else if (active == 3) {
        let imgNumber = 1;

        let src = "images/" + id + "-" + imgNumber + ".png";

        let img = document.querySelector(".active-img");
        img.src = src;

        let prevButton = document.getElementById("prev");
        prevButton.setAttribute("onclick", "prevImg(" + imgNumber + "," + id + ")");

        let nextButton = document.getElementById("next");
        nextButton.setAttribute("onclick", "nextImg(" + imgNumber + "," + id + ")");
    }
}

function prevImg(active, id) {
    if (active > 1) {
        let imgNumber = active - 1;

        let src = "images/" + id + "-" + imgNumber + ".png";

        let img = document.querySelector(".active-img");
        img.src = src;

        let prevButton = document.getElementById("prev");
        prevButton.setAttribute("onclick", "prevImg(" + imgNumber + "," + id + ")");

        let nextButton = document.getElementById("next");
        nextButton.setAttribute("onclick", "nextImg(" + imgNumber + "," + id + ")");

    } else if (active == 1) {
        let imgNumber = 3;

        let src = "images/" + id + "-" + imgNumber + ".png";

        let img = document.querySelector(".active-img");
        img.src = src;

        let prevButton = document.getElementById("prev");
        prevButton.setAttribute("onclick", "prevImg(" + imgNumber + "," + id + ")");

        let nextButton = document.getElementById("next");
        nextButton.setAttribute("onclick", "nextImg(" + imgNumber + "," + id + ")");
    }
}



// Search bar
let searchBarInput = document.getElementById("search-bar-input");

searchBarInput.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        search();
    }
});

function search() {
    main.className = "search-view";
    changeView("search-view");
}





//Appel de la fonction emplacement (emplacement.js)
emplacement();