const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("index")
})

app.post("/atualizar", function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        datacontato: req.body.datacontato,
        observacao: req.body.observacao
    }).then(function(){
        res.redirect("/")
    }).catch(function(erro){
        res.send("Falha ao cadastrar os dados: " + erro)
    })
})

app.get("/consultar", function(req, res){
    post.findAll().then(function(posts){
        res.render("consultar",{post: posts})
    })
})
app.get("/editar/:id", function(req,res){
    post.findOne({where: {"id":req.params.id}}).then(function(posts){
        res.render("editar",{post: posts})
    })
})
app.post("/atualiza", function(req, res){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }, {where: {id: req.body.id}}).then(function(){
        res.redirect("/consulta")
    }).catch(function(erro){
        res.send("Falha ao atualizar os dados: " + erro)
    })
})
app.get("/deletar/:id", function(req,res){
    post.destroy({where: {"id":req.params.id}}).then(function(){
        res.redirect("/consultar")
    }).catch(function(erro){
        res.send("Falha ao atualizar os dados: " + erro)
    })
})
app.listen(8081, function(){
    console.log("Servidor Ativo!")
})
