const express = require("express") ;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');

app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(cors());
mongoose.connect('mongodb+srv://neeraj:Z8KN3ljwi8MGctiA@cluster0-fgrdj.gcp.mongodb.net/wardrobeDB?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });

const userSchema = new mongoose.Schema({
	fName: {
		type: String,
		required: true
	},
	lName: {
		type: String,
		required: true
	},
	sex: {
		type: Number,
		required: true
	},
	dob: Date,
});

const clothSchema = new mongoose.Schema({
	category: {
		type: String,
		required: true
	},
	form: String,
	particulars: String,
	length: Number,
	collar: String,
	color: {
		type: Object,
		required: true
	},
	brand: String,
	age: Number,
	fitting: Number,
	tags: {
		type: Array,
		required: true
	},
	user: mongoose.ObjectId
});

const footwearSchema = new mongoose.Schema({
	category: {
		type: String,
		required: true
	},
	form: String,
	color: {
		type: Object,
		required: true
	},
	brand: String,
	age: Number,
	fitting: Number,
	tags: {
		type: Array,
		required: true
	},
	user: mongoose.ObjectId,
	image: String
})


const Users = mongoose.model("user", userSchema);
const Clothes = mongoose.model("cloth", clothSchema, 'clothes');
const Footwear = mongoose.model("footwear", footwearSchema, 'footwear');

var myId;

Users.findOne({ fName: 'Neeraj' }, (err, user) => {
	myId = user._id;
});

app.get('/wardrobe', (req,res) => {
    Clothes.find({user: myId}, function(err1, clothes){
		Footwear.find({user: myId}, function(err2, footwear){
			res.send({'clothes':clothes,'footwear':footwear});
		});
	});
});


app.get('/weather', (req,res) => {
	var city = 'Mumbai';
	var url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=c9ae2c13187279ee786d6369b8618cb7&units=metric'
	https.get(url, function(resp){
		resp.on('data',function(data){
		  var info = JSON.parse(data);
		  temp = info.main.temp;
		  desc = info.weather[0].description;
		  icon = info.weather[0].icon;
		  res.send({temp:temp,desc:desc,icon:icon});
		})
	  });
})

let port = process.env.PORT || 5000;

app.listen(port, function () {
	console.log("Showing your wardrobe");
})