module.exports = (sequelize, Sequelize) => {
	const Friends_List = sequelize.define('friends_list', {
		friend_list: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		status: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});
	return Friends_List;
}