// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Overview from './component/Overview';
import Orders from './component/Ordermanagement';
import Users from './component/User';
import './component/Css/dashboard.css';

import './App.css';

function App() {
    return (
        <div className="app">
            <Sidebar />
            <div className="dashboard-content">
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
