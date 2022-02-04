const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = 'sudgpwaupuwp98whEF98WHE9Fhvquhfo'; //**
const iv = 'jdtbflihbdmygnkd'; //**

function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}


function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const prompt = require('prompt');
const {Client, Intents} = require('discord.js');
const {token, threadId, threadIdTest, version} = require('./config.json');
const myIntents = new Intents(); myIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILDS);
const client = new Client({ intents: myIntents });
const channel = client.channels.cache.get(thread);


var thread;
var iD;

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
          var message = '**' + JSON.stringify(encrypt(result.msg));

          console.log(JSON.stringify(encrypt(result.msg)));
          channel.send(message);
        }
        else {
        channel.send(result.msg);
        recursiveReadline();
        }
      }
    });
  };

  recursiveReadline();

});

client.on('messageCreate', messageCreate => {
  const channel = client.channels.cache.get(thread);
  console.log(messageCreate.content);
if (messageCreate.content.charAt(0) === '*' && messageCreate.content.charAt(1) === '*' ){
  console.log(decrypt(messageCreate.content.));
  //console.log(decrypt())
}

});

client.on('interactionCreate', async interaction => {

  const {ping} = interaction;

  if('ping' === 'ping'){
    await interaction.reply('No!');
  }

});

client.login(token);
