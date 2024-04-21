import express, {
  Express,
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
require('dotenv').config();
import { AddressInfo } from 'net';
import appRoute from '../app.route';
import * as openapiConfig from '../config/openapi.config.json';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import Postgres_Instance from './databases/postgres.database';
import cors from 'cors';
class LibraryApplication {
  public _app: Express;
  private readonly _router: Router;
  constructor() {
    this._app = express();
    this._router = express.Router();
  }

  applyMiddleware() {
    this._app.use(express.json());
    return this;
  }
  applyRoutes() {
    this._router.use(`/`, appRoute);
    // init route for app
    this._app.use(this._router);
    return this;
  }

  listen() {
    const server = this._app.listen(process.env.PORT, () => {
      const { address, port } = server.address() as AddressInfo;
      try {
        console.log(
          `Library Application Listening at http://${address}:${port}`,
        );
      } catch (ignored) {
        console.log(`Error of Server Listen: ${ignored}`);
      }
    });
    return server;
  }

  enableDatabaseConnection() {
    Postgres_Instance.initialize()
      .then(() => {
        console.log('Database connected!');
      })
      .catch((error) => {
        console.log('Postgresql Connection error:', error);
      });
    return this;
  }

  enableOpenapi() {
    const spec = swaggerJSDoc(openapiConfig);
    this._app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
    return this;
  }

  enableCORS() {
    this._app.use(
      cors({
        origin: function (
          origin: any,
          callback: (arg0: Error | null, arg1: boolean) => any,
        ) {
          // allow requests with no origin
          if (!origin) return callback(null, true);
          return callback(null, true);
        },
        exposedHeaders: ['Origin', 'X-Requested-With', 'Content-Type'],
      }),
    );
    return this;
  }
}

export default LibraryApplication;
