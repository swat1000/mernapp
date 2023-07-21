import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    let options = props.options;
    let priceOptions = Object.keys(options);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();

    const handleAddtoCart = async ()=>{
      await dispatch({type: "ADD_TO_CART", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: quantity, size: size})
    console.log(data)
    }
    let finalPrice = quantity * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "450px" }}>
                    <img src={props.foodItem.img} style={{height: '200px', maxWidth: '300px', objectFit: 'fill'}} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQuantity(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className="m-2 h-100  bg-success rounded" ref= {priceRef} onChange={(e)=>setSize(e.target.value)}>
                                {priceOptions.map((data)=>{
                                 return <option key = {data} value= {data}>{data}</option>
                                })}
                            </select>
                            <div className="d-inline h-100 fs-5">
                                Rs{finalPrice}/-
                            </div>
                            <hr></hr>
                            <button className='btn bg-success justify-center ms-2' onClick={handleAddtoCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
