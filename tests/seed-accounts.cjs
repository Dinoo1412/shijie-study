// Local-only test identities. Never execute this fixture against a remote DB.
const fs=require('node:fs'),crypto=require('node:crypto');
const sql=['DELETE FROM sessions;','DELETE FROM progress;','DELETE FROM users;',
  ...['a','b'].map(x=>`INSERT INTO users VALUES ('github:test-${x}','test-${x}','Test ${x}',0);`),
  ...['a','b'].map(x=>`INSERT INTO sessions VALUES ('${crypto.createHash('sha256').update(x.repeat(64)).digest('hex')}','github:test-${x}',4102444800000);`)];
fs.writeFileSync('.wrangler/account-test-seed.sql',sql.join('\n'));
