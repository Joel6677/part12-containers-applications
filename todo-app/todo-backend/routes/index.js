const express = require('express');
const router = express.Router();
const {setAsync, getAsync} = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  res.json(await getAsync('added_todos'))
})



module.exports = router;
