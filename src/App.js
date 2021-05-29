import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MDBContainer } from 'mdb-react-ui-kit'

import HomePage from './pages/Home'
import NewListing from './pages/listings/NewListing'
import ViewListing from './pages/listings/ViewListing'
import Checkout from '././pages/Checkout'
import Navbar from '../src/components/Navbar'

const App = () => {
  return (
    <main>
      <Router>
        <Navbar></Navbar>
        <MDBContainer>
          <Route exact path='/' component={HomePage} />
          <Route path='/newListing' component={NewListing} />
          <Route path='/viewListing/:id' component={ViewListing} />
          <Route path='/checkout' component={Checkout} />
        </MDBContainer>
      </Router>
    </main>
  );
};

export default App;
