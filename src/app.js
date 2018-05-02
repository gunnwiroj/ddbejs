const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();
app.set('view engine', 'ejs');

//var Post = require("../models/post");
var Product = require("../models/product");
var User = require("../models/user");


app.post('/register', (req, res) => {
	var new_user = new User(req.body)
	console.log(req.body)
	new_user.save(function (error) {
		if (error) {
			console.log(error)
		}else{
			Product.find({}, function (err, allproduct) {
				if (err) {
				  return next(err);
				} else {
					res.render('index',{allproduct});
					console.log(allproduct)
					}
			})
		}
		
	})
})
app.post('/products', (req, res) => {
	var new_products = new Product(req.body)
	console.log(req.body)
	new_products.save(function (error) {
		if (error) {
			console.log(error)
		}else{
			res.send({success:true})
		}
		
	})
})
app.post('/login', (req, res) => {
	
	User.findOne({"email":ObjectId(req.params.email)}, function (err, user) {
    if (err) {
      return next(err);
    } else {
		if(user.password == req.params.password){
			res.render('admin-editmovie', {
				username: req.user ? req.user.username : '', movies
			  });
		}else{
			console.err('cannotlogin');
		}
  }
});
})

app.get('/', (req, res) => {
	Product.find({}, function (err, allproduct) {
		if (err) {
		  return next(err);
		} else {
			res.render('index',{allproduct});
			console.log(allproduct)
			}
	})
})
app.get('/product/:title',(req, res) => {
	Product.findOne({"title":title}, function (err, product) {
		if (err) {
		  return next(err);
		} else {
			res.render('product',{allproduct});
			console.log(allproduct)
			}
	})
})
app.get('/account', (req, res) => {
	res.render('account')
})
app.get('/register', (req, res) => {
	res.render('register')
})


app.use('*/fonts',express.static('./fonts'));
app.use('*/bottom',express.static('./views/bottom'));
app.use('*/imges',express.static('./views/images'));
app.use('*/css',express.static('./views/css'));
app.use('*/dress',express.static('./views/dress'));
app.use('*/js',express.static('./views/js'));
app.use('*/top',express.static('./views/top'));
app.listen(process.env.PORT || 8081)
