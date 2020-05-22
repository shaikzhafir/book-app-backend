'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookSchema extends Schema {
  up () {
    this.create('books', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.text('description')
      table.string('author')
      table.integer('rating')
      table.string('image')
      table.string('isbn')
      
      
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = BookSchema
