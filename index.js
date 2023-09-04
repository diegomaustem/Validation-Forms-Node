var express = require("express")
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
var flash = require('express-flash')
var cookieParser = require('cookie-parser')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cookieParser("senhaParaGerarCookie"))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(flash())

app.get("/",(req,res) => {

  let emailError = req.flash("emailError");
  let pontosError = req.flash("pontosError");
  let nomeError = req.flash("nomeError");
  let email = req.flash("email");

  emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
  email = (email == undefined || email.length == 0) ? "" : email;

  res.render("index",{emailError,pontosError,nomeError,email: email });
})

app.post("/form",(req, res) => {
  let {email, nome, pontos} = req.body;

  let emailError;
  let pontosError;
  let nomeError;

  if(email == undefined || email == ""){
      emailError = "O e-mail não pode ser vazio";
  }

  if(pontos == undefined || pontos < 20){
      pontosError = "Você não pode ter menos de 20 ponto";
  }

  if(nome == undefined || nome == ""){
      nomeError = "O nome não pode ser vazio";
  }

  if(nome.length < 4){
      nomeError = "O nome é mt pequeno";
  }

  if(emailError != undefined || pontosError != undefined || nomeError != undefined){
      req.flash("emailError",emailError);
      req.flash("pontosError",pontosError);
      req.flash("nomeError",nomeError);

      req.flash("email",email);

      res.redirect("/");
  }else{
      res.send("SHOW DE BOLA ESSE FORM!");
  }
})

app.listen(5678, (req, res) => {
    console.log('Running')
})