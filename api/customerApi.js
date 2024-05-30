export class CustomerApi {

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

    async getAllCustomer() {
        return this.handleHttpRequest("http://localhost:8080/helloShoeShop/api/v1/customer", "GET");
    }

    async deleteCustomer(custId) {
        return this.handleHttpRequest(`http://localhost:8080/helloShoeShop/api/v1/customer/${custId}`, "DELETE");
    }

    async generateCustomerId() {
        return this.handleHttpRequest("http://localhost:8080/helloShoeShop/api/v1/customer/nextCustId", "GET");
    }

    async updateCustomer(customer,customerId) {
        return this.handleHttpRequest(`http://localhost:8080/helloShoeShop/api/v1/customer/${customerId}`, "PUT", customer);
    }

    async saveCustomer(customer) {
        return this.handleHttpRequest("http://localhost:8080/helloShoeShop/api/v1/customer", "POST", customer);
    }

    async getCustomer(customerId) {
        return this.handleHttpRequest(`http://localhost:8080/helloShoeShop/api/v1/customer/${customerId}`, "GET");
    }
}