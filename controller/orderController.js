import { OrderApi } from "../api/orderApi.js";
import { CustomerApi } from "../api/customerApi.js";
import { StockApi } from "../api/stockApi.js";

$(document).ready(function () {
    let orderId = $('#orderId');
    let orderDate = $('#orderDate');
    let customerId = $('#customerId');
    let stockId = $('#stockId');

    let orderApi = new OrderApi();
    let customerApi = new CustomerApi();
    let stockApi = new StockApi();

    generateOrderId();

    function populateCustomerComboBox() {
        return customerApi.getAllCustomer()
            .then((responseText) => {
                customerId.empty().append('<option value="">Select Customer</option>');
                responseText.forEach((customer) => {
                    customerId.append(
                        `<option value="${customer.customerId}">${customer.customerId}</option>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function populateStockComboBox() {
        return stockApi.getAllStocks()
            .then((responseText) => {
                stockId.empty().append('<option value="">Select Item From Stock</option>');
                responseText.forEach((stock) => {
                    stockId.append(
                        `<option value="${stock.stockId}">${stock.stockId}</option>`
                    );
                });
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    function setProps() {
        orderDate.val(new Date().toISOString().slice(0, 10));
        populateCustomerComboBox();
        populateStockComboBox();
    }

    setProps();

    function generateOrderId() {
        orderApi.generateOrderId()
            .then(oId => {
                orderId.val(oId);
            })
            .catch(error => {
                showError('Fetching Error', 'Error generating order ID');
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

    customerId.change(function () {
        let custId = $(this).val();
        customerApi.getCustomer(custId)
            .then((responseText) => {
                let customer = responseText;
                $('#customerName').text(`Name: ${customer.customerName}`);
                $('#customerContact').text(`Contact: ${customer.contactNo}`);
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    });

    stockId.change(function () {
        let selectedStockId = $(this).val();
        stockApi.getAllStocks()
            .then((responseText) => {
                let stock = responseText.find(stock => stock.stockId === selectedStockId);
                if (stock) {
                    $('#product-id').val(stock.itemEntity.itemCode);
                    $('#product-detail').val(stock.itemEntity.itemDesc);
                    $('#availableQty').val(stock.qty);
                    $('#product-selling-price').val(stock.unitSellingPrice);
                }
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    });

    $('#paymentMethod').change(function () {
        let paymentMethod = $(this).val();
        if (paymentMethod === 'CARD') {
            $('#cardDetails').removeClass('hidden');
            $('#cashDetails').addClass('hidden');
        } else if (paymentMethod === 'CASH') {
            $('#cardDetails').addClass('hidden');
            $('#cashDetails').removeClass('hidden');
        }
    });

    $('#addOrderDetail').click(function () {
        let stockId = $('#stockId').val();
        let productId = $('#product-id').val();
        let productDetails = $('#product-detail').val();
        let availableQty = parseInt($('#availableQty').val());
        let quantity = parseInt($('#quantity').val());
        let unitSellingPrice = parseFloat($('#product-selling-price').val());

        if (quantity > availableQty) {
            showError('Input Error', 'Quantity exceeds available stock!');
            return;
        }

        // Check if the stock ID already exists in the table
        let existingRow = $(`#orderDetailsTable tr[data-stock-id="${stockId}"]`);
        if (existingRow.length) {
            // Update the existing row
            let existingQty = parseInt(existingRow.find('td:nth-child(4)').text());
            let newQty = existingQty + quantity;
            existingRow.find('td:nth-child(4)').text(newQty);
        } else {
            // Add a new row to the table
            $('#orderDetailsTable').append(`
                <tr data-stock-id="${stockId}">
                    <td class="border px-4 py-2">${productId}</td>
                    <td class="border px-4 py-2">${productDetails}</td>
                    <td class="border px-4 py-2">${unitSellingPrice}</td>
                    <td class="border px-4 py-2">${quantity}</td>
                </tr>
            `);
        }

        // Clear the text fields
        $('#stockId').val('');
        $('#product-id').val('');
        $('#product-detail').val('');
        $('#availableQty').val('');
        $('#quantity').val('');
        $('#product-selling-price').val('');

        // Re-populate the stock combo box
        populateStockComboBox();

        calculateTotal();
    });

    function calculateTotal() {
        let total = 0;
        $('#orderDetailsTable tr').each(function () {
            let unitSellingPrice = parseFloat($(this).find('td:nth-child(3)').text());
            let quantity = parseInt($(this).find('td:nth-child(4)').text());
            total += unitSellingPrice * quantity;
        });
        $('#total').val(total);

        if (total > 800) {
            let loyaltyPoints = Math.floor(total / 800);
            $('#loyaltyPoints').text(`Loyalty Points Added: ${loyaltyPoints}`);
        } else {
            $('#loyaltyPoints').text('');
        }
    }

    $('#amountPaid').on('input', function () {
        let paymentAmount = parseFloat($(this).val()) || 0;
        let totalAmount = parseFloat($('#total').val()) || 0;
        let balance = paymentAmount - totalAmount;
        $('#balance').val(balance.toFixed(2));
    });

    $('#orderForm').submit(function (e) {
        e.preventDefault();

        let orderDetailsList = [];
        $('#orderDetailsTable tr').each(function () {
            let stockId = $(this).data('stock-id');
            let qty = parseInt($(this).find('td:nth-child(4)').text());
            orderDetailsList.push({ stockOrderDetailsId: '', stockId, qty });
        });

        let paymentMethod = $('#paymentMethod').val();
        let totalAmount = parseFloat($('#total').val());
        let paidAmount = parseFloat($('#amountPaid').val());

        let bankName = $('#bankName').val();
        let bankNo = $('#bankNo').val();

        if (paymentMethod === 'CASH') {
            bankName = 'No Bank';
            bankNo = 'No Number';
        } else if (paymentMethod === 'CARD') {
            paidAmount = totalAmount;
        }

        let order = {
            orderNo: $('#orderId').val(),
            paymentMethod: paymentMethod,
            totalAmount: totalAmount,
            paidAmount: paidAmount,
            bankName: bankName,
            bankNo: bankNo,
            customerId: $('#customerId').val(),
            userId: localStorage.getItem('userEmail'), // Assuming email is used as userId
            orderDetailsList: orderDetailsList
        };

        $.ajax({
            url: 'http://localhost:8080/shop/api/v1/sale',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(order),
            success: function () {
                Swal.fire(
                    'Successful',
                    'Your order has been successfully submitted.',
                    'success'
                );

                $('#orderForm')[0].reset();
                $('#orderDetailsTable tbody').empty();
                $('#total').val('');
                $('#balance').val('');
                $('#loyaltyPoints').text('');
                $('#customerName').text('');
                $('#customerContact').text('');
                $('#orderDetailsTable').empty();

                generateOrderId();
                setProps();
            },
            error: function (xhr, status, error) {
                showError('Save Unsuccessful', error);
            }
        });
    });

});