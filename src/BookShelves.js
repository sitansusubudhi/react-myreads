import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import * as BooksAPI from './utils/BooksAPI';
import logo from './icons/logo.svg';

class BookShelves extends Component {
    /**
     * books - Array storing book objects which includes books in shelves 'Currently Reading','Want to Read','Read'
     * currentlyReading - Array storing bookIDs of all books in shelf 'Currently Reading' 
     * wantToRead - Array storing bookIDs of all books in shelf 'Want to Read' 
     * read - Array storing bookIDs of all books in shelf 'Read'
     */
    state = {
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    // Call getAll method from BooksAPI in componentDidMount lifecycle event to fetch data from backend server
    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {

            /**
             * Filter records from response obtained and set them to arrays of bookIDs for the different shelves
             */
            const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading').map(({id}) => (id)); 
            const wantToRead = books.filter((book) => book.shelf === 'wantToRead').map(({id}) => (id));;
            const read = books.filter((book) => book.shelf === 'read').map(({id}) => (id));;

            // Update state as per values obtained after Promise resolves successfully
            this.setState(() => ({
                books,
                currentlyReading,
                wantToRead,
                read
            }));
        });
    }

    /**
     * @description Updates shelf for the given Book. Pass as a callback function to BookShelf component. Parse the response obtained to set state for the different Book shelves.
     * @param {object} book - book object which contains at minimum an 'id' attribute
     * @param {string} shelf - Shelf contains values from either of 'currentlyReading', 'wantToRead', 'read', 'none'
     */
    bookChangeShelf = (book, shelf) => {
        // Call update method from BooksAPI 
        BooksAPI.update(book, shelf)
            .then(({ currentlyReading, wantToRead, read }) => {
                // Promise resolves to return an object containing arrays for the bookshelves 'currentlyReading', 'wantToRead' and 'read'.
                // The array elements contain only the bookIDs. 
                // Set the state of the shelves based on response obtained.
                this.setState(() => ({
                    currentlyReading,
                    wantToRead,
                    read
                }));
            })
    }

    render() {

        const { books, currentlyReading, wantToRead, read } = this.state; // Destructuring to obtain all state variables

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className="list-books-content">
                    <div>
                        {/**
                         * Display all the book shelves
                         */}
                        <BookShelf 
                            shelfTitle="Currently Reading" 
                            books={books}
                            shelf={currentlyReading}
                            onChangeBookShelf={this.bookChangeShelf}
                        />
                        <BookShelf 
                            shelfTitle="Want to Read"
                            books={books}
                            shelf={wantToRead}
                            onChangeBookShelf={this.bookChangeShelf}
                        />
                        <BookShelf 
                            shelfTitle="Read"
                            books={books}
                            shelf={read}
                            onChangeBookShelf={this.bookChangeShelf}
                        />
                    </div>
                </div>
                <div className="open-search">
                    {/**
                     * Add link to navigate to search page.
                     */}
                    <Link to="/search">
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        );
    }
};

export default BookShelves;