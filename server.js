import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const _fileName = fileURLToPath(import.meta.util);
const _dirName = path.dirname(_fileName);

const server = jsonServer.create();
const router = jsonServer.router(path.join(_dirName, 'db.json'));
const middleware = jsonServer.defaults();

server.use(middleware);
server.use(jsonServer.bodyParser);



server.use(router);

server.listen(3001, () => {
    console.log('API running : 3001');
})