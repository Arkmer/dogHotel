console.log('JS');

$(document).ready(onReady);

function onReady(){
    getOwners ();
    getPets();
    console.log('jQ');
    $('#ownerBtnReg').on('click', postOwner);
    $('#petBtnReg').on('click', postPet);
    $('#petsTable').on('click', '.removePet', removePet);
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
        getPets();
        //clearInputs();
    }).fail(function(response){
        console.log('error in post pets info', response);
    })

}

function getPets(){
    $.ajax({
        type: 'GET',
        url:'/pets/info'
    }).done(function (response) {
        console.log('got pet info');
        displayPets(response);
        // clearInputs();
    }).fail(function (response) {
        console.log('error:', response);
    })
}

function displayPets(pets){
    let output = $('#petsTable');
    output.empty();
    for(pet of pets){
        output.append(`<tr><th>${pet.first_name} ${pet.last_name}</th>
                <th>${pet.pet_name}</th>
                <th>${pet.breed}</th>
                <th>${pet.color}</th>
                <th><button type="button" data-id=${pet.id} class="editPet">Edit</button></th>
                <th><button type="button" data-id=${pet.id} class="removePet">Remove</button></th>
                <th><button type="button" data-id=${pet.id} class="chicken">In/Out</button></th>
                </tr>`)
    }
}

function removePet(){
    let id = $(this).data('id');
    console.log(id);
    $.ajax({
        type: 'DELETE',
        url: `/pets/${id}`
    })
    .done(function(response){
        console.log('removed pet id', id);
        getPets();
    })
    .fail(function(response){
        console.log('error removing pet');
    })

}