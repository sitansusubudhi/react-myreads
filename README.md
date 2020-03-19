# MyReads Project

This is a bookshelf app that allows us to select and categorize books that one has read, currently reading, or want to read. The application is built using React. It uses an API server and client library BooksAPI to persist information as one interacts with the application.

The project is hosted at Netlify at [React-MyReads](https://react-myreads-app.netlify.com/)
The project is also hosted using GitHub pages at [React-MyReads](https://sitansusubudhi.github.io/React-MyReads/)

## View project locally

To view the project in your local machine:

* clone this repository using `git clone `
* install all project dependencies with `npm install`
* start the development server with `npm start`

## Component Hierarchy

```
|- App
|- SearchBooks # This component renders the '/search' page of the app.
|- BookShelves # This component renders the '/' page of the app.
|-- BookShelf # This component renders the book shelf based on the shelf passed down from BookShelves.
|--- Book # This component is used to retrieve the details of the book for a specified bookId and render the details like title, author, and shelf.
```

## Backend Server

For this application, a online backend server is used. The library file [`BooksAPI.js`](src/utils/BooksAPI.js) contains the below methods to perform necessary operations on the backend:


* [`getAll`](#getAll)
* [`get`](#get)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `get`

Method Signature:

```js
get(bookId)
```

* bookId: `<String>` contains a unique ID for book  
* Returns a Promise which resolves to a JSON object containing the response data of all details of the book for the specified bookId.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.


