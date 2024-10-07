import React, { useState } from "react";
import Delete from "@material-ui/icons/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import emailjs from "emailjs-com";
import image from "./../img/success.png";

export default function Cart() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const data = useCart();
  const dispatch = useDispatchCart();

  const EMAILJS_SERVICE_ID = "service_xyry4bc";
  const EMAILJS_TEMPLATE_ID_DEFAULT = "template_p2krjdr";
  const EMAILJS_TEMPLATE_ID_SPECIAL = "template_050sb6k";
  const EMAILJS_USER_ID = "FOwzzbSeZHj4RkUKL";

  const handleCheckOut = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const phoneRegex = /^[0-9\s-]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }
    setPhoneError("");

    const customer_email = localStorage.getItem("userEmail");

    const orderDetails = data
      .map(
        (item, index) =>
          `Item ${index + 1}:\nName: ${item.name}\nCategory: ${item.category}\nQuantity: ${item.qty}\nSize: ${item.size}\nAmount: ${item.qty * item.price}\n`
      )
      .join("\n");

    const customerTemplateParams = {
      email: customer_email,
      customer_name: name,
      message_html: `Order Details:\n\n${orderDetails}\nTotal Price: ${totalPrice}`,
    };

    const specialTemplateParams = {
      email: customer_email,
      customer_name: name,
      message_html: `Special Order Details:\n\n${orderDetails}\nTotal Price: ${totalPrice}\n\nCustomer Details:\nPhone Number: ${phone}\nAddress: ${address}`,
    };

    try {
      await Promise.all([
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID_DEFAULT,
          customerTemplateParams,
          EMAILJS_USER_ID
        ),
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID_SPECIAL,
          specialTemplateParams,
          EMAILJS_USER_ID
        ),
      ]);

      setOrderPlaced(true);
    } catch (error) {
      console.error("Email errors:", error);
    }

    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/auth/orderData", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  const totalPrice = data.reduce(
    (total, food) => total + food.qty * food.price,
    0
  );

  const userName = localStorage.getItem("userName");

  if (orderPlaced) {
    return (
      <div className="order-successful-container">
        <div className="m-5 w-100 text-center fs-3 text-white">
          <div className="success-message">
            Your order has been successfully placed!
          </div>
          <img className="success-image" src={image} alt="Success" />
          <div className="thank-you-message">Thank you for choosing us!</div>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="order-form-container" style={{ padding: "70px" }}>
        <h1 className="text-success text-center mb-4">Delivery Information</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label className="text-white mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-control mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <label className="text-white mb-2" htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              className="form-control mb-4"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
            />
            {phoneError && <div className="text-danger">{phoneError}</div>}
          </div>
          <div className="form-group">
            <label className="text-white mb-2" htmlFor="address">Delivery Address</label>
            <input
              type="text"
              id="address"
              className="form-control mb-4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Delivery Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Submit Order Details</button>
        </form>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="order-empty-container">
        <div className="m-5 w-100 text-center fs-3 text-white">
          <div className="empty-message">Your Cart is Empty!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
      <h2 className="text-white">Order placed by: {userName}</h2>
      <table className="table">
        <thead className="text-success fs-4">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Option</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr className="text-white" key={index}>
              <th>{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.category}</td> {/* Displaying the category */}
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.qty * food.price}</td>
              <td>
                <button
                  type="button"
                  className="btn p-0 text-white"
                  onClick={() => dispatch({ type: "REMOVE", index })}
                >
                  <Delete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
      </div>
      <div>
        <button className="btn bg-success mt-5" onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
}
