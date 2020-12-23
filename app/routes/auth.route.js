module.exports = function(app) {
 
    const auth = require('../controllers/auth.controller.js');
 
    app.post('/signup', auth.signup);
    app.post('/signin', auth.signin);
    app.post('/reset_password', auth.reset_password);
    app.post('/new_password', auth.new_password);
}