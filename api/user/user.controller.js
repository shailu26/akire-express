const userDataServiceProvider = require("../../services/sql/userDataServiceProvider");

module.exports = {
    'getUserDetail': function(req, res) {
        const sql = req.app.get('sql');
        let userId = req.params.userId;
        userDataServiceProvider.getUserDetail(sql, userId).then(userDetails => {
            //console.log("user details ", userDetails); 
            if (userDetails.length) {
                delete userDetails[0].password;
                return res.status(201).json({
                success: true,
                message: 'successfully fetched',
                userDetails: userDetails[0]
            });
            } else {
                return res.status(401).json('Not Authorized')
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({err});
        })

    },

    'updateUserById' : function (req, res) {
        const sql = req.app.get('sql');
        let userId = req.decoded.id;
        if (req.body.isEmailChanged) {
            if (userDataServiceProvider.isEmailExist(req.body.email)) {
                res.status(500).json({error: err.code === 'ER_DUP_ENTRY'? {'code': 'ER_DUP_ENTRY'} : err});
            } else {
                userDataServiceProvider.updateUserById(sql, userId, req.body).then(details => {
                return res.status(201).json({
                    success: true,
                    message: 'successfully updated',
                    details
                })
                }).catch(err => {
                    res.status(500).json({error: err.code === 'ER_DUP_ENTRY'? {'code': 'ER_DUP_ENTRY'} : err});
                })
            }
        } else {
            userDataServiceProvider.updateUserById(sql, userId, req.body).then(details => {
            return res.status(201).json({
                success: true,
                message: 'successfully updated',
                details
            })
            }).catch(err => {
                res.status(500).json({error: err.code === 'ER_DUP_ENTRY'? 'Email Address Already Exist' : err});
            })
        }
    },
    'createUser': function(req, res) {
        const sql = req.app.get('sql');
        if (userDataServiceProvider.isEmailExist(req.body.email)) {
                res.status(500).json({error: err.code === 'ER_DUP_ENTRY'? {'code': 'ER_DUP_ENTRY'} : err});
        } else {
            userDataServiceProvider.createUser(sql, req.body).then(details => {
            return res.status(201).json({
                success: true,
                message: 'successfully created'
            })
            }).catch(err => {
                console.log(err);
                res.status(500).json({err: err.code === 'ER_DUP_ENTRY'? 'Email Address Already Exist': err});
            })
        }
    },
    'updatePassword': function(req, res) {
        console.log(req);
        const sql = req.app.get('sql');
        const userId = req.decoded.id;
        const confirmPassword = req.body.confirmPassword;
        userDataServiceProvider.updatePassword(sql, userId, confirmPassword).then(() => {
            return res.status(201).json({
                success: true,
                message: 'successfully changed password'
            })
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }
}