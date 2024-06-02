export class ProductsApi {
    async sendAjaxRequest(url, method, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {

                    try {
                        const jsonResponse = JSON.parse(xhr.responseText);
                        resolve(jsonResponse);
                    } catch (e) {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(new Error(`HTTP error: ${xhr.status} ${xhr.statusText}`));
                }
            };

            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };

            xhr.send(data);
        });
    }

    async saveProduct(productModel) {
        const formData = new FormData();
        formData.append("itemDesc", productModel.itemDesc);
        formData.append("pic", productModel.pic);
        formData.append("genderCode", productModel.genderCode);
        formData.append("occasionCode", productModel.occasionCode);
        formData.append("varietyCode", productModel.varietyCode);

        try {
            const response = await this.sendAjaxRequest("http://localhost:8080/shop/api/v1/inventory", "POST", formData);
        } catch (error) {
            throw new Error(`Error during HTTP request: ${error.message}`);
        }
    }

    getAllProducts() {
        return this.sendAjaxRequest("http://localhost:8080/shop/api/v1/inventory/getAllItems", "GET");
    }

    updateProduct(product, itemCodeUpdate) {
        const formData = new FormData();
        formData.append("itemDesc", product.itemDesc);
        formData.append("pic", product.pic);
        return this.sendAjaxRequest(`http://localhost:8080/shop/api/v1/inventory/${itemCodeUpdate}`, "PUT",formData);
    }

    deleteProduct(itemCodeDel) {
        return this.sendAjaxRequest(`http://localhost:8080/shop/api/v1/inventory/${itemCodeDel}`, "DELETE");
    }
}