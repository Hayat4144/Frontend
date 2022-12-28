import React, { Fragment, lazy, useState, Suspense } from 'react'
import NavbarSkeleton from '../../Skeleton/NavbarSkeleton'
import { BiShoppingBag } from 'react-icons/bi'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { BiPlus } from 'react-icons/bi'
import { AiOutlineMinus } from 'react-icons/ai'
const Navbar = lazy(() => import('../../UsableComponent/Navbar'))
import { useDispatch, useSelector } from 'react-redux';
import EmptyCartImage from '../../assets/images/EmptyCart.webp'
import { DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_ITEM_FROM_CART } from '../../Context/Actions/ActionType'


export default function Cart() {
    //  ----- states ---- //
    const Cartdata = useSelector(state => state.Cart.productItems)
    const [minimumquantity, setminimumquantity] = useState(10)
    const [quantityalert, setQuantityalert] = useState(false)
    const [shippingestimate, setShippingestimate] = useState(200)
    const [tax_percentage, settax_percentage] = useState(0.5)
    const [IsModalOpen, setIsModalOpen] = useState(false)
    const [isRemovedItem, setIsRemovedItem] = useState(false)
    const dispatch = useDispatch();


    if (Cartdata.length > 0) {
        var subtotal = Cartdata.reduce((a, b) => {
            return a + b.price * b.quantity;

        }, 0)

        // tax applied according to the total price of shopping
        var tax_amount = Math.trunc(tax_percentage / 100 * subtotal);

        var total_amount = tax_amount + subtotal + shippingestimate;

    }


    //  ---- Increase qunatity of cart item ---- //
    const IncreaseQuantity = (id, quantity) => {
        const newquantity = quantity + 1
        if (newquantity < 10) {
            setQuantityalert(true)
        }
        else {
            dispatch({ type: INCREASE_QUANTITY, payload: { '_id': id, 'quantity': newquantity } })

        }
    }

    //  ---- Decrease qunatity of cart item ---- //
    const DescreaseQuantity = (id, quantity) => {
        const newquantity = quantity - 1
        if (newquantity < 10) {
            setQuantityalert(true)
        }
        else {
            dispatch({ type: DECREASE_QUANTITY, payload: { '_id': id, 'quantity': newquantity } })

        }
    }

    //  ---- Remove Item from cart ---- //
    const RemoveCartItem = (id) => {
        dispatch({
            type: REMOVE_ITEM_FROM_CART, payload: id
        })
        setIsModalOpen(!IsModalOpen)
    }


    return (
        <Fragment>

            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <div className='cart_container'>

                {
                    Cartdata.length == 0 ? <Fragment>
                        {/*  ---- If No Cart Item is found */}
                        <div className='empty-cart md:mx-auto lg:flex md:justify-center lg:items-center md:mt-24'>
                            <figure className='empty-cart-image mt-32 md:mt-3'>
                                <img src={EmptyCartImage} alt='empty-cart-image' className='w-full h-full' />
                            </figure>
                            <section className='info-area pb-5 px-5'>
                                <h3 className='text-xl my-5'>It's seems like you haven't added any product to your cart.</h3>
                                <p className='my-3'>Explore our website to purchase your favaourite product and enjoy. </p>
                                <article className='my-10 md:px-0 w-full '>
                                    <a className='bg-orange-500 w-full  px-5 py-3   rounded-md
                                    text-white cursor-pointer shadow-2xl hover:text-black 
                                    hover:border hover:border-orange-400 hover:bg-transparent'>Explore the site</a>
                                    <a className='bg-orange-500 px-5 mx-10 py-3 w-full  rounded-md
                                    text-white cursor-pointer shadow-2xl hover:text-black 
                                    hover:border hover:border-orange-400 hover:bg-transparent'>Add items to cart</a>
                                </article>
                            </section>


                        </div>
                    </Fragment> : <Fragment>
                        <h1
                            className='page-indicator flex 
                        justify-center my-5 space-x-5 cursor-pointer tracking-tight'>
                            <BiShoppingBag fontSize={'30px'} className='hover:text-indigo-700' />
                            <span className='Page-title font-semibold
                        text-2xl hover:text-indigo-800'>My Cart</span>
                        </h1>
                        <main className='grid grid-cols-1 md:grid-cols-3 mx-2 gap-10 md:gap-5'>
                            <section className='product-items-details md:col-span-2 rounded-lg'>
                                <div className='product-top-banner flex text-white bg-indigo-700 h-10 items-center px-2 justify-between'>
                                    <h1 className='product-item cursor-pointer'>Product</h1>
                                    <h1 className='proudct-banner-quantity hidden md:block cursor-pointer ml-24'>Quantity</h1>
                                    <h1 className='proudct-banner-price cursor-pointer'>Each Price</h1>

                                </div>
                                {
                                    Cartdata.map((item) => (
                                        //  ---- product info ---- //
                                        <div className='product-image&detailst px-2 my-5' key={item._id}>
                                            <div className='product-details flex space-x-2'>
                                                <figure className='product-imaga-contianer overflow-hidden w-[20%] rounded-md'>
                                                    <img src={item.image} className='h-28 w-full hover:scale-125 rounded-md ' />
                                                </figure>
                                                <div className='product-name&quantity px-2 w-[60%] grid grid-cols-1 md:grid-cols-2 '>
                                                    <div className='product-info'>
                                                        <div className='name-info-container lg:px-5'>
                                                            <h2 className='product-name text-xl'>{item.name}</h2>
                                                            <h2 className='Colour'> Colour<span className='mx-2 capitalize text-gray-700'>{item.product_attribute.color}</span></h2>
                                                            <h2 className='size'> Size<span className='mx-2 capitalize text-gray-700'>{item.product_attribute.size}</span></h2>
                                                        </div>
                                                    </div>

                                                    {/*  ---- Quantitty */}
                                                    <div className='product-quantity-show my-2 bg-gray-100 flex 
                                                        items-center justify-between px-2 h-8 rounded-md '>
                                                        <button className='decrease-btn bg-indigo-800 rounded-full
                                                            text-white' disabled={item.quanity == 10 || item.quanity < 10 ? true : false}
                                                            onClick={() => { DescreaseQuantity(item._id, item.quantity) }} >
                                                            <AiOutlineMinus fontSize={'22px'} onClick={() => { }} />
                                                        </button>
                                                        <input type={'text'} className='w-10 border border-indigo-800
                                                            outline-none bg-transparent text-black px-1 text-center'
                                                            value={item.quantity} onChange={(e) => {
                                                            }} />
                                                        <button className='increase-button text-white bg-indigo-800 rounded-full'>
                                                            <BiPlus fontSize={'22px'} onClick={() => { IncreaseQuantity(item._id, item.quantity) }} />
                                                        </button>
                                                    </div>


                                                </div>
                                                <div className='each-price text-end ml-32 sm:w-[23%]'>
                                                    <h2 className='price'>Rs <span className='price-vlaue'>{item.price}</span></h2>
                                                </div>
                                            </div>

                                            {/*  ---- Remove Button */}
                                            <div className='remove_item text-end my-5 '>
                                                <button className='remove_item_button uppercase text-xl
                                                 hover:text-indigo-700 cursor-pointer' onClick={() => {
                                                        setIsModalOpen(!IsModalOpen)
                                                    }}>
                                                    Remove Item
                                                </button>
                                            </div>


                                            {/* ----- Confirm Modal ----- */}
                                            <div className={`Modal_container fixed inset-0 bg-black bg-opacity-20 ${IsModalOpen ? 'grid' : 'hidden'} h-screen place-items-center`}>
                                                <div className='modal_body mx-auto h-36 bg-white rounded-md  px-5'>
                                                    <div className='modal_title my-5'>
                                                        <h3 className='modal_title_text text-xl font-bold'>Do you really want to remove this item?</h3>
                                                        <div className="button_groups flex items-center space-x-10 my-8">
                                                            <button
                                                                onClick={() => setIsModalOpen(!IsModalOpen)}
                                                                className='cancel_button px-5 py-2 cursor-pointer rounded-md bg-red-700  text-white
                                                                hover:bg-red-800 '>Cancel</button>
                                                            <button
                                                                onClick={() => RemoveCartItem(item._id)}
                                                                className='remove_button px-5 py-2 border
                                                                border-gray-300 cursor-pointer rounded-md
                                                                hover:bg-indigo-700 hover:text-white hover:border-none'>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            {/*  ----- Total price of particular item */}
                                            <div className='total-price-of-individual-product flex items-center my-2 
                                            border-b border-gray-300 pb-5 justify-between'>
                                                <h2 className='product-subtotal-text text-xl'>Total</h2>
                                                <h2 className='product-total-price'>
                                                    <span className='total-price-value font-bold text-xl'>
                                                        Rs {item.price * item.quantity}
                                                    </span>
                                                </h2>
                                            </div>
                                        </div>
                                    ))
                                }

                            </section>

                            {/* ----- Subtotal ---- */}
                            <section className='subtotal mx-4 shadow-lg px-2 bg-gray-100 rounded-md my-5 md:my-0 '>
                                <h3 className='order-summary-text py-2 text-xl text-indigo-700'>Order Summary</h3>
                                <div className='subtotal flex items-center border-b border-slate-300 pb-3 my-2 justify-between'>
                                    <h3 className='subtotaltext'>Subtotal</h3>
                                    <span className='amount'>Rs {subtotal}</span>
                                </div>
                                <div className='shiping-estimate  my-2 border-b border-slate-300 pb-3 items-center justify-between flex'>
                                    <h3 className='shipingtext'>Shipping estimate</h3>
                                    <span className='amount'>Rs 200</span>
                                </div>
                                <div className='tax-estimate items-center border-b border-slate-300 pb-3 my-2 justify-between flex'>
                                    <h3 className='tax-text '>Tax estimate</h3>
                                    <span className='amount'>Rs {tax_amount}</span>
                                </div>
                                <div className='total flex items-center pb-2 justify-between mb-5'>
                                    <h3 className='order-total'>Total</h3>
                                    <span className='amount'>Rs {total_amount}</span>
                                </div>
                            </section>
                        </main>
                    </Fragment>
                }
            </div>

        </Fragment>
    )
}
