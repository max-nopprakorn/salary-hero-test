export const config = {
    postgres: {
        username: process.env.POSTGRES_USERNAME || 'user',
        password: process.env.POSTGRES_PASSWORD || 'password',
        database: process.env.POSTGRES_DATABASE || 'salary',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: Number(process.env.POSTGRES_PORT) || 5432,
      }
}