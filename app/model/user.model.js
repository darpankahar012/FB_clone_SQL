module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
		name: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
		resetToken: {
			type: Sequelize.STRING,
		},
		expireToken: {
			type: Sequelize.STRING
		},
		pic: {
			type: Sequelize.STRING,
			defaultValue: 'https://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19748.png'
		},
	});
	return User;
}