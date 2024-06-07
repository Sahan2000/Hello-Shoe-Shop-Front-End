export class BranchApi{
    async saveBranch(branch){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/auth/saveBranch",
                method: "POST",
                contentType: 'application/json',
                // headers: {
                //     "Authorization": "Bearer " + localStorage.getItem("token")
                // },
                data: JSON.stringify(branch),
                success: function (response) {
                    resolve(response);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }

    async getAllBranch(){
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "http://localhost:8080/shop/api/v1/auth",
                method: "GET",
                contentType: 'application/json',
                // headers: {
                //     "Authorization": "Bearer " + localStorage.getItem("token")
                // },
                success: function (response) {
                    resolve(response);
                },
                error: function (error) {
                    reject(error);
                }
            });
        })
    }
}