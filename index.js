var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var url = require('url');
app.get('*', function(req, res){
  console.log(url.parse(req.url).href)
  res.sendFile('./public/'+url.parse(req.url).href , { root: __dirname });
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('прилетело на сервер:',msg)
    io.emit('chat message', msg);
  });
  socket.on('vectorLeft on serv send' , (vector) => {
    // console.log(vector)
    io.emit('vectorLeft from serv send', vector);
  });
  // socket.on('vectorRight on serv send' , (vector) => {
  //   console.log(vector)
  // });
  // socket.on('mousemove' , (mouse)=>{
  //   console.log(mouse)
  //   io.emit('mousemove', mouse);
  // })
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});
