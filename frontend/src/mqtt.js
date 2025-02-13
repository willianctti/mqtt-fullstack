import mqtt from 'mqtt';

const options = {
    host: 'localhost',
    port: 8888,
    protocol: 'ws'
};

const client = mqtt.connect(`ws://${options.host}:${options.port}`);

client.on('connect', () => {
    console.log('Conectado ao broker MQTT');
});

client.on('error', (err) => {
    console.error('Erro de conexão:', err);
});

export default client;