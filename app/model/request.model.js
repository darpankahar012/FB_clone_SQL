module.exports = (sequelize, Sequelize) => {
	const Friend_request = sequelize.define('request_status', {
		sent_request: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		received_request: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		status: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	});
	return Friend_request;
}