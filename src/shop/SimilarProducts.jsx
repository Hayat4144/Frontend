import React, { Fragment, useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Rating } from '@mui/material'
import SampleProductSkeleton from '../Skeleton/SampleProductSkeleton';

export default function SimilarProducts() {
    const [isLoading, setIsLoading] = useState(false)
    const [product_detail, setProduct_detail] = useState([])
    const [noProduct, setNoProduct] = useState(false)
    const { id, name, category } = useParams();

    const navigate = useNavigate();

    // --------- fetching products ----------------- //
    const fetchData = async () => {
        setIsLoading(!isLoading)
        await fetch(`${import.meta.env.DEV ? import.meta.env.VITE_BACKEND_DEV_URL : import.meta.env.VITE_BACKEND_URL}/v4/api/get/similar/product?productId=${id}&categoryId=${category}&search=${name}`, {
            method: "GET",
            credentials: 'include',
        }).then(async (res) => {
            const { data } = await res.json();
            if (data.length < 1) {
                setNoProduct(true);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
            setProduct_detail(data)
        })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <Fragment>
            <div className="similar_products_box mx-2  my-10">
                <div className="similar_products_text flex md:mx-3 items-center justify-between my-5">
                    <h3 className='text-xl font-bold'>Similar products</h3>
                    <h3 className='text-indigo-700 hover:border-b hover:border-indigo-700 text-xl hover:text-indigo-800
                    cursor-pointer flex items-center space-x-2'>
                        <Link to={'/V2/shop/products/category'}>view all</Link>
                        <AiOutlineArrowRight />
                    </h3>
                </div>
                {isLoading ?
                    <SampleProductSkeleton />
                    : noProduct ?
                        <div className='my-10 h-20 '>
                            <h2 className='text-xl text-center mb-5'>
                                No product found
                            </h2>
                        </div>
                        : <Fragment>
                            <div className='sample_product_container  px-2 py-5 mb-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
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
                                                <p className='product_name capitalize w-full sm:justify-between cursor-pointer
                                    text-xl hover:text-indigo-700 sm:flex items-center  sm:font-extrabold'>
                                                    <span className='product_name block'>{item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name}</span>
                                                    <span className='currency_symbol block'> Rs {item.price} </span>
                                                </p>
                                                <h1 className='product_rating my-2  text-[18px]'>
                                                    <Rating value={item.average_rating} />
                                                </h1>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        </Fragment>
                }
            </div>
        </Fragment>
    )
}
