module.exports = (sequelize, Sequelize) => {
	const Like = sequelize.define('like', {
		like_By: {
			type: Sequelize.STRING,
		},
		unlike_By: {
			type: Sequelize.STRING,
		},
	});
	return Like;
}