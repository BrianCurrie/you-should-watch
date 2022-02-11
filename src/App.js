import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateList from './routes/CreateList.js';
import List from './routes/List';
import Navbar from './components/navbar/Navbar.js';

function App() {
    const [user, setUser] = useState(null);
    return (
        <BrowserRouter>
            <Navbar setUser={setUser} />
            <Routes>
                <Route path="/" element={<CreateList user={user} />} />
                <Route path=":id" element={<List />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
