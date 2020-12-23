module.exports = function (app) {

    const requireLogin = require('../middleware/requireLogin');

    const post = require('../controllers/post.controller');

    app.post('/createpost', requireLogin, post.createpost);
    app.get('/allpost', requireLogin, post.allpost);
    app.get('/myposts', requireLogin, post.myposts);  
    app.delete('/deletepost/:id', requireLogin, post.delete);  
    app.get('/getpost/:id', requireLogin, post.getpost);
    app.put('/like', requireLogin, post.like);
    app.put('/unlike', requireLogin, post.unlike);
    app.post('/comment/:id', requireLogin, post.comment);
    
}