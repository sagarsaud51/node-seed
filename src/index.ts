import * as http from 'http';

import express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

import cors from 'cors';

import {CommonRoutesConfig} from './common/common.routes.config';
import {EchoRoutesConfig} from './echo/echo.routes.config';
import pino from 'pino';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000;
const routes: Array<CommonRoutesConfig> = [];
const log = pino();
const serverEnvironment: string = process.env.SERVER_ENVIRONMENT ? process.env.SERVER_ENVIRONMENT : 'DEV';

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

if (serverEnvironment != 'DEV') {
    loggerOption.meta = false;
}

app.use(expressWinston.logger(loggerOption));

routes.push(new EchoRoutesConfig(app));

app.get('/', (req: express.Request, res: express.Response) => {
    res
        .status(200)
        .send(`Node + Typescript Server is running at http://localhost:${port}`);
});

server.listen(port, () => {
    log.info(`Node + Typescript Server is running at http://localhost:${port}`);
    routes.forEach((routes: CommonRoutesConfig) => {
        log.info(`Routes configured for ${routes.getName()}`);
    });
});
