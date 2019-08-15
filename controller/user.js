var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    
    createUser: function (req, res) {
        var user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,            
            password: req.body.password, 
            is_admin: req.body.is_admin,
            articles: []
        });
        user.save(function (err, user) {
            var validation_response = {};
            if (err) {
                validation_response['valid'] = false;
                validation_response['user'] = "";
                res.json(validation_response);
            } else {
                validation_response['valid'] = true;
                validation_response['user'] = user;
                res.json(validation_response);
            }
        });
    },

    validateLogin: function (req, res) {
        User.findOne({username: req.body.username}, function(err, user){
            if(err){
                console.log(err);
                res.json(err);
            }
            else{
                var validation_response = {};
                if(user.password==req.body.password) {
                    validation_response['valid'] = true;
                    validation_response['first_name'] = user.first_name;
                    validation_response['is_admin'] = user.is_admin ? user.is_admin : false;
                    res.json(validation_response);
                } else {
                    validation_response['valid'] = false;
                    validation_response['first_name'] = "";
                    validation_response['is_admin'] = false;
                    res.json(validation_response);
                }
            }
        });
    }

}    