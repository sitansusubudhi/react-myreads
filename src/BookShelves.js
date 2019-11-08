import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class BookShelves extends Component {
    state = {
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        BooksAPI.getAll()
        .then((books) => {
            const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading').map(({id}) => (id)); 
            const wantToRead = books.filter((book) => book.shelf === 'wantToRead').map(({id}) => (id));;
            const read = books.filter((book) => book.shelf === 'read').map(({id}) => (id));;

            this.setState(() => ({
                books,
                currentlyReading,
                wantToRead,
                read
            }));
        });
    }

    bookChangeShelf = (book, shelf) => {

        BooksAPI.update(book, shelf)
            .then(({ currentlyReading, wantToRead, read }) => {
                this.setState(() => ({
                    currentlyReading,
                    wantToRead,
                    read
                }));
            })
    }

    render() {


        const { books, currentlyReading, wantToRead, read } = this.state;
        

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
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
                    <Link to="/search">
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        );
    }

};

export default BookShelves;