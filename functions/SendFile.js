const fs = require('fs');      // const fs = require('fs');
const path = require('path');  // const path = require('path');
const mime = require('mime');              // const mime = require('mime');

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
}

module.exports = SendFile;