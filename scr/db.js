const Sequelize = require('sequelize');

const sequelize = new Sequelize('cad_usuarios', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(
    () => console.log('Conexão com o banco de dados estabelecida.')
).catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}