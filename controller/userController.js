import { UserModel } from "../model/userModel.js";
import { BranchModel } from "../model/branchModel.js";
import { BranchApi } from "../api/branchApi.js";
import { UserApi } from "../api/userApi.js";

$(document).ready(function(){
    let email = $('#email');
    let password = $('#password');

    let loginBtn = $('#signInBtn');
    let signUpBtn = $('#signUpBtn');

    let saveBranchBtn = $('#saveBranchBtn');

    let globalToken = null;

    let signUpEmail = $('#signUpEmail');
    let signUpPassword = $('#signUpPassword');
    let signUpRoles = $('#signUpRole');

    let branchApi = new BranchApi();
    let userApi = new UserApi();

    loginBtn.eq(0).on('click', function(){
        event.preventDefault();
        let emailValue = email.val();
        let passwordValue = password.val();

        if(emailValue){
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/shop/api/v1/auth/signIn',
                contentType: 'application/json',
                data: JSON.stringify({ email: emailValue, password: passwordValue}),
                success: function(token) {
                    localStorage.setItem('token', token);
                    window.location.href = 'mainContain.html';
                },
                error: function() {
                    alert('Login failed!');
                }
            });
        };

    });

    saveBranchBtn.eq(0).on('click', function(){
        event.preventDefault();
        let name = $('#name').val();
        let productCode = $('#productCode').val();

        let branch = new BranchModel(
            name,
            productCode,
        );
    
        branchApi.saveBranch(branch).then(function(responseText){
            Swal.fire(
                responseText,
                'Successful',
                'success'
            )
        });

    });

    signUpBtn.eq(0).on('click', function(){
        event.preventDefault();
        let emailValue = signUpEmail.val();
        let passwordValue = signUpPassword.val();
        let roleValue = signUpRoles.val();

        let user = new UserModel(
            emailValue,
            passwordValue,
            roleValue,
        );
        
        userApi.saveUser(user).then(response => {
                globalToken = response.token;
                console.log(globalToken);
                Swal.fire({
                    icon: 'success',
                    title: 'Signed Up Successfully!',
                    text: 'Welcome to HelloShoeShop!',
                    footer: '<a href="">Proceed to Dashboard</a>',
                    showConfirmButton: false,
                    timer: 3000,
                });
            })
            .catch(error => showError('Sign Up Unsuccessful', error.message));
        });

        function showError(title, text) {
            Swal.fire({
                icon: 'error',
                title: title,
                text: text,
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }

});
