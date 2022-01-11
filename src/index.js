import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import List from './Routes/List';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path=":id" element={<List />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
