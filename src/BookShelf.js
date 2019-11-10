import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

/**
 * We can make this a Stateless Functional Component because this element doesn't need to hold its own state.
 */
const BookShelf = (props) => {
    
    const { books, shelf, shelfTitle, onChangeBookShelf } = props; // Destructuring to obtain all variables passed as props
    const shelfBooks = books.filter((book) => (shelf.includes(book.id))); // get all books for current shelf
    

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {/**
                     * shelfBooks contains array of books for current shelf
                     * Hence we map over the array and 
                     * render Book component for every book present in shelfBooks.
                     */}
                    {shelfBooks.map((book) => (
                        <Book key={book.id} book={book} onChangeSelectOption={onChangeBookShelf} />
                    ))}
                </ol>
            </div>
        </div>

    );
};

/**
 * Adding propTypes for verifying props passed down to BookShelf
 */
BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
}

export default BookShelf;