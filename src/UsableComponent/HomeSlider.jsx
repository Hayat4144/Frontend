import React, { Fragment, useEffect, useState } from 'react'
import ImageThumbnail_1 from '../assets/SliderImage/Slider_1.jpg'
import ImageThumbnail_2 from '../assets/SliderImage/Slider_2.jpg'
import ImageThumbnail_3 from '../assets/SliderImage/Slider_3.jpg'
import ImageThumbnail_4 from '../assets/SliderImage/Slider_4.jpg'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import '../index.css'
import SlidersProducts from '../shop/SlidersProducts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function HomeSlider() {
    const [slideIndex, setSlideIndex] = useState(0)
    const [SliderImage, setSliderImage] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [noProduct, setNoProduct] = useState(false)
    useEffect(() => {
        async function fetchBanner() {
            setIsLoading(true)
            await fetch(`${import.meta.env.DEV ? import.meta.env.VITE_BACKEND_DEV_URL : import.meta.env.VITE_BACKEND_URL}/v4/api/read/banner`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(async (res) => {
                const { data } = await res.json();
                if (data.length < 1) {
                    setNoProduct(true)
                    setIsLoading(false)
                    return;
                }
                setSliderImage(data);
                setIsLoading(false)
            })
                .catch(error => console.log(error))
        }
        fetchBanner();
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
            {
                isLoading ? <div className='w-full'>
                    <Skeleton className='w-full md:h-[400px] lg:h-[550px] '/>
                </div> : noProduct ? <div>no product found</div> : <section className='hero_section_slider_container w-full'>
                    <figure className='slider_image_container'>
                        <img className='home_slider_image w-full md:h-[400px] lg:h-[550px]'
                            src={SliderImage[slideIndex]?.image} />
                    </figure>
                    <div className='w-full px-5 justify-between  text-white 
                        font-bold text-4xl md:text-6xl flex absolute top-36  sm:top-48 
                        md:top-56 lg:top-80'>
                        <h3 className='cursor-pointer' onClick={() => {
                            backslide();
                        }}><BsArrowLeftCircle /></h3>
                        <h3 className='cursor-pointer' onClick={() => {
                            nextSlide();
                        }}><BsArrowRightCircle /></h3>
                    </div>
                </section>
            }

            <div className='slider_products mx-5'>
                <SlidersProducts />
            </div>
        </Fragment >
    )
}
