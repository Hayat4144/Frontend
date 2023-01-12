import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SampleProducts({ name }) {
    //  -------------------- product details ------------------------ //
    const [product_detail, setProduct_detail] = useState([])
    const navigate = useNavigate();

    // --------- fetching products ----------------- //
    const fetchData = () => {
        fetch(`http://localhost:5000/v4/api/get/sample/product?search=${name}`, {
            method: "GET",
            credentials: 'include',
        }).then(async (res) => {
            if (res.status === 200) {
                const { data } = await res.json();
                setProduct_detail(data)
            }
        })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        fetchData();
    }, [])
    console.log(product_detail)
    return (
        <Fragment>
            <div className='sample_product_container mx-2 md:px-5 px-2 py-5 mb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    product_detail.map((item, index) => (
                        <div className="product_detaiils" key={item._id}>
                            <figure className='overflow-hidden'>
                                <img src={item.assets.images[0]} alt="product-pic"
                                    className='w-full h-56  hover:scale-125  transition ease-in-out duration-500' />
                            </figure>
                            <div className='product_details my-2' onClick={() => {
                                navigate(`/V2/shop/product/${item._id}/${item.name}/${item.category}`)
                            }}>
                                <p className='product_name capitalize w-full 
                                    text-[17px] hover:text-indigo-700'>
                                    {item.name}
                                </p>
                                <p className='product_price text-[18px]'>
                                    <span className='currency_symbol'> Rs </span>
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Fragment>
    )
}
