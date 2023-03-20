const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');
const mobilMenuElement = document.getElementById('mobile-menu');

function toggleMobileMenu(){
    mobilMenuElement.classList.toggle('open');
}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);