import React, { Fragment } from 'react'
import ProductImage from '../assets/images/thumbnail-1.jpg'
import '../index.css'
export default function SlidersProducts() {
    const product_data = [
        {
            id: 1,
            name: 'Product 1',
            price: 34,
            image: ProductImage

        },
        {
            id: 2,
            name: 'Product 2',
            price: 60,
            image: ProductImage

        },
        {
            id: 3,
            name: 'Product 2',
            price: 45,
            image: ProductImage

        }
    ]
    return (
        <div className='home_products flex flex-col items-center
        w-full py-10 justify-end mx-5'>
            <div className='product-info'>
                <h2 className='product-name'>
                    Product 1
                </h2>
                <h3 className='price'>Rs 455</h3>
            </div>
            <figure className='product-image'>
                <img
                    className='w-full max-h-[280px]
                    object-contain mb-5 mt-5'
                    src={ProductImage} />
            </figure>
        </div>
    )
}
