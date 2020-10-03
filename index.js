const express = require("express") ;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
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
	collar: Number,
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


const Users = mongoose.model("user", userSchema);
const Clothes = mongoose.model("cloth", clothSchema, 'clothes');

var myId;
Users.findOne({ fName: 'Neeraj' }, (err, user) => {
	myId = user._id;
});

app.get('/',function(req,res){
    Clothes.find({user: myId}, function(err, response){
        res.send(response);
    });
})


app.listen(5000,function(){
    console.log("Showing your wardrobe");
})