const appConfig = () => ({
  env: process.env.APP_ENV || 'local',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  db: {
    connection: process.env.DB_CONNECTION || 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    name: process.env.DB_NAME || 'nestjs_test',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user_name: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root'
  }
});

export default appConfig;