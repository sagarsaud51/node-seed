import express from 'express';

import {CommonRoutesConfig} from '../common/common.routes.config';

export class EchoRoutesConfig extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'Echo');
  }

  configureRoutes(): express.Application {
    this.getEchoMessage();
    return this.app;
  }

  private getEchoMessage() {
    this.app.route('/echo').get((req: express.Request, res: express.Response) => {
      res
        .status(200)
        .send(
          JSON.parse(
            `{ "message": "Welcome to Node Seed Project", "Status" : "200" }`,
          ),
        );
    });
  }
}
