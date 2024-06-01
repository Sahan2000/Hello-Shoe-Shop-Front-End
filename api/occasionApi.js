export class OccasionApi{
    async saveOccasion(occasion) {
        return new Promise(function(resolve, reject) {
            let occasionJson = JSON.stringify(occasion);

            $.ajax({
                url: "http://localhost:8080/shop/api/v1/inventory/occationSave",
                type: "POST",
                data: occasionJson,
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

    async getAllOccasions() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/inventory/occationGetAll",
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

    async updateOccasion(occasion) {
        return new Promise((resolve, reject) => {
            let occasionJson = JSON.stringify(occasion);

            $.ajax({
                url: `http://localhost:8080/shop/api/v1/inventory/occationUpdate?id=${occasion.occasionCode}`,
                type: "PUT",
                data: occasionJson,
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

    async deleteOccasion(occasionId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://localhost:8080/shop/api/v1/inventory/occasionDelete?id=${occasionId}`,
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