/**
 * main.js - Script principal pour le site ADV Conseils
 */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  // Charger les composants partagés (navbar et footer)
  loadSharedComponents();
  
  // Initialiser les animations au défilement
  initScrollAnimations();
});

/**
 * Charge les composants partagés (navbar et footer)
 */
function loadSharedComponents() {
  // Charger la navbar
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    fetch('/navbar.html')
      .then(response => response.text())
      .then(data => {
        navbarPlaceholder.innerHTML = data;
        
        // Une fois la navbar chargée, initialiser son comportement
        initNavbar();
        
        // Marquer le lien actif dans la navbar
        highlightActiveNavLink();
      })
      .catch(error => {})
  }
  
  // Charger le footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('/footer.html')
      .then(response => response.text())
      .then(data => {
        footerPlaceholder.innerHTML = data;
      })
      .catch(error => {})
  }
}

  // Charger le footer
  const creditPlaceholder = document.getElementById('credit-placeholder');
  if (creditPlaceholder) {
    fetch('/credit.html')
      .then(response => response.text())
      .then(data => {
        creditPlaceholder.innerHTML = data;
      })
      .catch(error => {})
  }

/**
 * Initialise les animations au défilement
 */
function initScrollAnimations() {
  // Sélectionner tous les éléments avec des classes d'animation
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  
  // Observer les éléments pour déclencher l'animation quand ils sont visibles
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Si l'élément est visible
      if (entry.isIntersecting) {
        // Ajouter la classe 'animate' pour déclencher l'animation
        entry.target.classList.add('animate');
        // Arrêter d'observer l'élément une fois qu'il est animé
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Déclencher quand au moins 10% de l'élément est visible
  });
  
  // Observer chaque élément animé
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Met en évidence le lien actif dans la navbar
 */
function highlightActiveNavLink() {
  // Obtenir le chemin de la page actuelle
  const currentPath = window.location.pathname;
  const filename = currentPath.split('/').pop();
  
  // Sélectionner tous les liens de la navbar
  const navLinks = document.querySelectorAll('.navbar-links a');
  
  // Parcourir les liens et marquer le lien actif
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Si le href correspond à la page actuelle ou si c'est la page d'accueil
    if (linkHref === filename || (filename === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Fonction pour valider le formulaire de contact
 */
function validateContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', function(event) {
    let isValid = true;
    
    // Valider le nom
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      showError(name, 'Veuillez entrer votre nom');
      isValid = false;
    } else {
      clearError(name);
    }
    
    // Valider l'email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
      showError(email, 'Veuillez entrer une adresse email valide');
      isValid = false;
    } else {
      clearError(email);
    }
    
    // Valider le message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      showError(message, 'Veuillez entrer votre message');
      isValid = false;
    } else {
      clearError(message);
    }
    
    // Empêcher l'envoi du formulaire si non valide
    if (!isValid) {
      event.preventDefault();
    }
  });
  
  // Fonctions d'aide pour afficher/masquer les erreurs
  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorElement);
    }
    
    input.classList.add('error');
  }
  
  function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
      formGroup.removeChild(errorElement);
    }
    
    input.classList.remove('error');
  }
}

// Initialiser la validation du formulaire de contact quand le DOM est chargé
document.addEventListener('DOMContentLoaded', validateContactForm);

// === Cookie Consent Modal ADV Conseils (2 boutons, multilingue) ===
window.initCookieModal = function () {
  const modal = document.getElementById("cookie-modal");
  const overlay = document.getElementById("cookie-overlay");
  const btnYes = document.getElementById("accept-cookies");
  const btnNo = document.getElementById("reject-cookies");

  if (!modal || !overlay || !btnYes || !btnNo) {
    setTimeout(window.initCookieModal, 100);
    return;
  }

  const userLang = navigator.language.startsWith("fr") ? "fr" : "en";
  document.querySelectorAll('#cookie-modal [lang]').forEach(el => {
    el.style.display = (el.getAttribute('lang') === userLang) ? 'inline' : 'none';
  });

  if (!localStorage.getItem('cookieModalAnswered')) {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
  }

  function closeModal(consentValue) {
    localStorage.setItem("cookieModalAnswered", "true");
    localStorage.setItem("cookies-consent", consentValue);
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }

  btnYes.onclick = function () {
    closeModal("accepted");
  };

  btnNo.onclick = function () {
    closeModal("rejected");
  };
};



// Gestion AJAX de l'envoi du formulaire contact avec notification utilisateur
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      // On laisse la validation existante faire son travail
      if (typeof validateContactForm === 'function') {
        // Si la validation échoue, on ne continue pas
        if (!form.checkValidity()) return;
      }
      e.preventDefault();
      const formData = new FormData(form);
      fetch("send-mail.php", {
        method: "POST",
        body: formData,
      })
        .then(res => res.text())
        .then(result => {
          if (result.trim() === "success") {
            showNotification("Message envoyé avec succès !", true);
            form.reset();
          } else {
            showNotification("Une erreur est survenue. Veuillez réessayer.", false);
          }
        })
        .catch(() => {
          showNotification("Erreur réseau. Vérifiez votre connexion.", false);
        });
    });
  }

  function showNotification(message, success = true) {
    const notif = document.createElement("div");
    notif.className = "contact-notif " + (success ? "success" : "error");
    notif.innerText = message;
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.remove();
    }, 4000);
  }
});

// === Carte Mapbox sur la page de contact ===
document.addEventListener('DOMContentLoaded', function () {
  const mapContainer = document.getElementById('map');

  if (mapContainer) {
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js';
    script.onload = () => {
      if (typeof mapboxgl !== 'undefined' && mapboxgl.Map) {
        mapboxgl.accessToken = 'pk.eyJ1IjoidmlkYWwtZGlkaWVyIiwiYSI6ImNtOXBnZzN3bDE5b2YybnIwY2oxZXdpcWUifQ.QOdGTyI6B2AzWwSzSD-c2g';

        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [2.340576, 48.879711],
          zoom: 15
        });

        const popup = new mapboxgl.Popup({ offset: 35, closeButton: false })  
          .setHTML("<strong>ADV CONSEILS</strong><br>3 Square Trudaine<br>75009 Paris");

        new mapboxgl.Marker()
                  .setLngLat([2.340576, 48.879711])
                  .setPopup(popup)
                  .addTo(map);

        popup.addTo(map); // Affiche automatiquement le popup

        map.on('load', () => {
          map.resize();
        });
      }
    };
    document.head.appendChild(script);
  }
});