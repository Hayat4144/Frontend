import React, { Fragment } from 'react'
import ProductImage from '../assets/images/thumbnail-1.jpg'
import '../index.css'
export default function SlidersProducts() {
    const product_data = [
        {
            id: 1,
            name: 'Product 1',
            price: 34,
            image: "https://m.media-amazon.com/images/I/51iiN42STEL._SX1500_.jpg"

        },
        {
            id: 2,
            name: 'Product 2',
            price: 60,
            image: "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg"

        },
        {
            id: 3,
            name: 'Product 2',
            price: 45,
            image: ProductImage

        }
    ]
    return (
        <div className='home_products grid grid-cols-1 sm:grid-cols-2
        w-full md:grid-cols-3 lg:grid-cols-4 py-10 gap-5'>
            {
                [1, 2, 3, 4].map((item) => (
                    <div className='items bg-white mb-5 px-4 py-5'>
                        <div className='product-info cursor-pointer'>
                            <h3 className='card_title text-[17px] font-bold leading-tight'>
                                Shop by Category
                            </h3>
                            <figure className='images overflow-hidden py-5'>
                                <img src={ProductImage} alt="image"
                                    className='w-full h-52' />
                            </figure>
                            <a className='see_more text-blue-700 cursor-pointer
                            hover:underline text-[18px]'
                            >see more</a>
                        </div>
                    </div>

                ))
            }

        </div>
    )
}
