module.exports = (sequelize, Sequelize) => {
	const Followers = sequelize.define('follow', {
		following: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		followers: {
			type: Sequelize.STRING,
			allowNull: true,
		}
	});
	return Followers;
}