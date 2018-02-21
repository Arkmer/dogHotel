$(document).ready(onReady); 

function onReady () {
    getVisitData ();
    
}

function getVisitData () {
    $.ajax ({
        type:'GET',
        url:'/pets/getvisits'
    }).done(function (response) {
        displayVisits(response);
        console.log('you got visits');
        console.log(response);
    }).fail(function (error) {
        console.log(`error on get visits: ${error}`);
        
    })
}

function displayVisits (arr) {
    let output = $('.visitTable');
    output.empty();
    for(pet of arr) {
        output.append(`<tr><th>${pet.pet_name}</th>
            <th>${pet.check_in.substring(5, 10)}</th>
            <th>${pet.check_out.substring(5, 10)}</th></tr>`);
    }
}