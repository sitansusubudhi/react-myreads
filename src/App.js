import React from 'react';
import './App.css';
import BookShelves from './BookShelves';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <div className="app">
        {/**
         * Since, we do not need to pass props to the child components,
         * we can let react router to render the component based on the URL path.
         */} 
        <Route path={process.env.PUBLIC_URL + "/search"} component={SearchBooks} />
        <Route exact path={process.env.PUBLIC_URL + "/"} component={BookShelves} />
      </div>
    )
  }
}

export default App;
