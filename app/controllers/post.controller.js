const db = require('../config/db.config.js');
const Post = db.post;
const Like = db.likes;
const Comment = db.comments;


exports.createpost = (req, res) => {
    const { title, body, pic } = req.body
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    let userId = req.user.id
    Post.create({
        title,
        body,
        pic,
        userId: userId,
        postedBy: req.user.name
    }).then(result => {
        res.json({
            success: true,
            post: result
        })
    }).catch(err => {
        return res.status(404).json({ error: "Post not created !" })
    })
}

exports.allpost = async (req, res) => {
    Post.findAll({
        include: ["likes", "comments"],
        attributes: ['id', 'title', 'body', 'pic' , 'postedBy' , 'userId'],
        order: [['id', 'DESC']],
    }).then((post) => {
        res.status(200).json({
            data: post
        })
    }).catch(err => {
        return res.status(404).json({ error: "User Not Available !" })
    })

}

exports.getpost = async (req, res) => {
    let postId = req.params.id
    console.log(postId)
    Post.findAll({
        include: ["likes", "comments"],
        attributes: ['id', 'title', 'body', 'pic'],
        where: { id: postId }
    }).then((post) => {
        res.status(200).json({
            data: post
        })
    }).catch(err => {
        return res.status(404).json({ error: "User Not Available !" })
    })

}

exports.myposts = (req, res) => {
    let id = req.user.id
    Post.findAll({
        include: ["likes", "comments"],
        where: { userId: id },
        attributes: ['id', 'title', 'body', 'pic'],
        order: [['id', 'ASC']],
    }).then(mypost => {
        res.json({
            success: true,
            data: mypost
        })
    }).catch(err => {
        return res.status(404).json({ error: "Invalid userId" })
    })
}


exports.like = (req, res) => {
    let id = req.body.post_id
    let user = req.user.id
    console.log(user)

    Post.findAll({ where: { id: id } })
        .then(() => {
            Like.create({
                like_By: user,
                postId: id
            }).then(() => {
                res.status(200).send(`You liked Post ${id}`);
            })
        }).catch(err => {
            return res.status(404).json({ error: "Post not found" })
        })
}

exports.unlike = (req, res) => {
    let id = req.body.post_id
    let user = req.user.id
    Like.update({
        like_By: null,
        unlike_By: user,
    }, {
        where: { postId: id }
    }).then(() => {
        res.status(200).send(`You Unliked Post ${id}`);
    }).catch(err => {
        return res.status(404).json({ error: "Post not found" })
    })
}

exports.comment = (req, res) => {
    let postId = req.params.id
    let comments = req.body.text

    if (!comments || !postId) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    Comment.create({
        comments,
        postId,
        user_name: req.user.name,
        userId: req.user.id,
    }).then(result => {
        res.json({
            success: true,
            post: result
        })
    }).catch(err => {
        return res.status(404).json({ error: "Comments fail to submit !" })
    })
}

exports.delete = (req, res) => {
    let postId = req.params.id
    Post.destroy({ where: { id: postId } })
        .then(() => {
            res.json({
                success: true,
                data: {}
            })
        }).catch(err => {
            return res.status(404).json({ error: "Post not delete !" })
        })
}