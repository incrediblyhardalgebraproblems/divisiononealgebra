import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { Ultraviolet } from '@titaniumnetwork-dev/ultraviolet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const uv = new Ultraviolet({
    prefix: '/uv/',
    bare: 'https://benropro.club', 
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    client: '/uv/uv.client.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
});

// Points the engine directly to your web directory assets
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (req.url.startsWith(uv.prefix)) {
        uv.handle(req, res);
    } else {
        next();
    }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server actively initialized.`);
});
