// code away!
const server = require('./server');

server.listen(process.env.PORt || 3000, () => {
    console.log('server is listening on ' + (process.env.PORt || 3000));
})