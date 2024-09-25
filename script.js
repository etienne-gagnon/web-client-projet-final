// Produits 
let produits = [];

// Variables 
let qteItemsPanier = 0;
let panier = [];
let menuElements = document.getElementsByClassName("menuElements");
let nav = document.getElementById("nav");
let main = document.getElementById("main");
let langue = "Francais";

console.log(langue);

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

fetchProduits();

function changeLangue(value) {
    langue = value;
    console.log(langue);

    changeView("accueil-view");
    
    fetchProduits().then(() => {
        let currentView = document.getElementById("main").className;
        changeView(currentView);
    });
}


// Afficher le bon contenu en fonction du tag <a> sélectionné
document.body.addEventListener("onload", changeView("accueil-view"));



for(let i = 0;i<menuElements.length;i++){
   
    menuElements[i].addEventListener("click", function() {
        let innerText = menuElements[i].innerText;
        
        let menuElement = innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 

        let pageView = menuElement + "-view";
        
        nav.className = pageView;
        main.className = pageView;

        changeView(pageView);
        closeDetail();
    });
}

function changeView(view){

    if(view == "accueil-view"){
        document.getElementById("a-element-accueil").classList.add("active");
        document.getElementById("a-element-arbres").classList.remove("active");
        document.getElementById("a-element-fleurs").classList.remove("active");
        document.getElementById("a-element-materiel").classList.remove("active");
        document.getElementById("a-element-panier").classList.remove("active");
        document.getElementById("a-element-contact").classList.remove("active");
        document.getElementById("a-element-garantie").classList.remove("active");
        
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

            main.innerHTML = "<div id='mot-bienvenue'><h1>"+titre+"</h1><p>"+texte+"</p></div><img id='background-img' src='images/background.jpg'>";

        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    
        

    } else if (view == "arbres-view"){
        document.getElementById("a-element-accueil").classList.remove("active");
        document.getElementById("a-element-arbres").classList.add("active");
        document.getElementById("a-element-fleurs").classList.remove("active");
        document.getElementById("a-element-materiel").classList.remove("active");
        document.getElementById("a-element-panier").classList.remove("active");
        document.getElementById("a-element-contact").classList.remove("active");
        document.getElementById("a-element-garantie").classList.remove("active");

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

            main.innerHTML = "<h1>"+titre+"</h1><p>"+texte+"</p><div id='product-container'></div>";

            let productContainer = document.getElementById("product-container");

            for(let i = 0;i < produits.length;i++){
                if(produits[i].categories == "arbre" || produits[i].categories == "tree" ){
                    
                        let imgSrc = "images/"+produits[i].id+"-1.png";
    
                        let productCard = document.createElement("div");
    
                            productCard.className = "product-card";
                            productCard.innerHTML = "<img alt='img' src='"+imgSrc+"'><p>"+produits[i].nom+"<br>"+produits[i].prix+"$</p>";
                            productCard.setAttribute("onclick", "showDetails('"+produits[i].id+"')");
                            productCard.setAttribute("oncontextmenu", "showContextMenu('"+produits[i].id+"')");
                            productContainer.appendChild(productCard);             
                }
            }     

        })
        .catch(error => {
            console.error('Erreur:', error);
        });

        
       
    
    } else if (view == "fleurs-view"){
        document.getElementById("a-element-accueil").classList.remove("active");
        document.getElementById("a-element-arbres").classList.remove("active");
        document.getElementById("a-element-fleurs").classList.add("active");
        document.getElementById("a-element-materiel").classList.remove("active");
        document.getElementById("a-element-panier").classList.remove("active");
        document.getElementById("a-element-contact").classList.remove("active");
        document.getElementById("a-element-garantie").classList.remove("active");

               
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

            main.innerHTML = "<h1>"+titre+"</h1><p>"+texte+"</p><div id='product-container'></div>";

            let productContainer = document.getElementById("product-container");

            for(let i = 0;i < produits.length;i++){
                if(produits[i].categories == "fleur" || produits[i].categories == "flower" ){
                    
                        let imgSrc = "images/"+produits[i].id+"-1.png";
    
                        let productCard = document.createElement("div");
    
                            productCard.className = "product-card";
                            productCard.innerHTML = "<img alt='img' src='"+imgSrc+"'><p>"+produits[i].nom+"<br>"+produits[i].prix+"$</p>";
                            productCard.setAttribute("onclick", "showDetails('"+produits[i].id+"')");
                            productCard.setAttribute("oncontextmenu", "showContextMenu('"+produits[i].id+"')");
                            productContainer.appendChild(productCard);             
                }
            }     
            
        })
        .catch(error => {
            console.error('Erreur:', error);
        });

    } else if (view == "materiel-view"){
        document.getElementById("a-element-accueil").classList.remove("active");
        document.getElementById("a-element-arbres").classList.remove("active");
        document.getElementById("a-element-fleurs").classList.remove("active");
        document.getElementById("a-element-materiel").classList.add("active");
        document.getElementById("a-element-panier").classList.remove("active");
        document.getElementById("a-element-contact").classList.remove("active");
        document.getElementById("a-element-garantie").classList.remove("active");

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

            main.innerHTML = "<h1>"+titre+"</h1><p>"+texte+"</p><div id='product-container'></div>";

            let productContainer = document.getElementById("product-container");

            for(let i = 0;i < produits.length;i++){
                if(produits[i].categories == "materiel" || produits[i].categories == "equipment" ){
                    
                        let imgSrc = "images/"+produits[i].id+"-1.png";
    
                        let productCard = document.createElement("div");
    
                            productCard.className = "product-card";
                            productCard.innerHTML = "<img alt='img' src='"+imgSrc+"'><p>"+produits[i].nom+"<br>"+produits[i].prix+"$</p>";
                            productCard.setAttribute("onclick", "showDetails('"+produits[i].id+"')");
                            productCard.setAttribute("oncontextmenu", "showContextMenu('"+produits[i].id+"')");
                            productContainer.appendChild(productCard);             
                }
            }     
            
        })
        .catch(error => {
            console.error('Erreur:', error);
        });

    } else if (view == "panier-view"){
        document.getElementById("a-element-accueil").classList.remove("active");
        document.getElementById("a-element-arbres").classList.remove("active");
        document.getElementById("a-element-fleurs").classList.remove("active");
        document.getElementById("a-element-materiel").classList.remove("active");
        document.getElementById("a-element-panier").classList.add("active");
        document.getElementById("a-element-contact").classList.remove("active");
        document.getElementById("a-element-garantie").classList.remove("active");

        main.innerHTML = "<h1>Panier</h1>";

        if(panier.length == 0){
            main.innerHTML = "<div><h1>Panier</h1><div class='main-content'><p>Votre panier est vide...</p></div></div>";
        }else{
            let container = document.createElement("div");
                container.className = "main-content";

            let table = document.createElement("table");
        
            let headTr = document.createElement("tr");
                headTr.innerHTML = "<th>Quantité</th><th>Produits</th><th>Prix unit.</th><th>Total</th>";


            main.append(container);

            container.append(table);
            table.append(headTr);

            let sousTotal = 0;


            for(let i = 0;i<panier.length;i++){
                let newRow = document.createElement("tr");
                    newRow.innerHTML = "<tr><td>"+panier[i][3]+"</td><td>"+panier[i][1]+"</td><td>"+panier[i][2]+" $</td><td>"+(panier[i][2]*panier[i][3]).toFixed(2)+" $</td></tr>";
                    table.append(newRow);
                    
                    sousTotal += panier[i][2]*panier[i][3];
            }

            let totalContainer = document.createElement("table");
                totalContainer.id = "total-container"


                
                let sousTotalArrondie = sousTotal.toFixed(2);
                let tps = (sousTotalArrondie * 0.05 ).toFixed(2);
                let tvq = (sousTotalArrondie * 0.09975 ).toFixed(2);
                let taxes = parseFloat(tps) + parseFloat(tvq);
                let total = parseFloat(taxes) + parseFloat(sousTotalArrondie);

                totalContainer.innerHTML = "<tr><td>Sous-total :</td><td>"+sousTotalArrondie+" $</td></tr><tr><td>TPS :</td><td>"+tps+" $</td></tr><tr><td>TVQ :</td><td>"+tvq+" $</td></tr><tr><td>Total :</td><td>"+total.toFixed(2)+" $</td></tr>";

                container.append(totalContainer);

                let button = document.createElement("button");
                    button.innerHTML = "Passer la commande";
                    button.id = "submit-btn";
                    button.setAttribute("onclick", "submit()");

                main.append(button);
                main.style.height = "100%";
        }
    }else if(view == "contact-view"){
        document.getElementById("a-element-accueil").classList.remove("active");
        document.getElementById("a-element-arbres").classList.remove("active");
        document.getElementById("a-element-fleurs").classList.remove("active");
        document.getElementById("a-element-materiel").classList.remove("active");
        document.getElementById("a-element-panier").classList.remove("active");
        document.getElementById("a-element-contact").classList.add("active");
        document.getElementById("a-element-garantie").classList.remove("active");
        main.innerHTML = "<div><h1>Contact</h1><div id='contact-content' class='main-content'><p>Nous sommes toujours heureux de répondre à vos questions et de vous aider à trouver les plantes parfaites pour votre jardin. <br><br> N'hésitez pas à nous contacter par les moyens suivants :</p><ul><li><strong>Adresse :</strong> 123 Rue des Jardins, Ville des Fleurs, QC, G1A 2B3</li><li><strong>Téléphone :</strong> (123) 456-7890</li><li><strong>Courriel :</strong> <a href='mailto:contact@lapeppiniere.com'>contact@lapeppiniere.com</a></li><li><strong>Heures d'ouverture :</strong> Lundi à Vendredi : 9h00 - 18h00, Samedi : 9h00 - 17h00, Dimanche : Fermé</li></ul></div></div>";
    }else if(view == "garantie-view"){
        document.getElementById("a-element-accueil").classList.remove("active");
        document.getElementById("a-element-arbres").classList.remove("active");
        document.getElementById("a-element-fleurs").classList.remove("active");
        document.getElementById("a-element-materiel").classList.remove("active");
        document.getElementById("a-element-panier").classList.remove("active");
        document.getElementById("a-element-contact").classList.remove("active");
        document.getElementById("a-element-garantie").classList.add("active");
        main.innerHTML = "<div><h1>Garantie</h1><div id='garantie-content' class='main-content'><p>Chez La Pépinière, votre satisfaction est notre priorité. Nous nous engageons à vous fournir des plantes de la plus haute qualité, soigneusement sélectionnées et emballées pour assurer qu'elles arrivent en parfait état chez vous.</p><ul><li><strong>Plantes en bonne santé :</strong> Chaque plante expédiée est inspectée par nos experts pour s'assurer qu'elle est en parfaite santé, sans parasites ni maladies.</li><li><strong>Satisfaction à 100% :</strong> Si, pour une raison quelconque, vous n'êtes pas entièrement satisfait de votre achat, nous nous engageons à remplacer la plante concernée ou à vous offrir un crédit en magasin valable pour un futur achat.</li><li><strong>Livraison sécurisée :</strong> Nous utilisons des méthodes d'emballage sécurisées pour garantir que vos plantes arrivent intactes, prêtes à embellir votre espace. Si votre plante est endommagée lors du transport, nous vous la remplacerons sans frais supplémentaires.</li></ul><p><strong>Conditions de la garantie :</strong></p><ul><li>La réclamation doit être faite dans les 7 jours suivant la réception de la commande.</li><li>Les réclamations doivent être accompagnées de photos claires de la plante concernée et de l'emballage.</li></ul><p>Chez <strong>La Pépinière</strong>, nous sommes fiers de la qualité de nos plantes et de notre service client. Nous nous engageons à rendre votre expérience d'achat en ligne simple, agréable et sans souci.</p></div></div>";
    }else if(view == "search-view"){
        document.getElementById("a-element-accueil").classList.remove("active");
        document.getElementById("a-element-arbres").classList.remove("active");
        document.getElementById("a-element-fleurs").classList.remove("active");
        document.getElementById("a-element-materiel").classList.remove("active");
        document.getElementById("a-element-panier").classList.remove("active");
        document.getElementById("a-element-contact").classList.remove("active");
        document.getElementById("a-element-garantie").classList.remove("active");
        main.innerHTML = "<div><h1>Voici les résultats...</h1><div id='product-container'></div></div>";
    }
    
    
}



