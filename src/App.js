import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/HelloWord';

import './styles/app.scss';

const App = () => (
  <div className="container">
    <HelloWorld />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));