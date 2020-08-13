const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', (qr) => {
    console.log(`QR RECEIVED: ${qr}`);
    qrcode.generate(qr, {small: true});  // QR code generation
});

client.on('ready', () => {
    console.log(`Client is ready!`);
});

// Listenning for messages
client.on('message', message => {
	console.log(message.body);
});

client.initialize();