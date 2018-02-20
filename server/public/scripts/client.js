console.log('JS');

$(document).ready(onReady);

function onReady(){
    console.log('jQ');

}

function postOwner () {
    let owner = {
        firstName: $('#firstNameIn'),
        lastName: $('#lastNameIn')
    };
    $.ajax({
        type: 'POST',
        url:'/pets',
        data: owner
    }).done(function (response) {
        console.log('sending owner info');
        getPets();
        clearInputs();
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

displayOwners(array) {
    let output = //wait for ryan;
    output.empty();
    for (owner of array) {
        
    }
}