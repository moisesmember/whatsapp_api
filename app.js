const fs = require('fs');
const qrcode = require('qrcode-terminal');  // Gera o QR code no terminal
const { Client, Location } = require('./node_modules/whatsapp-web.js/index'); // Biblioteca da API do WhatsApp
const SendFile = require('./functions/sendFile');


// Path where the session data will be stored
const SESSION_FILE_PATH = './data/sessions/session'+Math.floor(Math.random() * 10000) + 1+'.json';




let sessionData; // Load the session data if it has been previously saved
if( fs.existsSync(SESSION_FILE_PATH) ){
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({ puppeteer: { headless: false },session: sessionData});

// É responsável por autenticar o usuário a API
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err){
        if(err){
            console.error(err);
        }
    });
});

// Se falhar entra
client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('qr', (qr) => {
    console.log(`QR RECEIVED: ${qr}`);
    qrcode.generate(qr, {small: true});  // QR code generation
});

client.on('ready', () => {
    console.log(`Client is ready!`);
});

client.on('message', async message => {
    console.log(message.body);     // Listenning for messages
   if(message.body === '!ping') {    // Replying to messages
       message.reply('pong');

       const filePath = './data/img/branco.jpg';  // Caminho do arquivo
       client.sendMessage(message.from, SendFile.returnFileBase64(filePath));  // send reply using the sendMessage   
   }
   else if(message.body === '!resendmedia' /* && message.hasQuitedMsg */){
       console.log("Não sei: "+message.hasQuitedMsg);
       const quotedMsg = await message.getQuotedMessage();
       //chat.sendMessage(attachmentData);
       const attachmentData = await quotedMsg.hasMedia;
       console.log(`O que é isso: ${quotedMsg.hasMedia}`);
       message.reply(`
           *Media info*
           MimeType: ${attachmentData.mimetype}
           Filename: ${attachmentData.filename}
           Data (length): ${attachmentData.data.length}
       `);
   }
});

client.initialize();