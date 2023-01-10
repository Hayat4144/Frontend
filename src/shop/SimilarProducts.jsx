import React, { Fragment, useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai'

export default function SimilarProducts() {
    const [product_detail, setProduct_detail] = useState([])
    const { id, name, category } = useParams();

    const navigate = useNavigate();

    // --------- fetching products ----------------- //
    const fetchData = () => {
        fetch(`http://localhost:5000/v4/api/get/similar/product?productId=${id}&categoryId=${category}&search=${name}`, {
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
            <div className="similar_products_box mx-5 md:mx-10 my-10">
                <div className="similar_products_text flex items-center justify-between my-5">
                    <h3 className='text-xl font-bold'>Similar products</h3>
                    <h3 className='text-indigo-700 hover:border-b hover:border-indigo-700 text-xl hover:text-indigo-800
                    cursor-pointer flex items-center space-x-2'>
                        <Link to={'/V2/shop/products/category'}>view all</Link>
                        <AiOutlineArrowRight />
                    </h3>
                </div>
                <div className="product_details_contianer grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        product_detail.map((item, index) => (
                            <div className="product_detaiils" key={item._id}>
                                <figure className='overflow-hidden rounded-md'>
                                    <img src={item.assets.images[0]} alt="product-pic"
                                        className='w-full h-56 rounded-md hover:scale-125  transition ease-in-out duration-500' />
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
            </div>
        </Fragment>
    )
}
