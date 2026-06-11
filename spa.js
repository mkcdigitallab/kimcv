function chargerPage(nomDuFichier) {
    fetch(nomDuFichier)
        .then(response => {
            if (!response.ok) throw new Error("Fichier introuvable : " + nomDuFichier);
            return response.text();
        })
        .then(html => {
            const container = document.getElementById('app-content');
            container.innerHTML = html;
            
            // Ajustement d'affichage : Centré pour l'auth, étiré pour le tableau de bord
            if (nomDuFichier === 'bord.html') {
                container.style.justifyContent = "initial";
                container.style.alignItems = "initial";
            } else {
                container.style.justifyContent = "center";
                container.style.alignItems = "center";
            }
            
            initEcouteurs();
        })
        .catch(error => console.error("Erreur SPA critique :", error));
}

function initEcouteurs() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const togglePassword = document.getElementById('togglePassword');

    // Gestion de l'œil pour masquer/afficher le mot de passe
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                this.textContent = '👁';
            }
        });
    }

    // Soumission du formulaire de connexion vers le tableau de bord
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Insérez ici vos futurs appels API d'authentification
            chargerPage('bord.html'); 
        });
    }

    // Soumission du formulaire d'inscription vers le tableau de bord
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Insérez ici vos futurs appels API d'enregistrement
            chargerPage('bord.html'); 
        });
    }
}

// Initialisation de la SPA avec la page de connexion au tout premier chargement
window.addEventListener('DOMContentLoaded', () => {
    chargerPage('connexion.html');
});
