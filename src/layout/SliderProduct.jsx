import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Rating } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function SliderProduct({ product_detail }) {
    const responsive = {
        '2xl': {
            breakpoint: { max: 1535, min: 1280 },
            items: 5,
            slidesToSlide: 5
        },
        xl: {
            breakpoint: { max: 1279, min: 1024 },
            items: 4,
            slidesToSlide: 4
        },
        lg: {
            breakpoint: { max: 1023, min: 768 },
            items: 3,
            slidesToSlide: 4
        },
        md: {
            breakpoint: { max: 767, min: 640 },
            items: 2,
            slidesToSlide: 2
        },
        sm: {
            breakpoint: { max: 639, min: 0 },
            items: 2,
            slidesToSlide: 2
        },
    };
    return (
        <Fragment>
            <Carousel responsive={responsive} ssr={true} removeArrowOnDeviceType={["md", "sm"]} itemClass="">
                {product_detail.map((item) => (
                    <div className="product_detaiils mx-2" key={item._id}>
                        <Link
                            to={`/V2/shop/product/${item._id}/${item.name
                                }/${encodeURIComponent(item.category)}`}
                        >
                            <figure className="overflow-hidden rounded-md">
                                <LazyLoadImage
                                    src={item.assets.images[0].url}
                                    alt="product-pic"
                                    effect="blur"
                                    className="w-full h-56  hover:scale-125  transition ease-in-out duration-500"
                                />
                                {/* <img
                                    src={item.assets.images[0].url}
                                    alt="product-pic"
                                    className="w-full h-56  hover:scale-125  transition ease-in-out duration-500"
                                /> */}
                            </figure>
                            <div className="product_details my-2">
                                <p
                                    className="product_name capitalize w-full sm:justify-between cursor-pointer
                                     hover:text-indigo-700 sm:flex items-center sm:text-bold sm:text-bold"
                                >
                                    <span className="product_name">
                                        {item.name.length > 30
                                            ? `${item.name.substring(0, 30).charAt(0).toUpperCase() +
                                            item.name.slice(1)}...`
                                            : item.name.charAt(0).toUpperCase() +
                                            item.name.slice(1)}
                                    </span>


                                </p>
                                <h1 className="product_rating text-[18px]">
                                    <Rating value={item.average_rating} />
                                </h1>
                                <p className="font-bold text-xl">
                                    Rs{item.price}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </Carousel>
        </Fragment>
    )
}
