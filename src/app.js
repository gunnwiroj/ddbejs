const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();
app.set('view engine', 'ejs');

//var Post = require("../models/post");
var Product = require("../models/product");
var User = require("../models/user");


app.post('/register', (req, res) => { //เพิ่มข้อมูลลง DB
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
	console.log(req.body)
	var new_products = new Product(req.body)
	Product.find({}, function (err, allproduct) {
		new_products.numproduct = "0"+(allproduct.length+1).toString();
		console.log(JSON.stringify(new_products))
	
	new_products.save(function (error) {
		if (error) {
			console.log(error)
		}else{
			Product.find({}, function (err, allproduct) {
				console.log(allproduct)
				if (err) {
					return next(err);
				} else {
					res.render('addprod',{allproduct});
					
					}
			})
		}
		
	})
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


app.get('/addprod', (req, res) => {
	Product.find({}, function (err, allproduct) {
		//console.log(allproduct)
		if (err) {
		  return next(err);
		} else {
			res.render('addprod',{allproduct});
			
			}
	})
})
app.post('/saveedit/:numproduct', (req, res) => {
	console.log(req.body);
  Product.findOneAndUpdate({"numproduct":req.params.numproduct},req.body,function(err, product){
		console.log(product)
		if (err) return next(err);
    Product.find({}, function (err, allproduct) {
			//console.log(allproduct)
			if (err) {
				return next(err);
			} else {
				res.render('addprod',{allproduct});
				
				}
		})
});
})

app.get('/edit/:numproduct',(req,res)=>{
	Product.findOne({"numproduct":req.params.numproduct}, function(err,product){
		if(err){
			return next(err)
		}
		else{
			res.render('editpage',{product});
		}
	})
})
app.get('/delete/:numproduct',(req,res)=>{
	Product.findOneAndRemove({"numproduct":req.params.numproduct}, function(err,product){
		if(err){
			return next(err)
		}
		else{ Product.find({}, function (err, allproduct) {
			//console.log(allproduct)
			if (err) {
				return next(err)
			} else {
				res.render('addprod',{allproduct})
				
				}
			
	})
}})})

app.get('/tops',(req,res)=>{
	Product.find({}, function (err, allproduct) {
		//console.log(allproduct)
		if (err) {
		  return next(err);
		} else {
			res.render('tops',{allproduct});
			
			}
	})
})

app.use('*/fonts',express.static('./fonts'));
app.use('*/bottom',express.static('./views/bottom'));
app.use('*/imges',express.static('./views/images'));
app.use('*/css',express.static('./views/css'));
app.use('*/dress',express.static('./views/dress'));
app.use('*/js',express.static('./views/js'));
app.use('*/top',express.static('./views/top'));
app.listen(process.env.PORT || 8081)