import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ products }) => {
  return products.map((product) => (
    <div key={product._id} className="card">
      <Link to={`products/${product._id}`}>
        <img className="medium" src={product.image} alt={product.title} />
      </Link>
      <div className="card__body">
        <Link to={`products/${product._id}`}>
          <h2>{product.title}</h2>
        </Link>
        <Rating rating={product.rating} noOfReviews={product.noOfReviews} />
        <div className="price">${product.price}</div>
      </div>
    </div>
  ));
};

export default Product;