// Afficher les détails en cliquant sur les cartes de produits
function showDetails(id){

    for(let i = 0;i < produits.length;i++){
        if(produits[i].id == id){
                let detailView = document.getElementById("detail-view-container");
                detailView.hidden = false;
                document.body.style.overflow = 'hidden';

                let imgNumber = 1;
                let imgSrc = "images/"+produits[i].id+"-"+imgNumber+".png";
                
                if(produits[i].stock == 0){
                    detailView.innerHTML = "<div id='detail-view'><button id='close-btn' onclick='closeDetail()'>X</button><div id='img-container'><img src='"+imgSrc+"' class='active-img'><div><button id='prev' onclick='prevImg(1,"+id+")' class='change-img-btn' ><</button><button id='next' onclick='nextImg(1,"+id+")' class='change-img-btn'>></button></div></div><div id='info-container'><h1>"+produits[i].nom+"</h1><p>"+produits[i].description+"</p><strong>"+produits[i].prix+"$</strong><label>Quantité : </label><input id='selected-qte-produit-"+produits[i].id+"' type='number' value='1'><button id='add-btn' onclick='addToCart("+produits[i].id+")' disabled>Ajouter au panier</button><p class='erreur'>"+produits[i].stock+" items restants</p><div></div>";
                }else{
                    detailView.innerHTML = "<div id='detail-view'><button id='close-btn' onclick='closeDetail()'>X</button><div id='img-container'><img src='"+imgSrc+"' class='active-img'><div><button id='prev' onclick='prevImg(1,"+id+")' class='change-img-btn' ><</button><button id='next' onclick='nextImg(1,"+id+")' class='change-img-btn'>></button></div></div><div id='info-container'><h1>"+produits[i].nom+"</h1><p>"+produits[i].description+"</p><strong>"+produits[i].prix+"$</strong><label>Quantité : </label><input id='selected-qte-produit-"+produits[i].id+"' type='number' value='1'><button id='add-btn' onclick='addToCart("+produits[i].id+")'>Ajouter au panier</button><p id='erreur-stock-"+produits[i].id+"' class='erreur' hidden></p><p>"+produits[i].stock+" items restants</p></div>";
                }
        
                
        }
    } 

}

