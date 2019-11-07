import React from 'react';
import Book from './Book';

const BookShelf = (props) => {
    const { books, shelfTitle, onChangeBookShelf } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <Book key={book.id} book={book} onChangeSelectOption={onChangeBookShelf} />
                    ))}
                </ol>
            </div>
        </div>

    );
};

export default BookShelf;