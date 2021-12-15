const app = require('express')()
const delay = require('delay');
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});
app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})
var people={};
io.sockets.on('connection', function(socket) {
  console.log(socket.id)
  socket.emit('event', "hi client")
  socket.on('msg',(data)=>{
    console.log(data);
  })
  socket.on('registered user', function (uid) {
    people[uid] = socket.id;
  console.log(people);
  
    });

    socket.on('non',async function(data){
      console.log(data)
      io.to(people[data.myuid]).emit('ring', data.uid)
  
        
      
      
      
      io.to(people[data.uid]).emit('called', data.myuid)
      
      console.log('ghghghd' + data.uid)
      
     // socket.broadcast.to('123').emit('private chat created', data);
    })

    socket.on('disconnec',function(data){
     console.log(data.user)
      io.to(people[data.user]).emit('mydis', "user")

  
      console.log('disconnect' + data.user)
      
      //socket.broadcast.to('benet').emit('disconne', "Disconnected");
    })

    socket.on('attend',function(data){
      console.log(data.user)
       io.to(people[data.user]).emit('atten', "user")
 
   
       console.log('atten' + data.user)
       
       //socket.broadcast.to('benet').emit('disconne', "Disconnected");
     })

     socket.on('callcutter',function(data){
      console.log(data.uid)
       io.to(people[data.uid]).emit('callcutter', "user")
 
   
     //  console.log('atten' + data.user)
       
       //socket.broadcast.to('benet').emit('disconne', "Disconnected");
     })
     socket.on('bookiecallcutter',function(data){
      console.log(data.uid)
       io.to(people[data.uid]).emit('bookiecallcutter', "user")
 
   
     //  console.log('atten' + data.user)
       
       //socket.broadcast.to('benet').emit('disconne', "Disconnected");
     })

   

});



    
 

http.listen(3000,()=>{
  console.log('connected')
})