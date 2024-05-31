const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('login-container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

$(document).ready(() => {
    const loadingScreen1 = document.querySelector('#branchPage');
    loadingScreen1.style.display = 'none';

    $('#addBranch').eq(0).on('click', () => {
        const loadingScreen1 = document.querySelector('#branchPage');
        loadingScreen1.style.display = 'block';

        const loadingScreen2 = document.querySelector('#loginPage');
        loadingScreen2.style.display = 'none';
    });

    $('#backToLoginBtn').eq(0).on('click', () => {
        const loadingScreen1 = document.querySelector('#branchPage');
        loadingScreen1.style.display = 'none';

        const loadingScreen2 = document.querySelector('#loginPage');
        loadingScreen2.style.display = 'flex';
    });
});