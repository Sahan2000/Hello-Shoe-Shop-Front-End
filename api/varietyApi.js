export class VarietyApi{
    async saveVariety(variety) {
        return new Promise((resolve, reject) => {
            let varietyJson = JSON.stringify(variety);
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/inventory/varietySave",
                type: "POST",
                data: varietyJson,
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

    async getAllVarieties() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/inventory/getAllVariety",
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

    async updateVariety(variety) {
        return new Promise((resolve, reject) => {
            let varietyJson = JSON.stringify(variety);
            $.ajax({
                url: `http://localhost:8080/shop/api/v1/inventory/updateVariety?id=${variety.varietyCode}`,
                type: "PUT",
                data: varietyJson,
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

    async deleteVariety(varietyId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://localhost:8080/shop/api/v1/inventory/deleteVariety?id=${varietyId}`,
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