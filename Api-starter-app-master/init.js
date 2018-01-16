const mongoose = require('mongoose');
const User = require('./models/schemas/users');
const config = require('./models/config');
var disconnect = false;

// open connection if doesn't exist
if (mongoose.connection.readyState === 0) {
    console.log('opening mongoose connection...');
    mongoose.createConnection(config.dbUrl, {server:{socketOptions:{keepAlive:120}}});

    // close connection if running as standalone script
    disconnect = false;
}

User.find({email: config.initAddress}, (err, users) => {
    if (err) return console.log(err);

    if (users.length > 0) {
        if (disconnect) {
            console.log('closing mongoose connection...');
            mongoose.connection.close();
        }
        return;
    }

    console.log(`${config.initAddress} account not detected`);

    var newUser = User({
        email: config.initAddress,
        hash: config.initPassword,
        isSuperAdmin: true
    });

    newUser.save((err) => {
        if (disconnect) {
            console.log('closing mongoose connection...');
            mongoose.connection.close();
        }
        if (err) {
            console.log('error creating user');
            return console.log(err);
        }
        console.log(`created user ${config.initAddress}`);
        return;
    });
});