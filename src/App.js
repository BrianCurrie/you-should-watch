import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateList from './routes/CreateList.js';
import List from './routes/List';

function App() {
    const [user, setUser] = useState(null);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<CreateList user={user} setUser={setUser} />}
                />
                <Route
                    path=":id"
                    element={<List user={user} setUser={setUser} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
