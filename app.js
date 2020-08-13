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

client.on('message', message => {
    // console.log(message.body);     // Listenning for messages
	if(message.body === '!ping') {    // Replying to messages
        message.reply('pong');
        //client.sendMessage(message.from, 'pong');  // send reply using the sendMessage
	}
});

client.initialize();