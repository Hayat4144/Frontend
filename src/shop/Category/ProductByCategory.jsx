import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react'
const Navbar = lazy(() => import('../../UsableComponent/Navbar'))
import NavbarSkeleton from '../../Skeleton/NavbarSkeleton'
import ProductImage from '../../assets/images/thumbnail_2.jpg'
import { BsFillStarFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'

export default function ProductByCategory() {
    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [productData, setProductData] = useState([])

    const CategoryHandler = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/v4/api/get_all_categories`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (res.status === 200) {
                const { data } = await res.json();
                setCategory(data)
                setCategoryId(data[0]._id)
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    const productsHandler = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/v4/api/getproduct_by_category?category_id=${categoryId}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (res.status === 200) {
                const { data } = await res.json();
                setProductData(data)
            }
        })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        CategoryHandler();
    }, [])
    useEffect(() => {
        productsHandler();
    }, [categoryId])



    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <section className="products_category_page_container flex space-x-5">
                <div className="left_menu border-r border-gray-300 my-5">
                    {category.map((item, index) => (
                        <ul className='category_name' key={item._id}>
                            <li className='my-2 text-xl cursor-pointer
                            hover:text-indigo-700 mx-4'
                                onClick={() => setCategoryId(item._id)}>{item.name}</li>
                            {item.children.length > 0 ? (item.children.map((children) => (
                                <li className='my-2 cursor-pointer mx-10 hover:text-indigo-700'
                                    key={children._id}
                                    onClick={() => setCategoryId(children._id)}>
                                    {children.name}
                                </li>
                            ))) : null}
                        </ul>
                    ))}
                </div>
                <div>
                    {/* <h4 className='text-xl font-bold'> showing all products</h4> */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 md:grid-cols-4 w-full">
                        {
                            productData.map((item, index) => (
                                <div className="product_info mx-3 my-3 cursor-pointer" key={item._id}>
                                    <figure className='images py-5'>
                                        <img src={item.assets.images[0]} alt="image"
                                            className='w-full h-52 rounded-md hover:scale-125
                                        hover:my-3 transition ease-in-out duration-300' />
                                    </figure>
                                    <div className='product_info'>
                                        <Link to={`/V2/shop/product/${item._id}/${item.name}/${item.category}`}>
                                            <h3 className='product_name text-xl'>{item.name}</h3>
                                            <h3 className='product_price text-xl'><span className='currency_symbol'>
                                                Rs</span> {item.price}</h3>
                                        </Link>

                                    </div>
                                    <div className="products_ratings flex items-center mt-2 space-x-1">
                                        <Rating value={item.average_rating} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </section>
        </Fragment>
    )
}
