const express = require('express');
const app = express();
const porta = 3000;
const Sequelize = require('sequelize')
const cors = require('cors')
const sequelize = new Sequelize('alunos', 'root', '', {
    dialect: "mysql",
    host: "localhost",
    port: 3306
})
app.use(cors())
app.use(express.json())
const tabela = sequelize.define('cadastro_alunos', {
    id_matricula: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    cpf: {
        type: Sequelize.CHAR(11),
        allowNull: true

    },
    nome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    }
})

async function New_user(dado) {
    const user = await tabela.create({
        cpf: dado.cpf,
        nome: dado.nome,
        idade: dado.idade
    })
    tabela.sync({ force: false })
    
}



app.get('', async (req, res) => {
    await tabela.findAll().then((response) => res.send(response))
})

app.post("/inserir", (req, res) => {
    New_user(req.body)
    res.status(200).send("Usúario cadastrado")
})

app.delete('/deletar/:id', async (req, res) => {
    const index = req.params.id;
    
    tabela.destroy({where:{
        id_matricula: index
    }}).then((response)=>{res.send("Usúario Excluido")})
        .catch((err)=>{console.log(" o erro foi "+ err)})
})
app.get('/testando',(req,res)=>{
    console.log(req.body)
})
app.listen(porta, (req, res) => {
    console.log("rodando o server na porta" + porta)
})
