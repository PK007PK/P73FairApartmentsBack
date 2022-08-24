import {createPool} from "mysql2/promise";
import { config } from "../config/config";

interface dpConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    namedPlaceholders: boolean;
    decimalNumbers: boolean;
}

export function detectDbConfig(): dpConfig {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return {
            host: config.dbHost,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbDatabase,
            namedPlaceholders: true,
            decimalNumbers: true,
        };
    } else {
        return {
            host: config.dbHost,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbDatabase,
            namedPlaceholders: true,
            decimalNumbers: true,
        }
    }
}

export const pool = createPool(detectDbConfig());
