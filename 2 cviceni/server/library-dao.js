'use strict';
const fs = require ('fs');
const path = require ('path');
const {promisify} = require ('util');
const rf = promisify (fs.readFile);
const wf = promisify (fs.writeFile);

const DEFAULT_STORAGE_PATH = path.join (__dirname, 'storage', 'books.json');

class LibraryDao {
  // constructor(storagePath) {
  //   this.bookStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  // }

  async getBook (code) {
    let books = await this._loadAllBooks ();

    const result = books.find (b => {
      return b.code === code;
    });

    return result;
  }

  async addBook (book) {
    const books = await this._loadAllBooks ();

    let results = books.find (res => {
      return res.code === book.code;
    });

    if (results && results.length !== 0) {
      throw new Error ('this book already exist');
    }

    books.push (book);

    try {
      await wf (DEFAULT_STORAGE_PATH, JSON.stringify (books));
      return {status: 'OK', data: book};
    } catch (e) {
      return {status: 'ERROR', error: e};
    }

    //   if (this._isDuplicate(books, book.code)) {
    //     const e = new Error(`Book with code '${book.code}' already exists.`);
    //     e.code = "DUPLICATE_CODE";
    //     throw e;
    // }

    //   books.push(book);

    //   try {
    //     await wf(this._getStorageLocation(), JSON.stringify(books, null, 2));
    //     return { status: "OK", data: book };
    //   } catch (e) {
    //     return { status: "ERROR", error: e };
    //   }
  }

  // async _loadAllBooks() {
  //   let books;
  //   try {
  //     books = JSON.parse(await rf(this._getStorageLocation()));
  //   } catch (e) {
  //     if (e.code === 'ENOENT') {
  //       console.info("No storage found, initializing new one...");
  //       books = [];
  //     } else {
  //       throw new Error("Unable to read from storage. Wrong data format. " +
  //         this._getStorageLocation());
  //     }
  //   }
  //   return books;
  // }

  async _loadAllBooks () {
    let allBooks = [];
    try {
      allBooks = JSON.parse (await rf (DEFAULT_STORAGE_PATH));
    } catch (e) {
      throw new Error ('something went wrong');
    }
    return allBooks;
  }

  // _isDuplicate(books, code) {
  //   const result = books.find(b => {
  //     return b.code === code;
  //   });
  //   return result ? true : false;
  // }

  // _getStorageLocation() {
  //   return this.bookStoragePath;
  // }
}

module.exports = LibraryDao;
