// code away!
const server = require('./server');

server.listen(process.env.PORT || 3000, () => {
    console.log('server is listening on ' + (process.env.PORT || 3000));
})