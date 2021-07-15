import assert from 'assert';
import { config } from 'dotenv';

config();
assert(process.env.SERVER_PORT, 'SERVER PORT CANNOT BE BLANK !!');
assert(process.env.SERVER_ENVIRONMENT, 'SERVER ENVIRONMENT CANNOT BE BLANK !!')

/*
*
* */
export const SERVER_ENV_CONSTANTS = {
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_ENVIRONMENT: process.env.SERVER_ENVIRONMENT
}

