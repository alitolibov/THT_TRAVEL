import { registerAs } from '@nestjs/config';
import { config as dotenv } from 'dotenv';
import * as process from 'process';

dotenv();

export const postgresConfig = registerAs('postgres', () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
}));

export const jwtConfig = registerAs('jwt', () => ({
    secret: process.env.HASH_SECRET,
    signOptions: {
        expiresIn: '60d',
    },
}));

export const defaultConfiguration = () => ({
    imagesUrl: process.env.PUBLIC_URL || 'http://localhost:3030/',
    botToken: process.env.BOT_TOKEN,
});
