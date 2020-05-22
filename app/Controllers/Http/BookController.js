'use strict'

const Book = use('App/Models/Book')
const puppeteer = require('puppeteer');

async function scrape(bookTitle){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log('im running')
  await page.goto("https://www.bookdepository.com/search?searchTerm=" + bookTitle + "&search=Find+book")
  // needs to wait cos lazy loaded
  await page.waitFor(500);
  const image = await page.evaluate(() => document.querySelector("div.item-img a img").getAttribute('src'))
  const isbn = await page.evaluate(() => document.querySelector("meta:nth-child(2)").getAttribute('content'))
  console.log(image);
  await page.screenshot({path: 'example.png'});

  await browser.close();
  return {image,isbn}
}

/**
 * Resourceful controller for interacting with books
 */
class BookController {
  /**
   * Show a list of all books.
   * GET books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const bookdata = await Book.all()
    const books = await bookdata.toJSON()
    console.log(books)

    const bookArray = books.map(book => {
      return {
        id : book.id,
        title : book.title,
        description : book.description,
        author : book.author,
        rating : book.rating,
        isbn : book.isbn,
        image : book.image
      }
      });

    response.status(200).json({
      message : 'index works',
      data : bookArray
    })


  }

  /**
   * Render a form to be used for creating a new book.
   * GET books/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new book.
   * POST books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {title,author, description, rating} = request.post()
    const book = new Book()
    const book2 = new Book()
    console.log(book2)
    book.author = author
    book.title = title
    book.description = description
    book.rating = rating
    console.log('im running')
    const scraped = await scrape(title);
    book.isbn = scraped.isbn
    book.image = scraped.image
    await book.save()

    response.json({
      message : 'book posted',
      data : book
    })
    
    
  }

  /**
   * Display a single book.
   * GET books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ request, response, params: { id } }) {
    const book = await Book.find(id)
    console.log(book)
    const bookData = {
      id : book.id,
      title : book.title,
      description : book.description,
      author : book.author,
      rating : book.rating,
      isbn : book.isbn,
      image : book.image

    }

    
    response.json({
      message : 'show works',
      data : bookData
    })
  }

  /**
   * Render a form to update an existing book.
   * GET books/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update book details.
   * PUT or PATCH books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params : {id}, request, response }) {
    const book = await Book.find(id)
    console.log('inside update')
    if(book){
    const { title, description, author, rating }  = request.post()
    
    book.title = title
    book.description = description
    book.author = author
    book.rating = rating

    await book.save()

    response.json({
      message : "successfully updated ",
      data : book 
    })

  }}

 
  async destroy ({ params : {id}, request, response }) {
    const book = await Book.find(id)

    await book.delete()

    response.json({
      message : "succesfully deleted "
    })

  }
}

module.exports = BookController
