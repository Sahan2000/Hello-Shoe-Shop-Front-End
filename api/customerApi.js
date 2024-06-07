export class CustomerApi{

    generateNextCustomerId(token){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/customer/nextCustId",
                method: "GET",
                contentType: 'application/json',
                // headers: {
                //     'Authorization': `Bearer ${token}`
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

    async saveCustomer(customer, token){
        return new Promise((resolve, reject)=>{
            let customerJson = JSON.stringify(customer);

            const sendAjax = (customerJson)=>{
                $.ajax({
                    url: "http://localhost:8080/shop/api/v1/customer",
                    type: "POST",
                    data: customerJson,
                    contentType: "application/json",
                    // headers: {
                    //     'Authorization': `Bearer ${token}`
                    // },
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            console.log('Save customer call');
            sendAjax(customerJson);
        });
    }

    async getAllCustomer(token){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/customer",
                method: "GET",
                contentType: 'application/json',
                // headers: {
                //     'Authorization': `Bearer ${token}`
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

    async getCustomer(custId,token){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url: `http://localhost:8080/shop/api/v1/customer/${custId}`,
                method: "GET",
                contentType: 'application/json',
                // headers: {
                //     'Authorization': `Bearer ${token}`
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

    async updateCustomer(customer,token){
        return new Promise((resolve, reject)=>{
            let customerJson = JSON.stringify(customer);

            const sendAjax = (customerJson)=>{
                $.ajax({
                    url: `http://localhost:8080/shop/api/v1/supplier/${customer.customerId}`,
                    type: "PUT",
                    data: customerJson,
                    contentType: "application/json",
                    // headers: {
                    //     'Authorization': `Bearer ${token}`
                    // },
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            sendAjax(customerJson);
        })
    }

    async deleteCustomer(custId,token){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url: `http://localhost:8080/shop/api/v1/customer/${custId}`,
                method: "DELETE",
                contentType: 'application/json',
                // headers: {
                //     'Authorization': `Bearer ${token}`
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
}