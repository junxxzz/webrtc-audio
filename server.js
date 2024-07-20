const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || "8000";

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: "/myapp",
    ssl: {},
});

app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/index.htm`);
});

server.listen(port, '0.0.0.0');
console.log(`Listening on: ${port}`);
