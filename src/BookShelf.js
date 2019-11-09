import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookShelf = (props) => {
    const { books, shelf, shelfTitle, onChangeBookShelf } = props;
    const shelfBooks = books.filter((book) => (shelf.includes(book.id)));
    

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {shelfBooks.map((book) => (
                        <Book key={book.id} book={book} onChangeSelectOption={onChangeBookShelf} />
                    ))}
                </ol>
            </div>
        </div>

    );
};

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
}

export default BookShelf;