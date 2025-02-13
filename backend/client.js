const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');

const topic = 'meuTopico';
const clientId = `sistema_${Math.random().toString(16).slice(2, 8)}`;

client.on('connect', () => {
    console.log('Cliente conectado ao servidor MQTT');

    client.subscribe(topic, () => {
        console.log(`Inscrito no tópico: ${topic}`);

        setInterval(() => {
            const message = JSON.stringify({
                sender: 'Sistema',
                content: `Mensagem automática: ${new Date().toLocaleTimeString()}`,
                timestamp: new Date().toISOString()
            });
            client.publish(topic, message);
        }, 30000);
    });
});

client.on('message', (topic, message) => {
    console.log(`Mensagem recebida (${topic}): ${message.toString()}`);
});
