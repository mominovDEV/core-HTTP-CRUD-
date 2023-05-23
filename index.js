const http = require("http");
const getBodyData = require("./util");
const { v4 } = require("uuid");

const books = [
  {
    id: "1",
    title: "Maugli",
    pages: 240,
    author: "Rudyardh Keepling",
  },
  {
    id: "2",
    title: "O'tkan kunlar",
    pages: 240,
    author: "Abdulla Qodiriy",
  },
];

const server = http.createServer(async (req, res) => {
  if (req.url == "/books" && req.method == "GET") {
    res.writeHead(200, {
      "Content-type": "application/json charset utf-8",
    });
    const resp = {
      status: "OK",
      books,
    };
    res.end(JSON.stringify(resp));
  } else if (req.url == "/books" && req.method == "POST") {
    const data = await getBodyData(req);
    const { title, pages, author } = JSON.parse(data);
    const newBook = {
      id: v4(),
      title: title,
      pages: pages,
      author: author,
    };
    books.push(newBook);
    res.writeHead(201, {
      "Content-type": "application/json charset utf-8",
    });
    const resp = {
      status: "Created",
      book: newBook,
    };
    res.end(JSON.stringify(resp));
  } else if (req.url.match(/\/books\/\w+/) && req.method == "GET") {
    // http://localhost:3000/books/2 match books/heru-34 && GET
    const id = req.url.split("/")[2];
    const book = books.find((b) => b.id === id);
    res.writeHead(200, {
      "Content-type": "application/json charset utf-8",
    });
    if (!book) {
      const resp = {
        status: 404,
        message: "Book not found",
      };
      res.end(JSON.stringify(resp));
    }
    const resp = {
      status: 200,
      book: book,
    };
    res.end(JSON.stringify(resp));
  } else if (req.url.match(/\/books\/\w+/) && req.method == "DELETE") {
    const id = req.url.split("/")[2];
    const book = books.findIndex((b) => b.id == id);
    if (book == -1) {
      const resp = {
        status: 404,
        message: "Book not found",
      };
      res.writeHead(404, {
        "Content-type": "application/json charset utf-8",
      });
      res.end(JSON.stringify(resp));
    }
    books.splice(book, 1);
    res.writeHead(200, {
      "Content-type": "application/json charset utf-8",
    });
    const resp = {
      status: 200,
      message: "Successfully deleted",
    };
    res.end(JSON.stringify(resp));
  } else if(req.url.match(/\/books\/\w+/) && req.method == "PUT") {
    const id = req.url.split("/")[2];
    const body = await getBodyData(req);
    const {title,pages,author} = JSON.parse(body);
    const bookIndex = books.findIndex((b) => b.id = id);
    res.writeHead(200,{
        "Content-type":"application/json charset utf-8"
    })
    if(bookIndex == -1) {
        const resp = {
            status:404,
            message:"Not found"
        }
        res.end(JSON.stringify(resp))
    }
    const updatedBook = {
        id:id,
        title:title,
        pages:pages,
        author:author
    };
    books[bookIndex] = updatedBook;
    const resp = {
        status:200,
        message:"Successfully updated",
        updatedBook:books[bookIndex]
    };
    res.end(JSON.stringify(resp))
  }
});

server.listen(3000, () => {
  console.log("Server is running at 3000");
});
