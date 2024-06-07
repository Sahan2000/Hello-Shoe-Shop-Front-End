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

    let globleVarible = getCookie("token");

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    console.log("Hellllo " +globleVarible);

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
                    document.cookie = "username=" + emailValue + "; path=/";
                    document.cookie = "token=" + token + "; path=/";
                    window.location.href = 'mainContain.html';
                },
                error: function() {
                    alert('Login failed!');
                }
            });
        };

    });

    function populateBranchComboBox() {
        branchApi.getAllBranch()
            .then((responseText) => {
                console.log(responseText);
                responseText.forEach((branch) => {
                    $('#signup-branch').append(
                        `<option value="${branch.branchId}">${branch.branchName}</option>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('fetch Unsuccessful', error);
            });
    }

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

    populateBranchComboBox();

    signUpBtn.eq(0).on('click', function(){
        event.preventDefault();
        let emailValue = signUpEmail.val();
        let passwordValue = signUpPassword.val();
        let roleValue = signUpRoles.val();
        let branch = $('#signup-branch').val();

        let user = new UserModel(
            emailValue,
            passwordValue,
            roleValue,
            branch
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
