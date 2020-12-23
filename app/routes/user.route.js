module.exports = function (app) {

    const requireLogin = require('../middleware/requireLogin');

    const user = require('../controllers/user.controller');

    app.get('/allusers',requireLogin, user.allUsers);
    app.get('/user/:id', requireLogin, user.findUserById);
    app.get('/friends_post', requireLogin, user.friends_post);
    app.post('/search', requireLogin, user.search);
    app.put('/follow/:id', requireLogin, user.follow);
    app.put('/unfollow/:id', requireLogin, user.unfollow);
    app.put('/update_pic', requireLogin, user.update_pic);
    app.put('/add_friends/:id', requireLogin, user.add_friends);
    app.put('/remove_friends/:id', requireLogin, user.remove_friend);
    app.put('/accepted_request/:id', requireLogin, user.accepted_request);
    app.put('/remove_request/:id', requireLogin, user.remove_request);
}