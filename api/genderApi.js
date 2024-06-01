export class GenderApi {

    async saveGender(gender) {
        return new Promise(function(resolve, reject) {
            let genderJson = JSON.stringify(gender);

            const sendAjax = (genderJson)=>{
                $.ajax({
                    url: "http://localhost:8080/shop/api/v1/inventory/genderSave",
                    type: "POST",
                    data: genderJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            console.log('Save gender call');
            sendAjax(genderJson);
        });
    }

    async getAllGender() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/inventory/genderGetAll",
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

    async updateGender(gender){
        return new Promise((resolve, reject)=>{
            let genderJson = JSON.stringify(gender);

            const sendAjax = (genderJson)=>{
                $.ajax({
                    url: `http://localhost:8080/shop/api/v1/inventory/genderUpdate?id=${gender.genderCode}`,
                    type: "PUT",
                    data: genderJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            sendAjax(genderJson);
        })
    }

    async deleteGender(genId){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url: `http://localhost:8080/shop/api/v1/inventory/genderDelete?id=${genId}`,
                type: "DELETE",
                contentType: "application/json",
                success: function (responseText){
                    resolve(responseText);
                }
            });
        })
    }
}