import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <div className="shadow-lg m-2 bg-black text-white p-2 h-80">
      <Link to={`/product/${product._id}`}>
        <img src={product.image[0]} alt="product_img" className="h-12" />
        <div className="flex flex-col">
          <span>{product.name}</span>
          <span>${product.price}</span>
          <span className="flex items-center gap-x-2">
            {Rating(product.rating)}
            <p>{product.numReviews} reviews</p>{" "}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Product;
