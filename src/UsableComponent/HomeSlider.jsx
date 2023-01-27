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
    const [SliderImage, setSliderImage] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/v4/api/read/banner`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (res) => {
            if (res.status === 200) {
                const { data } = await res.json();
                setSliderImage(data)
            }
        })
            .catch(error => console.log(error))
    }, [])

    // next slide
    const nextSlide = () => {
        if (slideIndex !== SliderImage.length - 1) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === SliderImage.length - 1) {
            setSlideIndex(0)
        }

    }

    // back slide
    const backslide = () => {
        if (slideIndex === 0) {
            setSlideIndex(SliderImage.length - 1)
        }
        else if (slideIndex != SliderImage.length - 1 || slideIndex === SliderImage.length - 1) {
            setSlideIndex(slideIndex - 1)
        }
    }
    return (
        <Fragment>
            <section className='hero_section_slider_container w-full h-[80%]'>
                <figure className='slider_image_container w-full  -mb-20 md:-mb-52'>
                    <img className='home_slider_image w-full h-full'
                        src={SliderImage[slideIndex]?.image} />
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
