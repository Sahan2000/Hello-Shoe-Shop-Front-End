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
    let recentPurchaseDate = $('#customer-recent-purchased-date');

    let addCustomer = $('#custAddBtn');

    let saveBtn = $('#customer-save-update-btn');
    let custClear = $('#custClear');

    let customerApi = new CustomerApi();

    addCustomer.eq(0).on('click', function () {
        generateCustomerId();
        level.val("NEW");
        let localDate = new Date();
        let formattedDate = localDate.toISOString().split('T')[0];
        joinDate.val(formattedDate);
        totalPoints.val(0);
        recentPurchaseDate.val(formattedDate);
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
            customerApi.saveCustomer(customer).then((responseText) => {
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
        }
    });

    function populateCustomerTable() {
        customerApi.getAllCustomer()
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
                                data-customer-id="${customer.customerId}">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-customer-id="${customer.customerId}">
                                Delete
                            </button>
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
});