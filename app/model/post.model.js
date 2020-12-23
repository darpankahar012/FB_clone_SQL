module.exports = (sequelize, Sequelize) => {
	const Post = sequelize.define('post', {
		postedBy: {
			type: Sequelize.STRING,
		},
		title: {
			type: Sequelize.STRING,
		},
		body: {
			type: Sequelize.STRING,
		},
		pic: {
			type: Sequelize.STRING,
			defaultValue: ''
		},
	});

	return Post;
}