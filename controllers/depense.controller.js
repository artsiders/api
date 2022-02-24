const Depenses = require('../models/depense.model');

module.exports.postDatas = (req, res, next) => {
    const depense = new Depenses({
        bar: req.body.bar,
        hebergement: req.body.hebergement,
        restaurant: req.body.restaurant,
        facture: req.body.facture,
        maintenence: req.body.maintenence,
        salaire: req.body.salaire,
        autres: req.body.autres,
        tcb: req.body.tcb,
        date: req.body.date,
        mois: req.body.mois,
    });
    depense.save().then(() => {
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
}

module.exports.getLast = (req, res, next) => {
    Depenses.findOne().sort({ $natural: -1 }).then(
        (Depenses) => {
            const date = new Date();
            if(Depenses === null) {
                res.status(200).json({
                    date: `${date.getFullYear()}-02-15`,
                    mois: 0
                });
            } else res.status(200).json(Depenses);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

module.exports.getByMonth = (req, res, next) => {
    Depenses.find({ mois: req.params.id }).sort({ createdAt: 1 }).then(
        (Depenses) => {
            res.status(200).json(Depenses);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

module.exports.updateDatas = (req, res, next) => {
    const depense = new Depenses({
        _id: req.params.id,
        bar: req.body.bar,
        hebergement: req.body.hebergement,
        restaurant: req.body.restaurant,
        facture: req.body.facture,
        maintenence: req.body.maintenence,
        salaire: req.body.salaire,
        autres: req.body.autres,
        tcb: req.body.tcb,
        date: req.body.date,
        mois: req.body.mois,
    });
    Depenses.updateOne({ _id: req.params.id }, depense).then(
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
}

module.exports.deleteAll = (req, res, next) => {
    Depenses.deleteMany().skip(2).then(
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
}

module.exports.deleteById = (req, res, next) => {
    Depenses.deleteOne({ _id: req.params.id }).then(
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
}

module.exports.getAll = (req, res, next) => {
    Depenses.find().then(
        (Depenses) => {
            res.status(200).json(Depenses);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}