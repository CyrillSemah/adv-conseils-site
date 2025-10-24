// Script cookie-modal.js - Gestion de la modale de consentement aux cookies
document.addEventListener('DOMContentLoaded', function() {
  // Vérifier si l'utilisateur a déjà répondu à la modale
  if (!localStorage.getItem('cookieModalAnswered')) {
    // Charger la modale de cookie
    fetch('cookie.html')
      .then(response => response.text())
      .then(html => {
        // Insérer la modale au début du body
        document.body.insertAdjacentHTML('afterbegin', html);
        
        // Attendre que les éléments soient bien insérés dans le DOM
        setTimeout(function() {
          const modal = document.getElementById('cookie-modal');
          const overlay = document.getElementById('cookie-overlay');
          const btnYes = document.getElementById('accept-cookies');
          const btnNo = document.getElementById('reject-cookies');

          if (!modal || !overlay || !btnYes || !btnNo) return;

          const userLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
          document.querySelectorAll('#cookie-modal [lang]').forEach(el => {
            el.style.display = (el.getAttribute('lang') === userLang) ? 'inline' : 'none';
          });

          overlay.classList.remove('hidden');
          modal.classList.remove('hidden');

          function closeModal(consentValue) {
            localStorage.setItem('cookieModalAnswered', 'true');
            localStorage.setItem('cookies-consent', consentValue);
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
          }

          btnYes.addEventListener('click', () => {
            closeModal('accepted');
 
            // Injecter Google Analytics seulement après acceptation
            const scriptTag = document.createElement('script');
            scriptTag.setAttribute('async', '');
            scriptTag.src = "https://www.googletagmanager.com/gtag/js?id=G-D29QTM7BTW";
            document.head.appendChild(scriptTag);
 
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-D29QTM7BTW');
          });
          btnNo.addEventListener('click', () => closeModal('rejected'));
        }, 100);
      })
      .catch(err => {
        console.error('Erreur chargement cookie.html', err);
      });
  }
});