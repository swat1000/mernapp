import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

export default function Home() {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const getData = async () => {
    const response = await fetch('http://localhost:5000/api/fooditems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    setFoodItem(data[0]);
    setFoodCategory(data[1]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="div-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ height:"40px" ,width: "700px" }} value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/500×700/?food" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/500×700/?dessert" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/500×700/?dinner" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCategory.length !== 0 ? (
          foodCategory.map((data) => {
            return (
              <div key={data._id}>
                <div className="fs-3 m-3 row mb-3">
                  {data.CategoryName}
                  <hr />
                  {foodItem.length !== [] ? (
                    foodItem
                      .filter((item) => item.CategoryName === data.CategoryName  && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map((filterItems) => {
                        return (
                          <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                            <Card foodName={filterItems.name}
                              options={filterItems.options[0]}
                              imgSrc={filterItems.img}></Card>
                          </div>
                        )
                      })
                  ) : (
                    "No Such Data Found"
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>No food categories found</div>
        )}
        {/* <Card /> */}
      </div>
      <div><Footer /></div>
    </div>
  );
}
