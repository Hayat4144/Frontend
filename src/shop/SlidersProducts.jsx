import React, { Fragment } from 'react'
import ProductImage from '../assets/images/thumbnail-1.jpg'
import { Link } from 'react-router-dom'
import '../index.css'
export default function SlidersProducts() {
    return (
        <div className='home_products grid grid-cols-1 sm:grid-cols-2
        w-full md:grid-cols-3 lg:grid-cols-4 py-10 gap-5'>
            {
                [1, 2, 3, 4].map((item, index) => (
                    <div className='items bg-white mb-5 px-4 py-5' key={index}>
                        <div className='product-info cursor-pointer'>
                            <Link to="/V2/shop/products/category">
                                <h3 className='card_title text-[17px] font-bold leading-tight'>
                                    Shop by Category
                                </h3>
                                <figure className='images overflow-hidden py-5'>
                                    <img src={ProductImage} alt="image"
                                        className='w-full h-52' />
                                </figure>
                                <h1 className='see_more text-blue-700 cursor-pointer
                            hover:underline text-[18px]'
                                >see more</h1>
                            </Link>

                        </div>
                    </div>

                ))
            }

        </div>
    )
}
