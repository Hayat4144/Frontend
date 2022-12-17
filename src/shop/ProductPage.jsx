import React, { Fragment, useState } from 'react'
import Navbar from '../UsableComponent/Navbar';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import '../ProductPage.css'
import { BiPlus } from 'react-icons/bi'
import { AiOutlineMinus } from 'react-icons/ai'
import Imagethumbnail_1 from '../assets/images/thumbnail-1.jpg'
import Imagethumbnail_2 from '../assets/images/thumbnail_2.jpg'
import Imagethumbnail_3 from '../assets/images/thumbnail_3.jpg'
import Imagethumbnail_4 from '../assets/images/thumbnail_4.jpg'


export default function ProductPage() {
    const { product_id, category } = useParams();
    const [product_data, setproduct_data] = useState([])
    const [quanity, setquantity] = useState(10)
    const [product_details, setproductsdetails] = useState([])
    const [sizevalue, setsizevalue] = useState('')
    const [colourvalue, setColourvalue] = useState('')
    const [image_value, setimage_value] = useState(0)
    const [slideindex, setslidindex] = useState(1)
    const [product_item_id, setProduct_item_id] = useState('')
    const [product_attribute, setproduct_attribute] = useState([])
    const Product_image = [
        {
            "imagetumbnail": Imagethumbnail_1,
            "id": "1"
        },
        {
            "imagetumbnail": Imagethumbnail_2,
            "id": "2"
        },
        {
            "imagetumbnail": Imagethumbnail_3,
            "id": "3"
        },
        {
            "imagetumbnail": Imagethumbnail_4,
            "id": "4"
        },
        {
            "imagetumbnail": Imagethumbnail_2,
            "id": "5"
        }
    ]
    const { imagetumbnail } = Product_image[image_value]
    const Add_TO_CART_FUNC = () => {
        const item_data = {
            'product_item_id': '27',
            'product_image': Product_image[0].imagetumbnail,
            'size': sizevalue,
            'colour': colourvalue,
            'quantity': quanity,
            'product_name': product_data[0].name,
            "price": product_data[0].regular_price

        }
        // const l = dispatch(ADD_TO_CART(item_data))
        // console.log(l)
    }
    console.log(colourvalue)
    // next slide
    const nextSlide = () => {
        if (slideindex !== Product_image.length) {
            setslidindex(slideindex + 1)
        }
        else if (slideindex === Product_image.length) {
            setslidindex(1)
        }
    }

    // back slide
    const backslide = () => {
        if (slideindex !== 1) {
            setslidindex(slideindex - 1)
        }
        else if (slideindex === 1) {
            setslidindex(Product_image.length)
        }
    }

    const IncreaseQuantity = () => {
        setquantity(quanity + 1)
    }

    const DicreaseQuantity = () => {
        setquantity(quanity - 1)
    }

    const ManualQuantityChange = (e) => {
        setquantity(Number(e.target.value))
    }

    const ColourChange = (e) => {
        setColourvalue(e.target.value)

    }

    return (
        <Fragment>
            <Navbar />
            <section className='proudct-parent my-16 px-2 grid grid-cols-1 md:grid-cols-7 md:gap-5 '>
                <article className='col-span-4 sticky'>
                    {
                        Product_image.map((item, index) => (
                            <figure className={`${slideindex === index + 1 ? 'relative' : 'hidden'} md:hidden mb-10`} key={item.id} >
                                <img alt='product-img' src={item.imagetumbnail} className='w-full rounded-lg h-[20em] lg:h-[38em] ' />

                                {/* slider button */}
                                <div className='md:hidden w-[90%] justify-between  absolute top-40 text-white font-bold text-2xl flex mx-2'>
                                    <h3 className='mx-2 cursor-pointer' onClick={() => {
                                        backslide();
                                    }}><BsArrowLeftCircle /></h3>
                                    <h3 className='mx-5 cursor-pointer' onClick={() => {
                                        nextSlide();
                                    }}><BsArrowRightCircle /></h3>
                                </div>
                            </figure>
                        ))
                    }
                    {/* product image for large screen */}
                    <main className='hidden md:flex md:space-x-5'>
                        <aside className='aside-image-for-change-main-image md:col-span-1'>
                            {
                                Product_image.map((item, key) => (
                                    <figure key={item.id} className="overflow-hidden mb-2 rounded-md  ">
                                        <img src={item.imagetumbnail} className={`${image_value === key ? 'border-2 shadow-lg  outline-indigo-500 border-indigo-700' : 'cursor-pointer'} w-[5rem] h-[5rem]`} onClick={(e) => {
                                            e.preventDefault();
                                            setimage_value(key);
                                        }} />
                                    </figure>
                                ))
                            }
                        </aside>
                        <figure className='w-full overflow-hidden rounded-lg  col-span-4'>
                            <img src={imagetumbnail} className=" w-full h-96 hover:scale-125  transition ease-in-out duration-500  rounded-lg" />
                        </figure>

                    </main>
                </article>

                {/* second  */}

                <article className='col-span-3 proudct-info  mx-2 md:mx-5'>
                    {/* proudct-price and name */}
                    <div className='prouduct-name-price font-semibold '>
                        <h3 className='Proudct-name capitalize lg:text-4xl text-xl'>Blue Mavrin tshirt</h3>
                        <span className='text-indigo-800  hover:text-indigo-700 text-sm'>Special price
                        </span>
                        <h5 className='product-price font-[800] text-2xl'>Rs 4000<span
                            className='discount-price mx-3 text-sm text-slate-600 line-through 
                            font-[600]'>8903</span>
                            <span className='text-indigo-700 text-sm'> 45 % off</span>
                        </h5>
                        <p className='product-description text-sm text-gray-800 pb-4'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
                            suscipit tempore expedita vitae tempora recusandae minus voluptates.
                            Laborum, voluptas ea?
                        </p>
                    </div>
                    <section className='product-attributes_group'>
                        <div className='product_attribute_1 flex items-center space-x-5'>
                            <h2 className='product_attribute_name_1 text-xl'>Size</h2>
                            <div className='product_attribute_value_1 w-full'>
                                <select name="size" id="size" className='px-5 py-2 rounded-md
                                w-full focus:border-2 focus:border-indigo-700 focus:outline-none 
                                focus:ring-indigo-700
                                border border-gray-500
                                 '>
                                    <option defaultValue="select a size">select a size</option>
                                    <option value="small" className='size_option  
                                     hover:bg-indigo-700 hover:text-white'>
                                        small
                                    </option>
                                    <option value="medium">
                                        medium
                                    </option>
                                    <option value="large">
                                        large
                                    </option>
                                </select>
                            </div>
                        </div>

                        {/* product attribute 2 */}
                        <div className='product_attribute_1 twister my-4 '>
                            <h2 className='product_attribute_name_1 text-xl'>Colour</h2>
                            <ul className='colour-value grid grid-cols-5 my-2 gap-2'>
                                {Product_image.map(item => (
                                    <li className="
                                    mb-2
                                     " key={item.id}>
                                        <label className='rounded-md radio-colour-btn'>
                                            <input type={'radio'} checked={colourvalue === item.id} onChange={ColourChange} name='colour' id={item.id} value={item.id} />
                                            <img src={item.imagetumbnail}
                                                className="h-16 rounded-md w-16" alt="image" />
                                        </label>

                                    </li>
                                ))}

                            </ul>
                        </div>
                    </section>



                    {/* Quantity */}
                    <div className='product-quantity my-4'>
                        <div className='quanity-value flex 
                        justify-between lg:mx-0 bg-gray-200 py-1 rounded-md 
                        items-center lg:justify-between space-x-24 lg:space-x-20 
                        px-5'>
                            <button className='decrease-btn bg-indigo-900 text-white rounded-full 
                            indigo-700 focus:border-none'
                                disabled={quanity == 10 || quanity < 10 ? true : false}>
                                <AiOutlineMinus fontSize={'20px'} onClick={DicreaseQuantity} />
                            </button>
                            <input type={'text'} className='focus:outline-none focus:border
                             focus:border-indigo-600 focus:shadow-lg focus:bg-indigo-700                            
                             focus:text-white w-10 border rounded-md border-indigo-800 outline-none 
                             bg-transparent text-black  text-center' value={quanity} onChange={(e) => {
                                    e.preventDefault();
                                    ManualQuantityChange(e);
                                }} />
                            <button className='plus-icon bg-indigo-900 focus:outline-none focus:shadow-lg focus:bg-indigo-700 focus:border-none text-white rounded-full '>
                                <BiPlus fontSize={'20px'} onClick={IncreaseQuantity} />
                            </button>

                        </div>
                        <span id='quantity-limit' className={`text-sm text-red-700 ${quanity < 10 ? 'block' : 'hidden'}`}>You should have to buy at least 10 pcs.</span>
                    </div>

                    <div className='group-btn lg:flex lg:items-center '>
                        <button onClick={Add_TO_CART_FUNC} className='focus:outline-none focus:shadow-lg
                        w-full lg:py-4  my-2 bg-indigo-700 text-white px-3 lg:mr-3 rounded-lg 
                         hover:bg-indigo-800 cursor-pointer py-3'> Add to Cart</button>
                        <button className='focus:outline-none focus:shadow-lg w-full lg:py-4 py-3  border
                        border-gray-300 focus:text-white focus:bg-indigo-700 focus:border-none
                        hover:text-white hover:border-none px-3 rounded-lg  hover:bg-indigo-700 
                        cursor-pointer'>Buy Now</button>
                    </div>
                </article>
            </section>





        </Fragment>
    )
}
