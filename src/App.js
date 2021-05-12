import React from 'react';
//import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
//import { useDispatch, useSelector } from 'react-redux';
//import { updateMessages, handlTextChange, submitMessage } from './redux/actions/messageActions';

//const Message = ({ data }) => (<div>{data}</div>);

import HomePage from './pages/Home'

const App = () => {
  /**
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messageReducer.messages);
  const text = useSelector(state => state.messageReducer.text);

  React.useEffect(() => {
    axios.get('/messanger/getMessages')
      .then((res) => {
        dispatch(updateMessages(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onSubmit = () => {
    dispatch(submitMessage());
  }

  const handleTextChange = (e) => {
    dispatch(handlTextChange(e.target.value));
  }
  **/

  return (
    <Router>
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomePage} exact />
        </Container>
      </main>
    </Router>
  );
};

export default App;
