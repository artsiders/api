const express = require('express');
const router = express.Router();
const depenseController = require('../controllers/depense.controller');

router.post('/', depenseController.postDatas);

router.get('/last', depenseController.getLast);

router.get('/mois/:id', depenseController.getByMonth);

router.put('/:id', depenseController.updateDatas);

router.delete('/', depenseController.deleteAll);

router.delete('/:id', depenseController.deleteById);

router.get('/' + '', depenseController.getAll);

module.exports = router;
