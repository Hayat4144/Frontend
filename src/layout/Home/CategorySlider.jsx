import React, { Fragment } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import image1 from '../../assets/SliderImage/Slider_1.jpg'
import image2 from '../../assets/SliderImage/Slider_2.jpg'
import image3 from '../../assets/SliderImage/Slider_3.jpg'
import image4 from '../../assets/SliderImage/Slider_4.jpg'
import image5 from '../../assets/react.svg'


export default function CategorySlider() {
    const categories = [
        { name: "jhumka", image: image1, id: '1' },
        { name: "bali", image: image2, id: '2' },
        { name: "earings", image: image3, id: '3' },
        { name: "Necklace", image: image4, id: '4' },
        { name: "fashion", image: image5, id: '5' },
        { name: "shoes", image: image1, id: '6' },
        { name: "laptop", image: image2, id: '7' },
        { name: "mobile", image: image3, id: '8' },
    ];
    const responsive = {
        sm: {
            breakpoint: { max: 639, min: 0 },
            items: 5,
            slidesToSlide: 6
        },
    };
    return (
        <Fragment>
            <Carousel responsive={responsive} ssr={true} itemClass="px-2" removeArrowOnDeviceType={["sm"]}>
                {categories.map((category) => (
                    <div className='' key={category.id}>
                        <img src={category.image} alt='category-image' />
                        <span className='category-name capitalize font-thin text-xs'>{category.name}</span>
                    </div>
                ))}
            </Carousel>
        </Fragment>
    )
}
