const io = require('socket.io')();

io.on('connection', (client) => {
  console.log('someone has just connected');
  console.log(`global message is ${global.message}`)
  // start emiiting events to the client
  client.on('subscribeToTimer', (interval) => {
    console.log(`client is subscribing to timer with interval ${interval}`);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  client.on('newState', (state) => {
    global.message = global.message || '';
    global.message = state;
    console.log(`global message is ${global.message}`)
    client.broadcast.emit('pushState', global.message);
  })
});

const port = 8000;
io.listen(port);
console.log('listening for websockets on port', port);