function closeDetail(){
    document.getElementById("detail-view-container").hidden = true;
    document.body.style.overflow = 'auto';

}



// ContextMenu (click-droit)
window.addEventListener("click", function (){
    let contextMenu = document.getElementById("context-menu-container");
        contextMenu.hidden = true;
        contextMenu.style.display = "";
})

function showContextMenu(id) {
    for(let i = 0;i < produits.length;i++){
        if(produits[i].id == id){
            let contextMenu = document.getElementById("context-menu-container");
                contextMenu.hidden = false;
                if(produits[i].stock == 0){
                    contextMenu.innerHTML = "<strong>En rupture de stock</strong><a onclick='showDetails(" +id+ ")'>Voir les détails</a><a target='_blank' href='"+produits[i].wikipedia+"'>Wikipédia</a>"
                }else{
                    contextMenu.innerHTML = "<a onclick='showDetails(" +id+ ")'>Voir les détails</a><a target='_blank' href='"+produits[i].wikipedia+"'>Wikipédia</a><a onclick='addOneToCart("+produits[i].id+")' disabled>Ajouter au panier</a>"
                }
                contextMenu.style.display = "flex";
                window.addEventListener("contextmenu", function (e){
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
function addOneToCart(id){
    validateQte(id, 1);
}

function addToCart(id){
   
    let selectedQte = parseInt(document.getElementById("selected-qte-produit-"+id).value);

    validateQte(id, selectedQte);
}

function validateQte(id, selectedQte){
    let arrayPosition = id - 1;

    let stock = parseInt(produits[arrayPosition].stock);

    if(selectedQte <= stock){
        if(panier.length == 0){
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
        
            for(let i = 0; i < panier.length; i++){
                if(panier[i][0] == id){
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
    }else{
        let erreur = document.getElementById("erreur-stock-"+id);
            erreur.innerText = "Nombre d'articles en stock insuffisant."
            erreur.hidden = false;
    }
}



// Envoie de la commande
function submit(){
    let qteItemsContainer = document.getElementById("qte-items-container");
         qteItemsContainer.innerText = 0;
         qteItemsContainer.hidden = true;

         qteItemsPanier = 0;
    
    panier = [];

    changeView("accueil-view");

    main.innerHTML = "<div id='mot-bienvenue'><h1>Merci !</h1><p>Nous avons bien recu votre commande.</p></div><img id='background-img' src='images/background.jpg'>";
}



// Changement d'images sur le detail-view
function nextImg(active, id){
    if(active < 3){
        let imgNumber = active + 1;

        let src = "images/"+id+"-"+imgNumber+".png";

        let img = document.querySelector(".active-img");
            img.src = src;    
    
        let prevButton = document.getElementById("prev");
            prevButton.setAttribute("onclick","prevImg("+imgNumber+","+id+")");

        let nextButton = document.getElementById("next");
            nextButton.setAttribute("onclick","nextImg("+imgNumber+","+id+")");
        
    }else if(active == 3){
        let imgNumber = 1;

        let src = "images/"+id+"-"+imgNumber+".png";

        let img = document.querySelector(".active-img");
            img.src = src;    
    
        let prevButton = document.getElementById("prev");
            prevButton.setAttribute("onclick","prevImg("+imgNumber+","+id+")");

        let nextButton = document.getElementById("next");
            nextButton.setAttribute("onclick","nextImg("+imgNumber+","+id+")");
    }
}

function prevImg(active, id){
    if(active > 1){
        let imgNumber = active - 1;

        let src = "images/"+id+"-"+imgNumber+".png";

        let img = document.querySelector(".active-img");
            img.src = src;    
    
        let prevButton = document.getElementById("prev");
        prevButton.setAttribute("onclick","prevImg("+imgNumber+","+id+")");

        let nextButton = document.getElementById("next");
        nextButton.setAttribute("onclick","nextImg("+imgNumber+","+id+")");
        
    }else if(active == 1){
        let imgNumber = 3;

        let src = "images/"+id+"-"+imgNumber+".png";

        let img = document.querySelector(".active-img");
            img.src = src;    
    
        let prevButton = document.getElementById("prev");
            prevButton.setAttribute("onclick","prevImg("+imgNumber+","+id+")");

        let nextButton = document.getElementById("next");
            nextButton.setAttribute("onclick","nextImg("+imgNumber+","+id+")");
    }
}



// Search bar
let searchBarInput = document.getElementById("search-bar-input");

searchBarInput.addEventListener("keyup", function (event) {
    if(event.keyCode == 13){
        search();
    }
});

function search(){
    changeView("search-view");

    let productContainer = document.getElementById("product-container");

    let searchBarValue = document.getElementById("search-bar-input").value;
    let searchBar = searchBarValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    let resultatExiste = false;

    for(let i = 0;i < produits.length;i++){
    
        let produitNom = produits[i].nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        if(produitNom.startsWith(searchBar)){
            let imgSrc = "images/"+produits[i].id+"-1.png";

            let productCard = document.createElement("div");
                productCard.className = "product-card";
                productCard.innerHTML = "<img alt='img' src='"+imgSrc+"'><p>"+produits[i].nom+"<br>"+produits[i].prix+"$</p>";
                productCard.setAttribute("onclick", "showDetails('"+produits[i].id+"')");
                productCard.setAttribute("oncontextmenu", "showContextMenu('"+produits[i].id+"')");
                productContainer.appendChild(productCard);
                resultatExiste = true;
        }
    }

    if(!resultatExiste){
        main.innerHTML = "<div><h1>Voici les résultats...</h1><div class='main-content'><p>Aucun produits n'a été trouvé</p></div></div>";
    }




}
