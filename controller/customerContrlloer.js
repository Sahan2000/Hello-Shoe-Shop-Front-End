import {CustomerModel} from '../model/customerModel.js';
import {CustomerApi} from '../api/customerApi.js';

$(document).ready(function () {
    let customerId = $('#customer-id');
    let customerName = $('#customer-name');
    let gender = $('#customer-gender');
    let level = $('#customer-level');
    let joinDate = $('#customer-joinDate');
    let totalPoints = $('#customer-totalPoint');
    let dob = $('#customer-dob');
    let address1 = $('#customer-address1');
    let address2 = $('#customer-address2');
    let address3 = $('#customer-address3');
    let address4 = $('#customer-address4');
    let postalCode = $('#customer-postalCode');
    let contact = $('#customer-contact');
    let email = $('#customer-email');
    let recentPurchaseDate = $('#recentPurchasedDate');

    let addCustomer = $('#custAddBtn');

    let saveBtn = $('#customer-save-update-btn');
    let custClear = $('#custClear');

    let search = $('#searchInput');

    let tableBody =  $('#cust-table-body');

    let customerApi = new CustomerApi();

    let token = getCookie("token");

    addCustomer.eq(0).on('click', function () {
        generateCustomerId();
        level.val("NEW");
        let localDate = new Date();
        let formattedDate = localDate.toISOString().split('T')[0];
        joinDate.val(formattedDate);
        totalPoints.val(0);
    });

    function generateCustomerId() {
        customerApi.generateNextCustomerId()
            .then(custId => {
                customerId.val(custId);
            })
            .catch(error => {
                showError('Fetching Error', 'Error generating customer ID');
            });
    }
    function showError(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    saveBtn.eq(0).on('click', function () {
        event.preventDefault();

        let custId = customerId.val();
        let custName = customerName.val();
        let custGender = gender.val();
        let custLevel = level.val();
        let customerJoinedDate = joinDate.val();
        let customerTotalPoints = totalPoints.val();
        let customerDob = dob.val();
        let custAddress1 = address1.val();
        let custAddress2 = address2.val();
        let custAddress3 = address3.val();
        let custAddress4 = address4.val();
        let custPostalCode = postalCode.val();
        let custContact = contact.val();
        let custEmail = email.val();
        let custRecentPurchaseDate = recentPurchaseDate.val();

        let customer = new CustomerModel(
                custId, 
                custName, 
                custGender, 
                custLevel, 
                customerJoinedDate, 
                customerTotalPoints, 
                customerDob, 
                custAddress1, 
                custAddress2, 
                custAddress3, 
                custAddress4, 
                custPostalCode, 
                custContact, 
                custEmail, 
                custRecentPurchaseDate
            );

            console.log(customer);
        
        if (saveBtn.text() === 'Save') {
            customerApi.saveCustomer(customer,token).then((responseText) => {
                Swal.fire(
                    responseText,
                    'Successful',
                    'success'
                )
                custClear.click();
                populateCustomerTable();
            }).catch((error) => {
                showError('Save Unsuccessful', error);
            });
        }else{
            customerApi.updateCustomer(customer,token).then((responseText) => {
                Swal.fire(
                    responseText,
                    'Successful',
                   'success'
                )
                custClear.click();
                populateCustomerTable();
            }).catch((error) => {
                showError('Update Unsuccessful', error);
            });
        }
    });

    function populateCustomerTable() {
        customerApi.getAllCustomer(token)
            .then((responseText) => {
                let customer_db = responseText;
                tableBody.empty();
                customer_db.forEach((customer) => {
                    tableBody.append(
                        `<tr>
                        <th row='span'>${customer.customerId}</th>
                        <td>${customer.customerName}</td>
                        <td>${customer.gender}</td>
                        <td>${customer.level}</td>
                        <td>${customer.joinDate}</td>
                        <td>${customer.totalPoints}</td>
                        <td>${customer.dob}</td>
                        <td>${customer.address1},${customer.address2},${customer.address3},${customer.address4}</td>
                        <td>${customer.postalCode}</td>
                        <td>${customer.contactNo}</td>
                        <td>${customer.email}</td>
                        <td>${(customer.recentPurchasedDate == null) ? 'No Purchased Done yet' : customer.recentPurchasedDate}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#customerModal"
                                data-customer-id="${customer.customerId}">Edit</button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-customer-id="${customer.customerId}">Delete</button>
                        </td>
                    </tr>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('fetch Unsuccessful', error);
            });
    }

    $('#customerPage').eq(0).on('click', function () {
        populateCustomerTable();
    })

    function openCustomerModal(heading, buttonText, buttonClass, custId) {
        if (custId) {
            customerApi.getCustomer(custId,token)
                .then((customer) => {
                    customerId.val(customer.customerId);
                    customerName.val(customer.customerName);
                    gender.val(customer.gender);
                    level.val(customer.level);
                    joinDate.val(customer.joinDate);
                    totalPoints.val(customer.totalPoints);
                    dob.val(customer.dob);
                    address1.val(customer.address1);
                    address2.val(customer.address2);
                    address3.val(customer.address3);
                    address4.val(customer.address4);
                    postalCode.val(customer.postalCode);
                    contact.val(customer.contactNo);
                    email.val(customer.email);
                    recentPurchaseDate.val(customer.recentPurchasedDate.split('.')[0]);
                })
                .catch((error) => {split('.')[0]
                    console.log(error);
                    showError('Save unsuccessful', error);
                });
        }
        $('#customerFormHeading').text(heading);
        saveBtn.text(buttonText);
        $('#customerModal').modal('show');
        saveBtn.removeClass('btn-success btn-warning').addClass(buttonClass);
    }

    $('#cust-table-body').eq(0).on('click','.updateBtn', function (){
        const custId = $(this).data('customer-id');
        openCustomerModal('Update Customer','Update','btn-warning',custId);
    })

    $('#cust-table-body').eq(0).on('click','.deleteBtn', function (){
        const custId = $(this).data('customer-id');
        deleteCustomer(custId,token);
    });

    function deleteCustomer(custId,token){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                customerApi.deleteCustomer(custId,token)
                    .then((responseText) => {
                        console.log("sahan");
                        Swal.fire(
                            responseText,
                            'Successful',
                            'success'
                        );
                        populateCustomerTable();
                    })
                    .catch((error) => {
                        console.log(error);
                        showError('Student delete Unsuccessful', error);
                    });
            }
        });
    }

    search.on("input", function () {
        let value = $(this).val().toLowerCase();
        $("#cust-table-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});