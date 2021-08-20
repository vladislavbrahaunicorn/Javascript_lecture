'use strict';

/**
 * Simple library
 */
const express = require ('express');
const bodyParser = require ('body-parser');
const LibraryDao = require ('./library-dao');

const dao = new LibraryDao ();
const app = express ();

app.use (bodyParser.json ({type: '*/*'})); // všechno v requestu přijde jako json

//req co přišlo od klienta a res co vrátím
app.get ('/getBook', async (req, res) => {
  const {query} = req;

  const bookCode = query.code;
  if (!bookCode) {
    return res
      .status (400)
      .send ({error: 'Invalid input: code parameter is missing.'});
  }

  const book = await dao.getBook (bookCode);

  if (!book) {
    return res
      .status (400)
      .send ({error: `Book with code '${bookCode}' doesn't exist.`});
  }

  res.json (book);
});

app.post ('/createBook', async (req, res) => {
  const {body} = req;

  if (!body.code) {
    return res
      .status (400)
      .send ({error: 'Invalid input: code parameter is missing.'});
  }
  const book = {
    code: body.code,
    name: body.name,
    author: body.author,
  };
  try {
    await dao.addBook (book);
  } catch (e) {
    //   if (e.code == "DUPLICATE_CODE") {
    //     res.status(400);
    //   } else {
    //     res.status(500);
    //   }
    return res.send ({error: e.message});
  }
  // res.json(book);
});

app.listen (8080, () => {
  console.log ('Express server listening on port 8080.');
});
