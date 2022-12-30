import React, { Fragment, lazy, Suspense, useState, useEffect } from 'react'
const Navbar = lazy(() => import('../../UsableComponent/Navbar'))
import Stepper from '../Steps';
import NavbarSkeleton from '../../Skeleton/NavbarSkeleton'
import { Link } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi'
import { AiOutlineMinus } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import AddressDetails from './AddressDetails';
import { useDispatch } from 'react-redux';
const OrderSummary = lazy(() => import('../Cart/OrderSummary'))

export default function ConfrimOrder() {
    const { IsLogdin } = useSelector(state => state.Signin)
    const Cartdata = useSelector(state => state.Cart.productItems)
    const dispatch = useDispatch();

    useEffect(() => {
        !IsLogdin ? navigate({
            pathname: "/V2/auth/sign_in",
            search: `?${createSearchParams({ 'next': Location.pathname })}`
        }) : null;
    }, [])


    return (
        <Fragment>
            <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
            </Suspense>
            <div className="stepper_container">
                <Stepper activestep={1} />
            </div>
            <div className="confirm_order_container my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="comfirm_box_data px-5 my-5 md:col-span-2">
                    <div className='shipping&product_details '>
                        <div className="shipping_info ">
                            <AddressDetails />
                        </div>
                    </div>
                    <section className='product_details my-5'>
                        <h3 className='YourProductItems text-xl border-b border-gray-300 pb-5'>Your product items</h3>
                        <div className='product_details my-5'>
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
                                                <h2 className='price text-xl'>Rs <span className='price-vlaue'>{item.price}</span></h2>
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
                        </div>
                    </section>
                </div>
                <div className="pricing w-full">
                    <Suspense fallback={<p>loading...</p>}>
                        <OrderSummary />
                    </Suspense>
                    <div className='my-10 w-full px-5'>
                        <Link to="/V2/shop/checkout/payment">
                            <button className='px-5 w-full my-5 py-3 hover:border
                    hover:bg-transparent hover:border-indigo-700 bg-indigo-700
                    text-white shadow-md outline-none hover:text-black text-xl
                    rounded-md'>Payment</button>
                        </Link>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}
