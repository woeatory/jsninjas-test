export interface AppConfig {
  port: number;
}

export interface DatabaseConfig {
  connectionString: string;
}

export default () => ({
  app: { port: parseInt(process.env.PORT, 10) },
  database: {
    connectionString: process.env.DATABASE_CONNECTION_STRING,
  },
});
