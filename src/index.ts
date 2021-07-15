import * as http from 'http';

import express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';

import {CommonRoutesConfig} from './common/common.routes.config';
import {EchoRoutesConfig} from './echo/echo.routes.config';
import pino from 'pino';
import { SERVER_ENV_CONSTANTS } from './boot.tester';


const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const log = pino();

app.use(express.json());
app.use(cors());



const loggerOption: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all: true}),
    ),
};

if (SERVER_ENV_CONSTANTS.SERVER_ENVIRONMENT != 'DEV') {
    loggerOption.meta = false;
}

app.use(expressWinston.logger(loggerOption));

routes.push(new EchoRoutesConfig(app));

app.get('/', (req: express.Request, res: express.Response) => {
    res
        .status(200)
        .send(`Node + Typescript Server is running at http://localhost:${SERVER_ENV_CONSTANTS.SERVER_PORT}`);
});

server.listen(SERVER_ENV_CONSTANTS.SERVER_PORT, () => {
    log.info(`Node + Typescript Server is running at http://localhost:${SERVER_ENV_CONSTANTS.SERVER_PORT}`);
    routes.forEach((routes: CommonRoutesConfig) => {
        log.info(`Routes configured for ${routes.getName()}`);
    });
});
