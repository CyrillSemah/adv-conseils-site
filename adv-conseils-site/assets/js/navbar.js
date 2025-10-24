/**
 * navbar.js - Script pour gérer le comportement de la barre de navigation
 */

// Initialiser la navbar une fois qu'elle est chargée
function initNavbar() {
  // Sélectionner les éléments de la navbar
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarLinks = document.querySelector('.navbar-links');
  
  // Ajouter un écouteur d'événement pour le menu burger
  if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
      // Basculer la classe active pour le menu burger
      this.classList.toggle('active');
      
      // Basculer la classe active pour les liens de navigation
      navbarLinks.classList.toggle('active');
    });
  }
  
  // Fermer le menu mobile lorsqu'un lien est cliqué
  const navItems = document.querySelectorAll('.navbar-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Si le menu est ouvert (en mode mobile), le fermer
      if (window.innerWidth <= 768 && navbarLinks.classList.contains('active')) {
        navbarLinks.classList.remove('active');
        navbarToggle.classList.remove('active');
      }
    });
  });
  
  // Ajouter un effet de défilement pour la navbar
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    // Ajouter une classe 'scrolled' lorsque l'utilisateur défile
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Marquer le lien actif dans la navbar
  highlightActiveNavLink();

  // Animation logo ADV Conseils (hover)
  const navbarLogo = document.getElementById('navbar-logo');
  if (navbarLogo) {
    const logoContent = navbarLogo.querySelector('.navbar-logo-content');
    const logoHover = navbarLogo.querySelector('.navbar-logo-hover');
    // Sécurité : reset affichages
    if (logoContent && logoHover) {
      logoContent.style.display = '';
      logoHover.style.display = '';
      navbarLogo.addEventListener('mouseenter', () => {
        logoContent.style.opacity = '0';
        logoHover.style.opacity = '1';
      });
      navbarLogo.addEventListener('mouseleave', () => {
        logoContent.style.opacity = '1';
        logoHover.style.opacity = '0';
      });
    }
  }


  /**
   * Met en évidence le lien actif dans la navbar
   */
  function highlightActiveNavLink() {
    // Obtenir le chemin de la page actuelle
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop() || 'index.html';
    
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
}

// Exécuter initNavbar si le document est déjà chargé
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    initNavbar();
  }
}