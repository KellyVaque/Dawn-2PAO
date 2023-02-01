var express = require('express');
var router = express.Router();


const { Sequelize, Op } = require('sequelize');
const Customer = require('../models').customers;

router.get('/findAll/json', function (req, res, next) {


    Customer.findAll({
        attributes: { exclude: ["updatedAt", "id", "createdAt"] }
    })
        .then(customers => {
            res.json(customers);
        })
        .catch(error => res.status(400).send(error))

});


router.get('/findById/:id/json', function (req, res, next) {

    let id = parseInt(req.params.id);
    
    Customer.findAll({
        attributes: { exclude: ["updatedAt", "id", "createdAt"] },
        where: {
            [Op.and]: [
                { customerNumber: id }
            ]
        }
    })
        .then(customers => {
            res.json(customers);
        })
        .catch(error => res.status(400).send(error))

});
module.exports = router;
