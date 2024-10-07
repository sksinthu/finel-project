// src/components/Orders.js
import React from 'react';

const Orders = () => (
    <div>
        <h2>Orders</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* Sample row; replace with dynamic data as needed */}
                <tr>
                    <td>#001</td>
                    <td>John Doe</td>
                    <td>$120</td>
                    <td>Pending</td>
                    <td>Edit | Delete</td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default Orders;
