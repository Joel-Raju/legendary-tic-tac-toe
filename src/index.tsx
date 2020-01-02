import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If yo u want your app to work offline and load faster, you can ch  a nge
// unre g ister() to register() below. Note this comes with some pi  tf al ls.
// Le a rn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
