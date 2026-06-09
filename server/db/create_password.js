const bcrypt = require('bcrypt');

bcrypt.hash('admin1234', 10).then(console.log);

bcrypt.hash('usertest1234', 10).then(console.log);