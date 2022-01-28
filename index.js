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
});

client.on('interactionCreate', async interaction => {

  const {ping} = interaction;

  if('ping' === 'ping'){
    await interaction.reply('pong');
  }

});

client.login(token);
