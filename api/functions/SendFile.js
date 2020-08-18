const fs = require('fs');      // const fs = require('fs');
const path = require('path');  // const path = require('path');
const mime = require('mime');              // const mime = require('mime');
const querystring = require('querystring');
var http = require("http");

const MessageMedia = require('./../node_modules/whatsapp-web.js/src/structures/MessageMedia');

/**
 * @param {string} filePath path do arquivo
 */
class SendFile{
    /**
     * Creates a MessageMedia instance from a local file path
     * @param {string} filePath 
     * @returns {MessageMedia}
     */
    static returnFileBase64(filePath){
        const b64data = fs.readFileSync(filePath, {encoding: 'base64'});
        const mimetype = mime.getType(filePath); 
        const filename = path.basename(filePath);

        return new MessageMedia(mimetype, b64data, filename);
    }

    static salveBanco(filePath){
        const b64data = fs.readFileSync(filePath, {encoding: 'base64'});
        const mimetype = mime.getType(filePath); 
        const filename = path.basename(filePath);

        var postData = querystring.stringify({
            b64data : this.b64data,
            mimetype : this.mimetype,
            filename : this.filename
          });
          
          var options = {
            hostname: 'localhost',
            port: 8000,
            path: '/saveFile',
            method: 'POST', // <--- aqui podes escolher o método
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(postData)
            }
          };
          
          var req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
              console.log('Terminado! Data:', data);
            });
          });
          
          req.on('error', (e) => {
            console.log(`Houve um erro: ${e.message}`);
          });
          
          // aqui podes enviar data no POST
          req.write(postData);
          req.end();
    }

    static Get(yourUrl){
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",yourUrl,true);
        Httpreq.send();
        return Httpreq;         
    }
}

module.exports = SendFile;