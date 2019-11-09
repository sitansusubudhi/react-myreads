import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

const SEARCH_TERMS = [
    'Android', 'Art', 'Artificial Intelligence', 
    'Astronomy', 'Austen', 'Baseball', 
    'Basketball', 'Bhagat', 'Biography', 
    'Brief', 'Business', 'Camus', 'Cervantes', 
    'Christie', 'Classics', 'Comics', 'Cook', 
    'Cricket', 'Cycling', 'Desai', 'Design', 
    'Development', 'Digital Marketing', 'Drama', 
    'Drawing', 'Dumas', 'Education', 'Everything', 
    'Fantasy', 'Film', 'Finance', 'First', 'Fitness',
    'Football', 'Future', 'Games', 'Gandhi', 'Homer', 
    'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 
    'King', 'Lahiri', 'Larsson', 'Learn', 
    'Literary Fiction', 'Make', 'Manage', 
    'Marquez', 'Money', 'Mystery', 'Negotiate', 
    'Painting', 'Philosophy', 'Photography', 
    'Poetry', 'Production', 'Programming', 
    'React', 'Redux', 'River', 'Robotics', 
    'Rowling', 'Satire', 'Science Fiction', 
    'Shakespeare', 'Singh', 'Swimming', 'Tale', 
    'Thrun', 'Time', 'Tolstoy', 'Travel', 
    'Ultimate', 'Virtual Reality', 
    'Web Development', 'iOS'
]

const SEARCH_TERMS_LOWER = SEARCH_TERMS.map(term => term.toLowerCase());

class SearchBooks extends Component {

    state = {
        searchTerm: '',
        displayBooks: []
    }

    searchBookByTitleOrAuthor = (event) => {
        const searchQuery = event.target.value.trimStart();

        if (searchQuery.length > 0) {
            if (SEARCH_TERMS_LOWER.includes(searchQuery.toLowerCase())) {
                BooksAPI.search(searchQuery)
                    .then((books) => {
                        this.setState(() => ({
                            displayBooks: books
                        }))
                    });
            }
        } else {
            this.setState(() => ({
                displayBooks: []
            }))
        }

        this.setState(() => ({
            searchTerm: searchQuery
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