var express = require('express');
var router = express.Router();


const { initializeApp } = require('firebase-admin/app');


var admin = require("firebase-admin");

var serviceAccount = require("../public/sales-de9aa-firebase-adminsdk-e7zg9-fd821e1424.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sales-de9aa-default-rtdb.firebaseio.com"
});

const db = admin.database();

module.exports = {
    db,
};


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/findAll/json', function (req, res, next) {
    db.ref('sales').once('value', (snapshot) => {
        const data=snapshot.val();
        res.json({sales:data});
    })
    
});

router.get('/findById/:id/json', function (req, res, next) {
    let id = parseInt(req.params.id);
    db.ref("sales").orderByChild("customerNumber").equalTo(id).once("value",function(snapshot){
        res.json(snapshot.val())
    })
});


module.exports = router;
