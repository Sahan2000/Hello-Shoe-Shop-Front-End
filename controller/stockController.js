
import { StockApi } from "../api/stockApi.js";
import { SupplierApi } from "../api/supplierApi.js";
import { ProductsApi } from "../api/productApi.js";
import {SizeApi} from "../api/sizeApi.js";
import { StockModel } from "../model/stockModel.js";

$(document).ready(function () {
    let stockAddBtn = $('#stockAddBtn');
    let heading = $('#stockFormHeading');
    let stockForm = $('#stockForm');
    let stockClear = $('#stockClear');

    let stockId = $('#stock-id');
    let supplyDate = $('#supply-date');
    let supplierId = $('#supply-Id');
    let supplierName = $('#supplier-name');
    let itemId = $('#item-Id');
    let itemDetails = $('#item-details');
    let sizeId = $('#size-Id-Cb');
    let sizeDetails = $('#size-details');
    let quantity = $('#qty');
    let unitBuyingPrice = $('#unitBuyingPrice');
    let unitSellingPrice = $('#unitSellingPrice');
    let profit = $('#profit');
    let profitMargin = $('#profitMargin');

    let stockSaveUpdateBtn = $('#stock-save-update-btn');

    let tableBody = $('#stock-table-body');

    let search = $('#searchInput');

    let stockApi = new StockApi();
    let supplierApi = new SupplierApi();
    let productApi = new ProductsApi();
    let sizeApi = new SizeApi();

    populateStockTable();

    function generateStockId() {
        stockApi.generateStockId()
            .then(stId => {
                stockId.val(stId);
            })
            .catch(error => {
                showError('Fetching Error', 'Error generating stock ID');
            });
    }

    function populateSupplierComboBox() {
        return supplierApi.getAllSupplier()
            .then((responseText) => {
                supplierId.empty().append('<option value="">Select Supplier</option>');
                responseText.forEach((supplier) => {
                    supplierId.append(
                        `<option value="${supplier.supplierName}">${supplier.supplierCode}</option>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function populateItemComboBox() {
        return productApi.getAllProducts()
            .then((responseText) => {
                itemId.empty().append('<option value="">Select Product</option>');
                responseText.forEach((product) => {
                    itemId.append(
                        `<option value="${product.itemDesc}">${product.itemCode}</option>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function populateSizeComboBox() {
        return sizeApi.getAllSizes()
            .then((responseText) => {
                sizeId.empty().append('<option value="">Select Size</option>');
                responseText.forEach((size) => {
                    sizeId.append(
                        `<option value="${size.sizeDesc}">${size.sizeCode}</option>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function setOtherProps() {
        supplyDate.val(new Date().toISOString().slice(0, 10));
        populateSupplierComboBox();
        populateItemComboBox();
        populateSizeComboBox();
    }

    stockAddBtn.on('click', function () {
        stockForm[0].reset();
        generateStockId();
        setOtherProps();
        openStockModal('Add New Stock', 'Save', 'btn-success');
    });

    stockClear.on('click', function () {
        stockForm[0].reset();
    });

    supplierId.on('change', function () {
        supplierName.val(supplierId.val());
    });

    itemId.on('change', function () {
        itemDetails.val(itemId.val());
    });

    sizeId.on('change', function () {
        sizeDetails.val(sizeId.val());
    });

    unitBuyingPrice.on('input', calculateProfitAndMargin);

    unitSellingPrice.on('input', calculateProfitAndMargin);

    function calculateProfitAndMargin() {
        let buyingPrice = parseFloat(unitBuyingPrice.val()) || 0;
        let sellingPrice = parseFloat(unitSellingPrice.val()) || 0;
        let calculatedProfit = sellingPrice - buyingPrice;
        let calculatedProfitMargin = (buyingPrice > 0) ? (calculatedProfit / buyingPrice) * 100 : 0;

        profit.val(calculatedProfit.toFixed(2));
        profitMargin.val(calculatedProfitMargin.toFixed(2));
    }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    stockSaveUpdateBtn.on('click', function (event) {
        event.preventDefault();

        let stockIdVal = stockId.val();
        let supplierIdVal = supplierId.find('option:selected').text();
        let itemIdVal = itemId.find('option:selected').text();
        let sizeIdVal = sizeId.find('option:selected').text();
        let quantityVal = quantity.val();
        let unitBuyingPriceVal = unitBuyingPrice.val();
        let unitSellingPriceVal = unitSellingPrice.val();

        let stockModel = new StockModel(
            supplierIdVal,
            itemIdVal,
            sizeIdVal,
            quantityVal,
            unitBuyingPriceVal,
            unitSellingPriceVal,
        );

        console.log(stockModel);

        if (stockSaveUpdateBtn.text() === 'Save') {
            let email = getCookie('username');
            stockApi.saveStock(stockModel,email)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    stockClear.click();
                    populateStockTable();
                })
                .catch((error) => {
                    showError('Save Unsuccessful', error);
                });
        } else {
            stockApi.updateStock(stockModel, stockIdVal)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    stockClear.click();
                    populateStockTable();
                })
                .catch((error) => {
                    console.log(error);
                    showError('Update Unsuccessful', error);
                });
        }

    });

    function showError(title, text) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }

    function populateStockTable() {
        stockApi.getAllStocks()
            .then((responseText) => {
                let stock_db = responseText;
                console.log(responseText)
                tableBody.empty();
                stock_db.forEach((stock) => {
                    let buyingPrice = parseFloat(stock.unitBuyingPrice) || 0;
                    let sellingPrice = parseFloat(stock.unitSellingPrice) || 0;
                    let calculatedProfit = sellingPrice - buyingPrice;
                    let calculatedProfitMargin = (buyingPrice > 0) ? (calculatedProfit / buyingPrice) * 100 : 0;
                    tableBody.append(
                        `<tr>
                        <th scope="row">${stock.stockId}</th>
                        <td>${new Date(stock.supplierOrderDate).toISOString().slice(0, 10)}</td>
                        <td>${stock.supplierEntity.supplierCode}</td>
                        <td>${stock.supplierEntity.supplierName}</td>
                        <td>${stock.itemEntity.itemCode}</td>
                        <td>${stock.itemEntity.itemDesc}</td>
                        <td>${stock.sizeEntity.sizeCode}</td>
                        <td>${stock.sizeEntity.sizeDesc}</td>
                        <td>${stock.qty}</td>
                        <td>${stock.unitBuyingPrice}</td>
                        <td>${stock.unitSellingPrice}</td>
                        <td>${calculatedProfit.toFixed(2)}</td>
                        <td>${calculatedProfitMargin.toFixed(2)}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#stockModal"
                                data-stock-id="${stock.stockId}" 
                                data-supplier-order-date="${new Date(stock.supplierOrderDate).toISOString().slice(0, 10)}"
                                data-supplier-code="${stock.supplierEntity.supplierCode}" 
                                data-supplier-name="${stock.supplierEntity.supplierName}"
                                data-item-code="${stock.itemEntity.itemCode}" 
                                data-item-desc="${stock.itemEntity.itemDesc}" 
                                data-size-code="${stock.sizeEntity.sizeCode}" 
                                data-size-desc="${stock.sizeEntity.sizeDesc}" 
                                data-qty="${stock.qty}"
                                data-unit-buying-price="${stock.unitBuyingPrice}" data-unit-selling-price="${stock.unitSellingPrice}"
                                data-profit="${calculatedProfit.toFixed(2)}" data-profit-margin="${calculatedProfitMargin.toFixed(2)}">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-stock-id="${stock.stockId}">
                                Delete
                            </button>
                        </td>
                    </tr>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    tableBody.on('click', '.updateBtn', function () {
        const button = $(this);
        const stockIdValue = button.data('stock-id');
        const supplyDateValue = button.data('supplier-order-date');
        const quantityValue = button.data('qty');
        const unitBuyingPriceValue = button.data('unit-buying-price');
        const unitSellingPriceValue = button.data('unit-selling-price');
        const supplierCodeValue = button.data('supplier-name');
        const itemCodeValue = button.data('item-desc');
        const sizeCodeValue = button.data('size-desc');
        const profitValue = button.data('profit');
        const profitMarginValue = button.data('profit-margin');

        Promise.all([
            populateSupplierComboBox(),
            populateItemComboBox(),
            populateSizeComboBox()
        ]).then(() => {
            stockId.val(stockIdValue);
            supplyDate.val(supplyDateValue);
            quantity.val(quantityValue);
            unitBuyingPrice.val(unitBuyingPriceValue);
            unitSellingPrice.val(unitSellingPriceValue);

            supplierId.val(supplierCodeValue).trigger('change');
            itemId.val(itemCodeValue).trigger('change');
            sizeId.val(sizeCodeValue).trigger('change');

            profit.val(profitValue);
            profitMargin.val(profitMarginValue);

            console.log(`${supplierCodeValue} ${itemCodeValue} ${sizeCodeValue}`);

            // Open the modal after setting the values
            openStockModal('Update Stock', 'Update', 'btn-warning', stockIdValue);
        }).catch((error) => {
            console.log(error);
            showError('Fetch Unsuccessful', error);
        });
    });

    tableBody.on('click', '.deleteBtn', function () {
        const stockId = $(this).data('stock-id');
        deleteStock(stockId);
    });

    function deleteStock(stockId) {
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
                stockApi.deleteStock(stockId)
                    .then((responseText) => {
                        Swal.fire(
                            responseText,
                            'Successful',
                            'success'
                        )
                        populateStockTable();
                    })
                    .catch((error) => {
                        console.log(error);
                        showError('Delete Unsuccessful', error);
                    });
            }
        });
    }

    function openStockModal(headingText, buttonText, buttonClass, stockId) {
        heading.text(headingText);
        stockSaveUpdateBtn.text(buttonText);
        stockSaveUpdateBtn.removeClass('btn-success btn-warning').addClass(buttonClass);
    }

    search.on("input", function () {
        let value = $(this).val().toLowerCase();
        $("#stock-table-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
