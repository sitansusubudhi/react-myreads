import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {

    state = {
        searchTerm: '',
        displayBooks: []
    }

    searchBookByTitleOrAuthor = (event) => {
        const searchQuery = event.target.value.trim();
        
        BooksAPI.search(searchQuery)
        .then((books) => {
            console.log('searchQuery is ', searchQuery);
            if (books.constructor.name === 'Array') {
                this.setState(() => ({
                    displayBooks: books
                }))
            } else {
                this.setState(() => ({
                    displayBooks: []
                }))
            }
        });
        
        
    
        this.setState(() => ({
            searchTerm: searchQuery.trim()
        }));
    }

    onChangeBookShelf = (book, shelf) => {
        BooksAPI.update(book, shelf);
    }


    render() {

        const { searchTerm, displayBooks  } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={searchTerm}
                            onChange={this.searchBookByTitleOrAuthor} />

                    </div>
                </div>
                <div className="search-books-results">
                    {displayBooks.length > 0 && (
                        <ol className="books-grid">
                            {displayBooks.map((book) => {
                                console.log("Display books length ", displayBooks.length);
                                console.log(book.title);
                                console.log(book.authors);
                                return (<Book key={book.id} book={book} onChangeSelectOption={this.onChangeBookShelf} />)
                            }
                            )}
                        </ol>
                    )}
                </div>
            </div>
        );
    }


};

export default SearchBooks;