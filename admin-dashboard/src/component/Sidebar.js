// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../component/Css/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
                <li>
                    <NavLink to="/" exact activeClassName="active">Overview</NavLink>
                </li>
                <li>
                    <NavLink to="/orders" activeClassName="active">Orders</NavLink>
                </li>
                <li>
                    <NavLink to="/users" activeClassName="active">Users</NavLink>
                </li>
                
            </ul>
        </div>
    );
};

export default Sidebar;
