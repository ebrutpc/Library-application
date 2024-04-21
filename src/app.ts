import LibraryApplication from './infra/LibraryApplication';

const app = new LibraryApplication()
  .enableCORS()
  .applyMiddleware()
  .applyRoutes()
  .enableOpenapi()
  .enableDatabaseConnection()
  .listen();

export default app;
