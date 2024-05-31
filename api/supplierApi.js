export class SupplierApi {

    async generateSupplierId(){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/supplier/nextSupplierId",
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

    async saveSupplier(supplier){
        return new Promise((resolve, reject)=>{
            let supplierJson = JSON.stringify(supplier);

            const sendAjax = (supplierJson)=>{
                $.ajax({
                    url: "http://localhost:8080/shop/api/v1/supplier",
                    type: "POST",
                    data: supplierJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            sendAjax(supplierJson);
        })
    }

    async getAllSupplier(){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/supplier",
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

    async getSupplier(supId){
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: `http://localhost:8080/shop/api/v1/supplier/${supId}`,
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

    async updateSupplier(supplier){
        return new Promise((resolve, reject)=>{
            let supplierJson = JSON.stringify(supplier);

            const sendAjax = (supplierJson)=>{
                $.ajax({
                    url: `http://localhost:8080/shop/api/v1/supplier/${supplier.supplierCode}`,
                    type: "PUT",
                    data: supplierJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            sendAjax(supplierJson);
        })
    }

    async deleteSupplier(supId){
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: `http://localhost:8080/shop/api/v1/supplier/${supId}`,
                method: "DELETE",
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

}