var express = require('express');
var router = express.Router();
const axios = require('axios')


router.get('/customers', async function (req, res, next) {
  const URL = 'http://localhost:4444/customers/findAll/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = await axios.get(URL, config)
  const data = response.data
  res.render('index', { title: 'Clientes', customers: data });
})


router.get('/customers/getOrders', async function (req, res, next) {
  const id= req.query.id
  const URL = "http://localhost:8080/orders/findById/" + id + "/json"
  const config = {
    proxy: {
      host: 'localhost',
      port: 8080
    }
  }
  const response = await axios.get(URL, config);

  let myMap = new Map(Object.entries(response.data));
  console.log(myMap);

  res.render('table_order', { title: 'Ordenes', orders: myMap });
});

module.exports = router;
