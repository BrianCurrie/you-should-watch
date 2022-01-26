import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateList from './Routes/CreateList.js';
import List from './Routes/List';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateList />} />
                <Route path=":id" element={<List />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
