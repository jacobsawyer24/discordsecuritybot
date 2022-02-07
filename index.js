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

if (process.argv[2] === '-e'){
  thread = threadId;
  console.log('secure mode');
}

if (process.argv[2] === '-g'){
  thread = threadId;
  console.log('general');
}
else if (process.argv[2] === '-v') {
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
        else if (process.argv[2] == '-e') {
          channel.send((encrypt(result.msg).iv) + (encrypt(result.msg).encryptedData));
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
  if (messageCreate.author.id != clientId)
  try{
  console.log((decrypt({ iv: messageCreate.content.slice(0, 32),
     encryptedData: messageCreate.content.slice(32, ) })));
   }
     catch {
       console.log(messageCreate.content);
     }

});
client.on("messageCreate", (message) =>{
  
  var options = ["NO ANIME", "shut up","do you wanna get banned?","https://cdn.discordapp.com/attachments/933099827661795411/938873256562270228/IMG_3162.PNG"];
  if (message.content.toLowerCase().startsWith("anime")){
    var response = options[Math.floor(Math.random()*options.length)];
    message.channel.send(response).then().catch(console.error);
}
client.login(token);
