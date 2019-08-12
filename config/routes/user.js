var users = require('../../controller/user.js');

module.exports = function (app) {
    app.post('/api/user/register', function (req, res) {
        users.createUser(req, res);
    });

    app.post('/api/user/validate-login', function (req, res) {
        users.validateLogin(req, res);
    });
}