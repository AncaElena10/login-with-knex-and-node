const Knex = require('knex')

var knex = new Knex(
  {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'knex_mysql_test',
      charset: 'utf8'
    },
  })

module.exports = knex