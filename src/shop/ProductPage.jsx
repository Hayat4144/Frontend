import React, { Fragment, useState, useEffect } from 'react'
import Navbar from '../UsableComponent/Navbar';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BiPlus } from 'react-icons/bi'
import { AiOutlineMinus } from 'react-icons/ai'
import { ADD_TO_CART_ACTION } from '../Context/Actions/CartActions';
import { toast } from 'react-toastify'


export default function ProductPage() {
    const { id, category } = useParams();
    const [quantity, setquantity] = useState(10)
    const [image_value, setimage_value] = useState(0)
    const [slideindex, setslidindex] = useState(1)
    const [product_detail, setProduct_detail] = useState([])
    const [product_varient, setProduct_varient] = useState([])
    const [selectedSize, setSelectedSize] = useState('Choose a size');
    const [selectedColor, setSelectedColor] = useState('Choose a color');

    const dispatch = useDispatch();


    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:5000/v4/api/product/${id}`, {
                method: "GET",
                credentials: 'include'
            }).then(async (res) => {
                if (res.status === 200) {
                    const { data } = await res.json();
                    setProduct_detail([data])
                }
            })
                .catch(error => console.log(error)),
            fetch(`http://localhost:5000/v3/api/product/varientById/${id}`, {
                method: "GET",
                credentials: 'include'
            })
                .then(async (res) => {
                    if (res.status === 200) {
                        const { data } = await res.json();
                        setProduct_varient(data)
                    }
                })
        ])
    }, [])

    // ---- products attributes ---- //
    const colors = Array.from(new Set(product_varient.map(item => item.product_attribute.color)))
    const sizes = Array.from(new Set(product_varient.map(item => item.product_attribute.size)))

    // ----- get selected varients  ---- //
    const getSelectedVarients = (varients, seletectedsize, selectedcolor) => {
        return varients.filter(item => item.product_attribute.size == seletectedsize && item.product_attribute.color == selectedcolor)
    }

    //  ----- assing the selected varient ----- //
    const selectedvarients = getSelectedVarients(product_varient, selectedSize, selectedColor)


    useEffect(() => {

        if (selectedvarients.length > 0) {
            const updateState = product_detail.map(obj => {
                return { ...obj, price: selectedvarients[0].price }
            })
            setProduct_detail(updateState)
        }
    }, [selectedSize, selectedColor, product_varient])


    // ---- Add to Cart ---- //

    const Add_TO_CART_FUNC = () => {
        if (selectedvarients.length > 0) {
            let data = {
                ...selectedvarients[0], quantity, name: product_detail[0].name,
                image: product_detail[0].assets.images[0]
            }
            dispatch(ADD_TO_CART_ACTION(data))
            toast.success(`product has been added successfully to your cart.`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
        else {
            toast.error("Please select color and size.", {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }

    // next slide
    const nextSlide = (product_image) => {
        if (slideindex !== product_image.length) {
            setslidindex(slideindex + 1)
        }
        else if (slideindex === product_image.length) {
            setslidindex(1)
        }
    }

    //  ----- back slide ----- // 
    const backslide = (product_image) => {
        if (slideindex !== 1) {
            setslidindex(slideindex - 1)
        }
        else if (slideindex === 1) {
            setslidindex(product_image.length)
        }
    }

    const IncreaseQuantity = () => {
        setquantity(quantity + 1)
    }

    const DicreaseQuantity = () => {
        setquantity(quantity - 1)
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
            {product_detail.map((item, index) => (
                <section key={item._id}
                    className='proudct-parent my-16 px-2 grid
                    grid-cols-1 md:grid-cols-7 md:gap-5 '>
                    <div className='col-span-4 sticky'>
                        {item.assets.images.map((images, index) => (
                            <figure className={`${slideindex === index + 1 ? 'relative' : 'hidden'}
                             md:hidden mb-10`} key={index} >
                                <img alt='product-img' src={images} className='w-full rounded-lg h-[20em] lg:h-[38em] ' />
                                <div className='md:hidden w-[90%] justify-between  
                                absolute top-40 text-white font-bold text-2xl flex 
                                mx-2'>
                                    <h3 className='mx-2 cursor-pointer'
                                        onClick={() => {
                                            backslide(item.assets.images);
                                        }}>
                                        <BsArrowLeftCircle />
                                    </h3>
                                    <h3 className='mx-5 cursor-pointer'
                                        onClick={() => {
                                            nextSlide(item.assets.images);
                                        }}>
                                        <BsArrowRightCircle />
                                    </h3>
                                </div>
                            </figure>
                        ))}


                        <main className='hidden md:flex md:space-x-5'>
                            <aside className='aside-image-for-change-main-image md:col-span-1'>
                                {
                                    item.assets.images.map((item, key) => (
                                        <figure key={key} className="overflow-hidden mb-2 rounded-md  ">
                                            <img src={item}
                                                className={`${image_value === key ? 'border-2 shadow-lg  outline-indigo-500 border-indigo-700' :
                                                    'cursor-pointer'} w-[5rem] h-[5rem]`} onClick={(e) => {
                                                        e.preventDefault();
                                                        setimage_value(key);
                                                    }} />
                                        </figure>
                                    ))
                                }
                            </aside>
                            <figure className='w-full overflow-hidden rounded-lg  col-span-4'>
                                <img src={item.assets.images[image_value]}
                                    className=" w-full h-96 hover:scale-125  
                                    transition ease-in-out duration-500  rounded-lg" />
                            </figure>

                        </main>
                    </div>

                    <div className='col-span-3 proudct-info  mx-2 md:mx-5'>
                        <div className='prouduct-name-price font-semibold '>
                            <h3 className='Proudct-name capitalize lg:text-4xl text-xl'>{item.name}</h3>
                            <span className='text-indigo-800  hover:text-indigo-700 text-sm'>Special price
                            </span>
                            <h5 className='product-price font-[800] text-2xl'>Rs {item.price}
                                <span
                                    className='discount-price mx-3 text-sm text-slate-600 
                                    line-through font-[600]'>
                                    8903
                                </span>
                                <span className='text-indigo-700 text-sm'> 45 % off</span>
                            </h5>
                            <p className='product-description text-sm text-gray-800 pb-4'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi consectetur perferendis optio
                                pariatur suscipit fugit, quae tempore dolor ut ab beatae
                                exercitationem ratione fuga libero qui nihil iusto. Obcaecati, praesentium!
                            </p>
                        </div>

                        {/* ----- product varients ----- */}

                        {
                            item.varients && product_varient.length > 0 ? (
                                <div className='product-size flex items-center space-x-5 my-5'>
                                    <h2 className='product_attribute_name text-xl capitalize'>color</h2>
                                    <div className='w-full'>
                                        <form className='size_form'>
                                            <select
                                                defaultValue={selectedColor}
                                                onChange={(e) => setSelectedColor(e.target.value)}
                                                className='px-5 py-2 rounded-md w-full focus:border-2
                                                focus:border-indigo-700 focus:outline-none focus:ring-indigo-700 
                                                border border-gray-500'>
                                                <option defaultValue={selectedColor}>Choose a color</option>
                                                {
                                                    colors.map((color, index) => (
                                                        <option key={index} value={color}>{color}</option>
                                                    ))
                                                }
                                            </select>
                                        </form>
                                    </div>

                                </div>
                            ) : null
                        }



                        {
                            item.varients && product_varient.length > 0 ? (
                                <div className='product-size flex items-center space-x-5'>
                                    <h2 className='product_attribute_name text-xl capitalize'>size</h2>
                                    <div className='w-full'>
                                        <form className='size_form'>
                                            <select
                                                defaultValue={selectedSize}
                                                onChange={(e) => setSelectedSize(e.target.value)}
                                                className='px-5 py-2 rounded-md w-full focus:border-2
                                                focus:border-indigo-700 focus:outline-none focus:ring-indigo-700
                                                border border-gray-500'>
                                                <option defaultValue={selectedColor}>Choose a size</option>
                                                {
                                                    sizes.map((size, index) => (
                                                        <option key={index} value={size}>{size}</option>
                                                    ))
                                                }
                                            </select>
                                        </form>
                                    </div>

                                </div>
                            ) : null
                        }



                        <div className='product-quantity my-4'>
                            <div className='quantity-value flex 
                                justify-between lg:mx-0 bg-gray-200 py-1 rounded-md 
                                items-center lg:justify-between space-x-24 lg:space-x-20 
                                px-5'
                            >
                                <button className='decrease-btn bg-indigo-900 text-white rounded-full 
                                    indigo-700 focus:border-none'
                                    disabled={quantity == 10 || quantity < 10 ? true : false}>
                                    <AiOutlineMinus fontSize={'20px'} onClick={DicreaseQuantity} />
                                </button>
                                <input type={'text'} className='focus:outline-none focus:border
                                    focus:border-indigo-600 focus:shadow-lg focus:bg-indigo-700                            
                                    focus:text-white w-10 border rounded-md border-indigo-800 
                                    outline-none bg-transparent text-black  text-center'
                                    value={quantity} onChange={(e) => {
                                        e.preventDefault();
                                        ManualQuantityChange(e);
                                    }} />
                                <button className='plus-icon bg-indigo-900 focus:outline-none focus:shadow-lg focus:bg-indigo-700 focus:border-none text-white rounded-full '>
                                    <BiPlus fontSize={'20px'} onClick={IncreaseQuantity} />
                                </button>

                            </div>
                            <span id='quantity-limit' className={`text-sm text-red-700 ${quantity < 10 ? 'block' : 'hidden'}`}>You should have to buy at least 10 pcs.</span>
                        </div>

                        <div className='group-btn lg:flex lg:items-center '>
                            <button onClick={Add_TO_CART_FUNC}
                                className='focus:outline-none focus:shadow-lg w-full lg:py-4  my-2
                                bg-indigo-700 text-white px-3 lg:mr-3 rounded-lg  hover:bg-indigo-800 
                                cursor-pointer py-3'>
                                Add to Cart
                            </button>
                            <button className='focus:outline-none focus:shadow-lg w-full lg:py-4 py-3 
                            border border-gray-300 focus:text-white focus:bg-indigo-700 
                            focus:border-none hover:text-white hover:border-none px-3 rounded-lg 
                            hover:bg-indigo-700 cursor-pointer'>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </section>
            ))
            }

        </Fragment >
    )
}
