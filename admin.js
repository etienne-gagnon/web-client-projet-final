function login(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if(username === 'admin' && password === 'admin'){
        localStorage.setItem('logged_in', 'true');
        showAdminSection();
        load_content_product();
    }else {
        alert('Identifiant ou mot de passe incorrect');
    }
}
function logout() {
    localStorage.removeItem('logged_in');
    window.location.href = 'charles.html';
}
document.getElementById('logout-button').addEventListener('click', logout);

function showAdminSection() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block';
}
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
function saveInFile(jsonText, fileName) {
    const a = document.createElement('a');
    const blob = new Blob([jsonText], {type: 'application/json'});
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}
document.getElementById('save-button').addEventListener('click', function() {
    const content = document.getElementById('content').value;
    if (confirm("Êtes-vous sûr de vouloir écraser le fichier Charles.json existant ?")) {
        saveInFile(content, langue + '.json');
    }
})
