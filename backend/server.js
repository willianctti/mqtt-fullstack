const aedes = require('aedes')();
const net = require('net');
const ws = require('websocket-stream');
const http = require('http');

// Servidor MQTT TCP padrão
const netServer = net.createServer(aedes.handle);
const tcpPort = 1883;

// Servidor WebSocket
const httpServer = http.createServer();
const wsPort = 8888;

ws.createServer({ server: httpServer }, aedes.handle);

netServer.listen(tcpPort, () => {
    console.log(`Servidor MQTT rodando na porta ${tcpPort}`);
});

httpServer.listen(wsPort, () => {
    console.log(`Servidor WebSocket rodando na porta ${wsPort}`);
});