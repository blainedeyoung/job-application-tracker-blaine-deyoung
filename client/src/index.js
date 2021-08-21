import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import JobsProvider from './context/JobsProvider.js'
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <JobsProvider>
            <App />
        </JobsProvider>
    </BrowserRouter>
, document.getElementById('root'));

