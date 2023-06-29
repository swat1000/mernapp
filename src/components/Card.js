import React from 'react'

export default function Card() {
    return (
        <div>
            <div>
                <div class="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src="https://source.unsplash.com/random/300×300/?food" style={{maxHeight: '200px', maxWidth: '300px'}} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Try the new craving</p>
                        <div class="container w-100">
                            <select class="m-2 h-100 bg-success rounded">
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select class="m-2 h-100  bg-success rounded">
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                            <div class="d-inline h-100 fs-5">
                                Total Price
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
