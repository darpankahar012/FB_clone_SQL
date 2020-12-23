module.exports = (sequelize, Sequelize) => {
	const Comments = sequelize.define('comment', {
		userId: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		user_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		comments: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});
	return Comments;
}