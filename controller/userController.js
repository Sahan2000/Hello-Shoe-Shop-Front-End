import { UserModel } from "../model/userModel.js";
import { BranchModel } from "../model/branchModel.js";
import { BranchApi } from "../api/branchApi.js";

$(document).ready(function(){
    let email = $('#email');
let password = $('#password');

let loginBtn = $('#signInBtn');

let saveBranchBtn = $('#saveBranchBtn');

let branchApi = new BranchApi();

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
});
