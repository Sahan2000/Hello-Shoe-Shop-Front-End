const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

window.addEventListener('load',function (){
    const loadingScreen = document.querySelector('.dashboard-container');
    loadingScreen.style.display = 'none';

    const loadingScreen1 = document.querySelector('#loginPage');
    loadingScreen1.style.display = 'flex';

    const loadingScreen2 = document.querySelector('#customer');
    loadingScreen2.style.display = 'none';

    // const loadingScreen3 = document.querySelector('.main-content');
    // loadingScreen3.style.display = 'none';

});

$(document).ready(function (){
    $('.customerBtn').eq(0).on('click',function (){
        event.preventDefault();

        const loadingScreen1 = document.querySelector('#loginPage');
        loadingScreen1.style.display = 'none';

        const loadingScreen3 = document.querySelector('#customer');
        loadingScreen3.style.display = 'block';

        const loadingScreen4 = document.querySelector('.main-content');
        loadingScreen4.style.display = 'none';
        
        const loadingScreen5 = document.querySelector('.dashboard-container');
        loadingScreen5.style.display = 'block';
    });
});
