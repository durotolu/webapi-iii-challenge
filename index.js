// code away!
const server = require('./server');

server.listen(process.env.PORT, () => {
    console.log('server is listening on ' + process.env.PORT);
})