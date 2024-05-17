import expressJsdocSwagger from 'express-jsdoc-swagger';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  info: {
    version: '1.0.0',
    title: 'Eden Rose',
    description: 'This is an API application for Eden Rose',
  },
  baseDir: __dirname,
  filesPattern: '../routes/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: '/v3/api-docs',
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
};

const setupSwagger = (app) => {
  expressJsdocSwagger(app)(options);
};

export default setupSwagger;
