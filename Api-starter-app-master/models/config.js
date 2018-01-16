module.exports = {
    port: 3000,
    dbUrl: 'localhost:5000',

    // secret for creating tokens
    token_secret: process.env.TOKEN_SECRET || 'reughdjsasdkpmasipkmsdfadf',

    // inital admin
    initAddress: 'ab@cd.ef',
    initPassword: '123'
};
