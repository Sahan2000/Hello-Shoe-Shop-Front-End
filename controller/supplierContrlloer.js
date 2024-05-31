import { SupplierModel } from '../model/supplierModel.js'
import { SupplierApi } from '../api/supplierApi.js';

$(document).ready(function(){
    let supplierCode = $('#sup-id');
    let supplierName = $('#sup-name');
    let category = $('#sup-category');
    let address1 = $('#sup-address1');
    let address2 = $('#sup-address2');
    let address3 = $('#sup-address3');
    let address4 = $('#sup-address4');
    let postalCode = $('#sup-postalCode');
    let countryComboBox = $('#sup-country');
    let contactNo1 = $('#sup-contact-1');
    let contactNo2 = $('#sup-contact-2');
    let email = $('#sup-email');

    let supClear = $('#supClear');

    let tableBody = $('#sup-table-body');

    let supplierId = $('#sup-id');

    let saveupdateBtn = $('#sup-save-update-btn');

    let supplierApi = new SupplierApi();

    function generateNextSupplierId(){
        supplierApi.generateSupplierId()
            .then(supId => {
                supplierId.val(supId);
            })
            .catch(error => {
                showError('Fetching Error', 'Error generating customer ID');
            });
    }

    $('#supplierPage').eq(0).on('click',() =>{
        populateSupplierTable();
    });

    $('#supAddBtn').eq(0).on('click', () => {
        event.preventDefault();
        generateNextSupplierId();
        populateCountriesCBox();
    });

    function showError(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    saveupdateBtn.eq(0).on('click', function () {
        event.preventDefault();
        let code = supplierCode.val();
        let name = supplierName.val();
        let cat = category.val();
        let add1 = address1.val();
        let add2 = address2.val();
        let add3 = address3.val();
        let add4 = address4.val();
        let postal = postalCode.val();
        let countryValue = countryComboBox.val();
        let contact1 = contactNo1.val();
        let contact2 = contactNo2.val();
        let supplierEmail = email.val();

        let supplier = new SupplierModel(code, name, cat, add1, add2, add3, add4, postal, countryValue, contact1, contact2, supplierEmail);

        if (saveupdateBtn.text() === "Save") {
            supplierApi.saveSupplier(supplier).then((responseText) => {
                Swal.fire(
                    responseText,
                    'Successful',
                    'success'
                )
                supClear.click();
                populateSupplierTable();
            });
        }else{
            supplierApi.updateSupplier(supplier).then((responseText) => {
                Swal.fire(
                    responseText,
                    'Successful',
                   'success'
                )
                supClear.click();
                populateSupplierTable();
            }).catch((error) => {
                showError('Update Unsuccessful', error);
            });
        }
    });

    function populateSupplierTable() {
        supplierApi.getAllSupplier()
            .then((responseText) => {
                let supplier_db = responseText;
                tableBody.empty();
                supplier_db.forEach((supplier) => {
                    tableBody.append(
                        `<tr>
                        <th row='span'>${supplier.supplierCode}</th>
                        <td>${supplier.supplierName}</td>
                        <td>${supplier.category}</td>
                        <td>${supplier.address1},${supplier.address2},${supplier.address3},${supplier.address4}</td>
                        <td>${supplier.postalCode}</td>
                        <td>${supplier.country}</td>
                        <td>${supplier.contactNo1}</td>
                        <td>${supplier.contactNo2}</td>
                        <td>${supplier.email}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#customerModal"
                                data-supplier-id="${supplier.supplierCode}">Edit</button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-supplier-id="${supplier.supplierCode}">Delete</button>
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

    function populateCountriesCBox(){
        countries.forEach(function(country) {
            let option = $('<option></option>').attr('value', country).text(country);
            countryComboBox.append(option);
        });
    }

    function openCustomerModal(heading, buttonText, buttonClass, supId) {
        if (supId) {
            populateCountriesCBox();
            supplierApi.getSupplier(supId)
                .then((supplier) => {
                    supplierCode.val(supplier.supplierCode);
                    supplierName.val(supplier.supplierName);
                    category.val(supplier.category);
                    address1.val(supplier.address1);
                    address2.val(supplier.address2);
                    address3.val(supplier.address3);
                    address4.val(supplier.address4);
                    postalCode.val(supplier.postalCode);
                    countryComboBox.val(supplier.country)
                    contactNo1.val(supplier.contactNo1);
                    contactNo2.val(supplier.contactNo2);
                    email.val(supplier.email);
                })
                .catch((error) => {
                    console.log(error);
                    showError('Save unsuccessful', error);
                });
        }
        $('#supplierFormHeading').text(heading);
        saveupdateBtn.text(buttonText);
        $('#supplierModal').modal('show');
        saveupdateBtn.removeClass('btn-success btn-warning').addClass(buttonClass);
    }

    $('#sup-table-body').eq(0).on('click','.updateBtn', function (){
        const supId = $(this).data('supplier-id');
        openCustomerModal('Update Supplier','Update','btn-warning',supId);
    });

    $('#sup-table-body').eq(0).on('click','.deleteBtn', function (){
        const supId = $(this).data('supplier-id');
        deleteSupplier(supId);
    });

    function deleteSupplier(supId){
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
                supplierApi.deleteSupplier(supId)
                    .then((responseText) => {
                        console.log("sahan");
                        Swal.fire(
                            responseText,
                            'Successful',
                            'success'
                        );
                        populateSupplierTable();
                    })
                    .catch((error) => {
                        console.log(error);
                        showError('Student delete Unsuccessful', error);
                    });
            }
        });
    }

});