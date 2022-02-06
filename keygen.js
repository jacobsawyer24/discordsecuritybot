const prompt = require('prompt');
const write = require('fs');
const crypto = require('crypto');

prompt.start()
prompt.get(['password'], (err, result) =>{
  if (err) {
    throw err;
  }

  var salt1 = 'ldkfvefnv92fritvnfjnpqiduncubvt4kmvirj4[irunfvnfvneofnejfnpihefinwe[finviy'
  var salt2 = 'cjepfjpfbgjenfybowdnfwyhfvr3gnrindcyduyebfvrpiyvydpgpihvrouysodnfpiuecyiwu'
  var salt3 = 'djnoyurpvhwcjdcqmcpijefvjrjnhgbvpudvojrfvbyr3fvo[i3rnyd8jthbjt4gouydvkrbj]'

  var key = result.password + salt1 + salt2 + salt3

  const hasher =  crypto.createHmac('sha256', key);

  var hash = hasher.update(key);
  var output = hash.digest('hex');
  var output1 = { keyvar: output }
  console.log(output1.keyvar);

  write.writeFile('key.json', JSON.stringify(output1), function(err) {
    if (err) return console.err(err);
  });

});
