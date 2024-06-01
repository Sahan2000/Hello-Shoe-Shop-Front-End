export class SizeApi {
    async saveSize(size) {
        return new Promise((resolve, reject) => {
            let sizeJson = JSON.stringify(size);
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/inventory/sizeSave",
                type: "POST",
                data: sizeJson,
                contentType: "application/json",
                success: function (responseText) {
                    resolve(responseText);
                },
                error: function (xhr, status, error) {
                    reject(new Error(`HTTP request failed: ${status} - ${error}`));
                }
            });
        });
    }

    async getAllSizes() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/inventory/sizeGetAll",
                method: "GET",
                contentType: 'application/json',
                success: function (response) {
                    resolve(response);
                },
                error: function (xhr, status, error) {
                    reject(new Error(`HTTP request failed: ${status} - ${error}`));
                }
            });
        });
    }

    async getSizeId(){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/inventory/nextSizeId",
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

    async updateSize(size) {
        return new Promise((resolve, reject) => {
            let sizeJson = JSON.stringify(size);
            $.ajax({
                url: `http://localhost:8080/shop/api/v1/inventory/sizeUpdate?id=${size.sizeCode}`,
                type: "PUT",
                data: sizeJson,
                contentType: "application/json",
                success: function (responseText) {
                    resolve(responseText);
                },
                error: function (xhr, status, error) {
                    reject(new Error(`HTTP request failed: ${status} - ${error}`));
                }
            });
        });
    }

    async deleteSize(sizeId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://localhost:8080/shop/api/v1/inventory/sizeDelete?id=${sizeId}`,
                type: "DELETE",
                contentType: "application/json",
                success: function (responseText) {
                    resolve(responseText);
                },
                error: function (xhr, status, error) {
                    reject(new Error(`HTTP request failed: ${status} - ${error}`));
                }
            });
        });
    }
}