//ELEMENTS OF DOM
let blueBarOfNavbar = document.querySelectorAll('.blue-bar');
let body = document.body;
let moonIcon = document.querySelector('.fa-solid.fa-moon');
let sunIcon = document.querySelector('.fa-sharp.fa-solid.fa-sun');
let navbar = document.querySelector('nav');
let navbarButtons = document.querySelectorAll('.navbar-button');
let dropdown = document.querySelector('.dropdown-content');
let mobileMenu = document.querySelector('.menu');
let containerCenter = document.querySelector('.container-center');
let containerNormal = document.querySelector('.container');
let headerImagesForHome = document.querySelectorAll('.site-header img');
let loginContainer = document.querySelector('.container-login');


if (containerNormal != null) var containerNormalElements = containerNormal.querySelectorAll('*');
if (containerCenter != null) var containerCenterElements = containerCenter.querySelectorAll('*');

moonIcon.addEventListener('click', darkMode);
sunIcon.addEventListener('click', whiteMode);


currentNavigationMode();


function currentNavigationMode() {
    if (localStorage.getItem('mode') == 'dark') {
        darkMode();
    } else {
        whiteMode();
    }
}

function darkMode() {
    body.removeAttribute('style');

    setTimeout(() => {
        document.body.style.animation = 'fadeIn 0.75s ease-in-out';
    }, 10);

    body.style.backgroundColor = 'rgb(20, 21, 41)';
    applyDarkStylesToContainer();

    navbar.classList.add('dark-navbar');
    navbarButtons.forEach(element => {
        element.children[0].style.color = 'white';
    });

    blueBarOfNavbar.forEach(element => {
        element.classList.add('white-bar');
    });

    mobileMenu.children[0].style.color = 'white';
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
    localStorage.setItem('mode', 'dark');

}

function whiteMode() {
    document.body.removeAttribute('style');
    setTimeout(() => {
        document.body.style.animation = 'fadeIn 0.75s ease-in-out';
    }, 10);
    navbar.classList.remove('dark-navbar');
    navbarButtons.forEach(element => {
        element.children[0].removeAttribute('style');
    });
    mobileMenu.children[0].removeAttribute('style');


    removeDarkStylesOfContainer();


    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';

    localStorage.setItem('mode', 'white');
}


function applyDarkStylesToContainer() {
    if (containerCenter == null && containerNormal != null) {
        containerNormalElements.forEach(element => {

            if (element.className == 'form-control') {
                element.classList.add('dark-input');
            } else if (element.tagName != 'I') {
                element.classList.add('dark-text');
            }
        });
    }
    if (containerNormal == null && containerCenter != null) {
        containerCenterElements.forEach(element => {
            if (element.className == 'form-control') {
                element.classList.add('dark-input');
            } else if (element.tagName != 'I') {
                element.classList.add('dark-text');
            }
        });
    }

    if (loginContainer != null){
        loginContainer.querySelectorAll('*').forEach(element => {
            if (element.tagName == 'INPUT') {
                element.classList.add('form-control-dark-login')
            } else if (element.tagName != 'LABEL'){
                element.classList.add('dark-text');
            }
        })
    }
}

function removeDarkStylesOfContainer() {
    if (containerCenter == null && containerNormal != null) {
        containerNormalElements.forEach(element => {
            element.classList.remove('dark-text');
            element.classList.remove('dark-input');
        });
    }  
    
    if (containerNormal == null && containerCenter != null){
        containerCenterElements.forEach(element => {
            element.classList.remove('dark-input');
            element.classList.remove('dark-text');
        });
    }

    if (loginContainer != null){
        loginContainer.querySelectorAll('*').forEach(element => {
            element.classList.remove('form-control-dark-login');
            element.classList.remove('dark-text');
        })
    }
}