import { GenderModel } from "../model/genderModel.js";
import { GenderApi } from "../api/genderApi.js";
import { OccasionModel } from "../model/occasionModel.js";
import { OccasionApi } from "../api/occasionApi.js";
import { VarietyApi } from "../api/varietyApi.js";
import { VarietyModel } from "../model/varietyModel.js";
import { SizeApi } from "../api/sizeApi.js";
import { SizeModel } from "../model/sizeModel.js";

$(document).ready(function() {
    let genderId = $('#gender-id');
    let genderName = $('#gender-desc');

    let genderApi = new GenderApi();

    let tableBody = $('#gender-table-body');

    let saveUpdateGenderBtn = $('#gender-save-update-btn');
    let genderClearBtn = $('#genderReset');


    let occasionId = $('#occasion-id');
    let occasionName = $('#occasion-name');

    let occasionApi = new OccasionApi();

    let occasionTableBody = $('#occasion-table-body');

    let occasionSaveUpdateBtn = $('#occasion-save-update-btn');
    let occasionClearBtn = $('#occasionReset');

    let varietyId = $('#variety-id');
    let varietyName = $('#variety-name');

    let varietyApi = new VarietyApi();

    let varietyTableBody = $('#variety-table-body');

    let saveUpdateVarietyBtn = $('#variety-save-update-btn');
    let varietyClearBtn = $('#varietyClear');

    let sizeId = $('#size-id');
    let sizeDesc = $('#size-desc');

    let sizeApi = new SizeApi();

    let sizeTableBody = $('#size-table-body');

    let saveUpdateSizeBtn = $('#size-save-update-btn');
    let sizeClearBtn = $('#sizeClear');

    saveUpdateGenderBtn.on('click', function(){
        event.preventDefault();
        console.log('hi');
        let code = genderId.val();
        let desc = genderName.val();

        let genderModel = new GenderModel(
            code,
            desc
        );

        if (saveUpdateGenderBtn.text() === "Save") {
            genderApi.saveGender(genderModel).then(function(responseText){
                Swal.fire(
                    responseText,
                    'Successful',
                   'success'
                )
                populateGenderTable();
                genderClearBtn.click();
            });
        }else{
            genderApi.updateGender(genderModel).then((responseText) => {
                Swal.fire(
                    responseText,
                    'Successful',
                   'success'
                )
                genderClearBtn.click();
                populateGenderTable();
            }).catch((error) => {
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

    $('#addProducsListBtn').eq(0).click(function() {
        event.preventDefault();
        populateGenderTable();
        populateOccasionTable();
        populateVarietyTable();
        populateSizeTable();
    });

    tableBody.on('click', '.updateBtn', function () {
        const genderCode = $(this).data('gender-id');
        const genderDesc = $(this).data('gender-desc');
        openGenderModal('Update Gender', 'Update', 'btn-warning', genderCode, genderDesc);
    });

    tableBody.on('click', '.deleteBtn', function () {
        const genId = $(this).data('gender-id');
        deleteGender(genId);
    });

    function deleteGender(genId) {
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
                genderApi.deleteGender(genId)
                    .then((responseText) => {
                        Swal.fire(
                            responseText,
                            'Successful',
                            'success'
                        )
                        populateGenderTable();
                    })
                    .catch((error) => {
                        console.log(error);
                        showError('Gender delete Unsuccessful', error);
                    });
            }
        });
    }

    function populateGenderTable(){
        genderApi.getAllGender()
            .then((responseText) => {
                let gender_db = responseText;
                tableBody.empty();
                gender_db.forEach((gender) => {
                    tableBody.append(
                        `<tr>
                        <th row='span'>${gender.genderCode}</th>
                        <td>${gender.genderDesc}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#genderModal"
                                data-gender-id="${gender.genderCode}" data-gender-desc="${gender.genderDesc}">Edit</button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-gender-id="${gender.genderCode}">Delete</button>
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

    function openGenderModal(headingtxt, buttonText, btnClass, genId, genDesc) {
        if (genId && genDesc) {
            genderId.val(genId).prop('disabled', true);
            genderName.val(genDesc);
        } else {
            genderId.prop('disabled', false);
        }

        $('#genderFormHeading').text(headingtxt);
        saveUpdateGenderBtn.text(buttonText);
        saveUpdateGenderBtn.removeClass('btn-success btn-warning').addClass(btnClass);
    }

    occasionSaveUpdateBtn.on('click', function(event) {
        event.preventDefault();
        let code = occasionId.val();
        let desc = occasionName.val();

        let occasionModel = new OccasionModel(code, desc);

        if (occasionSaveUpdateBtn.text() === "Save") {
            occasionApi.saveOccasion(occasionModel).then(function(responseText) {
                Swal.fire(responseText, 'Successful', 'success');
                populateOccasionTable();
                occasionClearBtn.click();
            });
        } else {
            occasionApi.updateOccasion(occasionModel).then(function(responseText) {
                Swal.fire(responseText, 'Successful', 'success');
                populateOccasionTable();
                occasionClearBtn.click();
            }).catch(function(error) {
                showError('Update Unsuccessful', error);
            });
        }
    });

    occasionTableBody.on('click', '.updateBtn', function () {
        const occasionCode = $(this).data('occasion-id');
        const occasionDesc = $(this).data('occasion-desc');
        openOccasionModal('Update Occasion', 'Update', 'btn-warning', occasionCode, occasionDesc);
    });

    occasionTableBody.on('click', '.deleteBtn', function () {
        const occasionId = $(this).data('occasion-id');
        deleteOccasion(occasionId);
    });

    function deleteOccasion(occasionId) {
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
                occasionApi.deleteOccasion(occasionId).then(function(responseText) {
                    Swal.fire(responseText, 'Successful', 'success');
                    populateOccasionTable();
                }).catch(function(error) {
                    console.log(error);
                    showError('Occasion delete Unsuccessful', error);
                });
            }
        });
    }

    function populateOccasionTable() {
        occasionApi.getAllOccasions().then(function(response) {
            let occasion_db = response;
            occasionTableBody.empty();
            occasion_db.forEach((occasion) => {
                occasionTableBody.append(`
                    <tr>
                        <th scope='row'>${occasion.occasionCode}</th>
                        <td>${occasion.occasionDesc}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#occasionModal"
                                data-occasion-id="${occasion.occasionCode}" data-occasion-desc="${occasion.occasionDesc}">Edit</button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-occasion-id="${occasion.occasionCode}">Delete</button>
                        </td>
                    </tr>
                `);
            });
        }).catch(function(error) {
            console.log(error);
            showError('fetch Unsuccessful', error);
        });
    }

    function openOccasionModal(headingtxt, buttonText, btnClass, occasionCode, occasionDesc) {
        if (occasionCode && occasionDesc) {
            occasionId.val(occasionCode).prop('disabled', true);
            occasionName.val(occasionDesc);
        } else {
            occasionId.prop('disabled', false);
        }

        $('#occasionFormHeading').text(headingtxt);
        occasionSaveUpdateBtn.text(buttonText);
        occasionSaveUpdateBtn.removeClass('btn-success btn-warning').addClass(btnClass);
    }

    saveUpdateVarietyBtn.on('click', function(event) {
        event.preventDefault();
        let code = varietyId.val();
        let desc = varietyName.val();

        let varietyModel = new VarietyModel(code, desc);

        if (saveUpdateVarietyBtn.text() === "Save") {
            varietyApi.saveVariety(varietyModel).then(function(responseText) {
                Swal.fire(responseText, 'Successful', 'success');
                populateVarietyTable();
                varietyClearBtn.click();
            }).catch(function(error) {
                showError('Save Unsuccessful', error);
            });
        } else {
            varietyApi.updateVariety(varietyModel).then(function(responseText) {
                Swal.fire(responseText, 'Successful', 'success');
                populateVarietyTable();
                varietyClearBtn.click();
            }).catch(function(error) {
                showError('Update Unsuccessful', error);
            });
        }
    });

    varietyTableBody.on('click', '.updateBtn', function() {
        const varietyCode = $(this).data('variety-id');
        const varietyDesc = $(this).data('variety-desc');
        openVarietyModal('Update Variety', 'Update', 'btn-warning', varietyCode, varietyDesc);
    });

    varietyTableBody.on('click', '.deleteBtn', function() {
        const varietyId = $(this).data('variety-id');
        deleteVariety(varietyId);
    });

    function deleteVariety(varietyId) {
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
                varietyApi.deleteVariety(varietyId).then(function(responseText) {
                    Swal.fire(responseText, 'Successful', 'success');
                    populateVarietyTable();
                }).catch(function(error) {
                    showError('Delete Unsuccessful', error);
                });
            }
        });
    }

    function populateVarietyTable() {
        varietyApi.getAllVarieties().then(function(response) {
            let variety_db = response;
            varietyTableBody.empty();
            variety_db.forEach((variety) => {
                varietyTableBody.append(`
                    <tr>
                        <th scope='row'>${variety.varietyCode}</th>
                        <td>${variety.varietyDesc}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#varietyModal"
                                data-variety-id="${variety.varietyCode}" data-variety-desc="${variety.varietyDesc}">Edit</button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-variety-id="${variety.varietyCode}">Delete</button>
                        </td>
                    </tr>
                `);
            });
        }).catch(function(error) {
            showError('Fetch Unsuccessful', error);
        });
    }

    function openVarietyModal(headingtxt, buttonText, btnClass, varietyId, varietyDesc) {
        if (varietyId && varietyDesc) {
            $('#variety-id').val(varietyId).prop('disabled', true);
            $('#variety-name').val(varietyDesc);
        } else {
            $('#variety-id').prop('disabled', false);
        }

        $('#varietyFormHeading').text(headingtxt);
        saveUpdateVarietyBtn.text(buttonText);
        saveUpdateVarietyBtn.removeClass('btn-success btn-warning').addClass(btnClass);
    }
    
    // Clear form function
    varietyClearBtn.on('click', function() {
        $('#varietyForm')[0].reset();
        $('#variety-id').prop('disabled', false);
        saveUpdateVarietyBtn.text('Save').removeClass('btn-warning').addClass('btn-success');
    });

    saveUpdateSizeBtn.on('click', function(event) {
        event.preventDefault();
        let code = sizeId.val();
        let desc = sizeDesc.val();

        let sizeModel = new SizeModel(code, desc);

        if (saveUpdateSizeBtn.text() === "Save") {
            sizeApi.saveSize(sizeModel).then(function(responseText) {
                Swal.fire(responseText, 'Successful', 'success');
                populateSizeTable();
                sizeClearBtn.click();
            }).catch(function(error) {
                showError('Save Unsuccessful', error);
            });
        } else {
            sizeApi.updateSize(sizeModel).then(function(responseText) {
                Swal.fire(responseText, 'Successful', 'success');
                populateSizeTable();
                sizeClearBtn.click();
            }).catch(function(error) {
                showError('Update Unsuccessful', error);
            });
        }
    });

    sizeTableBody.on('click', '.updateBtn', function() {
        const sizeCode = $(this).data('size-id');
        const sizeDesc = $(this).data('size-desc');
        openSizeModal('Update Size', 'Update', 'btn-warning', sizeCode, sizeDesc);
    });

    sizeTableBody.on('click', '.deleteBtn', function() {
        const sizeId = $(this).data('size-id');
        deleteSize(sizeId);
    });

    function deleteSize(sizeId) {
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
                sizeApi.deleteSize(sizeId).then(function(responseText) {
                    Swal.fire(responseText, 'Successful', 'success');
                    populateSizeTable();
                }).catch(function(error) {
                    showError('Delete Unsuccessful', error);
                });
            }
        });
    }

    function populateSizeTable() {
        sizeApi.getAllSizes().then(function(response) {
            let size_db = response;
            sizeTableBody.empty();
            size_db.forEach((size) => {
                sizeTableBody.append(`
                    <tr>
                        <th scope='row'>${size.sizeCode}</th>
                        <td>${size.sizeDesc}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#sizeModal"
                                data-size-id="${size.sizeCode}" data-size-desc="${size.sizeDesc}">Edit</button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-size-id="${size.sizeCode}">Delete</button>
                        </td>
                    </tr>
                `);
            });
        }).catch(function(error) {
            showError('Fetch Unsuccessful', error);
        });
    }

    function openSizeModal(headingtxt, buttonText, btnClass, sizeCode, sizeDesc) {
        if (sizeCode && sizeDesc) {
            $('#size-id').val(sizeCode).prop('disabled', true);
            $('#size-desc').val(sizeDesc);
        } else {
            $('#size-id').prop('disabled', false);
        }

        $('#sizeFormHeading').text(headingtxt);
        saveUpdateSizeBtn.text(buttonText);
        saveUpdateSizeBtn.removeClass('btn-success btn-warning').addClass(btnClass);
    }

    sizeClearBtn.on('click', function() {
        $('#sizeForm')[0].reset();
        $('#size-id').val(generateNextSizeId());
        saveUpdateSizeBtn.text('Save').removeClass('btn-warning').addClass('btn-success');
    });

    $('#sizeAddBtn').eq(0).on('click', function() {
        event.preventDefault();
        generateNextSizeId();
    });
    
    function generateNextSizeId() {
        sizeApi.getSizeId().then(function(sizeId) {
            $('#size-id').val(sizeId);
        });
    }

});