module.exports = {
    type: 'postgres',
    // url: process.env.DATABASE_URL,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    migrations: [process.env.TYPEORM_MIGRATIONS],
    entities: [process.env.TYPEORM_ENTITIES],
    cli: {
        migrationsDir: [process.env.TYPEORM_MIGRATIONS_DIR],
        // migrationsDir: __dirname + '/database/migrations',
    },
    ssl: {
        rejectUnautorized: false,
    },
};
