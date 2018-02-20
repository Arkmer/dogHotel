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
        // getPets();
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
        displayOwners(reponse);
        clearInputs();
    }).fail(function (response) {
        console.log('error:', response);
    })
}

// displayOwners(array) {
//     let output = //wait for ryan;
//     output.empty();
//     for (owner of array) {
        
//     }
// }