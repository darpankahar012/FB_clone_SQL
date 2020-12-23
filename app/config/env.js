const env = {
    database: 'SEQUELIZE',
    username: 'root',
    password: 'admin',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    JWT_TOKEN: "bjcasudyfbcafafcs15687efdfsaf"
  };
  
  module.exports = env;