const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json');

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        req.json({
            "firstname": req.body.firstname,
            "age": req.body.age,
        });
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "age": req.body.age,
        });
    })
    .delete((req, res) => {
        res.json({"id": req.body.id});
    })


router.route('/:id')
    .get((req, res) => {
        res.json({"id": req.params.id});
    });


module.exports = router;