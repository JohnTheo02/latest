'use strict';

// Το better-slite3 είναι εντελώς σύγχρονο
const db = require('better-sqlite3');
const bcrypt = require('bcrypt');
const sql = new db('./model/sqlite/database.sqlite', { fileMustExist: true });


exports.submitEvent = function (form, callback) {
    const stmt = sql.prepare("INSERT INTO damage_reports VALUES (null, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?)");
    try {
        stmt.run( form.damaged_building, form.class_name, form.damage_type, form.severity, form.damage_info, form.file_path,form.status, form.additional_info,form.user_id,form.location, form.date);
    } catch (err) {
        callback(err, null);
    }
    callback(null, true);
};

exports.getBuildings = function (callback) {
    const stmt = sql.prepare("SELECT name FROM buildingsList WHERE departments = selectedDepartment");
    let buildings;
    try {
        buildings = stmt.all();
    } catch (err) {
        callback(err, null);
    }
    callback(null, buildings);
    
}

exports.getClassName = function (callback) {
    const stmt = sql.prepare("SELECT name FROM classesList WHERE departments = selectedDepartment");
    let classes;
    try {
        classes = stmt.all();
    } catch (err) {
        callback(err, null);
    }
    callback(null, classes);
}

exports.getDamageType = function (callback) {
    const stmt = sql.prepare("SELECT type FROM typesList");
    let types;
    try {
        types = stmt.all();
    } catch (err) {
        callback(err, null);
    }
    callback(null, types);
}

exports.getSeverity = function (callback) {
    const stmt = sql.prepare("SELECT name FROM severityList");
    let severities;
    try {
        severities = stmt.all();
    } catch (err) {
        callback(err, null);
    }
    callback(null, severities);
}


exports.getSelectedDepartmentBuildings = function (selected, callback) {
    const stmt = sql.prepare("UPDATE buildingsList SET selectedDepartment = ?");
    try {
        stmt.run(selected.selectedDepartment);
    } catch (err) {
        callback(err, null);
    }
    callback(null, true);
};

exports.getSelectedDepartmentClasses = function (selected, callback) {
    const stmt = sql.prepare("UPDATE classesList SET selectedDepartment = ?");
    try {
        stmt.run(selected.selectedDepartment);
    } catch (err) {
        callback(err, null);
    }
    callback(null, true);
};

//user
exports.signUp = function (username, password, email, callback) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    let stmt = sql.prepare("SELECT username FROM user WHERE username = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(username);
    }
    catch (err) {
        callback(err, null);
    }
    if (user.length > 0) {
        let results = {
            result: null,
            message: 'Username already exists'
        }
        callback(null, results);
    }
    /*else {
        stmt = sql.prepare("SELECT username FROM admin WHERE username = ? LIMIT 0, 1");
        try {
            user = stmt.all(username);
        }
        catch (err) {
            callback(err, null);
        }
        if (user.length > 0) {
            let results = {
                result: null,
                message: 'Username already exists'
            }
            callback(null, results);
        }*/
        else {
            stmt = sql.prepare('SELECT email FROM user WHERE email = ? LIMIT 0, 1');
            try {
                user = stmt.all(email);
            }
            catch (err) {
                callback(err, null);
            }
            if (user.length > 0) {
                let results = {
                    result: null,
                    message: 'Email already registered'
                }
                callback(null, results);
            }
            else {
                // εισάγουμε τον χρήστη στη βάση
                stmt = sql.prepare("INSERT INTO user (username, password, email) VALUES (?, ?, ?)");
                try {
                    let hashedPassword = bcrypt.hashSync(password, 10);
                    stmt.run(username, hashedPassword, email);
                }
                catch (err) {
                    callback(err, null);
                }
                let results = {
                    result: true,
                    message: 'User registered'
                }
                callback(null, results);
            }
        }
    }


exports.signIn = function (email, callback) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    // console.log(username)
    let stmt = sql.prepare("SELECT id , email, password FROM user WHERE email = ? LIMIT 0, 1");
    let user;
    try {
        user = stmt.all(email);
    } catch (err) {
        callback(err, null);
    }
    if (user.length > 0) {
        // console.log(user);
        user = user[0];
        let results = {
            id: user.id,
            password: user.password,
            accountType: 'admin'
        };
        callback(null, results)
    }
    /*else {
        stmt = sql.prepare("SELECT id ,email, password FROM admin WHERE email = ? LIMIT 0, 1");
        try {
            user = stmt.all(email);
        } catch (err) {
            callback(err, null);
        }
        if (user.length > 0) {
            user = user[0];
            // console.log(user)
            let results = {
                id: user.id,
                password: user.password,
                accountType: 'user'
            };
            callback(null, results)
        }*/
        else {
            let results = {
                id: null,
                message: 'Username or password incorrect'
            }
            callback(null, results);
        }
    }

    exports.submitTempLoc = function (location, user_id, callback) {
        const user = sql.prepare("SELECT id FROM user WHERE id = ?").get(user_id);
        if (!user) {
            return callback(new Error("User ID does not exist"), null);
        }
    
        try {
            const existingLocation = sql.prepare("SELECT id FROM temp_location WHERE user_id = ?").get(user_id);
    
            if (existingLocation) {
                // Αν η εγγραφή υπάρχει, ενημερώνεται:
                const stmt = sql.prepare("UPDATE temp_location SET location = ? WHERE user_id = ?");
                stmt.run(location, user_id);
            } else {
                // Αλλιώς, εισάγεται μια νέα εγγραφή:
                const stmt = sql.prepare("INSERT INTO temp_location (location, user_id) VALUES (?, ?)");
                stmt.run(location, user_id);
            }
    
            callback(null, true);
        } catch (err) {
            callback(err, null);
        }
    };
    

    exports.getLocationById = function (user_id,callback) {
        const stmt = sql.prepare("SELECT location FROM temp_location WHERE user_id = ?");
        let location;
        try {
            location = stmt.all(user_id);
            //console.log(location);
        } catch (err) {
            callback(err, null);
        }
        callback(null, location);
    }
    


exports.getUsernameById = function (user_id, callback) {
    const stmt = sql.prepare("SELECT username FROM user WHERE id = ?");
    let result;
    
    try {
        result = stmt.get(user_id);
        console.log(result);
    } catch (err) {
        callback(err, null);
        return;
    }
    if (result && result.username) {
        callback(null, result.username); 
    } else {
        callback(new Error('User not found'), null);
    }
};

exports.getCompletedFormsById = function (user_id,callback) {
    const stmt = sql.prepare("SELECT id,damaged_building,class_name,damage_type,date FROM damage_reports WHERE user_id = ? AND status=0");
    let completed_forms;
    try {
        completed_forms = stmt.all(user_id);
        //console.log(completed_forms)
    } catch (err) {
        callback(err, null);
    }
    callback(null, completed_forms);
    
}

exports.getInCompletedFormsById = function (user_id,callback) {
    const stmt = sql.prepare("SELECT id,damaged_building,class_name,damage_type,date FROM damage_reports WHERE user_id = ? AND status=1");
    let incompleted_forms;
    try {
        incompleted_forms = stmt.all(user_id);
        //console.log(completed_forms)
    } catch (err) {
        callback(err, null);
    }
    callback(null, incompleted_forms);
    
}