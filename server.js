
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser =  require('body-parser');
var server  = require("http").createServer(app)
var io = require('socket.io')(server);
// const driver = require("./models/driver.js")
// const trip =  require("./models/trip.js")
app.use(express.static(__dirname+"/public"))
app.set('view engine','ejs')
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


let gps=[0,0]

// console.log that your server is up and running

server.listen(port,()=>{
  console.log("server has started listening on port "+port);
})

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

io.sockets.on('connection',function(socket){
  console.log("the map is connected");

  socket.on("works",function(data){
    console.log(data);
  })

  socket.emit('success',{hello:'world'})
})

app.post("/new", (req,res)=>{
	console.log("python script data received")
	console.log(req.body)
	res.send(200)
})

app.get("/home",(req,res)=>{
	res.render("home")
})

app.get("/home/json",(req,res)=>{
	var data = {
		'from':'Nerul, Mumbai',
		'from_lat':'19.0356,73.0228',
		'to':'Andheri, Mumbai',
		'to_lat':'19.1136,72.8697',
		'speed_rist':'80',
		'stops':['vashi','bandra'],
		'logistic information':'Sensitive'
	
	}
	if(gps[0]!=0 && gps[1]!=0){
		data['gps']=gps
	}
	res.send(data)
})

app.post("/realtime",(req,res)=>{
	//key=lat:1234 long:1234 speed:asdasd offense:asdasd
	let data = req.body.key;
	console.log(data)
	let dict ={}
	let a,b,lat,long,abc,v
	data.split(" ").forEach(function(i){

		abc= i.split(":")
		dict[abc[0]]=abc[1]
	})
	lat=parseFloat(dict["lat"])
	long=parseFloat(dict["long"])
	lat=lat/100
	long=long/100
	lat=lat.toFixed(4)
	long=long.toFixed(4)
	dict["lat"]=lat
	dict["long"]=long
	dict["speed"]=parseFloat(dict["speed"])	
	console.log(dict)
	io.sockets.emit("data",dict)
	gps=[lat,long]
	res.send(200)
})


app.get("/trips",(req,res)=>{
	var array = [{
			'from':'andheri',
		'to':'pune',
		'speed_rist':'80',
		'stops':['vashi','bandra'],
		'logistic information':'Sensitive'
	},
	{
			'from':'pune',
		'to':'panvel',
		'speed_rist':'80',
		'stops':['vashi','bandra'],
		'logistic information':'Sensitive'
	},
	{
			'from':'panvel',
		'to':'thane',
		'speed_rist':'80',
		'stops':['vashi','bandra'],
		'logistic information':'Sensitive'
	},
	{	'from':'thane',
		'to':'borivali',
		'speed_rist':'80',
		'stops':['vashi','bandra'],
		'logistic information':'Sensitive'}
	]
})



// app.get("/login",(req,res)=>{

// })


// app.get("/admin",(req,res)=>{

// })

// app.get("/admin/adddriver",(req,res)=>{

// })

// app.post("/admin/driver",(req,res)=>{

// })


// app.get("/admin/driver/:id",(req,res)=>{

// })

// app.post("/admin/driver/:id/trip",(req,res)=>{

// })



