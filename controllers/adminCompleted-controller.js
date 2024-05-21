const express = require('express');
const router = express.Router();
let db = require('../model/sqlite/model.js');


exports.goToAdminCompletedForms = (req, res) => {
    //const userIsSignedIn = true; 
    res.render('adminCompleted', {
        style: "adminCompleted.css",
        title: "AdminCompleted",
        script: "adminCompleted.js",
        admin_id: req.session.loggedUserId
    })
};

exports.getAllCompletedForms = function (req, res, next) {
    db.getAllCompletedForms(function (err, completed_forms) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            req.completed_forms = completed_forms; // Attach the forms to the request object
            res.render('adminCompleted', {
                style: "adminCompleted.css",
                title: "AdminCompleted",
                script: "adminCompleted.js",
                admin_id: req.session.loggedUserId,
                completed_forms:req.completed_forms
            })
        }
    });
};
    
