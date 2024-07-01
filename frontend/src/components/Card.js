import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";
// import { Dropdown, DropdownButton } from 'react-bootstrap';
import "../css/card.module.css";
export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div
      className="card mt-3"
      style={{
        width: "18rem",
        maxHeight: "auto",
        border: "none",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="card-body text-center">
        <h5 className="card-title">{props.foodName}</h5>
        <img
          src={props.ImgSrc}
          className="card-img-top"
          alt="..."
          style={{ height: "150px", objectFit: "cover", marginBottom: "15px" }}
        />
        {/* <div className="d-flex justify-content-around align-items-center mb-3">
          <div>
            <label>Quantity</label>
          </div>
          <div>
            <label>Varients</label>
          </div>
        </div> */}
        <div className="d-flex justify-content-center align-items-center mb-3">
          <select
            className="form-select me-2"
            style={{ width: "45%" }}
            onClick={handleClick}
            onChange={handleQty}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>

          <select
            className="form-select"
            style={{ width: "45%" }}
            ref={priceRef}
            onClick={handleClick}
            onChange={handleOptions}
          >
            {priceOptions.map((i) => {
              return (
                <option key={i} value={i}>
                  {i}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <span className="fw-bold">Price: ₹{finalPrice}/-</span>
        </div>
        <button className="btn btn-success w-100" onClick={handleAddToCart}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
