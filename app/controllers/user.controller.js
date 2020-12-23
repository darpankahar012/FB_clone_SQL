const Op = require('Sequelize').Op
const db = require('../config/db.config.js');
const User = db.user;
const Post = db.post;
const Friend_request = db.request;
const Friends_List = db.friend_list;
const Follower = db.follower;

exports.allUsers = (req, res) => {
    let user = req.user.id
    User.findAll({
        include: ["posts", "friends", "requests", "followers"],
        where: { id: { [Op.ne]: user } },
        attributes: ['id', 'name', 'email', 'pic'],
        order: [['name', 'ASC']],
    }).then((user) => {
        res.status(200).json({ data: user })
    }).catch(err => {
        return res.status(404).json({ error: "User Not Available !" })
    })
};

exports.findUserById = (req, res) => {
    const userId = req.params.id
    let user = req.user.id
    if (userId == user) {
        res.status(200).json({
            data: `${userId} Its Your ID,Please Search Another User !`
        })
    } else {
        User.findByPk(userId, {
            include: ["posts", "friends", "requests", "followers"],
            attributes: ['id', 'name', 'email', 'pic'],
            order: [['name', 'ASC']],
        }).then((data) => {
            res.status(200).json({
                data: data
            })
        }).catch((err) => {
            console.log(">> Error while finding details: ", err);
        });
    }
};

exports.friends_post = async (req, res) => {
    let user = req.user.id
    const my_friend_list = await Friends_List.findAll({
        where: { userId: user }
    })
    let details = my_friend_list.map((test) => {
        return test.friend_list
    })
    Post.findAll({
        include: ["likes", "comments"],
        where: { userId: details },
        attributes: ['id', 'postedBy', 'userId',
            'title', 'body', 'pic'],
        order: [['postedBy', 'ASC']],
    })
        // User.findAll({
        //     include: ["posts", "friends", "requests", "followers"],
        //     where: { id: details },
        //     attributes: ['id', 'name', 'email', 'pic']
        // })
        .then((post) => {
            res.status(200).json({ post: post })
        })
}

exports.search = async (req, res) => {
    const query = req.body.query
    let user = req.user.name
    if (query == user) {
        res.status(200).json({
            data: `${query},Please Search Another User !`
        })
    } else {
        User.findAll({
            include: ["posts", "friends", "requests", "followers"],
            where: {
                name: { [Op.like]: '%' + req.body.query + '%' },
                id: { [Op.ne]: req.user.id }
            },
            attributes: ['id', 'name', 'email', 'pic'],
            order: [['name', 'ASC']],
        }).then((user) => {
            if (user == 0) {
                return res.status(404).json({ error: `${query} Not Available !` })
            } else {
                res.json({
                    success: true,
                    user: user
                })
            }
        })
    }
}


exports.update_pic = (req, res) => {
    User.update({ pic: req.body.photo },
        { where: { id: req.user.id } })
        .then(() => {
            res.status(200).send("Your Profile Pic Was Updated !");
        })

}

exports.add_friends = (req, res) => {
    const id = req.params.id;
    Friend_request.count({
        where: {
            userId: id,
            received_request: req.user.id,
        }
    }).then(() => {
        Friend_request.count({
            where: {
                userId: req.user.id,
                sent_request: id,
            }
        }).then((request) => {
            if (request != 0) {
                res.status(200).json({
                    error: `You send request earlier to User ${id} !`,
                })
            } else {
                Friend_request.create({
                    userId: id,
                    received_request: req.user.id,
                    status: 'received_request',
                }).then(() => {
                    Friend_request.create({
                        userId: req.user.id,
                        sent_request: id,
                        status: 'sent_request',
                    })
                    res.status(200).send(`Request Sent Successfully to User ${id} !`);
                })
            }
        })
    })
}

exports.accepted_request = (req, res) => {
    const id = req.params.id;
    const userId = req.user.id

    Friend_request.count({
        where: {
            userId: id,
            received_request: userId,
        }
    }).then(() => {
        Friend_request.count({
            where: {
                userId: userId,
                sent_request: id,
            }
        }).then((count) => {
            if (count != 0) {
                Friends_List.create({
                    userId: userId,
                    friend_list: id,
                    status: 'friend'
                }).then(() => {
                    Friends_List.create({
                        userId: id,
                        friend_list: userId,
                        status: 'friend'
                    }).then(() => {
                        Friend_request.destroy({
                            where: {
                                userId: userId,
                                sent_request: id
                            }
                        })
                    }).then(() => {
                        Friend_request.destroy({
                            where: {
                                userId: id,
                                received_request: userId
                            }
                        })
                        res.status(200).send(`Request Accept Successfully to User ${id} !`);
                    })
                })
            } else {
                res.status(200).json({
                    Error: `Not received request from User ${id} !`,
                })
            }
        })
    })
}


exports.remove_request = (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    Friend_request.count({
        where: {
            userId: id,
            received_request: userId
        }
    }).then(() => {
        Friend_request.count({
            where: {
                userId: userId,
                sent_request: id,
            }
        }).then((count) => {
            console.log(count)
            if (count != 0) {
                Friend_request.destroy({
                    where: {
                        userId: userId,
                        sent_request: id
                    }
                }).then(() => {
                    Friend_request.destroy({
                        where: {
                            userId: id,
                            received_request: userId
                        }
                    })
                    res.status(200).send("Delete Request Successfully !")
                })
            } else {
                res.status(200).json({
                    Error: `Not received request from User ${id} !`,
                })
            }
        })
    })
}

exports.remove_friend = (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    Friends_List.count({
        where: {
            userId: userId,
            friend_list: id,
        }
    }).then(() => {
        Friends_List.count({
            where: {
                userId: id,
                friend_list: userId
            }
        }).then((count) => {
            if (count != 0) {
                Friends_List.destroy({
                    where: {
                        userId: userId,
                        friend_list: id
                    }
                }).then(() => {
                    Friends_List.destroy({
                        where: {
                            userId: id,
                            friend_list: userId
                        }
                    })
                    res.status(200).send("Remove Successfully")
                })
            } else {
                res.status(200).json({
                    Error: `You're Not Friend with User ${id} !`,
                })
            }
        })
    })
}


exports.follow = (req, res) => {
    const id = req.params.id;

    Follower.count({
        where: {
            following: id,
            followers: req.user.id
        }
    }).then((request) => {
        if (request != 0) {
            res.status(200).json({
                Error: `You Follow Earlier User ${id} !`
            })
        } else {
            Follower.create({
                following: id,
                followers: req.user.id,
                userId: req.user.id,
            }).then(() => {
                res.status(200).send(`You Follow User ${id} !`);
            });
        }
    })
}

exports.unfollow = (req, res) => {
    const id = req.params.id;

    Follower.count({
        where: {
            following: id,
            followers: req.user.id
        }
    }).then((request) => {
        if (request != 0) {
            Follower.destroy({
                where: {
                    following: id,
                    userId: req.user.id
                }
            }
            ).then(() => {
                res.status(200).send(`You UnFollow User ${id} !`);
            });
        } else {
            res.status(200).json({
                Error: `you're Not Following User ${id} !`
            })
        }
    })
}