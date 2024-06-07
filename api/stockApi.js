export class StockApi {
    async handleHttpRequest(url, method, data = null) {
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: data ? JSON.stringify(data) : null,
            });

            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return await response.json();
                } else {
                    return await response.text();
                }
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            throw new Error(`Error during HTTP request: ${error.message}`);
        }
    }

    async generateStockId() {
        return this.handleHttpRequest("http://localhost:8080/shop/api/v1/supplier/nextStockId", "GET");
    }

    async getAllStocks() {
        return this.handleHttpRequest("http://localhost:8080/shop/api/v1/supplier/getAllStock", "GET");
    }

    async deleteStock(stockId) {
        return this.handleHttpRequest(`http://localhost:8080/shop/api/v1/supplier/deleteStock/${stockId}`, "DELETE");
    }

    async saveStock(stockModel,email) {
        return this.handleHttpRequest(`http://localhost:8080/shop/api/v1/supplier/saveStock/${email}`, "POST",stockModel);
    }

    async updateStock(stockModel, stockIdVal) {
        return this.handleHttpRequest(`http://localhost:8080/shop/api/v1/supplier/updateStock/${stockIdVal}`, "PUT",stockModel);
    }
}