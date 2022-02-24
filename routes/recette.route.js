const express = require('express');
const router = express.Router();
const Recettes = require('../models/recette.model');

router.post('/', (req, res, next) => {
    const recette = new Recettes({
        vercement: req.body.vercement,
        credit: req.body.credit,
        recouvrement: req.body.recouvrement,
        observation: req.body.observation,
        departement: req.body.departement,
        date: req.body.date,
        mois: req.body.mois,
    });
    recette.save().then(() => {
        res.status(201).json({
            message: 'successfully'
        });
    }
    ).catch((error) => {
        res.status(400).json({
            error: "ERREUR" + error
        });
    }
    );
});

router.get('/last/:id', (req, res, next) => {
    Recettes.findOne({ departement: req.params.id }).sort({ $natural: -1 }).then(
        (Recettes) => {
            const date = new Date();
            if (Recettes === null) {
                res.status(200).json({
                    date: `${date.getFullYear()}-02-15`,
                    mois: 0
                });
            } else res.status(200).json(Recettes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
router.get('/depart/:depart/:id', (req, res, next) => {
    Recettes.find({ departement: req.params.depart, mois: req.params.id }).then(
        (Recettes) => {
            res.status(200).json(Recettes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
router.get('/departstat/:id', (req, res, next) => {
    Recettes.find({ departement: req.params.id }).sort({ $natural: -1 }).then(
        (Recettes) => {
            res.status(200).json(Recettes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

router.get('/mois/:id', (req, res, next) => {
    Recettes.find({ mois: req.params.id }).sort({ createdAt: 1 }).then(
        (Recettes) => {
            res.status(200).json(Recettes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

router.get('/:id', (req, res, next) => {
    Recettes.findOne({
        _id: req.params.id
    }).then(
        (recette) => {
            res.status(200).json(recette);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});
router.put('/:id', (req, res, next) => {
    const recette = new Recettes({
        _id: req.params.id,
        vercement: req.body.vercement,
        credit: req.body.credit,
        recouvrement: req.body.recouvrement,
        observation: req.body.observation,
        departement: req.body.departement,
        date: req.body.date,
        mois: req.body.mois,
    });
    Recettes.updateOne({ _id: req.params.id }, recette).then(
        () => {
            res.status(201).json({
                message: 'updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
router.delete('/:id', (req, res, next) => {
    Recettes.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
router.get('/' + '', (req, res, next) => {
    Recettes.find().then(
        (recettes) => {
            res.status(200).json(recettes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
module.exports = router;
