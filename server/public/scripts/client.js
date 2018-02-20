$(document).ready(onReady);

function onReady(){
    getOwners ();
    getPets();
    $('#ownerBtnReg').on('click', postOwner);
    $('#petBtnReg').on('click', postPet);
    $('#petsTable').on('click', '.removePet', removePet);
    $('#petsTable').on('click', '.editPet', editPet);
    $('#petsTable').on('click', '.submit', submitEditPet);
    $('#petsTable').on('click', '.in', inToOut);
    $('#petsTable').on('click','.out', outToIn);
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
            <th id="${pet.id}-name">${pet.pet_name}</th>
            <th id="${pet.id}-breed">${pet.breed}</th>
            <th id="${pet.id}-color">${pet.color}</th>
            <th><button type="button" data-id=${pet.id} data-name="${pet.pet_name}" 
            data-breed="${pet.breed}" data-color="${pet.color}" class="editPet">Go</button></th>
            <th><button type="button" data-id=${pet.id} class="removePet">Go</button></th>
            <th><button type="button" data-id=${pet.id} class="in">In</button></th>
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

function editPet(){
    console.log('click');
    let id = $(this).data('id');
    let name = $(this).data('name')
    let breed = $(this).data('breed')
    let color = $(this).data('color')
    $(`#${id}-name`).empty();
    let nameInputAppend = `<input type="text" id="editName" value="${name}" placeholder="Name">`;
    $(`#${id}-name`).append(nameInputAppend);
    $(`#${id}-breed`).empty();
    let breedInputAppend = `<input type="text" id="editBreed" value="${breed}" placeholder="Breed">`;
    $(`#${id}-breed`).append(breedInputAppend);
    $(`#${id}-color`).empty();
    let colorInputAppend = `<input type="text" id="editColor" value="${color}" placeholder="Color">`;
    $(`#${id}-color`).append(colorInputAppend);
    $(this).replaceWith(`<button data-id="${id}" class="submit">Submit</button>`);
}

function submitEditPet(){
    let pet = {
        id: $(this).data('id'),
        name: $('#editName').val(),
        breed: $('#editBreed').val(),
        color: $('#editColor').val()
    }
    $(this).replaceWith(`<th><button type="button" data-id=${pet.id} data-name="${pet.name}" 
        data-breed="${pet.breed}" data-color="${pet.color}" class="editPet">Edit</button></th>`);
    $.ajax({
        type: 'PUT',
        url: '/pets/edit',
        data: pet
    })
    .done(function(response){
        getPets();
    })
    .fail(function(response){
        console.log('error editing pet');
    })
}

function inToOut () {
    let id = $(this).data('id');
    $(this).replaceWith(`<button type="button" data-id=${id} class="out">Out</button>`);
    $.ajax({
        type:'POST',
        url:`/pets/${id}`
    }).done(function (response) {
        console.log('sending in time', response);
    }).fail(function (error) {
        console.log('failed on sending time', error);
    })
}

function outToIn () {
    let id = $(this).data('id');
    $(this).replaceWith(`<button type="button" data-id=${id} class="in">In</button>`);
    $.ajax({
        type:'PUT',
        url:`/pets/${id}`
    }).done(function (response) {
        console.log('sending out time', response);
    }).fail(function (error) {
        console.log('failed on out sending time', error);
    })
}