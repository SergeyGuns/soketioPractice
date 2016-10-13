var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var url = require('url');
app.get('*', function(req, res){
  console.log(url.parse(req.url).href)
  res.sendFile('D:/sg-work/soketioPractice/public/'+url.parse(req.url).href);
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
  socket.on('key down A' , ()=>{
    manipulationObj.x -=1
    console.log(manipulationObj.x)
    // io.emit('key down A', manipulationObj);
  })
  socket.on('key up A' , ()=>{
    manipulationObj.x -=1
    console.log(manipulationObj.x)
    // io.emit('key down A', manipulationObj);
  })
  socket.on('key press S' , ()=>{
    manipulationObj.y +=1
    console.log(manipulationObj.y)
    io.emit('key press A', manipulationObj);
  })
  socket.on('key press D' , ()=>{
    manipulationObj.x +=1
    console.log(manipulationObj.x)
    io.emit('key press A', manipulationObj);
  })
  socket.on('key press W' , ()=>{
    manipulationObj.y -=1
    console.log(manipulationObj.y)
    io.emit('key press A', manipulationObj);
  })
  socket.on('mousemove' , (mouse)=>{
    console.log(mouse)
    io.emit('mousemove', mouse);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

let manipulationObj = {
  x:0,
  y:0
}