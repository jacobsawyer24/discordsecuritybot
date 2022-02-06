const crypto = require('crypto');
const prompt = require('prompt');
const {Client, Intents} = require('discord.js');
const {token, clientId, threadId, threadIdTest, version} = require('./config.json');
const {keyvar} = require('./key.json')
const myIntents = new Intents(); myIntents.add(Intents.FLAGS.GUILD_MESSAGES,
   Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILDS);
const client = new Client({ intents: myIntents });
const channel = client.channels.cache.get(thread);
const algorithm = 'aes-256-cbc';
var iv = crypto.randomBytes(16);
var key = keyvar;

var thread;

function encrypt(text) {

  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  iv = crypto.randomBytes(16);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };

}

function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');;
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

if (process.argv[2] == '-g'){
  thread = threadId;
  console.log('general');
}
else if (process.argv[2] == '-v') {
  console.log(version);
  process.exit();
}
else{
  thread = threadIdTest;
  console.log('test-env');
}

client.once('ready', message =>{
  console.log('Running');
  var recursiveReadline = function () {
  const channel = client.channels.cache.get(thread);
    prompt.start();
    prompt.get(['msg'], (err, result) =>{
      if (err) {
        throw err;
      }

      else {
        if (result.msg === 'exit'){
          return process.exit();
        }
        else if (result.msg.charAt(0) === '*' && result.msg.charAt(1) === '*') {
          channel.send('**' + (encrypt(result.msg).iv) + (encrypt(result.msg).encryptedData));
        }
        else {
          if (result.msg != ''){
            channel.send(result.msg);
          }

        }
        recursiveReadline();
      }
    });


  }

  recursiveReadline();

});

client.on('messageCreate', messageCreate => {
  const channel = client.channels.cache.get(thread);
if (messageCreate.content.charAt(0) === '*' && messageCreate.content.charAt(1) === '*' ){
  try{
  console.log((decrypt({ iv: messageCreate.content.slice(2, 34),
     encryptedData: messageCreate.content.slice(34, ) })).slice(2));
   }
     catch {
       console.log('unable to decrypt');
     }

}
else {
  if (messageCreate.author.id != clientId) {
  console.log(messageCreate.content);
  }
}

});

client.on('interactionCreate', async interaction => {

  const {ping} = interaction;

  if('ping' === 'ping'){
    await interaction.reply('No!');
  }

});

client.login(token);
