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
            "imagetumbnail": ImageThumbnail_1,
            "id": "1"
        },
        {
            "imagetumbnail": ImageThumbnail_2,
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


    return (
        <Fragment>
            <section className='hero_section_slider_container w-full'>
                <figure className='slider_image_container'>
                    <img className='home_slider_image -mb-14 md:-mb-64'
                        src={Product_image[slideIndex].imagetumbnail} />
                </figure>
                <div className='w-full px-5 justify-between   
                        font-bold text-4xl flex absolute top-36 md:top-48
                        text-white'>
                    <h3 className='cursor-pointer' onClick={() => {
                        backslide();
                    }}><BsArrowLeftCircle /></h3>
                    <h3 className='cursor-pointer' onClick={() => {
                        nextSlide();
                    }}><BsArrowRightCircle /></h3>
                </div>
            </section>
            <div className='home_rows'>
                <SlidersProducts />
                <SlidersProducts />
                <SlidersProducts />
            </div>

        </Fragment >
    )
}
