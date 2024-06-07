import {EmployeeApi} from "../api/employeeApi.js";

$(document).ready(function () {
    let employeeForm = $('#employeeForm');
    let employeeCode = $('#employeeCode');
    let employeeName = $('#employeeName1');
    let empPic = $('#emp-pic');
    let empGender = $('#emp-gender');
    let status = $('#status');
    let designation = $('#designation');
    let accessRole = $('#accessRole');
    let empDob = $('#emp-Dob');
    let empJoinDate = $('#emp-JoinDate');
    let attachedBranch = $('#attachedBranch');
    let empAddress1 = $('#empAddress1');
    let empAddress2 = $('#empAddress2');
    let empAddress3 = $('#empAddress3');
    let empAddress4 = $('#empAddress4');
    let empPostalCode = $('#empPostalCode');
    let empContact = $('#empContact');
    let empEmail = $('#empEmail');
    let emergencyContactPerson = $('#emergencyContactPerson');
    let emergencyContact = $('#emergencyContact');
    let empUpdate = $('#empUpdateBtn');
    let empClear = $('#empClear');
    let empReset = $('#empReset');
    let empBrowseBtn = $('#emp-browse-btn');
    let fileInput = $('#emp-file-input');
    let empImagePreview = $('#emp-image-preview');
    let search = $('#searchInput');

    let employeeApi = new EmployeeApi();

    let file = null;

    let employeeBase64Update = null;

    function updateImagePreview(imgPath) {
        empImagePreview.attr('src', imgPath);
    }

    function showError(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    empBrowseBtn.on('click', function () {
        fileInput.click();
    });

    fileInput.on('change', function () {
        file = this.files[0];
        if (file) {
            const filePath = URL.createObjectURL(file);
            empPic.val(filePath);
            updateImagePreview(filePath);
        }
    });

    empClear.on('click', function () {
        employeeForm[0].reset();
        updateImagePreview('assets/img/previewImg.jpg');
    });

    function updateEmployee(employeeModel) {
        employeeApi.updateEmployee(employeeModel)
            .then(response => {
                console.log(employeeModel);
                Swal.fire(
                    response,
                    'Successful',
                    'success'
                )
                fetchAllEmployees();
                empClear.click();
            })
            .catch(error => {
                showError('Update Unsuccessful', error);
                console.log(error)
            });
    }

    empUpdate.on('click', function (event) {
        event.preventDefault();
        if (file != null) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function () {
                const employeeBase64 = reader.result;
                const employeeModel = createEmployeeModel(employeeBase64);
                updateEmployee(employeeModel); // Move the update call here
            };

        } else {
            const employeeModel = createEmployeeModel(employeeBase64Update);
            updateEmployee(employeeModel);
        }
    });

    function createEmployeeModel(employeeBase64) {
        console.log("Hellp"+ employeeName.val());
        return {
            employeeCode: employeeCode.val(),
            employeeName: employeeName.val(),
            pic: employeeBase64,
            gender: empGender.val(),
            status: status.val(),
            designation: designation.val(),
            accessRole: accessRole.val(),
            dateOfBirth: empDob.val(),
            joinDate: empJoinDate.val(),
            attachedBranch: attachedBranch.val(),
            address1: empAddress1.val(),
            address2: empAddress2.val(),
            address3: empAddress3.val(),
            address4: empAddress4.val(),
            postalCode: empPostalCode.val(),
            contactNo: empContact.val(),
            email: empEmail.val(),
            emergencyContactName: emergencyContactPerson.val(),
            emergencyContact: emergencyContact.val()
        };
    }

    function fetchAllEmployees() {
        employeeApi.getAllEmployees()
            .then(response => {
                const employeeTableBody = $('#emp-table-body');
                employeeTableBody.empty();
                console.log(response);
                response.forEach(employee => {
                    const row = `
                        <tr>
                            <th row='span'>${employee.employeeCode}</th>
                            <td>${(employee.employeeName == null) ? 'Not Yet Updated' : employee.employeeName}</td>
                            <td><img src="${(employee.pic == null) ? 'assets/img/previewImg.jpg' : employee.pic}" alt="Employee Image" class="img-fluid" style="max-height: 50px;"></td>
                            <td>${(employee.gender == null) ? 'Not Yet Updated' : employee.gender}</td>
                            <td>${employee.status}</td>
                            <td>${(employee.designation == null) ? 'Not Yet Updated' : employee.designation}</td>
                            <td>${employee.userEntity.role}</td>
                            <td>${(employee.dateOfBirth == null) ? 'Not Yet Updated' : employee.dateOfBirth}</td>
                            <td>${employee.dateOfJoin}</td>
                            <td>${employee.branch.branchName}</td>
                            <td>
                                ${(employee.address1 == null ||
                        employee.address2 == null ||
                        employee.address3 == null ||
                        employee.address4 == null)
                        ? 'Not Yet Updated'
                        : `${employee.address1}, ${employee.address2}, ${employee.address3}, ${employee.address4}`
                    }
                            </td>
                            <td>${(employee.postalCode == null) ? 'Not Yet Updated' : employee.postalCode}</td>
                            <td>${(employee.contactNo == null) ? 'Not Yet Updated' : employee.contactNo}</td>
                            <td>${employee.email}</td>
                            <td>${(employee.emergencyContactName == null) ? 'Not Yet Updated' : employee.emergencyContactName}</td>
                            <td>${(employee.emergencyContact == null) ? 'Not Yet Updated' : employee.emergencyContact}</td>
                            <td>
                                <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#employeeModal"
                                    data-employee-id="${employee.employeeCode}" data-employee-branch = "${employee.branch.branchName}" >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    `;
                    employeeTableBody.append(row);
                });
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    fetchAllEmployees();

    $('#emp-table-body').on('click', '.updateBtn', function () {
        const employeeId = $(this).data('employee-id');
        employeeApi.getEmployee(employeeId)
            .then((responseText) => {
                let employee = responseText;
                employeeCode.val(employee.employeeCode);
                employeeName.val(employee.employeeName);
                if (employee.pic != null) {
                    employeeBase64Update = employee.pic;
                    empPic.val(employee.pic);
                    updateImagePreview(employee.pic);
                }
                empAddress1.val(employee.address1);
                empAddress2.val(employee.address2);
                empAddress3.val(employee.address3);
                empAddress4.val(employee.address4);
                empPostalCode.val(employee.postalCode);
                empContact.val(employee.contactNo);
                empEmail.val(employee.email);
                empDob.val(employee.dateOfBirth);
                empGender.val(employee.gender);
                empJoinDate.val(employee.dateOfJoin);
                emergencyContactPerson.val(employee.emergencyContactName);
                emergencyContact.val(employee.emergencyContact);
                status.val(employee.status);
                designation.val(employee.designation);
                if (employee.designation === "Manager") {
                    designation.prop('disabled', true);
                    accessRole.append(`<option value="ADMIN" class="temp-option">Admin</option>`);
                    accessRole.val('ADMIN');
                } else {
                    accessRole.append(`<option value="USER" class="temp-option">User</option>`);
                    accessRole.val('USER');
                }
                attachedBranch.val($(this).data('employee-branch'));
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    });

    search.on("input", function () {
        let value = $(this).val().toLowerCase();
        $("#emp-table-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

});