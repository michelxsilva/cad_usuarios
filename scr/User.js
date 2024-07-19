const db = require('./db');

const User = db.sequelize.define( 'usuarios', {

nome : {
    type: db.Sequelize.STRING,
},
idade: {
    type: db.Sequelize.INTEGER,
},
email : {
    type: db.Sequelize.STRING,
}
}

);

// User.sync({force: true}).then(() =>{
//     console.log('Tabela criada com sucesso!');
// }).catch(() =>{
//     console.log('Erro ao tentar criar a tabela.');
// });
module.exports = User