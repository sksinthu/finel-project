import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category

  const loadFoodItems = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItems(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching food data:", error);
      // Optionally: set an error state to inform the user
    }
  }

  useEffect(() => {
    loadFoodItems();
  }, []);

  // Function to handle selecting a category
  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
  }

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn text-white bg-danger" onClick={() => setSearch('')} aria-label="Clear search">X</button>
            </div>
          </div>
          {foodItems.length > 0 && foodItems.map((item, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={item._id}>
              <img src={item.img} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt={item.name} />
            </div>
          ))}
        </div>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
      </div>
      <div className="container">
        <div className="row mb-3">
          <div className="col-12">
            <h3 className="text-white">Food Categories</h3>
            {foodCat.map((data) => (
              <button
                key={data._id}
                className={`btn m-2 ${selectedCategory === data.CategoryName ? 'btn-success' : 'btn-warning'}`}
                onClick={() => handleSelectCategory(data.CategoryName)}
              >
                {data.CategoryName}
              </button>
            ))}
          </div>
        </div>
        <div className="row">
          <h3 className="text-white">Food Items</h3>
          {foodItems.length > 0 ? (
            foodItems
              .filter((item) =>
                (selectedCategory === null || item.CategoryName === selectedCategory) &&
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((filterItems) => (
                <div key={filterItems._id} className="col-12 col-md-6 col-lg-4">
                  <Card
                    foodName={filterItems.name}
                    item={filterItems}
                    options={filterItems.options[0]}
                    ImgSrc={filterItems.img}
                    category={filterItems.CategoryName} // Added category prop
                  />
                </div>
              ))
          ) : (
            <div className="text-white">No items found.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
