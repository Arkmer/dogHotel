console.log('JS');

$(document).ready(onReady);

function onReady(){
    getOwners ();
    console.log('jQ');
$('#ownerBtnReg').on('click', postOwner);
$('#petBtnReg').on('click', postPet);
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
        console.log(owner);
        output.append(`<option id="ownerReg" value="${owner.id}">${owner.first_name} ${owner.last_name}</option>`);
    }
}    


function postPet(){
    let pet = {
        owner: $('#ownerSelect').val(),
        petName: $('#petNameReg').val(),
        color: $('#colorReg').val(),
        breed: $('#breedReg').val()
    }
    console.log(pet);
    $.ajax({
        type:'POST',
        url:'/pets/info',
        data: pet
    }).done(function(response){
        console.log('posting pets info', response);
        //getPets();
        //clearInputs();
    }).fail(function(response){
        console.log('error in post pets info', response);
    })

}