import {ProductsApi} from "../api/productApi.js";
import {ProductModel} from "../model/productModel.js";
import {VarietyApi} from "../api/varietyApi.js";
import {SizeApi} from "../api/sizeApi.js";
import {GenderApi} from "../api/genderApi.js";
import {OccasionApi} from "../api/occasionApi.js";

$(document).ready(function () {

    let itemForm = $('#itemForm');
    let itemFormHeading = $('#itemFormHeading');
    let itemCode = $('#item-code');
    let itemDesc = $('#item-desc');
    let itemPic = $('#item-pic');
    let itemGender = $('#item-gender');
    let itemOccasion = $('#item-occasion');
    let itemVariety = $('#item-variety');
    let itemSaveUpdateBtn = $('#item-save-update-btn');
    let itemClear = $('#itemClear');
    let itemReset = $('#itemReset');
    let itemImagePreview = $('#item-image-preview');
    let fileInput = $('#file-input');
    let itemAddBtn = $('#itemAddBtn');
    let browseBtn = $('#browse-btn');
    let updateBtn = $('#update-icon');

    let productApi = new ProductsApi();
    let variety = new VarietyApi();
    let size = new SizeApi();
    let gender = new GenderApi();
    let occasion = new OccasionApi();

    let file = null;

    let itemBase64Update = null;

    let itemCodeUpdate = null

    function openItemModal(headingText, buttonText, buttonClass) {
        itemGender.prop('disabled', false);
        itemOccasion.prop('disabled', false);
        itemVariety.prop('disabled', false);
        itemFormHeading.text(headingText);
        itemSaveUpdateBtn.text(buttonText);
        itemSaveUpdateBtn.removeClass('btn-success btn-warning').addClass(buttonClass);
    }

    function updateImagePreview(imgPath) {
        itemImagePreview.attr('src', imgPath);
    }

    function populateComboBox(comboBoxId, data, valueField, textField, defaultOption) {
        let comboBox = document.getElementById(comboBoxId);
        comboBox.innerHTML = `<option value="">${defaultOption}</option>`;

        data.forEach(item => {
            let option = document.createElement('option');
            option.value = item[valueField];
            option.text = item[textField];
            comboBox.add(option);
        });
    }

    function populateGenderComboBox() {
        gender.getAllGender()
            .then(response => {
                populateComboBox('item-gender', response, 'genderCode', 'genderDesc', 'Select Gender');
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function populateOccasionComboBox() {
        occasion.getAllOccasions()
            .then(response => {
                populateComboBox('item-occasion', response, 'occasionCode', 'occasionDesc', 'Select Occasion');
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function populateVarietyComboBox() {
        variety.getAllVarieties()
            .then(response => {
                populateComboBox('item-variety', response, 'varietyCode', 'varietyDesc', 'Select Variety');
            })
            .catch(error => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    itemAddBtn.on('click', function () {
        openItemModal('Add New Item', 'Save', 'btn-success');
        itemForm[0].reset();
        updateImagePreview('assets/img/previewImg.jpg');
        populateGenderComboBox();
        populateOccasionComboBox();
        populateVarietyComboBox();
    });

    function showError(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    browseBtn.on('click', function () {
        fileInput.click();
    });

    fileInput.on('change', function () {
        file = this.files[0];
        if (file) {
            const filePath = URL.createObjectURL(file);
            itemPic.val(filePath);
            updateImagePreview(filePath);
        }
    });

    itemClear.on('click', function () {
        itemForm[0].reset();
        updateImagePreview('img/previewImg.jpg');
    });

    function handleUpdateAndSave() {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            const itemBase64 = reader.result;
            const product = createProductModel(itemBase64);

            productApi.updateProduct(product, itemCodeUpdate)
                .then(response => {
                    Swal.fire('Updated!', response, 'success');
                    itemClear.click();
                    fetchAllProducts();
                })
                .catch(error => {
                    showError('Update Unsuccessful', error);
                });
        };
    }

    itemSaveUpdateBtn.on('click', function (event) {
        event.preventDefault();

        if (itemSaveUpdateBtn.text() === 'Save') {
            handleSave();
        } if (itemSaveUpdateBtn.text() === 'Update' && file != null){
            handleUpdateAndSave();
        }else {
            handleUpdate();
        }

        fetchAllProducts();
    });

    function handleSave() {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
            const itemBase64 = reader.result;
            const product = createProductModel(itemBase64);

            productApi.saveProduct(product)
                .then(response => {
                    Swal.fire('Saved!', response, 'success');
                    itemClear.click();
                    fetchAllProducts(); // Uncomment if needed
                })
                .catch(error => {
                    showError('Save Unsuccessful', error);
                });
        };
    }

    function handleUpdate() {
        const product = createProductModel(itemBase64Update);

        productApi.updateProduct(product, itemCodeUpdate)
            .then(response => {
                Swal.fire('Updated!', response, 'success');
                itemClear.click();
                fetchAllProducts();
            })
            .catch(error => {
                showError('Update Unsuccessful', error);
            });
    }

    function createProductModel(imageBase64) {
        let itemDetail = itemDesc.val();
        let itemGen = itemGender.val();
        let itemOsion = itemOccasion.val();
        let itemVar = itemVariety.val();

        return new ProductModel(
            null,
            itemDetail,
            imageBase64,
            itemGen,
            itemOsion,
            itemVar
        );
    }

    function fetchAllProducts() {
        productApi.getAllProducts()
            .then(response => {
                console.log("API response:", response); // Log the response
                let products = response;
                $('#item-cards-container').empty();

                products.forEach(product => {
                    let card = `
                <div class="col-md-4 mb-4">
                    <div class="product-card">
                        <div class="product-tumb">
                            <img src="${product.pic}" alt="Product Image">
                        </div>
                        <div class="product-details">
                            <span class="product-catagory">Category: ${product.varietyEntity.varietyDesc}</span>
                            <h4><a href="#">${product.itemDesc}</a></h4>
                            <p><strong>Item Code:</strong> ${product.itemCode}</p>
                            <p><strong>Gender:</strong> ${product.genderEntity.genderDesc}</p>
                            <p><strong>Occasion:</strong> ${product.occasionEntity.occasionDesc}</p>
                        </div>
                        <div class="product-bottom-details">
                            <div class="product-links">
                                <button type="button" class="update-icon btn btn-link" 
                                    data-code="${product.itemCode}"
                                    data-desc="${product.itemDesc}" 
                                    data-category="${product.varietyEntity.varietyDesc}" 
                                    data-gender="${product.genderEntity.genderDesc}" 
                                    data-occasion="${product.occasionEntity.occasionDesc}" 
                                    data-pic="${product.pic}" data-toggle="modal" data-target="#itemModal">
                                    <i class="bx bx-edit"></i>
                                </button>
                                <button type="button" class="delete-icon btn btn-link"
                                data-code="${product.itemCode}">
                                    <i class="bx bx-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                    $('#item-cards-container').append(card);
                });
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function setComboBoxValue(comboBox, value) {
        if (comboBox.find(`option[value="${value}"]`).length === 0) {
            comboBox.append(`<option value="${value}" class="temp-option">${value}</option>`);
        }
        comboBox.val(value).prop('disabled', true);
    }

    $('#item-cards-container').on('click', '.update-icon', function (event) {
        event.preventDefault();
        console.log('update btn call');

        itemCodeUpdate = $(this).data('code');
        let proPic = $(this).data('pic');
        itemBase64Update = proPic;
        let itemDetails = $(this).data('desc');
        let category = $(this).data('category');
        let gender = $(this).data('gender');
        let occasion = $(this).data('occasion');

        openItemModal('Edit Item', 'Update', 'btn-warning');
        itemForm[0].reset();

        itemDesc.val(itemDetails);
        setComboBoxValue(itemVariety, category);
        setComboBoxValue(itemGender, gender);
        setComboBoxValue(itemOccasion, occasion);

        updateImagePreview(proPic);
    });

    $('#item-cards-container').on('click', '.delete-icon', function (event) {
        let itemCodeDel = $(this).data('code');
        deleteCustomer(itemCodeDel);
    });

    function deleteCustomer(itemCodeDel) {

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
                productApi.deleteProduct(itemCodeDel)
                    .then((responseText) => {
                        Swal.fire(
                            responseText,
                            'Successful',
                            'success'
                        )
                        fetchAllProducts();
                    })
                    .catch((error) => {
                        console.log(error);
                        showError('Product delete Unsuccessful', error);
                    });
            }
        });

    }

    fetchAllProducts();
});