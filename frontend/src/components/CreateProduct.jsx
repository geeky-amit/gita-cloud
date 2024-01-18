import React, { useState, useEffect } from 'react';
import "./CreateProduct.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate()

    console.log(name, price, category, description);
    const submitHandler = async () => {
        if (!name || !price || !category || !description) {
            alert("Please enter all required fields");
            return
        }

        try {

            const data = await axios.post("/api/v1/products/createProduct", {
                name, price, category, description
            });

            alert("Product created successfully", data.message);

        } catch (error) {
            alert("Failed to create Product");
            console.log("Something went wrong", error);

        }

    }

    return (
        <>
            <div className='title-text'>Create Product</div>
            <div className="form-container">
                <div className="name-container">
                    <label>Name</label>
                    <input
                        className="name-input"
                        type="text"
                        placeholder="name here"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='price-container'>
                    <label>Price</label>
                    <input
                        className="name-input"
                        type="number"
                        placeholder="price here"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="category-container">
                    <label>Category</label>
                    <div>
                        <select
                            className="category-select"
                            name="categoryType"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="none" disabled hidden>
                                Select
                            </option>
                            <option value="Fashion">Fashion</option>
                            <option value="Cloths">Cloths</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Jwellary">Jwellary</option>
                        </select>
                    </div>
                </div>

                <div className='description-container'>
                    <label>Description</label>
                    <textarea
                        type="text"
                        placeholder="Description"
                        className="description-input"
                        onChange={(e) => setDescription(e.target.value)}
                    />

                </div>

                <div className='btn-container'>
                    <button onClick={submitHandler} className='submit-btn'>Create Product</button>
                </div>


            </div>
        </>

    )
}

export default CreateProduct