import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Landing from './routes/Landing.js';
import CreateList from './routes/CreateList.js';
import List from './routes/List';
import Navbar from './components/navbar/Navbar.js';
import Footer from './components/footer/Footer.js';
import NotFound from './components/notFound/NotFound.js';

import style from './App.module.css';

function App() {
    const [user, setUser] = useState(null);
    return (
        <HashRouter>
            <div className={style.mainContainer}>
                <div className={style.container}>
                    <Navbar setUser={setUser} />
                    <Routes>
                        <Route
                            path="*"
                            element={
                                <NotFound
                                    mainText={"That's not good..."}
                                    subText={
                                        "We couldn't find the page you were looking for"
                                    }
                                />
                            }
                        />
                        <Route path="/" element={<Landing />} />
                        <Route path="/list/:id" element={<List />} />
                        <Route
                            path="/create"
                            element={<CreateList user={user} />}
                        />
                    </Routes>
                    <Footer />
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
