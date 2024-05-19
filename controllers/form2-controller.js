
let db = require('../model/sqlite/model.js');

exports.goToForm2 = (req, res) => {
    res.render('form2', {
        style: "form2.css",
        title: "form",
        user_id: req.session.loggedUserId
    });
    //console.log("form");
};

exports.submitEvent = function (req, res) {
    let date = new Date();
    let dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    
    let form = {
        id : req.params.id,
        damaged_building: null,
        class_name: req.body.class_name,
        damage_type: req.body.damage_type,
        severity: req.body.severity,
        damage_info: req.body.damage_info,
        file_path: req.body.file_path,
        additional_info: req.body.additional_info,
        date: dateString
    };

    //console.log(form);

    db.submitEvent(form, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            req.flash('success', 'Η βλάβη καταχωρήθηκε με επιτυχία');
            res.redirect('/'); // Αλλαγή εδώ για να κατευθύνετε στη σελίδα υποβολών μετά την υποβολή
        }
    });
};
