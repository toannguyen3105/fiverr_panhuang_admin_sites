import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createProduct } from "../../redux/actions/productAction";
import "./newProduct.css";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(10);
  const createdSuccess = useSelector((state) => state.products.createdSuccess);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name,
      description,
      price,
    };

    dispatch(createProduct(product));
  };

  useEffect(() => {
    if (createdSuccess) {
      history.push("/products");
    }
  }, [history, createdSuccess]);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Name</label>
          <input
            type="text"
            placeholder="Apple Airpods"
            required
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Apple Airpods"
            required
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="number"
            step={10}
            min={10}
            max={10000}
            placeholder="Price"
            required
            value={price}
            onChange={({ target }) => setPrice(target.value)}
          />
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
