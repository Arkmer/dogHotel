const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.post('/',function(request, response){
    console.log('Posting owners');
    const owner = request.body;
    console.log(owner);
    const sqlText = `INSERT INTO owners 
     (first_name, last_name) VALUES ($1,$2)`;
     pool.query(sqlText, [owner.firstName, owner.lastName])
     .then(function(result){
         console.log('successful posted owner');
         response.sendStatus(200);
     })
    .catch(function(error){
        console.log('error on post', error);
        response.sendStatus(500);
    })
    
})

router.get('/',function(request, response){
    console.log('Get owners');
    const sqlText = `SELECT * FROM owners order by id`;
    pool.query(sqlText)
    .then(function(result){
        console.log('getting owners');
        response.send(result.rows)
    })
    .catch(function(error){
        console.log('error in get', error);
        response.sendStatus(500);
    })


















    
})







module.exports = router;