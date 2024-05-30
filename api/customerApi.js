export class CustomerApi{

    generateNextCustomerId(){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/customer/nextCustId",
                method: "GET",
                contentType: 'application/json',
                // headers: {
                //     "Authorization": "Bearer " + localStorage.getItem("token")
                // },
                success: function (response) {
                    resolve(response);
                },
                error: function (xhr, status, error) {
                    reject(new Error(`HTTP request failed: ${status} - ${error}`));
                }
            });
        });
    }

    async saveCustomer(customer){
        return new Promise((resolve, reject)=>{
            let customerJson = JSON.stringify(customer);

            const sendAjax = (customerJson)=>{
                $.ajax({
                    url: "http://localhost:8080/shop/api/v1/customer",
                    type: "POST",
                    data: customerJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            console.log('Save customer call');
            sendAjax(customerJson);
        })
    }

    async getAllCustomer(){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/customer",
                method: "GET",
                contentType: 'application/json',
                // headers: {
                //     "Authorization": "Bearer " + localStorage.getItem("token")
                // },
                success: function (response) {
                    resolve(response);
                },
                error: function (xhr, status, error) {
                    reject(new Error(`HTTP request failed: ${status} - ${error}`));
                }
            });
        });
    }

    async getCustomer(custId){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url: `http://localhost:8080/shop/api/v1/customer/${custId}`,
                method: "GET",
                contentType: 'application/json',
                // headers: {
                //     "Authorization": "Bearer " + localStorage.getItem("token")
                // },
                success: function (response) {
                    resolve(response);
                },
                error: function (xhr, status, error) {
                    reject(new Error(`HTTP request failed: ${status} - ${error}`));
                }
            });
        });
    }

    async updateCustomer(customer){
        return new Promise(function (resolve, reject){
            let customerJson = JSON.stringify(customer);
            console.log(customerJson.totalPoints);

            const sendAjax = (customerJson)=>{
                $.ajax({
                    url: "http://localhost:8080/shop/api/v1/customer",
                    type: "POST",
                    data: customerJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            console.log('Save customer call');
            sendAjax(customerJson);
        });
    }
}