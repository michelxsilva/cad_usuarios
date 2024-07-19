const express = require('express')
const app = express();
const port = 3000
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./scr/User');
const exphbs = require('express-handlebars');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.get('/users', (req, res) => {
    User.findAll()
    .then((users) => {
        //res.json(users);
        res.render('users', { title: 'Lista de Usuarios', users: users });
    }) .catch((err) => {
        console.error('Erro ao buscar usuários!');
        res.status(500).send('Erro ao buscar usuários!');
    });
})

app.get('/users/:id', (req, res) => {
    User.findByPk(req.params.id).then((user) => {
        if (!user) {
            res.status(404).send('Usuário não encontrado!');
        } else {
            res.json(user);
        }
    }).catch((err) => {
        console.error('Erro ao buscar usuário!');
        res.status(500).send('Erro ao buscar usuário!');
    });
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/cad', (req, res) => {
    User.create({
        nome: req.body.nome,
        idade: req.body.idade,
        email: req.body.email,
    }).then(() => res.sendFile(path.join (__dirname, 'index.html')))
    .catch(() => {
        console.error('Erro ao cadastrar usuário!');
        res.status(500).send('Erro ao cadastrar usuário!');
    })
 

});

app.put('/cad/:id', (req, res) =>{
    User.update({    
            nome: req.body.nome,
            idade: req.body.idade,
            email: req.body.email,
        },{ where: { id: req.params.id }
    }).then(() => res.sendFile(path.join (__dirname, 'index.html')))
    .catch(() => {
        console.error('Erro ao atualizar usuário!');
        res.status(500).send('Erro ao atualizar usuário!');
    })
    

})

app.delete('/users/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id },
    })
    .then(() => res.sendFile(path.join (__dirname, 'index.html')))
    .catch(() => {
        console.error('Erro ao excluir usuário!');
        res.status(500).send('Erro ao excluir usuário!');
    })
});



app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port} `);
});