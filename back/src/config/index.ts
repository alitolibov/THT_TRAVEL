import * as process from 'process';
import { registerAs } from "@nestjs/config";

export const postgresConfig = registerAs('postgres', () => ({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
}));

export const jwtConfig = registerAs('jwt', () => ({
  secret: 'j9b3VS!XROdDOLiWm&stIM7HB3%HlWCl8sY%3gRdTCb6gI1do415HVhG!gPdJ#pi',
  signOptions: {
    expiresIn: '60d',
  },
}));