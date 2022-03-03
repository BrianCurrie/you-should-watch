import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateList from './routes/CreateList.js';
import List from './routes/List';
import Navbar from './components/navbar/Navbar.js';

import style from './App.module.css';

function App() {
    const [user, setUser] = useState(null);
    return (
        <BrowserRouter>
            <div className={style.mainContainer}>
                <div className={style.container}>
                    <Navbar setUser={setUser} />
                    <Routes>
                        <Route path="/" element={<CreateList user={user} />} />
                        <Route path="/list/:id" element={<List />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
