import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from './routes/MainPage';
import LoginPage from './routes/LoginPage';
import JoinPage from './routes/JoinPage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/join" component={JoinPage} />
    </Switch>
  );
}

export default App;
