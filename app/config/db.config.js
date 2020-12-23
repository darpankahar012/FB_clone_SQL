const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/user.model')(sequelize, Sequelize);
db.post = require('../model/post.model')(sequelize, Sequelize);
db.request = require('../model/request.model')(sequelize, Sequelize);
db.friend_list = require('../model/friends_list.model')(sequelize, Sequelize);
db.follower = require('../model/followers.model')(sequelize, Sequelize);
db.likes = require('../model/likes.model')(sequelize, Sequelize);
db.comments = require('../model/comments.model')(sequelize, Sequelize);



db.user.hasMany(db.post, { as: "posts" });
db.post.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});

db.user.hasMany(db.request, { as: "requests" });
db.request.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});

db.user.hasMany(db.friend_list, { as: "friends" });
db.friend_list.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});


db.user.hasMany(db.follower, { as: "followers" });
db.follower.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});


db.post.hasMany(db.likes, { as: "likes" });
db.likes.belongsTo(db.post, {
  foreignKey: "postId",
  as: "posts",
});

db.post.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.post, {
  foreignKey: "postId",
  as: "posts",
});

module.exports = db;