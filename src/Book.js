import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';
import PropTypes from 'prop-types';

class Book extends Component {
    /**
    * Adding propTypes for verifying props passed down to Book
    */
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeSelectOption: PropTypes.func.isRequired
    }
    /**
     * selectValue - The select dropdown choice value
     */
    state = {
        selectValue: "none"
    }

     // Call get method from BooksAPI in componentDidMount lifecycle event to fetch data from backend server
    componentDidMount() {
        const { book: { id } } = this.props; // Destructuring to obtain id from book variable passed down as props
        BooksAPI.get(id)
         .then(({ shelf }) => {
            // Promise resolves to return an object containing all details for the book with the given 'id'.
            // We get the shelf value by destructuring.
            // Set the state selectValue as per shelf variable.
             this.setState(() => ({
                selectValue: shelf
             }));
         });
    }

    /**
     * @description Updates shelf for the given Book. Sets the select dropdown value.
     * @param {object} book - book object which contains at minimum an 'id' attribute
     * @param {string} shelf - Shelf contains values from either of 'currentlyReading', 'wantToRead', 'read', 'none'
     */
    handleSelectOptionChange = (book, value) => {
        this.setState(() => ({
            selectValue: value
         }));
         // The callback is getting called.
         this.props.onChangeSelectOption(book, value);
    };


    render() {
        const { book } = this.props; // Destructuring to obtain book variable passed down as props
        const { selectValue } = this.state; // Destructuring to obtain state variable selectValue

        return (
            <li>
            <div className="book">
                <div className="book-top">
                    {/**
                     * Check if imageLinks exist for current book. If no link, then set image url blank.
                     */}
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ''})` }}></div>
                    <div className="book-shelf-changer">
                        {/**
                         * Set value of the select dropdown field from selectValue of state.
                         * Call handleSelectOptionChange when input field changes.
                         */}
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
                {/**
                 * Check if there are authors for current book.
                 * Use map to loop over each author and display their names.
                 */}
                {book.authors && book.authors.map((author) => (
                    <div className="book-authors" key={author}>{author}</div>
                ))}
            </div>
        </li>
        );
    }
};


export default Book;