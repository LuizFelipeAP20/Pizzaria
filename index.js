const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8877;

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())


let db = [
  { '1': { Produto: 'produto 1', Valor: '20'}},
  { '2': { Produto: 'produto 2', Valor: '20'}},
  { '3': { Produto: 'produto 3', Valor: '20'}}
]

let db2 = [
  { '1': { Nome: 'Felipe', Senha: '120'}},
  { '2': { Nome: 'Maria', Senha: '220'}},
  { '3': { Nome: 'Karen', Senha: '1220'}}
]
let db3Prod = [
  { '1': { Nome: 'Calabresa', Desc: 'Uma pizza simples, mas que conquistou uma legião de fãs em todo o mundo. Está presente em mais de 30% dos pedidos.'}},
  { '2': { Nome: 'Portuguesa', Desc: 'Ovos, cebola, azeitona, ervilha, queijo e presunto dão sabor a segunda pizza mais queridinha dos brasileiros.'}},
  { '3': { Nome: 'Marguerita', Desc: 'Sabor ícone da Itália que leva apenas molho, muçarela, tomate e manjericão. É uma ótima opção para quem não come carne.'}},
  { '4': { Nome: 'Frango com catupiry', Desc: 'A mistura de proteína e cremosidade que deu muito certo.'}},
  { '5': { Nome: 'Muçarela', Desc: 'Simples e perfeita como tem que ser. A número 1 entre os paulistanos.'}},
  { '6': { Nome: 'Napolitana', Desc: 'Um sabor genuinamente italiano que não pode faltar na sua pizzaria.'}}
]
app.get('/prod', function(req,res){
 return res.json(db3Prod)
})
app.get('/users', function(req,res){
 return res.json(db2)
})

app.get('/', function(req,res){
 return res.json(db)
})

app.get('/logar/:usuario/:senha', function(req,res){
  let usuario = req.params.usuario;
  let senha = req.params.senha;

  if (usuario == "felipe" && senha =="1234" || usuario == "karen" && senha =="123"){
    res.end("Seja bem-vindo " + usuario );
  }else {
    res.end("Credenciais inválidas!");
  }
})

app.post('/add', function(req, res){
const body = req.body

  if(!body)
    return res.status(400).end()

  db2.push(body)
    return res.json(body)

})

app.get("/:id", function(req,res){
  const id = req.params.id

let newDB = db3Prod.filter(item => {
  if(item[id])
    return item
})
return res.send(newDB)
})



app.listen(PORT, function(){
  console.log("Servidor rodando na url http://localhost:8877");
});
