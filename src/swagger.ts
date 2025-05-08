import YAML from 'yamljs';
import fs from 'fs';
import path from 'path';

let routesDir = path.join(__dirname, 'routes');
if (!fs.existsSync(routesDir)) {
  // Si no existe en build, busca en src/routes (desarrollo)
  routesDir = path.join(__dirname, '../src/routes');
}
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.swagger.yaml'));

interface OpenApiDoc {
  openapi: string;
  info: { title: string; version: string; description: string };
  paths: Record<string, any>;
  tags: any[];
}

const openapiBase: OpenApiDoc = {
  openapi: '3.0.0',
  info: {
    title: 'API Rayu',
    version: '1.0.0',
    description: 'Documentación de la API Rayu',
  },
  paths: {},
  tags: []
};

files.forEach(file => {
  const doc = YAML.load(path.join(routesDir, file));
  if (doc.tags) openapiBase.tags.push(...doc.tags);
  if (doc.paths) Object.assign(openapiBase.paths, doc.paths);
});

export default openapiBase;
