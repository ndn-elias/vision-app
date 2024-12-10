import express from 'express';
import http from 'http';
import path from 'path';
import * as dotenv from 'dotenv';
import {
    PUBLISH_FOLDER,
    NODERED_ENABLE,
    NODERED_WORKSPACE
} from './constants.mjs';

const RED = NODERED_ENABLE ? (await import('node-red')).default : null;

dotenv.config();

const HOST = process.env.SERVER_HOST || '0.0.0.0';
const PORT = Number(process.env.SERVER_PORT || 1880);

const settings = {
    httpAdminRoot: '/red',
    httpNodeRoot: '/api',
    userDir: NODERED_WORKSPACE,
    functionGlobalContext: {},
    verbose: false,
    flowFile: 'flows.json',
    nodesDir: [
        path.resolve(NODERED_WORKSPACE, 'node_modules')
    ]
};

const app = express();
const server = http.createServer(app);
app.use('/', express.static(PUBLISH_FOLDER));

if(NODERED_ENABLE) {
    RED.init(server, settings);
    app.use(settings.httpAdminRoot, RED.httpAdmin);
    app.use(settings.httpNodeRoot, RED.httpNode);
}

server.listen(PORT, HOST, () => {
    console.log(`The server is working on http://127.0.0.1:${PORT}`);
});

if(NODERED_ENABLE) RED.start();