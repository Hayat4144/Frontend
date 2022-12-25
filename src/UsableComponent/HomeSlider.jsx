import React, { Fragment, useEffect, useState } from 'react'
import ImageThumbnail_1 from '../assets/SliderImage/Slider_1.jpg'
import ImageThumbnail_2 from '../assets/SliderImage/Slider_2.jpg'
import ImageThumbnail_3 from '../assets/SliderImage/Slider_3.jpg'
import ImageThumbnail_4 from '../assets/SliderImage/Slider_4.jpg'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import '../index.css'
import SlidersProducts from '../shop/SlidersProducts'


export default function HomeSlider() {
    const [slideIndex, setSlideIndex] = useState(0)

    // image slider 
    const Product_image = [
        {
            "imagetumbnail": "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg",
            "id": "1"
        },
        {
            "imagetumbnail": "https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg",
            "id": "2"
        },
        {
            "imagetumbnail": ImageThumbnail_3,
            "id": "3"
        },
        {
            "imagetumbnail": ImageThumbnail_4,
            "id": "4"
        },
    ]

    // next slide
    const nextSlide = () => {
        if (slideIndex !== Product_image.length - 1) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === Product_image.length - 1) {
            setSlideIndex(0)
        }

    }

    // back slide
    const backslide = () => {
        if (slideIndex === 0) {
            setSlideIndex(Product_image.length - 1)
        }
        else if (slideIndex != Product_image.length - 1 || slideIndex === Product_image.length - 1) {
            setSlideIndex(slideIndex - 1)
        }
    }
    const [product, setproduct] = useState([
        {
            "_id": "63a40c2b1f5d516367cbfff4",
            "name": "Earings",
            "slug": "Earings",
            "created_at": "2022-12-22T07:50:03.979Z",
            "updated_at": "2022-12-22T07:50:03.979Z",
            "children": [
                {
                    "_id": "63a40c851f5d516367cbfffd",
                    "name": "Jhumka",
                    "slug": "Jhumka",
                    "created_at": "2022-12-22T07:51:33.422Z",
                    "updated_at": "2022-12-22T07:51:33.422Z",
                    "children": []
                },
                {
                    "_id": "63a40c851f5d516367cbfffd",
                    "name": "Bali",
                    "slug": "Bali",
                    "created_at": "2022-12-22T07:51:33.422Z",
                    "updated_at": "2022-12-22T07:51:33.422Z",
                    "children": []
                }
            ]
        }
    ]);

    return (
        <Fragment>
            <section className='hero_section_slider_container w-full h-[80%]'>
                <figure className='slider_image_container w-full  -mb-20 md:-mb-52'>
                    <img className='home_slider_image w-full h-full'
                        src={Product_image[slideIndex].imagetumbnail} />
                </figure>
                <div className='w-full px-5 justify-between   
                        font-bold text-4xl flex absolute top-36 md:top-48'>
                    <h3 className='cursor-pointer' onClick={() => {
                        backslide();
                    }}><BsArrowLeftCircle /></h3>
                    <h3 className='cursor-pointer' onClick={() => {
                        nextSlide();
                    }}><BsArrowRightCircle /></h3>
                </div>
            </section>
            <div className='slider_products mx-5'>
                <SlidersProducts />
            </div>

            {/* <Dummy data={product} /> */}

        </Fragment >
    )
}
