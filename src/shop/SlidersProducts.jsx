import React, { Fragment } from 'react'
import ProductImage from '../assets/images/thumbnail-1.jpg'
import EaringsImage from '../assets/images/Earings.webp'
import BaliImage from '../assets/images/Bali.webp'
import TopImage from '../assets/images/TOP.jpeg'
import slimNecklace from '../assets/images/slimNecklace.jpeg'
import BridalNecklace from '../assets/images/BridalNecklace.jpeg'
import SilverNecklace from '../assets/images/SilverNecklace.jpeg'


import { Link } from 'react-router-dom'
import '../index.css'
export default function SlidersProducts() {
    return (
        <div className='home_products grid grid-cols-1 sm:grid-cols-2
        w-full md:grid-cols-3 lg:grid-cols-4 py-10 gap-5'>
            {/* ----- Shop by category */}
            <div className='items bg-white mb-5 px-4 py-5'>
                <div className='product-info cursor-pointer'>
                    <Link to="/V2/shop/products/category">
                        <h3 className='card_title text-2xl font-bold leading-tight'>
                            Shop by Category
                        </h3>
                        <figure className='images overflow-hidden py-5'>
                            <img src={ProductImage} alt="image"
                                className='w-full h-72' />
                        </figure>
                        <h1 className='see_more cursor-pointer
                            hover:underline text-[18px]'
                        >see more</h1>
                    </Link>

                </div>
            </div>
            {/* Earings show */}
            <div className="items bg-white mb-5 px-4 py-5">
                <h3 className='text-2xl font-bold leading-tight'>Top Earings</h3>
                <div className="grid grid-cols-2">
                    <div className="cursor-pointer jhumka_box">
                        <Link to="/V2/shop/search?keyword=Jhumka">
                            <figure className='images overflow-hidden py-5'>
                                <img src={EaringsImage} alt="image"
                                    className='w-32 h-28 hover:scale-150' />
                            </figure>
                            <h1 className='see_more cursor-pointer
                            hover:underline text-sm'
                            >jhumka</h1>
                        </Link>


                    </div>
                    <div className="cursor-pointer jhumka_box">
                        <Link to={'/V2/shop/search?keyword=bali'}>
                            <figure className='images overflow-hidden py-5'>
                                <img src={BaliImage} alt="image"
                                    className='w-32 h-28 hover:scale-150' />
                            </figure>
                            <h1 className='see_more cursor-pointer
                            hover:underline text-sm'
                            >Bali</h1>
                        </Link>
                    </div>
                    <div className="cursor-pointer jhumka_box">
                        <Link to={'/V2/shop/search?keyword=tops'}>
                            <figure className='images overflow-hidden py-5'>
                                <img src={TopImage} alt="image"
                                    className='w-32 h-28  hover:scale-150 ' />
                            </figure>
                            <h1 className='see_more cursor-pointer
                            hover:underline text-sm'
                            >Top</h1>
                        </Link>
                    </div>
                </div>

            </div>

            {/* Necklace show */}
            <div className="items bg-white mb-5 px-4 py-5">
                <h3 className='text-2xl font-bold leading-tight'>Necklace</h3>
                <div className="grid grid-cols-2">
                    <div className="cursor-pointer necklace_box">
                        <Link to={'/V2/shop/search?keyword=slim heart necklace'}>
                            <figure className='images overflow-hidden py-5'>
                                <img src={slimNecklace} alt="image"
                                    className='w-32 h-28 hover:scale-150' />
                            </figure>
                            <h1 className='see_more cursor-pointer
                            hover:underline text-sm'
                            >Slim Heart Necklace</h1>
                        </Link>

                    </div>
                    <div className="cursor-pointer necklace_box">
                        <Link to={'/V2/shop/search?keyword=bride necklace'}>
                            <figure className='images overflow-hidden py-5'>
                                <img src={BridalNecklace} alt="image"
                                    className='w-32 h-28 hover:scale-150' />
                            </figure>
                            <h1 className='see_more cursor-pointer
                            hover:underline text-sm'
                            >Bride Necklace</h1>
                        </Link>

                    </div>
                    <div className="cursor-pointer necklace_box">
                        <Link to={'/V2/shop/search?keyword=silver neck'}>
                            <figure className='images overflow-hidden py-5'>
                                <img src={SilverNecklace} alt="image"
                                    className='w-32 h-28 hover:scale-150' />
                            </figure>
                            <h1 className='see_more cursor-pointer
                            hover:underline text-sm'
                            >Silver Necklace</h1>
                        </Link>
                    </div>
                </div>
            </div>

            {/* sign in and explore the website */}
            <div className="">
                <div className="bg-white px-4 py-5">
                    <h3 className='title text-xl font-bold mb-5'>Sign in for the best experience</h3>
                    <div className='my-5'>
                        <Link to="/v2/auth/sign_in">
                            <button className='px-5 py-2 text-white 
                                w-full hover:border hover:border-gray-300
                                bg-indigo-700 hover:bg-transparent hover:text-black shadow-lg'>Sign in</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
