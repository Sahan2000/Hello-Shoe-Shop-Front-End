export class UserApi{

    async saveUser(user){
        return new Promise(function(resolve, reject){
            let userJson = JSON.stringify(user);

            const sendAjax = (userJson)=>{
                $.ajax({
                    url: "http://localhost:8080/shop/api/v1/auth/signUp",
                    type: "POST",
                    data: userJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    },
                    error: function (xhr, status, error) {
                        reject(new Error(`HTTP request failed: ${status} - ${error}`));
                    }
                });
            };

            sendAjax(userJson);
        });
    }

}