import React, { useState, useEffect } from 'react'
import "./Product.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [editId, setEditId] = useState();
    const [productUpadate, setProductUpadate] = useState({})

    const navigate = useNavigate();

    const getData = async () => {
        const res = await axios.get("/api/v1/products/getProduct");
        setProducts(res.data)
    }

    const handleChange = (e) => {
        setProductUpadate({
            ...productUpadate,
            [e.target.name]: e.target.value
        })
    }
    const handleUpdate = async () => {
        try {
            await axios.patch(`/api/v1/products/updateProduct/${editId}`, { ...productUpadate });
            getData();
            setShowEdit(!showEdit);
            alert("Product updated successfully");

        } catch (error) {
            console.log(error);
        }
    }
    const deleteProduct = async (id) => {
        if (!id) {
            alert("Something Went Wrong!");
            return;
        }

        try {
            const res = await axios.delete(`/api/v1/products/deleteProduct/${id}`);

            if (res.data.deletedCount) {
                getData();
                alert("Product deleted successfully");
            } else {
                alert("Product deletion failed");
            }

        } catch (error) {
            alert("Product deletion failed");
            console.log(error);
        }
    }
    const handleEdit = async (id) => {
        try {
            const res = await axios.get(`/api/v1/products/getProduct/${id}`);
            console.log(res.data);
            setProductUpadate({
                ...res.data
            });

            setEditId(id);
            setShowEdit(!showEdit);


        } catch (error) {
            console.log(error);
        }
    }

    console.log(products);
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <div className="product-header">
                <div>
                    <h3 className="product-title">Product Listing App</h3>
                </div>

                <div>
                    <h3 onClick={() => navigate("/createProduct")} className='create-btn'>Create New Product</h3>
                </div>
            </div>

            <div className="product-container">

                <div>
                    <div className="product-text">
                        <h2>Products</h2>
                    </div>
                    <table className="table-container">
                        <tr className="table-heading">
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {
                            products.map((product) =>
                                product._id === editId && showEdit ? (<>
                                    <tr className="product-data">
                                        <td>
                                            <form>
                                                <input
                                                    className="edit-input"
                                                    name="name"
                                                    type="text"
                                                    onChange={(e) => handleChange(e)}
                                                    value={productUpadate.name}
                                                />
                                            </form>
                                        </td>

                                        <td>
                                            <input
                                                className="edit-input"
                                                name="price"
                                                type="number"
                                                value={productUpadate.price}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </td>

                                        <td>
                                            <select
                                                className="edit-input"
                                                name="category"
                                                value={productUpadate.category}
                                                onChange={(e) => handleChange(e)}
                                            >
                                                <option value="Fashion">Fashion</option>
                                                <option value="Cloths">Cloths</option>
                                                <option value="Shoes">Shoes</option>
                                                <option value="Jwellary">Jwellary</option>
                                            </select>
                                        </td>

                                        <td>
                                            <input
                                                className="edit-input"
                                                name="description"
                                                type="text"
                                                value={productUpadate.description}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </td>

                                        <td>
                                            <div>
                                                <button
                                                    className="update-btn"
                                                    onClick={handleUpdate}
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <button
                                                    className="cancel-btn"
                                                    onClick={() => setShowEdit(false)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                </>) : (<tr className="product-data" key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>

                                    <td>
                                        <div>
                                            <button className='edit-btn' onClick={() => handleEdit(product._id)}>Edit</button>
                                        </div>
                                    </td>
                                    <td>

                                        <div>
                                            <button className='delete-btn' onClick={() => deleteProduct(product._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>)
                            )
                        }

                    </table>
                </div>
            </div>
        </>
    )
}

export default Product