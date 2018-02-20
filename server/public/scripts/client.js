console.log('JS');

$(document).ready(onReady);

function onReady(){
    console.log('jQ');
$('#ownerBtnReg').on('click', postOwner);
}

function postOwner () {
    let owner = {
        firstName: $('#firstNameReg').val(),
        lastName: $('#lastNameReg').val()
    };
    $.ajax({
        type: 'POST',
        url:'/pets',
        data: owner
    }).done(function (response) {
        console.log('sending owner info');
        getOwners();
        // clearInputs();
    }).fail(function (response) {
        console.log('error:', response);
    })
}

function getOwners () {
    $.ajax({
        type: 'GET',
        url:'/pets'
    }).done(function (response) {
        console.log('got owner info');
        displayOwners(response);
        // clearInputs();
    }).fail(function (response) {
        console.log('error:', response);
    })
}


function displayOwners(array){
    let output = $('#ownerSelect');
    output.empty();
    output.append(`<option value="" disabled selected>Owner</option>`);
    for (owner of array) {
        output.append(`<option value="${owner.id}">${owner.first_name} ${owner.last_name}</option>`);
    }
}    