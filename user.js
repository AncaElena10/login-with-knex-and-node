const knex = require("./db.js")

knex.schema
  .hasTable('user', (exists) => {
    if (!exists) {
      knex.schema
        .createTable('user', (table) => {
          table.increments('id')
          table.string('firstname').notNullable()
          table.string('lastname').notNullable()
          table.string('email').notNullable()
          table.string('password').notNullable()
        })
        .then(() => {
          console.log('>> User table created successfully.')
        })
        .catch(() => {
          console.log('>> An error occur while creating table User.')
        })
    }
  })

module.exports = knex