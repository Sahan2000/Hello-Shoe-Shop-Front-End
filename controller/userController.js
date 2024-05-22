import { UserModel } from "../model/userModel.js";

let email = $('#email');
let password = $('#password');

let loginBtn = $('#signInBtn');

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
                $('#loginPage').css('display', 'none');
                $('.dashboard-container').css('display', 'block');
            },
            error: function() {
                alert('Login failed!');
            }
        });
    };

});