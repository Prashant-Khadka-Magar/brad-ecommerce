import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductsDetailsQuery,
} from "../../slices/productsApiSlice";

function ProductEdit() {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductsDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImages(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
      setIsFeatured(product.isFeatured);
    }
  }, [product]);

  const imageUploadHandler = (e) => {
    setImages(e.target.files);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("image", images[i]);
    }
    formData.append("productId", productId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("description", description);
    formData.append("isFeatured", isFeatured);

    try {
      await updateProduct(formData).unwrap();
      toast.success("Product Updated");
      refetch();
      navigate("/admin/productlist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/admin/productlist">
        <button>Go Back</button>
      </Link>
      <h1>Update Products</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-y-2 items-center"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="price"
          />
          <>
            {!images && <label>{product.image}</label>}
            <input
              type="file"
              onChange={imageUploadHandler}
              placeholder="Image"
              multiple
            />
          </>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />
          <input
            type="number"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            placeholder="Stock Count"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Stock Count"
          />
          <div className="flex gap-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <label htmlFor="featured">Add To Fetaure Products</label>
          </div>
          <button type="submit">
            {!loadingUpdate ? "Update" : <Loader />}
          </button>
        </form>
      )}
    </div>
  );
}

export default ProductEdit;
