import React from 'react';
import Book from './Book';

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

export default BookShelf;