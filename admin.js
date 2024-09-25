//Fonction pour se connecter au menu Admin
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Seule l'admin avec les bon code peu y accéder.
    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('logged_in', 'true');
        showAdminSection();
        load_content_product();
    } else {
        alert('Identifiant ou mot de passe incorrect');
    }
}

// Fonction pour pouvoir voir les éléments modifiables.
function showAdminSection() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block';
}

// Fonction pour charger tout ce que contient les element json.
function load_content_product() {
    const textarea = document.getElementById('content');

    fetch(langue + '.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement du fichier JSON");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            textarea.value = JSON.stringify(data, null, 4);
        })
        .catch(error => {
            console.error("Une erreur s'est produite :", error);
            textarea.value = "Erreur lors du chargement des données JSON.";
        })
}
// Fonction pour sauvegarder
function saveInFile(jsonText, fileName) {
    const a = document.createElement('a');
    const blob = new Blob([jsonText], { type: 'application/json' });
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}

// Pour pouvoir intéragir et appeler la fonciton dans le script principale.
function saveBtn() {
    document.getElementById('save-button').addEventListener('click', function () {
        const content = document.getElementById('content').value;
        saveInFile(content, langue + '.json');
    })
}
