import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';
import PropTypes from 'prop-types';

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeSelectOption: PropTypes.func.isRequired
    }

    state = {
        selectValue: "none"
    }

    componentDidMount() {
        const { book: { id } } = this.props;
        BooksAPI.get(id)
         .then(({ shelf }) => {
             this.setState(() => ({
                selectValue: shelf
             }));
         });
    }

    handleSelectOptionChange = (book, value) => {
        this.setState(() => ({
            selectValue: value
         }));

         this.props.onChangeSelectOption(book, value);
    };


    render() {
        const { book } = this.props;
        const { selectValue } = this.state;

        return (
            <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ''})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={selectValue} onChange={(event) => this.handleSelectOptionChange(book, event.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>   
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && book.authors.map((author) => (
                    <div className="book-authors" key={author}>{author}</div>
                ))}
            </div>
        </li>
        );
    }
};


export default Book;