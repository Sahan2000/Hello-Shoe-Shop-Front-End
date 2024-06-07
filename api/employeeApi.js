export class EmployeeApi {
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
    async getAllEmployees() {
        return this.sendAjaxRequest("http://localhost:8080/shop/api/v1/employee", "GET");
    }

    async getEmployee(employeeId) {
        return this.sendAjaxRequest(`http://localhost:8080/shop/api/v1/employee/${employeeId}`, "GET");
    }

    async updateEmployee(employeeModel) {
        console.log(employeeModel.employeeName);
        const formData = new FormData();
        formData.append('employeeName', employeeModel.employeeName);
        formData.append('profilePic', employeeModel.pic);
        formData.append('gender', employeeModel.gender);
        formData.append('status', employeeModel.status);
        formData.append('designation', employeeModel.designation);
        formData.append('dateOfBirth', employeeModel.dateOfBirth);
        formData.append('address1', employeeModel.address1);
        formData.append('address2', employeeModel.address2);
        formData.append('address3', employeeModel.address3);
        formData.append('address4', employeeModel.address4);
        formData.append('postalCode', employeeModel.postalCode);
        formData.append('contactNo', employeeModel.contactNo);
        formData.append('emergencyContactName', employeeModel.emergencyContactName);
        formData.append('emergencyContact', employeeModel.emergencyContact);

        formData.forEach((value, key) => {
            console.log(key, value);
        });

        return this.sendAjaxRequest(`http://localhost:8080/shop/api/v1/employee/${employeeModel.employeeCode}`, "PUT",formData);
    }
}