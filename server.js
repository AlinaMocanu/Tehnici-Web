const express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var app = express();
//const bodyParser = require('body-parser');
const session = require('express-session')
const formidable = require('formidable');
const fs = require('fs');
const util = require('util');
const nodemailer = require("nodemailer");

const crypto = require('crypto');

// initializari socket.io
const http=require('http')
const socket = require('socket.io');
const server = new http.createServer(app);  
var  io= socket(server)
io = io.listen(server);//asculta pe acelasi port ca si serverul


var conexiune_index
io.on("connection", (socket) => {  
    console.log("Conectare!");
	conexiune_index=socket
    socket.on('disconnect', () => {conexiune_index=null;console.log('Deconectare')});
});


function getJson(numeFis){
	let textFis = fs.readFileSync(numeFis);//pun continutul fisierului useri.json in rawdata
	return JSON.parse(textFis);//obtin obiectul asociat json-ului
}

function saveJson(obJson, numeFis){
	let data = JSON.stringify(obJson);//transform in JSON
	fs.writeFileSync(numeFis, data);//scriu JSON-ul in fisier (inlocuind datele vechi)
}

serverPass="tralala";

// pentru folosirea ejs-ului 
app.set('view engine', 'ejs');

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use('/stiluri_css', express.static('stiluri_css'));
app.use('/imagini', express.static('imagini'));
app.use('/gifuri', express.static('gifuri'));
app.use('/js', express.static('js'));

//setez o sesiune
app.use(session({
  secret: 'abcdefg',//folosit de express session pentru criptarea id-ului de sesiune
  resave: true,
  saveUninitialized: false
}));

async function trimiteMail(username, email) {
	  let transporter = nodemailer.createTransport({
		service: 'gmail',

    secure: false,
    auth: {
      user: "tehniciwebproiect@gmail.com", //mailul site-ului (de aici se trimite catre user)
      pass: "tehniciweb" 
    },
	    tls: {
        rejectUnauthorized: false//pentru gmail
    }
  });

  //trimitere mail
  let info = await transporter.sendMail({
    from: '"tehniciwebproiect" <tehniciwebproiect@example.com>',
    to: email,
    subject: "User nou", 
    text: "salut, "+username, 
    html: "<p>salut, "+username+"</p>" 
  });

  console.log("Message sent: %s", info.messageId);
}

// cand se face o cerere get catre pagina de index 
app.get('/', function(req, res) {

	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index', {user: req.session.username});
});

app.get('/logout', function(req, res) {

	
    req.session.destroy();//distrug sesiunea cand se intra pe pagina de logout
	res.render('html/logout');
});

app.get('/index', function(req, res) {

	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index', {user: req.session.Username});
});

app.get('/asasinariCelebre',function (req, res) {
  	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/asasinariCelebre', {user: req.session.Username});
    console.log("trimitere raspuns catre html/asasinariCelebre");
});

app.get('/guvernulAmerican',function (req, res) {
  	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/guvernulAmerican', {user: req.session.Username});
    console.log("trimitere raspuns catre html/guvernulAmerican");
});

app.get('/federalReserve',function (req, res) {
  	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/federalReserve', {useri:jsfis.useri,user: req.session.Username});
    console.log("trimitere raspuns catre html/federalReserve");
});

app.get('/evenimenteEsentiale',function (req, res) {
  	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/evenimenteEsentiale',{user: req.session.Username});
    console.log("trimitere raspuns catre html/evenimenteEsentiale");
});

app.get('/forum',function (req, res) {
	
    console.log("trimitere raspuns catre html/forum");
	res.render('html/forum',{user: req.session.Username});
});

app.get('/login',function (req, res) {
	
    console.log("trimitere raspuns catre html/login");
	res.render('html/login',{user: req.session.Username});
});

app.post('/login', function(req, res) {
	
	
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {

		
		jsfis=getJson('useri.json')
		var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');//creez un obiect de tip cifru cu algoritmul aes
		var encrParola= cifru.update(fields.Parola, 'utf8', 'hex');//cifrez parola
		encrParola+=cifru.final('hex');//inchid cifrarea (altfel as fi putut adauga text nou cu update ca sa fie cifrat
		let user=jsfis.useri.find(function(x){//caut un user cu acelasi nume dat in formular si aceeasi cifrare a parolei
			
			return (x.username==fields.Username&& x.parola == encrParola );
		});
		if(user){
			console.log(user);
			console.log(user.Parola);
			console.log(encrParola);
			req.session.Username=user;//setez userul ca proprietate a sesiunii
		}
		
		console.log(req.session.Username);
		/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
		res.render('html/forum',{useri:jsfis.useri,user: req.session.Username});
	});


});

app.get('/register',function (req, res) {
  	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/register', {user: req.session.Username});
    console.log("trimitere raspuns catre html/register");
});

app.post('/register', (req, res) => {
	//var  dateForm = req.body;
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {

		let rawdata = fs.readFileSync('useri.json');
		let jsfis = JSON.parse(rawdata);
		var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
		var encrParola= cifru.update(fields.Parola, 'utf8', 'hex');
		encrParola+=cifru.final('hex');
		console.log(fields.Parola+ " "+encrParola);
		jsfis.useri.push({id:jsfis.lastId, username:fields.Username, email: fields.Email, parola: encrParola, dataInreg: new Date()});
		jsfis.lastId++;
		res.render('html/register', {user: req.session.Username, rsstatus:"ok"});

		saveJson(jsfis,'useri.json')
		trimiteMail(fields.Username, fields.Email).catch((err) => {console.log(err)})
    });
	
});

app.get('/useri', function(req, res) {
    
	let rawdata = fs.readFileSync('useri.json');
	let jsfis = JSON.parse(rawdata);
	console.log(jsfis.useri);

	res.render('html/useri',{useri:jsfis.useri,user: req.session.Username});
});

app.use(function(req,res){
    res.status(404).render('html/404');
});

app.listen(8080)
console.log('Serverul a pornit pe portul 8080');